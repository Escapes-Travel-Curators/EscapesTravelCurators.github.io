import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Escapes Travel Curators | Premium Custom Travel';
const DEFAULT_DESC = 'Handcrafted luxury travel experiences. Expert-curated destinations, bespoke itineraries, and seamless service from first idea to final landing.';
const DEFAULT_KEYWORDS = 'luxury travel, custom holidays, bespoke itineraries, visa assistance, honeymoon travel, premium travel agency India, travel curators';
const BASE_URL = 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/travel4.jpg`;

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = BASE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
}) {
  const currentTitle = title === DEFAULT_TITLE ? title : `${title} | Escapes Travel Curators`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Escapes Travel Curators" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Dynamic Link Preloads for Performance: Above-The-Fold Assets */}
      <link
        rel="preload"
        as="image"
        href="/EscapesTravelCurators.github.io/assets/images/travel4.jpg"
        fetchpriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/EscapesTravelCurators.github.io/assets/images/travel5.jpg"
      />
      <link
        rel="preload"
        as="image"
        href="/EscapesTravelCurators.github.io/assets/images/travel6.jpg"
      />
      <link
        rel="preload"
        as="image"
        href="/EscapesTravelCurators.github.io/assets/logo with etc.jpg"
        fetchpriority="high"
      />
    </Helmet>
  );
}
