'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'preview',
      badge: 'libmpv Integration',
      title: 'In-App Low Bandwidth Stream Preview',
      desc: 'Preview video manifests before committing local storage or network data. ctrl+video binds directly to libmpv C APIs to stream directly into the workspace canvas without downloading intermediate chunks.',
      shortcut: 'Space · ← 5s · → 5s',
      detailList: [
        'Hardware accelerated OpenGL/Vulkan rendering on Linux, macOS, and Windows',
        'Direct DASH / HLS stream parsing with zero disk cache overhead',
        'Low RAM footprint via native desktop bindings',
      ],
    },
    {
      id: 'trimmer',
      badge: 'Frame-Accurate Cuts',
      title: 'Sub-Second Visual Timeline Trimmer',
      desc: 'Never download a 2-hour recording just to grab a 10-second reference clip. Scrub to the exact keyframe, tap [I] and [O], and extract only the selected time range directly.',
      shortcut: 'I: In Point · O: Out Point',
      detailList: [
        'Exact Mode: re-encodes cut boundaries for millisecond precision cuts',
        'Fast Mode: stream-copy cut at nearest keyframe with zero quality loss',
        'Direct slice download via yt-dlp --download-sections',
      ],
    },
    {
      id: 'codecs',
      badge: 'Granular Stream Control',
      title: 'AV1, VP9, HDR, and Lossless Audio',
      desc: 'Web converters downgrade formats and limit output to 720p. ctrl+video exposes every raw stream published upstream, giving you full control over codecs and containers.',
      shortcut: 'Bitrate · FPS · Dynamic Range',
      detailList: [
        'AV1, VP9, and H.264 video streams up to 8K HDR10',
        'Lossless FLAC, native Opus, and 320kbps MP3 audio extraction',
        'Lossless container remuxing: MP4, MKV, and WebM',
      ],
    },
    {
      id: 'keyboard',
      badge: 'Power User UX',
      title: 'Tactile Keyboard-First Command Palette',
      desc: 'Execute every command at terminal speed. Hit Ctrl+K to paste links, jump to formats, switch presets, or trigger self-healing updates without reaching for the mouse.',
      shortcut: 'Ctrl + K / Cmd + K',
      detailList: [
        'Fuzzy search across active downloads, stream history, and actions',
        'Two-pane viewport fitted layout with zero unnecessary scrolling',
        'Local SQLite audit log with one-click output folder open',
      ],
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
          Engineered for Precision
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EBEBF0] tracking-tight">
          Every tool you need. Zero compromises.
        </h2>
        <p className="text-sm sm:text-base text-[#9EA0AB]">
          Built for video editors, content creators, researchers, and archivists who demand surgical media extraction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: MD3 Segmented Feature Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {features.map((f, i) => (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setActiveTab(i)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-[12px] border transition-all relative overflow-hidden ${
                activeTab === i
                  ? 'bg-[#22222A] border-[#F59E0B] shadow-lg shadow-[#F59E0B]/10 ring-1 ring-[#F59E0B]/30'
                  : 'bg-[#17171C] border-[#2E2E38] hover:border-[#4A4B56]'
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="activeFeatureBar"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className="flex items-center justify-between mb-1.5 pl-2">
                <span className="text-[11px] font-mono text-[#F59E0B] font-semibold">
                  {f.badge}
                </span>
                <span className="text-[10px] font-mono text-[#9EA0AB] bg-[#2E2E38] px-2 py-0.5 rounded-full">
                  {f.shortcut}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#EBEBF0] mb-1 pl-2">
                {f.title}
              </h3>
              <p className="text-xs text-[#9EA0AB] line-clamp-2 pl-2">
                {f.desc}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Right: Active Feature Deep-Dive Card (7 cols) */}
        <div className="lg:col-span-7 bg-[#17171C] border border-[#2E2E38] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between min-h-[420px] shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#2E2E38] pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                    Feature Deep Dive
                  </span>
                  <h3 className="text-xl font-bold text-[#EBEBF0] mt-1">
                    {current.title}
                  </h3>
                </div>
                <span className="keycap text-xs">
                  {current.shortcut}
                </span>
              </div>

              <p className="text-sm text-[#EBEBF0] leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9EA0AB] block">
                  Technical Highlights
                </span>
                <ul className="space-y-2.5">
                  {current.detailList.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.08 }}
                      className="flex items-start gap-2.5 text-xs text-[#9EA0AB]"
                    >
                      <span className="text-[#10B981] mt-0.5 font-bold">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-4 border-t border-[#2E2E38] flex items-center justify-between text-xs font-mono text-[#9EA0AB]">
            <span>Material Design 3 Architecture</span>
            <span className="text-[#F59E0B] font-semibold">yt-dlp Core v2026.11</span>
          </div>
        </div>
      </div>
    </section>
  );
}
