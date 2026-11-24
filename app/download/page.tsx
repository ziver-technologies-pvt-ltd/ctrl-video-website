import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getLatestRelease } from '@/lib/github';
import { detectOSFromUA } from '@/lib/detectOS';
import { PLATFORMS } from '@/lib/platforms';
import { SoftwareJsonLd } from '@/components/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const release = await getLatestRelease();
  return {
    title: `Download ctrl+video ${release.version} for Linux, macOS & Windows`,
    description: `Download ctrl+video ${release.version}. Verified native builds for Linux (RPM, Tarball), macOS (Universal DMG), and Windows (x64 Installer). SHA-256 verified.`,
  };
}

export default async function DownloadPage() {
  const headersList = await headers();
  const ua = headersList.get('user-agent') || '';
  const detectedOS = detectOSFromUA(ua);
  const release = await getLatestRelease();

  return (
    <>
      <SoftwareJsonLd release={release} />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1F24] border border-[#27272A] text-xs font-mono text-[#D4D4D8]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>Latest Stable Release: {release.version}</span>
            <span className="text-[#71717A]">·</span>
            <span>
              Released{' '}
              {new Date(release.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Download ctrl+video
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA]">
            Choose the installer or portable archive suitable for your operating system.
            All binaries are signed, standalone, and include verifiable SHA-256 digests.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLATFORMS.map((p) => {
            const primary = p.getPrimaryAsset(release);
            const secondary = p.getSecondaryAsset ? p.getSecondaryAsset(release) : undefined;
            const isTarget = p.id === detectedOS;

            return (
              <div
                key={p.id}
                className={`rounded-xl border p-6 flex flex-col justify-between space-y-6 ${
                  isTarget
                    ? 'bg-[#181920] border-[#F59E0B]/70 ring-1 ring-[#F59E0B]/40 shadow-xl shadow-[#F59E0B]/10'
                    : 'bg-[#131316] border-[#27272A]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">{p.label}</h2>
                      <p className="text-xs font-mono text-[#A1A1AA]">{p.architecture}</p>
                    </div>
                    {isTarget && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F59E0B] text-black font-semibold">
                        Detected
                      </span>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-[#0E0E11] border border-[#22242B] space-y-1">
                    <span className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider block">
                      Recommended Package
                    </span>
                    <div className="text-xs font-mono text-white font-medium truncate">
                      {primary.name}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      {(primary.size / 1048576).toFixed(1)} MB · Standalone
                    </div>
                  </div>

                  <a
                    href={primary.url}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#F59E0B] text-black font-semibold text-xs hover:bg-[#D97706] transition-all btn-press shadow hover-lift"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    <span>Download {primary.name.split('.').pop()?.toUpperCase()}</span>
                  </a>

                  {secondary && (
                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-[#71717A] mb-1.5 block">
                        Alternative Package:
                      </span>
                      <a
                        href={secondary.url}
                        download
                        className="text-xs font-mono text-[#D4D4D8] hover:text-white flex items-center justify-between p-2.5 rounded bg-[#18191E] border border-[#27272A] hover:border-[#383A42] transition-colors"
                      >
                        <span className="truncate mr-2">{secondary.name}</span>
                        <span className="text-[11px] text-[#A1A1AA] shrink-0">
                          {(secondary.size / 1048576).toFixed(1)} MB
                        </span>
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-[#71717A] mb-1.5 block">
                      Quick Install Instructions
                    </span>
                    <pre className="p-3 rounded bg-[#0A0A0C] border border-[#22242B] font-mono text-[10px] text-[#A1A1AA] overflow-x-auto whitespace-pre">
                      {p.installCommand}
                    </pre>
                  </div>
                </div>

                {/* Verification details */}
                <div className="pt-4 border-t border-[#22242B] space-y-1.5 text-[11px] font-mono">
                  <span className="text-[#71717A] block">SHA-256 Digest Verification:</span>
                  <div className="p-2 rounded bg-[#08080A] text-[#A1A1AA] text-[10px] break-all border border-[#1C1D21]">
                    {primary.digest || 'Available on GitHub Release metadata'}
                  </div>
                  <div className="text-[10px] text-[#71717A]">
                    Command: <code className="text-[#D4D4D8]">{p.verifyCommand(primary.name)}</code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Release Notes Banner */}
        <div className="p-6 rounded-xl border border-[#27272A] bg-[#131316] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">Looking for source code or previous versions?</h3>
            <p className="text-xs text-[#A1A1AA]">
              View commit logs, pull requests, and raw source archives in the public repository.
            </p>
          </div>
          <a
            href={release.releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#1E1F24] border border-[#27272A] text-xs font-mono text-white hover:border-[#3F3F46] hover:bg-[#282A2F] transition-all hover-lift shrink-0"
          >
            GitHub Releases ↗
          </a>
        </div>
      </div>
    </>
  );
}
