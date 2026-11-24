'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
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
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ShaderGround />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center space-y-8 z-10">
        {/* Animated MD3 Assist Chip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.05, 0.7, 0.1, 1.0] }}
          whileHover={{ scale: 1.05 }}
          className="md3-chip rounded-full px-4 py-1.5 shadow-md cursor-default"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          <span className="text-[#EBEBF0]">100% Local Processing · Zero Cloud Queues</span>
          <span className="text-[#4A4B56]">|</span>
          <span className="text-[#F59E0B] font-semibold">{release.version} Released</span>
        </motion.div>

        {/* Animated Headline & Subtitle */}
        <div className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.05, 0.7, 0.1, 1.0] }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#EBEBF0] leading-[1.1]"
          >
            The keyboard-driven media studio for your desktop.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.05, 0.7, 0.1, 1.0] }}
            className="text-base sm:text-lg text-[#9EA0AB] max-w-2xl mx-auto leading-relaxed"
          >
            Extract, inspect, and frame-accurately trim video and audio directly on your machine.
            Built with <strong className="text-white font-medium">yt-dlp</strong>, <strong className="text-white font-medium">ffmpeg</strong>, and <strong className="text-white font-medium">libmpv</strong> using Google&apos;s Material Design 3.
          </motion.p>
        </div>

        {/* Animated Action Buttons with Pulse & Hover Dynamics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.05, 0.7, 0.1, 1.0] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.a
            whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)' }}
            whileTap={{ scale: 0.97 }}
            href={getPrimaryDownloadUrl()}
            download
            className="md3-btn-filled w-full sm:w-auto px-7 py-3.5 text-sm gap-2.5 shadow-lg shadow-[#F59E0B]/20 relative overflow-hidden group"
          >
            {/* Shimmer light effect across the CTA */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

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
          </motion.a>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/download"
              className="md3-btn-outlined w-full sm:w-auto px-6 py-3.5 text-sm gap-2 block"
            >
              <span>All Packages & Checksums</span>
              <span className="text-[#9EA0AB]">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Keyboard Quick Guide with hover bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#9EA0AB] pt-1"
        >
          <span>Shortcuts:</span>
          <span className="hover:text-white transition-colors"><span className="keycap">Space</span> Play/Pause</span>
          <span className="hover:text-white transition-colors"><span className="keycap">I</span> Set In</span>
          <span className="hover:text-white transition-colors"><span className="keycap">O</span> Set Out</span>
          <span className="hover:text-white transition-colors"><span className="keycap">Ctrl</span>+<span className="keycap">K</span> Palette</span>
        </motion.div>

        {/* Interactive App Workspace Frame with subtle float */}
        <div className="w-full pt-4">
          <AppFrame />
        </div>
      </div>
    </section>
  );
}
