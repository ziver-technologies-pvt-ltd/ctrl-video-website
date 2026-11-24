'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShaderGround } from './ShaderGround';
import { AppFrame } from './AppFrame';
import { OS_LABELS, OS, OS_PRIMARY_EXT } from '@/lib/detectOS';
import { ReleaseData } from '@/lib/github';

interface HeroProps {
  release: ReleaseData;
  initialOS?: OS;
}

export function Hero({ release, initialOS = 'unknown' }: HeroProps) {
  const [detectedOS] = useState<OS>(initialOS);

  const getPrimaryDownloadUrl = () => {
    if (detectedOS === 'linux') return release.linux.primaryUrl;
    if (detectedOS === 'macos') return release.macos.primaryUrl;
    if (detectedOS === 'windows') return release.windows.primaryUrl;
    return '/download';
  };

  const getPrimaryAssetSize = () => {
    if (detectedOS === 'linux' && release.linux.primary) return (release.linux.primary.size / 1048576).toFixed(1);
    if (detectedOS === 'macos' && release.macos.primary) return (release.macos.primary.size / 1048576).toFixed(1);
    if (detectedOS === 'windows' && release.windows.primary) return (release.windows.primary.size / 1048576).toFixed(1);
    return null;
  };

  const assetSize = getPrimaryAssetSize();

  return (
    <section
      data-enter
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden md3-motion-emphasized"
    >
      <ShaderGround />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center space-y-8 z-10">
        {/* MD3 Assist Chip with State Layer */}
        <div className="md3-chip rounded-full px-4 py-1.5 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <span className="text-[#EBEBF0]">100% Local Processing · Zero Cloud Queues</span>
          <span className="text-[#4A4B56]">|</span>
          <span className="text-[#F59E0B] font-semibold">{release.version} Released</span>
        </div>

        {/* H1 (MD3 Display Medium) */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#EBEBF0] leading-[1.1]">
            The keyboard-driven media studio for your desktop.
          </h1>
          <p className="text-base sm:text-lg text-[#9EA0AB] max-w-2xl mx-auto leading-relaxed">
            Extract, inspect, and frame-accurately trim video and audio directly on your machine.
            Built with <strong className="text-white font-medium">yt-dlp</strong>, <strong className="text-white font-medium">ffmpeg</strong>, and <strong className="text-white font-medium">libmpv</strong> using Google&apos;s Material Design 3.
          </p>
        </div>

        {/* MD3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={getPrimaryDownloadUrl()}
            download
            className="md3-btn-filled w-full sm:w-auto px-7 py-3.5 text-sm gap-2.5 shadow-lg shadow-[#F59E0B]/20"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            <span>
              Download for {detectedOS !== 'unknown' ? OS_LABELS[detectedOS] : 'Your OS'}
              {detectedOS !== 'unknown' && OS_PRIMARY_EXT[detectedOS] && (
                <span className="font-mono text-xs opacity-85 ml-1">({OS_PRIMARY_EXT[detectedOS]})</span>
              )}
            </span>
            {assetSize && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-black font-semibold">
                {assetSize} MB
              </span>
            )}
          </a>

          <Link
            href="/download"
            className="md3-btn-outlined w-full sm:w-auto px-6 py-3.5 text-sm gap-2"
          >
            <span>All Packages & Checksums</span>
            <span className="text-[#9EA0AB]">→</span>
          </Link>
        </div>

        {/* Tactile Keycap Hints */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#9EA0AB] pt-1">
          <span>Shortcuts:</span>
          <span><span className="keycap">Space</span> Play/Pause</span>
          <span><span className="keycap">I</span> Set In</span>
          <span><span className="keycap">O</span> Set Out</span>
          <span><span className="keycap">Ctrl</span>+<span className="keycap">K</span> Palette</span>
        </div>

        {/* Two-Pane Studio Frame */}
        <div className="w-full pt-4">
          <AppFrame />
        </div>
      </div>
    </section>
  );
}
