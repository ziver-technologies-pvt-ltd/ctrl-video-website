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
    <div className="w-full rounded-[16px] border border-[#2E2E38] bg-[#17171C] shadow-2xl shadow-black/80 overflow-hidden font-sans text-xs">
      {/* MD3 Desktop Title Bar (Window Controls + System Status) */}
      <div className="h-10 bg-[#17171C] border-b border-[#2E2E38] px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/90" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/90" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]/90" />
          <span className="ml-3 font-mono text-[11px] text-[#EBEBF0] font-medium tracking-tight">
            ctrl+video · Flutter MD3 Native Workspace
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#9EA0AB]">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22222A] text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> yt-dlp Engine Ready
          </span>
          <span>·</span>
          <span>libmpv v0.38</span>
        </div>
      </div>

      {/* Two-Pane Workspace Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Pane: Stream Inspector (5 cols) - Surface Level 1 */}
        <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-[#2E2E38] flex flex-col justify-between bg-[#17171C]">
          <div className="space-y-4">
            {/* MD3 Text Field Container */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#9EA0AB] tracking-wider mb-1.5 block">
                Source Stream URL
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#22222A] border border-[#4A4B56] rounded-[10px] font-mono text-[11px] text-[#EBEBF0] focus-within:border-[#F59E0B] focus-within:ring-1 focus-within:ring-[#F59E0B] transition-all">
                <span className="text-[#F59E0B] font-bold">❯</span>
                <span className="truncate text-[#EBEBF0]">
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                </span>
                <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-[#17171C] text-[#10B981] font-semibold">
                  200 OK
                </span>
              </div>
            </div>

            {/* MD3 Segmented Button for Media Mode */}
            <div className="flex items-center justify-between border-b border-[#2E2E38] pb-3">
              <div className="inline-flex rounded-full bg-[#22222A] p-0.5 border border-[#2E2E38]">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all ${
                    activeTab === 'video'
                      ? 'bg-[#EBEBF0] text-[#0F0F12] font-semibold shadow-sm'
                      : 'text-[#9EA0AB] hover:text-[#EBEBF0]'
                  }`}
                >
                  Video + Audio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all ${
                    activeTab === 'audio'
                      ? 'bg-[#EBEBF0] text-[#0F0F12] font-semibold shadow-sm'
                      : 'text-[#9EA0AB] hover:text-[#EBEBF0]'
                  }`}
                >
                  Audio Extraction
                </button>
              </div>
              <span className="text-[10px] text-[#9EA0AB] font-mono">
                {activeTab === 'video' ? '4 Streams' : '3 Tracks'}
              </span>
            </div>

            {/* Stream List (MD3 Outlined Cards - 10px Radius) */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {activeTab === 'video'
                ? videoStreams.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedFormat(s.id)}
                      className={`p-3 rounded-[10px] cursor-pointer border transition-all flex items-center justify-between ${
                        selectedFormat === s.id
                          ? 'bg-[#2E2E38] border-[#F59E0B] ring-1 ring-[#F59E0B]/30'
                          : 'bg-[#22222A] border-[#2E2E38] hover:border-[#4A4B56]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="format"
                          checked={selectedFormat === s.id}
                          onChange={() => setSelectedFormat(s.id)}
                          className="accent-[#F59E0B] w-3.5 h-3.5"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#EBEBF0] font-semibold">
                            <span>{s.res}</span>
                            <span className="text-[#9EA0AB]">({s.fps})</span>
                            {s.hdr && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#451A03] text-[#FDE68A] font-bold">
                                HDR
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#9EA0AB] font-mono">
                            {s.codec} · {s.bitrate}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-[#EBEBF0] font-medium">{s.size}</span>
                    </div>
                  ))
                : audioStreams.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedFormat(a.id)}
                      className={`p-3 rounded-[10px] cursor-pointer border transition-all flex items-center justify-between ${
                        selectedFormat === a.id
                          ? 'bg-[#2E2E38] border-[#F59E0B] ring-1 ring-[#F59E0B]/30'
                          : 'bg-[#22222A] border-[#2E2E38] hover:border-[#4A4B56]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="format"
                          checked={selectedFormat === a.id}
                          onChange={() => setSelectedFormat(a.id)}
                          className="accent-[#F59E0B] w-3.5 h-3.5"
                        />
                        <div>
                          <div className="font-mono text-[11px] text-[#EBEBF0] font-semibold">
                            {a.codec}
                          </div>
                          <span className="text-[10px] text-[#9EA0AB] font-mono">
                            {a.bitrate}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-[#EBEBF0] font-medium">{a.size}</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-[#2E2E38] mt-2 flex items-center justify-between">
            <span className="text-[10px] text-[#9EA0AB] font-mono">
              Container: <strong className="text-white">MP4 / MKV</strong>
            </span>
            <button
              type="button"
              className="md3-btn-filled px-4 py-2 text-xs gap-1.5 shadow-md"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              <span>Extract Stream</span>
            </button>
          </div>
        </div>

        {/* Right Pane: Video Preview & Scrubber (7 cols) - Surface Level 0 */}
        <div className="lg:col-span-7 p-4 flex flex-col justify-between bg-[#0F0F12]">
          {/* libmpv Player Canvas */}
          <div className="relative aspect-video w-full rounded-[12px] bg-[#0A0A0D] border border-[#2E2E38] overflow-hidden flex flex-col items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F0F12] via-[#17171C] to-[#22222A] opacity-80" />

            <div className="relative z-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#22222A] border border-[#4A4B56] flex items-center justify-center mx-auto text-[#F59E0B] shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-mono text-[11px] text-[#EBEBF0]">
                Hardware Accelerated libmpv Stream
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#17171C] border border-[#2E2E38] font-mono text-[10px] text-[#10B981]">
                <span>● Direct Stream Manifest</span>
                <span>·</span>
                <span>Sub-second Keyframe Seek</span>
              </div>
            </div>

            {/* Timestamp Badge */}
            <div className="absolute bottom-3 right-3 font-mono text-[11px] text-white bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
              00:01:42.500 / 00:03:32.000
            </div>
          </div>

          {/* Precision Timeline Scrubber */}
          <div className="mt-4 space-y-2.5 pt-2 border-t border-[#2E2E38]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#EBEBF0]">
                  Timeline Trimmer
                </span>
                <span className="text-[10px] text-[#9EA0AB] font-mono">
                  Press <span className="keycap text-[9px]">I</span> In · <span className="keycap text-[9px]">O</span> Out
                </span>
              </div>

              {/* Exact vs Fast Mode (MD3 Pill Toggle) */}
              <div className="flex items-center gap-1 bg-[#17171C] p-0.5 rounded-full border border-[#2E2E38]">
                <button
                  type="button"
                  onClick={() => setTrimMode('exact')}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                    trimMode === 'exact'
                      ? 'bg-[#F59E0B] text-black font-semibold'
                      : 'text-[#9EA0AB] hover:text-white'
                  }`}
                >
                  Exact (Frame-Accurate)
                </button>
                <button
                  type="button"
                  onClick={() => setTrimMode('fast')}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                    trimMode === 'fast'
                      ? 'bg-[#F59E0B] text-black font-semibold'
                      : 'text-[#9EA0AB] hover:text-white'
                  }`}
                >
                  Fast (Keyframe)
                </button>
              </div>
            </div>

            {/* Visual Scrubber Track */}
            <div className="relative h-8 bg-[#17171C] rounded-[8px] border border-[#2E2E38] overflow-hidden select-none">
              <div className="absolute inset-0 flex justify-between px-2 items-center opacity-25">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-4' : 'h-2'}`} />
                ))}
              </div>

              {/* Selected amber trimming slice (secondaryContainer) */}
              <div
                className="absolute top-0 bottom-0 bg-[#451A03]/60 border-x-2 border-[#F59E0B]"
                style={{ left: '25%', right: '30%' }}
              >
                <div className="absolute -top-0.5 -left-1.5 w-3.5 h-3.5 bg-[#F59E0B] rounded-sm flex items-center justify-center text-[7px] text-black font-bold shadow">
                  I
                </div>
                <div className="absolute -top-0.5 -right-1.5 w-3.5 h-3.5 bg-[#F59E0B] rounded-sm flex items-center justify-center text-[7px] text-black font-bold shadow">
                  O
                </div>
              </div>

              {/* Playhead */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md shadow-white/80"
                style={{ left: '48%' }}
              />
            </div>

            {/* Trimming Readings */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9EA0AB]">
              <div className="flex items-center gap-2">
                <span>IN: <strong className="text-white">00:01:14.250</strong></span>
                <span>OUT: <strong className="text-white">00:02:48.800</strong></span>
              </div>
              <div className="text-[#10B981] font-medium">
                Trimmed Size: 42 MB (Saved 88%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
