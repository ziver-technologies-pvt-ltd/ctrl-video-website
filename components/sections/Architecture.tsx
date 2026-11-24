'use client';

import { motion } from 'motion/react';

export function Architecture() {
  const steps = [
    { num: '01', title: 'URL Input', desc: 'Local URI validation & platform parsing' },
    { num: '02', title: 'yt-dlp Engine', desc: 'Direct stream manifest query via child process' },
    { num: '03', title: 'libmpv Preview', desc: 'Hardware video canvas & I/O mark timestamps' },
    { num: '04', title: 'Local Storage', desc: 'ffmpeg stream remux & Drift SQLite log', isFinal: true },
  ];

  return (
    <section id="architecture" className="py-24 bg-[#0F0F12] border-y border-[#2E2E38] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F59E0B]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
            Zero-Cloud Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EBEBF0] tracking-tight">
            Your machine. Your data. Your storage.
          </h2>
          <p className="text-sm sm:text-base text-[#9EA0AB]">
            Unlike online web converters that route videos through remote servers or third-party proxies, ctrl+video processes the entire pipeline locally.
          </p>
        </div>

        {/* MD3 Architecture Pipeline */}
        <div className="bg-[#17171C] border border-[#2E2E38] rounded-[16px] p-6 sm:p-10 shadow-2xl overflow-x-auto relative">
          <div className="min-w-[680px]">
            {/* Animated Connecting Pulse Line behind cards */}
            <div className="relative mb-8">
              <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-[#2E2E38] -translate-y-1/2 z-0">
                <motion.div
                  animate={{
                    left: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent"
                />
              </div>

              <div className="grid grid-cols-4 gap-4 items-center relative z-10">
                {steps.map((step, idx) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="p-5 rounded-[12px] bg-[#22222A] border border-[#2E2E38] hover:border-[#F59E0B]/50 transition-all text-center space-y-3 shadow-lg group relative"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      className={`w-10 h-10 rounded-full border font-mono font-bold text-xs flex items-center justify-center mx-auto transition-colors ${
                        step.isFinal
                          ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981] group-hover:bg-[#10B981] group-hover:text-black'
                          : 'bg-[#451A03] border-[#F59E0B]/40 text-[#FDE68A] group-hover:bg-[#F59E0B] group-hover:text-black'
                      }`}
                    >
                      {step.num}
                    </motion.div>
                    <h4 className="text-sm font-semibold text-[#EBEBF0] font-mono group-hover:text-white transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#9EA0AB] leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pipeline Strip */}
            <div className="pt-6 border-t border-[#2E2E38] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-[#EBEBF0]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Zero intermediate proxy servers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Zero bandwidth caps or throttle filters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Atomic engine updates with rollback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
