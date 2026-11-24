'use client';

import { useState } from 'react';

export function AppFrame() {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [selectedFormat, setSelectedFormat] = useState('f399');
  const [trimMode, setTrimMode] = useState<'exact' | 'fast'>('exact');

  const videoStreams = [
    { id: 'f399', res: '1080p60', fps: '60fps', codec: 'AV1', bitrate: '4.8 Mbps', size: '94 MB', hdr: false },
    { id: 'f313', res: '2160p', fps: '30fps', codec: 'VP9', bitrate: '18.2 Mbps', size: '360 MB', hdr: true },
    { id: 'f137', res: '1080p', fps: '30fps', codec: 'H.264', bitrate: '3.9 Mbps', size: '78 MB', hdr: false },
    { id: 'f136', res: '720p60', fps: '60fps', codec: 'H.264', bitrate: '2.4 Mbps', size: '48 MB', hdr: false },
  ];

  const audioStreams = [
    { id: 'f251', codec: 'Opus', bitrate: '160 kbps', size: '3.2 MB', ext: 'opus' },
    { id: 'f140', codec: 'AAC (M4A)', bitrate: '128 kbps', size: '2.8 MB', ext: 'm4a' },
    { id: 'flac', codec: 'FLAC (Lossless)', bitrate: 'VBR', size: '18.4 MB', ext: 'flac' },
  ];

  return (
    <div className="w-full rounded-xl border border-[#27272A] bg-[#131316] shadow-2xl shadow-black/80 overflow-hidden font-sans text-xs">
      {/* Title Bar */}
      <div className="h-9 bg-[#18191E] border-b border-[#27272A] px-3.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/80" />
          <span className="ml-2 font-mono text-[11px] text-[#A1A1AA]">
            ctrl+video — Interactive Studio Workspace
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#71717A]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> yt-dlp 2026.11 (local)
          </span>
          <span>·</span>
          <span>libmpv 0.38</span>
        </div>
      </div>

      {/* Two-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Pane: Stream Inspector & Format Picker (5 cols) */}
        <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-[#27272A] flex flex-col justify-between bg-[#111215]">
          <div className="space-y-3.5">
            {/* URL Input Bar */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider mb-1 block">
                Target URL / Stream Source
              </label>
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#18191E] border border-[#27272A] rounded font-mono text-[11px] text-[#F4F4F5]">
                <span className="text-[#F59E0B] font-bold">❯</span>
                <span className="truncate text-[#D4D4D8]">
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                </span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-[#27272A] text-[#22C55E]">
                  200 OK
                </span>
              </div>
            </div>

            {/* Media Mode Toggle Tabs */}
            <div className="flex items-center justify-between border-b border-[#22242B] pb-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                    activeTab === 'video'
                      ? 'bg-[#1E1F24] text-white border border-[#32353B]'
                      : 'text-[#71717A] hover:text-[#D4D4D8]'
                  }`}
                >
                  Video + Audio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors ${
                    activeTab === 'audio'
                      ? 'bg-[#1E1F24] text-white border border-[#32353B]'
                      : 'text-[#71717A] hover:text-[#D4D4D8]'
                  }`}
                >
                  Audio Only (Extract)
                </button>
              </div>
              <span className="text-[10px] text-[#71717A] font-mono">
                {activeTab === 'video' ? '4 Streams' : '3 Tracks'}
              </span>
            </div>

            {/* Stream List */}
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {activeTab === 'video'
                ? videoStreams.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedFormat(s.id)}
                      className={`p-2.5 rounded cursor-pointer border transition-all flex items-center justify-between ${
                        selectedFormat === s.id
                          ? 'bg-[#1F2027] border-[#F59E0B]/50 ring-1 ring-[#F59E0B]/20'
                          : 'bg-[#16171C] border-[#22242B] hover:border-[#2F3138]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="format"
                          checked={selectedFormat === s.id}
                          onChange={() => setSelectedFormat(s.id)}
                          className="accent-[#F59E0B]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white font-medium">
                            <span>{s.res}</span>
                            <span className="text-[#A1A1AA]">({s.fps})</span>
                            {s.hdr && (
                              <span className="text-[9px] px-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
                                HDR
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#71717A] font-mono">
                            {s.codec} · {s.bitrate}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-[#D4D4D8]">{s.size}</span>
                    </div>
                  ))
                : audioStreams.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedFormat(a.id)}
                      className={`p-2.5 rounded cursor-pointer border transition-all flex items-center justify-between ${
                        selectedFormat === a.id
                          ? 'bg-[#1F2027] border-[#F59E0B]/50 ring-1 ring-[#F59E0B]/20'
                          : 'bg-[#16171C] border-[#22242B] hover:border-[#2F3138]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="format"
                          checked={selectedFormat === a.id}
                          onChange={() => setSelectedFormat(a.id)}
                          className="accent-[#F59E0B]"
                        />
                        <div>
                          <div className="font-mono text-[11px] text-white font-medium">
                            {a.codec}
                          </div>
                          <span className="text-[10px] text-[#71717A] font-mono">
                            {a.bitrate}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-[#D4D4D8]">{a.size}</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Download Action Footer in Left Pane */}
          <div className="pt-3 border-t border-[#22242B] mt-2 flex items-center justify-between">
            <span className="text-[10px] text-[#71717A] font-mono">
              Output: <span className="text-white">MP4 / MKV</span>
            </span>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded bg-[#F59E0B] text-black font-semibold text-xs hover:bg-[#D97706] transition-all btn-press flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              <span>Extract Selected</span>
            </button>
          </div>
        </div>

        {/* Right Pane: Video Preview & Precision Timeline Trimmer (7 cols) */}
        <div className="lg:col-span-7 p-4 flex flex-col justify-between bg-[#0F1013]">
          {/* libmpv Player Canvas Mockup */}
          <div className="relative aspect-video w-full rounded-lg bg-[#08080A] border border-[#22242B] overflow-hidden flex flex-col items-center justify-center group">
            {/* Video stream content representation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#16171F] to-[#252836] opacity-75" />

            <div className="relative z-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#1E1F24]/90 border border-white/10 flex items-center justify-center mx-auto text-[#F59E0B] shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-mono text-[11px] text-[#A1A1AA]">
                Low-bandwidth libmpv Preview Active
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-[#22C55E]">
                <span>● Stream Copy Preview</span>
                <span>·</span>
                <span>0.8 Mbps buffer</span>
              </div>
            </div>

            {/* Timestamp Badge */}
            <div className="absolute bottom-2.5 right-3 font-mono text-[11px] text-white bg-black/80 px-2 py-0.5 rounded border border-white/10">
              00:01:42.500 / 00:03:32.000
            </div>
          </div>

          {/* Frame-Accurate Timeline Trimmer */}
          <div className="mt-3.5 space-y-2.5 pt-2 border-t border-[#22242B]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-white">
                  Timeline Trimmer
                </span>
                <span className="text-[10px] text-[#71717A] font-mono">
                  Press <span className="keycap text-[9px]">I</span> for In · <span className="keycap text-[9px]">O</span> for Out
                </span>
              </div>

              {/* Exact vs Fast Mode */}
              <div className="flex items-center gap-1 bg-[#18191E] p-0.5 rounded border border-[#27272A]">
                <button
                  type="button"
                  onClick={() => setTrimMode('exact')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    trimMode === 'exact'
                      ? 'bg-[#F59E0B] text-black font-semibold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                  title="Re-encodes boundary cut frames for millisecond exactness"
                >
                  Exact (Frame-Accurate)
                </button>
                <button
                  type="button"
                  onClick={() => setTrimMode('fast')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    trimMode === 'fast'
                      ? 'bg-[#F59E0B] text-black font-semibold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                  title="Instant stream copy cut at nearest keyframe"
                >
                  Fast (Keyframe)
                </button>
              </div>
            </div>

            {/* Interactive Visual Scrubber Track */}
            <div className="relative h-7 bg-[#18191E] rounded border border-[#27272A] overflow-hidden select-none">
              {/* Entire timeline background wave/ticks */}
              <div className="absolute inset-0 flex justify-between px-2 items-center opacity-30">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-3.5' : 'h-1.5'}`} />
                ))}
              </div>

              {/* Selected trimmed region (from 28% to 75%) */}
              <div
                className="absolute top-0 bottom-0 bg-[#F59E0B]/25 border-x-2 border-[#F59E0B]"
                style={{ left: '28%', right: '25%' }}
              >
                <div className="absolute -top-0.5 -left-1.5 w-3 h-3 bg-[#F59E0B] rounded-sm flex items-center justify-center text-[7px] text-black font-bold">
                  I
                </div>
                <div className="absolute -top-0.5 -right-1.5 w-3 h-3 bg-[#F59E0B] rounded-sm flex items-center justify-center text-[7px] text-black font-bold">
                  O
                </div>
              </div>

              {/* Current Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md shadow-white/50"
                style={{ left: '46%' }}
              />
            </div>

            {/* Trimming Meta Readings */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <span>IN: <strong className="text-white">00:01:14.250</strong></span>
                <span>OUT: <strong className="text-white">00:02:48.800</strong></span>
              </div>
              <div className="text-[#22C55E]">
                Duration: <strong>01:34.550</strong> (Only 42 MB to download)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
