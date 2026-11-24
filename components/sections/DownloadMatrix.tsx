'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { PLATFORMS } from '@/lib/platforms';
import { ReleaseData } from '@/lib/github';
import { OS } from '@/lib/detectOS';

interface Props {
  release: ReleaseData;
  detectedOS?: OS;
}

export function DownloadMatrix({ release, detectedOS = 'unknown' }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="download-matrix" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
          Zero Configuration Packages
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#EBEBF0] tracking-tight">
          Download ctrl+video for your platform.
        </h2>
        <p className="text-sm sm:text-base text-[#9EA0AB]">
          Latest version: <strong className="text-white font-mono">{release.version}</strong>. Standalone self-updating binaries bundled with verified dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLATFORMS.map((p, idx) => {
          const primary = p.getPrimaryAsset(release);
          const secondary = p.getSecondaryAsset ? p.getSecondaryAsset(release) : undefined;
          const isTargetOS = p.id === detectedOS;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-[16px] border p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                isTargetOS
                  ? 'bg-[#17171C] border-[#F59E0B] ring-2 ring-[#F59E0B]/30 shadow-xl shadow-[#F59E0B]/10'
                  : 'bg-[#17171C] border-[#2E2E38] hover:border-[#4A4B56]'
              }`}
            >
              {isTargetOS && (
                <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent pointer-events-none" />
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#EBEBF0]">{p.label}</h3>
                  {isTargetOS && (
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#F59E0B] text-black font-semibold shadow"
                    >
                      Your OS Detected
                    </motion.span>
                  )}
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-[#9EA0AB]">{p.architecture}</div>
                  <div className="text-[11px] text-[#4A4B56]">{p.formatBadge}</div>
                </div>

                {/* Primary Download Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={primary.url}
                  download
                  className="md3-btn-filled w-full py-2.5 text-xs gap-2 shadow"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  <span>Download {primary.name.split('.').pop()?.toUpperCase()}</span>
                  <span className="opacity-80">({(primary.size / 1048576).toFixed(1)} MB)</span>
                </motion.a>

                {/* Secondary Option */}
                {secondary && (
                  <div className="pt-1">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={secondary.url}
                      download
                      className="md3-btn-tonal w-full py-2 text-xs font-mono justify-between px-3"
                    >
                      <span className="truncate mr-2">Also: {secondary.name}</span>
                      <span>{(secondary.size / 1048576).toFixed(1)} MB</span>
                    </motion.a>
                  </div>
                )}

                {/* Install Command */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#9EA0AB] mb-1">
                    <span>Quick Command</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(p.installCommand, p.id)}
                      className="hover:text-white transition-colors"
                    >
                      {copiedId === p.id ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-3 rounded-[10px] bg-[#0F0F12] border border-[#2E2E38] font-mono text-[10px] text-[#9EA0AB] overflow-x-auto whitespace-pre">
                    {p.installCommand}
                  </pre>
                </div>
              </div>

              {/* SHA-256 Digest */}
              <div className="mt-6 pt-3 border-t border-[#2E2E38] text-[10px] font-mono text-[#9EA0AB] truncate">
                <span>SHA-256: </span>
                <span className="text-[#EBEBF0]">
                  {primary.digest ? primary.digest.replace('sha256:', '').slice(0, 16) + '...' : 'Available on GitHub'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
