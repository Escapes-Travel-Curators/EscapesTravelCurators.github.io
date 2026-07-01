import { useState, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import useScrollReveal from '../hooks/useScrollReveal';

// ── CONFIG ────────────────────────────────────────────────────────────────────
// In production this points to your Vercel edge function.
// For local dev, set VITE_CURATOR_API_URL in app/.env.local
const API_ENDPOINT = import.meta.env.VITE_CURATOR_API_URL || '';

// ── SUGGESTION CHIPS ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  '🌊 Romantic 7-day honeymoon in Bali — ₹2L budget, beach vibes',
  '🗼 Family trip to Europe, 10 days, 2 adults + 2 kids, ₹5L',
  '🏙️ Quick 4-day Dubai escape with shopping and desert safari',
  '🌿 Solo adventure in Southeast Asia, 2 weeks, backpacker budget',
];

// ── LOADING PHRASES ───────────────────────────────────────────────────────────
const PHRASES = [
  'Scanning destination intelligence…',
  'Curating bespoke experiences…',
  'Consulting our global partner network…',
  'Composing your private itinerary…',
  'Adding premium touches…',
];

export default function LiveCurator() {
  const [prompt,  setPrompt]  = useState('');
  const [result,  setResult]  = useState('');
  const [status,  setStatus]  = useState('idle'); // idle|loading|streaming|done|error
  const [phrase,  setPhrase]  = useState(PHRASES[0]);
  const abortRef    = useRef(null);
  const phraseTimer = useRef(null);
  const ref = useScrollReveal();

  const startPhraseLoop = useCallback(() => {
    let i = 1;
    phraseTimer.current = setInterval(() => {
      setPhrase(PHRASES[i % PHRASES.length]);
      i++;
    }, 1800);
  }, []);

  const stopPhraseLoop = useCallback(() => {
    clearInterval(phraseTimer.current);
  }, []);

  const handleCurate = useCallback(async () => {
    if (!prompt.trim() || status === 'loading' || status === 'streaming') return;

    // If no API endpoint configured, show a helpful message
    if (!API_ENDPOINT) {
      setStatus('error');
      setResult('**API not configured.** Please set `VITE_CURATOR_API_URL` in your `.env.local` file pointing to your Vercel edge function. See the migration guide for setup instructions.');
      return;
    }

    setResult('');
    setStatus('loading');
    setPhrase(PHRASES[0]);
    startPhraseLoop();

    abortRef.current = new AbortController();

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      setStatus('streaming');
      stopPhraseLoop();

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const token = line.slice(6);
          if (token === '[DONE]') break;
          setResult((prev) => prev + token);
        }
      }
      setStatus('done');
    } catch (err) {
      stopPhraseLoop();
      if (err.name === 'AbortError') {
        setStatus('idle');
      } else {
        console.error(err);
        setStatus('error');
      }
    }
  }, [prompt, status, startPhraseLoop, stopPhraseLoop]);

  const handleCancel = useCallback(() => {
    abortRef.current?.abort();
    stopPhraseLoop();
    setStatus('idle');
  }, [stopPhraseLoop]);

  const handleReset = useCallback(() => {
    setResult('');
    setPrompt('');
    setStatus('idle');
  }, []);

  const isActive = status === 'loading' || status === 'streaming';

  return (
    <section className="section live-curator" id="ai-curator" ref={ref}>
      <div className="container">

        {/* Header */}
        <div className="section-head reveal">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Powered by AI
          </p>
          <h2>Describe your dream. <em>We write the itinerary.</em></h2>
          <p className="curator-subtitle">
            Tell us your destination vibe, budget, duration, and travel style in plain language.
            Our AI curator instantly drafts a bespoke itinerary — then our human experts
            refine and book every detail.
          </p>
        </div>

        {/* Prompt Card */}
        <div className="curator-card">
          <textarea
            id="curator-prompt"
            className="curator-textarea"
            placeholder={`e.g. "A 7-day honeymoon in Santorini and Mykonos for 2, sunset dinners, private villa, around ₹3 lakhs…"`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCurate(); }}
            rows={3}
            disabled={isActive}
            aria-label="Describe your dream trip"
          />
          <div className="curator-actions">
            {isActive ? (
              <button className="btn btn-ghost curator-cancel" onClick={handleCancel}>
                <i className="fa-solid fa-stop" aria-hidden="true" /> Cancel
              </button>
            ) : (
              <button
                id="curator-submit"
                className="btn btn-primary"
                onClick={handleCurate}
                disabled={!prompt.trim()}
              >
                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
                Curate my itinerary
              </button>
            )}
            <span className="curator-hint">⌘↵ to generate</span>
          </div>

          {/* Suggestion Chips */}
          {status === 'idle' && !result && (
            <div className="curator-suggestions" role="list">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => { setPrompt(s.replace(/^[\S]+\s/, '')); setResult(''); }}
                  role="listitem"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading Orb */}
        {status === 'loading' && (
          <div className="curator-loading" aria-live="polite" aria-label="Generating itinerary">
            <div className="curator-orb-ring">
              <div className="curator-orb" aria-hidden="true" />
            </div>
            <p className="loading-phrase">{phrase}</p>
          </div>
        )}

        {/* Streaming / Done Output */}
        {(status === 'streaming' || status === 'done' || (status === 'error' && result)) && result && (
          <div className="curator-output reveal" aria-live="polite">
            <div className="curator-output-header">
              <i className="fa-solid fa-sparkles" aria-hidden="true" />
              <span>Your bespoke itinerary draft</span>
              {status === 'streaming' && (
                <span className="streaming-badge">
                  <span className="streaming-dot" aria-hidden="true" />
                  Live
                </span>
              )}
            </div>
            <div className="curator-result">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            {status === 'done' && (
              <div className="curator-cta-footer">
                <p>Love this draft? Let our human experts refine and book every detail.</p>
                <a
                  href={`https://wa.me/919780091116?text=${encodeURIComponent('Hi! I used the AI Curator and got this itinerary draft:\n\n' + result.slice(0, 500) + '...\n\nCan you help me plan this?')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  id="curator-wa-cta"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                  Send to my travel curator
                </a>
                <button className="btn btn-ghost" onClick={handleReset}>
                  Start over
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error (no result) */}
        {status === 'error' && !result && (
          <p className="curator-error">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" /> Something went wrong.{' '}
            <a href="https://wa.me/919780091116" target="_blank" rel="noreferrer">WhatsApp us</a>{' '}
            directly and we'll curate your trip personally.
          </p>
        )}

      </div>
    </section>
  );
}
