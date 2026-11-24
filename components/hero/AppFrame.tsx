'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AppFrame() {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [selectedFormat, setSelectedFormat] = useState('f399');
  const [trimMode, setTrimMode] = useState<'exact' | 'fast'>('exact');
  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadPos, setPlayheadPos] = useState(38); // percentage

  // Simulated live playback playhead animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos((prev) => {
        if (prev >= 68) return 26; // Loop within the active In/Out region (25% to 70%)
        return prev + 0.35;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.05, 0.7, 0.1, 1.0] }}
      className="w-full rounded-[16px] border border-[#2E2E38] bg-[#17171C] shadow-2xl shadow-black/80 overflow-hidden font-sans text-xs relative"
    >
      {/* Top Accent Glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent pointer-events-none" />

      {/* MD3 Desktop Title Bar */}
      <div className="h-10 bg-[#17171C] border-b border-[#2E2E38] px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-[#EF4444]/90 cursor-pointer" />
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-[#F59E0B]/90 cursor-pointer" />
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-[#10B981]/90 cursor-pointer" />
          <span className="ml-3 font-mono text-[11px] text-[#EBEBF0] font-medium tracking-tight">
            ctrl+video · Flutter MD3 Native Workspace
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#9EA0AB]">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22222A] text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" /> yt-dlp Engine Ready
          </span>
          <span>·</span>
          <span>libmpv v0.38</span>
        </div>
      </div>

      {/* Two-Pane Workspace Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Pane: Stream Inspector (5 cols) */}
        <div className="lg:col-span-5 p-4 border-b lg:border-b-0 lg:border-r border-[#2E2E38] flex flex-col justify-between bg-[#17171C]">
          <div className="space-y-4">
            {/* Input Container */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#9EA0AB] tracking-wider mb-1.5 block">
                Source Stream URL
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#22222A] border border-[#4A4B56] rounded-[10px] font-mono text-[11px] text-[#EBEBF0] focus-within:border-[#F59E0B] focus-within:ring-1 focus-within:ring-[#F59E0B] transition-all">
                <span className="text-[#F59E0B] font-bold animate-pulse">❯</span>
                <span className="truncate text-[#EBEBF0]">
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                </span>
                <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-[#17171C] text-[#10B981] font-semibold">
                  200 OK
                </span>
              </div>
            </div>

            {/* MD3 Segmented Button */}
            <div className="flex items-center justify-between border-b border-[#2E2E38] pb-3">
              <div className="inline-flex rounded-full bg-[#22222A] p-0.5 border border-[#2E2E38] relative">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all relative z-10 ${
                    activeTab === 'video'
                      ? 'text-[#0F0F12] font-semibold'
                      : 'text-[#9EA0AB] hover:text-[#EBEBF0]'
                  }`}
                >
                  {activeTab === 'video' && (
                    <motion.div
                      layoutId="segmentedIndicator"
                      className="absolute inset-0 bg-[#EBEBF0] rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  Video + Audio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('audio')}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all relative z-10 ${
                    activeTab === 'audio'
                      ? 'text-[#0F0F12] font-semibold'
                      : 'text-[#9EA0AB] hover:text-[#EBEBF0]'
                  }`}
                >
                  {activeTab === 'audio' && (
                    <motion.div
                      layoutId="segmentedIndicator"
                      className="absolute inset-0 bg-[#EBEBF0] rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  Audio Extraction
                </button>
              </div>
              <span className="text-[10px] text-[#9EA0AB] font-mono">
                {activeTab === 'video' ? '4 Streams' : '3 Tracks'}
              </span>
            </div>

            {/* Stream List with AnimatePresence */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                {activeTab === 'video' ? (
                  <motion.div
                    key="video-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {videoStreams.map((s) => (
                      <motion.div
                        key={s.id}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.99 }}
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
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="audio-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {audioStreams.map((a) => (
                      <motion.div
                        key={a.id}
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.99 }}
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
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-[#2E2E38] mt-2 flex items-center justify-between">
            <span className="text-[10px] text-[#9EA0AB] font-mono">
              Container: <strong className="text-white">MP4 / MKV</strong>
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="md3-btn-filled px-4 py-2 text-xs gap-1.5 shadow-md"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              <span>Extract Stream</span>
            </motion.button>
          </div>
        </div>

        {/* Right Pane: Video Preview & Scrubber (7 cols) */}
        <div className="lg:col-span-7 p-4 flex flex-col justify-between bg-[#0F0F12]">
          {/* libmpv Player Canvas */}
          <div className="relative aspect-video w-full rounded-[12px] bg-[#0A0A0D] border border-[#2E2E38] overflow-hidden flex flex-col items-center justify-center group">
            {/* Animated Canvas Gradient */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, #22222A 0%, #0F0F12 70%)',
                  'radial-gradient(circle at 70% 60%, #2A241E 0%, #0F0F12 70%)',
                  'radial-gradient(circle at 30% 30%, #22222A 0%, #0F0F12 70%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 opacity-80"
            />

            <div className="relative z-10 text-center space-y-2">
              <motion.button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-[#22222A]/90 border border-[#4A4B56] flex items-center justify-center mx-auto text-[#F59E0B] shadow-xl backdrop-blur-sm cursor-pointer"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>
              <p className="font-mono text-[11px] text-[#EBEBF0]">
                Hardware Accelerated libmpv Stream
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#17171C] border border-[#2E2E38] font-mono text-[10px] text-[#10B981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                <span>Active 60fps Stream Manifest</span>
              </div>
            </div>

            {/* Timestamp Badge */}
            <div className="absolute bottom-3 right-3 font-mono text-[11px] text-white bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
              00:01:{Math.floor(playheadPos).toString().padStart(2, '0')}.500 / 00:03:32.000
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

              {/* Exact vs Fast Mode Toggle */}
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

            {/* Visual Scrubber Track with Active Animated Playhead */}
            <div className="relative h-8 bg-[#17171C] rounded-[8px] border border-[#2E2E38] overflow-hidden select-none cursor-pointer">
              <div className="absolute inset-0 flex justify-between px-2 items-center opacity-25">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className={`w-[1px] bg-white ${i % 4 === 0 ? 'h-4' : 'h-2'}`} />
                ))}
              </div>

              {/* Selected amber trimming slice */}
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

              {/* Live Playhead with Smooth Pos Transition */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md shadow-white/80"
                style={{
                  left: `${playheadPos}%`,
                  transition: isPlaying ? 'left 50ms linear' : 'none',
                }}
              >
                <div className="w-2 h-2 -ml-[3px] -top-1 bg-white rounded-full absolute shadow" />
              </div>
            </div>

            {/* Trimming Readings */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#9EA0AB]">
              <div className="flex items-center gap-2">
                <span>IN: <strong className="text-white">00:01:14.250</strong></span>
                <span>OUT: <strong className="text-white">00:02:48.800</strong></span>
              </div>
              <div className="text-[#10B981] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Trimmed: 42 MB (Saved 88%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
