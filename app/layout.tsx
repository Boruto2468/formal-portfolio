import type { Metadata } from 'next';
import './globals.css';
import './effects.css';
import './creative-mode.css';

export const metadata: Metadata = {
  title: 'Jotham Frank Arimoro — Developer Portfolio',
  description: 'Jotham Frank Arimoro is a frontend and full-stack developer building reliable, carefully designed web applications. Explore Yukoto, Northstar Academy, technical experience, and selected work.',
  openGraph: {
    title: 'Jotham Frank Arimoro — Frontend & Full-Stack Developer',
    description: 'Thoughtful interfaces, practical engineering, and working products.',
    type: 'website',
  },
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f5f0e7" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;550;600;650;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
