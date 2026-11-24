'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is ctrl+video different from web video downloader websites?',
      a: 'Web downloaders force videos through remote proxy servers, inject intrusive popup advertisements, cap quality at 720p/1080p, and may log user IPs. ctrl+video is a 100% native desktop application that streams directly from your connection using an open-source local core with zero telemetry and zero ads.',
    },
    {
      q: 'Do I need to install yt-dlp or ffmpeg manually?',
      a: 'No. Standalone, verified binaries of yt-dlp and ffmpeg are bundled into the application. Furthermore, ctrl+video includes an internal self-healing updater with SHA-256 integrity verification that keeps backend binaries up to date automatically when streaming providers update their delivery protocols.',
    },
    {
      q: 'Can I trim a 3-hour video without downloading the whole file first?',
      a: 'Yes. Thanks to the --download-sections capability in yt-dlp combined with libmpv stream inspection, ctrl+video lets you set [I] (In) and [O] (Out) points on the visual scrubber and downloads only the requested segment, saving both bandwidth and local disk space.',
    },
    {
      q: 'Which operating systems and package formats are supported?',
      a: 'Linux (native .rpm packages for Fedora/RHEL/openSUSE and standalone tarballs), macOS (Universal .dmg for both Apple Silicon M-series and Intel x86_64), and Windows (installer .exe with shortcuts, plus portable .zip).',
    },
    {
      q: 'Is ctrl+video free and open source?',
      a: 'Yes. ctrl+video is licensed under the permissive MIT Open Source License. You can inspect the source code, build it from scratch, or audit the release hashes on GitHub.',
    },
  ];

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
          Answers to Common Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EBEBF0] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#9EA0AB]">
          Everything you need to know about ctrl+video, privacy, and desktop architecture.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="border border-[#2E2E38] rounded-[10px] bg-[#17171C] overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#EBEBF0] hover:text-[#F59E0B] transition-colors"
              >
                <span>{f.q}</span>
                <span className="font-mono text-xs text-[#9EA0AB] w-6 h-6 rounded-full bg-[#22222A] flex items-center justify-center">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#9EA0AB] leading-relaxed border-t border-[#2E2E38]">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
