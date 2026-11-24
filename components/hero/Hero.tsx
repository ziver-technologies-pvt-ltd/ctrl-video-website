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
  // Use server detected OS directly
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
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <ShaderGround />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center space-y-8 z-10">
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#1E1F24]/90 border border-[#27272A] text-xs font-mono text-[#D4D4D8] shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span>100% Local Processing · No Cloud Queues</span>
          <span className="text-[#71717A]">|</span>
          <span className="text-[#F59E0B] font-semibold">{release.version} Released</span>
        </div>

        {/* H1 & Lead */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            The keyboard-driven media studio for your desktop.
          </h1>
          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Extract, inspect, and frame-accurately trim video and audio directly on your machine.
            Powered by bundled <strong className="text-white font-medium">yt-dlp</strong>, <strong className="text-white font-medium">ffmpeg</strong>, and <strong className="text-white font-medium">libmpv</strong>.
            Zero ads, zero telemetry, no cloud middleman.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={getPrimaryDownloadUrl()}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-[#F59E0B] text-black font-semibold text-sm hover:bg-[#D97706] transition-all btn-press shadow-lg shadow-[#F59E0B]/25 hover-lift"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            <span>
              Download for {detectedOS !== 'unknown' ? OS_LABELS[detectedOS] : 'Your OS'}
              {detectedOS !== 'unknown' && OS_PRIMARY_EXT[detectedOS] && (
                <span className="font-mono text-xs opacity-80 ml-1">({OS_PRIMARY_EXT[detectedOS]})</span>
              )}
            </span>
            {assetSize && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-black">
                {assetSize} MB
              </span>
            )}
          </a>

          <Link
            href="/download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1E1F24] border border-[#27272A] text-sm font-medium text-white hover:border-[#3F3F46] hover:bg-[#282A2F] transition-all hover-lift"
          >
            <span>All Platforms & Packages</span>
            <span className="text-[#71717A]">→</span>
          </Link>
        </div>

        {/* Keyboard Quick Guide */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#71717A] pt-1">
          <span>Shortcuts:</span>
          <span><span className="keycap">Space</span> Play/Pause</span>
          <span><span className="keycap">I</span> In Point</span>
          <span><span className="keycap">O</span> Out Point</span>
          <span><span className="keycap">Ctrl</span>+<span className="keycap">K</span> Command Palette</span>
        </div>

        {/* Tactile Live App UI Frame */}
        <div className="w-full pt-4">
          <AppFrame />
        </div>
      </div>
    </section>
  );
}
