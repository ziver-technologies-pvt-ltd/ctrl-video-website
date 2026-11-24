import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav/Nav';
import { Footer } from '@/components/footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ctrl-video.ziver.co.in'),
  title: {
    default: 'ctrl+video — The Keyboard-Driven Desktop Media Studio',
    template: '%s · ctrl+video',
  },
  description:
    'Professional desktop media extraction and frame-accurate clip trimming. 100% local, ad-free, and powered by yt-dlp, ffmpeg, and libmpv. Available for Linux, macOS, and Windows.',
  keywords: [
    'video downloader',
    'yt-dlp GUI',
    'desktop media studio',
    'clip trimmer',
    'frame accurate trim',
    'libmpv video preview',
    'ffmpeg cutter',
    'open source video downloader',
    'ctrl video',
    'ziver technologies',
  ],
  authors: [{ name: 'Ziver Technologies Pvt Ltd', url: 'https://ziver.co.in' }],
  creator: 'Ziver Technologies',
  publisher: 'Ziver Technologies Pvt Ltd',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrl-video.ziver.co.in',
    siteName: 'ctrl+video',
    title: 'ctrl+video — The Keyboard-Driven Desktop Media Studio',
    description:
      'Extract, inspect, and frame-accurately trim video and audio locally with sub-second precision. Zero tracking, zero telemetry, no cloud queue.',
    images: [
      {
        url: '/logo.png',
        width: 860,
        height: 860,
        alt: 'ctrl+video Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ctrl+video — Desktop Media Studio',
    description:
      'Frame-accurate clip trimming and local video extraction powered by yt-dlp and libmpv.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-type="software"
      data-radius="sharp"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        <meta name="theme-color" content="#0E0E11" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0E0E11] text-[#F4F4F5] selection:bg-[#F59E0B]/30 selection:text-white">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
