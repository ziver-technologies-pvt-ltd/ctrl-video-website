'use client';

import { motion } from 'motion/react';

export function TypeMoment() {
  return (
    <section className="py-24 bg-[#0E0E11] border-y border-[#2E2E38] overflow-hidden relative">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] inline-block"
        >
          Engineered for Digital Sovereignty
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.05, 0.7, 0.1, 1.0] }}
          className="text-2xl sm:text-4xl font-bold tracking-tight text-[#EBEBF0] leading-snug font-sans"
        >
          “Professional desktop media extraction without the popups, paywalls, or privacy surrender.”
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 font-mono text-xs text-[#9EA0AB] flex items-center justify-center gap-3"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> yt-dlp Core
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> ffmpeg Precision
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> libmpv Hardware Engine
          </span>
        </motion.div>
      </div>
    </section>
  );
}
