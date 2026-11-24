import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#0E0E11] text-[#A1A1AA] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="ctrl+video logo"
                width={28}
                height={28}
                className="rounded"
              />
              <span className="font-mono font-semibold text-white tracking-tight">
                ctrl<span className="text-[#F59E0B]">+</span>video
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#A1A1AA]">
              A frame-accurate desktop media downloader and trimming studio.
              Built locally with yt-dlp, ffmpeg, and libmpv for power users, researchers,
              and video editors. Zero telemetry, 100% private.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
              <span>MIT Licensed</span>
              <span>·</span>
              <span>Self-Hosted Core</span>
              <span>·</span>
              <span>Linux / macOS / Windows</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/download/" className="hover:text-white transition-colors">
                  Download Latest Release
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features & Workflow
                </Link>
              </li>
              <li>
                <Link href="#architecture" className="hover:text-white transition-colors">
                  Local-Only Architecture
                </Link>
              </li>
              <li>
                <Link href="#comparison" className="hover:text-white transition-colors">
                  Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem / Developer */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-3">
              Developer & Project
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/ziver-technologies-pvt-ltd/ctrl-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ziver-technologies-pvt-ltd/ctrl-video/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Release Notes (v0.1.0)
                </a>
              </li>
              <li>
                <a
                  href="https://ziver.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#F59E0B]"
                >
                  Ziver Technologies Pvt Ltd ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1C1D21] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© 2026 Ziver Technologies Pvt Ltd. All rights reserved.</p>
          <p className="font-mono">
            Powered by <span className="text-[#D4D4D8]">yt-dlp</span> & <span className="text-[#D4D4D8]">libmpv</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
