'use client';

import { useState } from 'react';

export function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'preview',
      badge: 'libmpv Integration',
      title: 'In-App Low Bandwidth Stream Preview',
      desc: 'Preview video before committing bandwidth. ctrl+video hooks directly into libmpv to stream manifests instantly without caching large temporary files on your disk.',
      shortcut: 'Space · ← 5s · → 5s',
      detailList: [
        'HLS / DASH manifest stream preview',
        'Hardware-accelerated rendering on Linux, macOS, and Windows',
        'Low memory footprint via native C API bindings',
      ],
    },
    {
      id: 'trimmer',
      badge: 'Frame-Accurate Cuts',
      title: 'Sub-Second Visual Timeline Trimmer',
      desc: 'Stop downloading multi-gigabyte vods just to grab a 15-second soundbite. Scrub to exact frames, tap [I] and [O], and extract only the required slice directly.',
      shortcut: 'I: In Point · O: Out Point',
      detailList: [
        'Exact Mode: re-encodes cut boundaries for millisecond precision',
        'Fast Mode: stream-copy cut at nearest keyframe with zero quality loss',
        'Direct download slice via yt-dlp --download-sections',
      ],
    },
    {
      id: 'codecs',
      badge: 'Granular Stream Control',
      title: 'AV1, VP9, HDR, and Lossless Audio',
      desc: 'Web downloaders artificially lock you out of 4K, 60FPS, or raw codecs. ctrl+video exposes every raw video and audio track available on the upstream server.',
      shortcut: 'Bitrate · FPS · Dynamic Range',
      detailList: [
        'AV1, VP9, H.264 video streams up to 8K HDR',
        'Lossless FLAC, native Opus, and 320kbps MP3 extraction',
        'Container remuxing: MP4, MKV, and WebM',
      ],
    },
    {
      id: 'keyboard',
      badge: 'Power User UX',
      title: 'Keyboard-First Command Palette',
      desc: 'Work at full terminal speed with tactile desktop ergonomics. Hit Ctrl+K to paste links, jump to formats, switch presets, or configure sidecar engines without touching the mouse.',
      shortcut: 'Ctrl + K / Cmd + K',
      detailList: [
        'Global fuzzy search across actions and stream history',
        'Zero bloat, two-pane viewport fitted layout',
        'Persistent SQLite download log with one-click re-open',
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
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Every tool you need. Zero compromises.
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Designed specifically for digital creators, archivists, sound engineers, and power users who need surgical control over video assets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feature Tabs (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {features.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`w-full text-left p-4 rounded-lg border transition-all hover-lift ${
                activeTab === i
                  ? 'bg-[#18191E] border-[#F59E0B]/60 shadow-md shadow-[#F59E0B]/10'
                  : 'bg-[#131316] border-[#27272A] hover:border-[#383A42]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-[#F59E0B]">
                  {f.badge}
                </span>
                <span className="text-[10px] font-mono text-[#71717A] bg-[#1E1F24] px-1.5 py-0.5 rounded">
                  {f.shortcut}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2">
                {f.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Right Column: Live Showcase of Selected Feature (7 cols) */}
        <div className="lg:col-span-7 bg-[#131316] border border-[#27272A] rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#22242B] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                  Feature Deep Dive
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {current.title}
                </h3>
              </div>
              <span className="keycap text-xs">
                {current.shortcut}
              </span>
            </div>

            <p className="text-sm text-[#D4D4D8] leading-relaxed">
              {current.desc}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#71717A] block">
                Technical Highlights
              </span>
              <ul className="space-y-2">
                {current.detailList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A1A1AA]">
                    <span className="text-[#22C55E] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#22242B] flex items-center justify-between text-xs font-mono text-[#71717A]">
            <span>100% Native Desktop Processing</span>
            <span className="text-[#F59E0B]">yt-dlp core v2026.11</span>
          </div>
        </div>
      </div>
    </section>
  );
}
