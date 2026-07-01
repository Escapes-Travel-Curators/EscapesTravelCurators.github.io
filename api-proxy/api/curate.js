// ─────────────────────────────────────────────────────────────────────────────
// Escapes Travel Curators — AI Curator Edge Function
// Deploy this to Vercel. Set GEMINI_API_KEY in Vercel Dashboard → Environment Variables.
// Your API key is NEVER exposed to the browser.
// ─────────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://escapes-travel-curators.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const SYSTEM_PROMPT = `You are the AI Travel Curator for Escapes Travel Curators, a premium luxury travel agency based in India specialising in bespoke holidays for discerning Indian travellers.

When a client describes their dream trip, produce a beautifully structured itinerary in Markdown:

1. **Opening** (2–3 sentences): An evocative, editorial introduction that captures the feeling of the trip.
2. **Day-by-Day Itinerary**: For each day use this format:
   ### Day N — [Descriptive Title]
   - **Morning**: [activity/experience]
   - **Afternoon**: [activity/experience]  
   - **Evening**: [dining mood / sunset / activity]
   - **Stay**: [category of accommodation, e.g. "Cliffside boutique hotel with pool villa"]
3. **Budget Snapshot** (table or bullets): Approximate INR ranges for flights, hotels, and activities separately. Always include a total estimate range.
4. **ETC Curated Touches**: 2–3 bespoke add-ons our team would arrange (private transfers, special dining experiences, hidden gems, etc.)
5. **Next Steps**: A warm, 2-sentence close inviting them to connect with their personal curator on WhatsApp.

Tone: warm, editorial, aspirational — like a trusted friend who happens to be a world-class travel writer. Never generic or listicle-like. Make it feel personal and considered.

Important: All budget estimates in Indian Rupees (₹). Keep itineraries realistic for the budget given. If no budget is stated, provide a mid-range estimate.`;

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Origin check
  if (!ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    return new Response('Forbidden', { status: 403 });
  }

  let prompt;
  try {
    ({ prompt } = await req.json());
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return new Response('Prompt is required', { status: 400 });
  }
  if (prompt.length > 1200) {
    return new Response('Prompt too long (max 1200 chars)', { status: 400 });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return new Response('Server misconfiguration', { status: 500 });
  }

  // Call Gemini with SSE streaming
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: prompt.trim() }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 2048,
          topP: 0.95,
        },
      }),
    }
  );

  if (!geminiRes.ok) {
    const errText = await geminiRes.text().catch(() => '');
    console.error('Gemini error:', geminiRes.status, errText);
    return new Response('Upstream AI error', { status: 502 });
  }

  // Transform Gemini SSE → simple token SSE for the browser
  const { readable, writable } = new TransformStream({
    transform(chunk, controller) {
      const text = new TextDecoder().decode(chunk);
      const lines = text.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const json  = JSON.parse(jsonStr);
          const token = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (token) {
            controller.enqueue(new TextEncoder().encode(`data: ${token}\n\n`));
          }
        } catch { /* partial chunk — skip */ }
      }
    },
    flush(controller) {
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
    },
  });

  geminiRes.body.pipeTo(writable).catch(console.error);

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      ...corsHeaders(origin),
    },
  });
}

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o)) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
