import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/ui/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import { SITE_URL, defaultMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-loaded',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald-loaded',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fortius Esports | Fight. Dominate. Win.',
    template: '%s | Fortius Esports',
  },
  description: defaultMetadata.description,
  keywords: defaultMetadata.keywords,
  authors: defaultMetadata.authors,
  creator: defaultMetadata.creator,
  publisher: defaultMetadata.publisher,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Fortius Esports',
    title: 'Fortius Esports | Fight. Dominate. Win.',
    description: defaultMetadata.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Fortius Esports — Fight. Dominate. Win.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FortiusEsports',
    creator: '@FortiusEsports',
    title: 'Fortius Esports | Fight. Dominate. Win.',
    description: defaultMetadata.description,
    images: ['/twitter-image'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  themeColor: '#9b00e8',
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Fortius Esports',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
      sameAs: [
        'https://twitter.com/FortiusEsports',
        'https://instagram.com/FortiusEsports',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Fortius Esports',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-white selection:text-black relative">
        {/* Film grain overlay */}
        <div className="fixed inset-0 z-[8000] pointer-events-none opacity-[0.25] mix-blend-overlay hd-grain" />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
