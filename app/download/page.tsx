import type { Metadata } from 'next';
import { getLatestRelease } from '@/lib/github';
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
  const release = await getLatestRelease();
  const detectedOS = 'linux';

  return (
    <>
      <SoftwareJsonLd release={release} />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header with MD3 Filter Chip */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="md3-chip rounded-full px-4 py-1.5 shadow-sm inline-flex">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#EBEBF0]">Latest Stable Release: {release.version}</span>
            <span className="text-[#4A4B56]">·</span>
            <span className="text-[#9EA0AB]">
              Released{' '}
              {new Date(release.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EBEBF0]">
            Download ctrl+video
          </h1>
          <p className="text-sm sm:text-base text-[#9EA0AB]">
            Choose the installer or portable archive suitable for your operating system.
            All binaries are signed, standalone, and include verifiable SHA-256 digests.
          </p>
        </div>

        {/* Platform Grid (MD3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLATFORMS.map((p) => {
            const primary = p.getPrimaryAsset(release);
            const secondary = p.getSecondaryAsset ? p.getSecondaryAsset(release) : undefined;
            const isTarget = p.id === detectedOS;

            return (
              <div
                key={p.id}
                className={`rounded-[16px] border p-6 flex flex-col justify-between space-y-6 md3-state-layer ${
                  isTarget
                    ? 'bg-[#17171C] border-[#F59E0B] ring-2 ring-[#F59E0B]/20 shadow-xl shadow-[#F59E0B]/10'
                    : 'bg-[#17171C] border-[#2E2E38]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#EBEBF0]">{p.label}</h2>
                      <p className="text-xs font-mono text-[#9EA0AB]">{p.architecture}</p>
                    </div>
                    {isTarget && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F59E0B] text-black font-semibold">
                        Your OS Detected
                      </span>
                    )}
                  </div>

                  <div className="p-3 rounded-[10px] bg-[#22222A] border border-[#2E2E38] space-y-1">
                    <span className="text-[11px] font-mono text-[#9EA0AB] uppercase tracking-wider block">
                      Recommended Package
                    </span>
                    <div className="text-xs font-mono text-[#EBEBF0] font-medium truncate">
                      {primary.name}
                    </div>
                    <div className="text-[11px] text-[#9EA0AB]">
                      {(primary.size / 1048576).toFixed(1)} MB · Standalone
                    </div>
                  </div>

                  <a
                    href={primary.url}
                    download
                    className="md3-btn-filled w-full py-3 text-xs gap-2 shadow"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    <span>Download {primary.name.split('.').pop()?.toUpperCase()}</span>
                  </a>

                  {secondary && (
                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-[#9EA0AB] mb-1.5 block">
                        Alternative Package:
                      </span>
                      <a
                        href={secondary.url}
                        download
                        className="md3-btn-tonal w-full py-2.5 text-xs font-mono justify-between px-3"
                      >
                        <span className="truncate mr-2">{secondary.name}</span>
                        <span className="text-[11px] text-[#9EA0AB] shrink-0">
                          {(secondary.size / 1048576).toFixed(1)} MB
                        </span>
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-[#9EA0AB] mb-1.5 block">
                      Quick Install Instructions
                    </span>
                    <pre className="p-3 rounded-[10px] bg-[#0F0F12] border border-[#2E2E38] font-mono text-[10px] text-[#9EA0AB] overflow-x-auto whitespace-pre">
                      {p.installCommand}
                    </pre>
                  </div>
                </div>

                {/* Verification details */}
                <div className="pt-4 border-t border-[#2E2E38] space-y-1.5 text-[11px] font-mono">
                  <span className="text-[#9EA0AB] block">SHA-256 Digest Verification:</span>
                  <div className="p-2.5 rounded-[8px] bg-[#0A0A0D] text-[#EBEBF0] text-[10px] break-all border border-[#2E2E38]">
                    {primary.digest || 'Available on GitHub Release metadata'}
                  </div>
                  <div className="text-[10px] text-[#9EA0AB]">
                    Command: <code className="text-[#F59E0B]">{p.verifyCommand(primary.name)}</code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Release Notes Banner (MD3 Surface-Container-Low) */}
        <div className="p-6 rounded-[16px] border border-[#2E2E38] bg-[#17171C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-[#EBEBF0]">Looking for previous releases or source commits?</h3>
            <p className="text-xs text-[#9EA0AB]">
              View commit logs, pull requests, and raw source archives in the public repository.
            </p>
          </div>
          <a
            href={release.releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="md3-btn-outlined px-5 py-2 text-xs font-mono shrink-0"
          >
            GitHub Releases ↗
          </a>
        </div>
      </div>
    </>
  );
}
