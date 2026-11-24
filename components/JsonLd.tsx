import { ReleaseData } from '@/lib/github';

export function SoftwareJsonLd({ release }: { release: ReleaseData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ctrl+video',
    alternateName: 'ctrl video',
    description:
      'Professional desktop media downloader and frame-accurate clip trimming studio powered by yt-dlp, ffmpeg, and libmpv.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Linux, macOS, Windows',
    softwareVersion: release.version,
    releaseNotes: release.releasePageUrl,
    license: 'https://opensource.org/licenses/MIT',
    url: 'https://ctrl-video.ziver.co.in',
    downloadUrl: [
      release.linux.primaryUrl,
      release.macos.primaryUrl,
      release.windows.primaryUrl,
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Ziver Technologies Pvt Ltd',
      url: 'https://ziver.co.in',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
