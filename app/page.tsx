import { getLatestRelease } from '@/lib/github';
import { Hero } from '@/components/hero/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Features } from '@/components/sections/Features';
import { Architecture } from '@/components/sections/Architecture';
import { Comparison } from '@/components/sections/Comparison';
import { TypeMoment } from '@/components/sections/TypeMoment';
import { DownloadMatrix } from '@/components/sections/DownloadMatrix';
import { FAQ } from '@/components/sections/FAQ';
import { SoftwareJsonLd } from '@/components/JsonLd';

export default async function HomePage() {
  const release = await getLatestRelease();

  return (
    <>
      <SoftwareJsonLd release={release} />
      <Hero release={release} initialOS="linux" />
      <TrustBar />
      <Features />
      <Architecture />
      <Comparison />
      <TypeMoment />
      <DownloadMatrix release={release} detectedOS="linux" />
      <FAQ />
    </>
  );
}
