'use client';

import { useState } from 'react';
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
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Download ctrl+video for your platform.
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Latest version: <strong className="text-white font-mono">{release.version}</strong>. Standalone self-updating binaries bundled with verified dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLATFORMS.map((p) => {
          const primary = p.getPrimaryAsset(release);
          const secondary = p.getSecondaryAsset ? p.getSecondaryAsset(release) : undefined;
          const isTargetOS = p.id === detectedOS;

          return (
            <div
              key={p.id}
              className={`rounded-xl border p-6 flex flex-col justify-between transition-all hover-lift ${
                isTargetOS
                  ? 'bg-[#181920] border-[#F59E0B]/60 ring-1 ring-[#F59E0B]/30 shadow-xl shadow-[#F59E0B]/10'
                  : 'bg-[#131316] border-[#27272A] hover:border-[#383A42]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{p.label}</h3>
                  {isTargetOS && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F59E0B] text-black font-semibold">
                      Your OS Detected
                    </span>
                  )}
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-[#A1A1AA]">{p.architecture}</div>
                  <div className="text-[11px] text-[#71717A]">{p.formatBadge}</div>
                </div>

                {/* Primary Download Button */}
                <a
                  href={primary.url}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59E0B] text-black font-semibold text-xs hover:bg-[#D97706] transition-all btn-press shadow"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  <span>Download {primary.name.split('.').pop()?.toUpperCase()}</span>
                  <span className="opacity-80">({(primary.size / 1048576).toFixed(1)} MB)</span>
                </a>

                {/* Secondary Option (e.g. Tarball or ZIP) */}
                {secondary && (
                  <div className="pt-1">
                    <a
                      href={secondary.url}
                      download
                      className="text-xs font-mono text-[#A1A1AA] hover:text-white flex items-center justify-between px-2 py-1.5 rounded bg-[#18191E] border border-[#27272A] hover:border-[#383A42] transition-colors"
                    >
                      <span>Also available: {secondary.name}</span>
                      <span>{(secondary.size / 1048576).toFixed(1)} MB</span>
                    </a>
                  </div>
                )}

                {/* Install Command */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] mb-1">
                    <span>Quick Command</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(p.installCommand, p.id)}
                      className="hover:text-white transition-colors"
                    >
                      {copiedId === p.id ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded bg-[#0A0A0C] border border-[#22242B] font-mono text-[10px] text-[#A1A1AA] overflow-x-auto whitespace-pre">
                    {p.installCommand}
                  </pre>
                </div>
              </div>

              {/* SHA-256 Digest Info */}
              <div className="mt-6 pt-3 border-t border-[#22242B] text-[10px] font-mono text-[#71717A] truncate">
                <span>SHA-256: </span>
                <span className="text-[#A1A1AA]">
                  {primary.digest ? primary.digest.replace('sha256:', '').slice(0, 16) + '...' : 'Available on GitHub'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
