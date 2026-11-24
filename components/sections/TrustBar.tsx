export function TrustBar() {
  const points = [
    { label: 'Zero Telemetry', desc: 'No tracking, no analytics, no identifiers collected' },
    { label: '100% Local Processing', desc: 'Runs directly on your CPU/GPU — no cloud queues' },
    { label: 'Open Source MIT', desc: 'Fully auditable codebase hosted on GitHub' },
    { label: 'Self-Healing Engine', desc: 'Auto-checks & validates yt-dlp & ffmpeg binaries with SHA-256' },
  ];

  return (
    <section className="border-y border-[#27272A] bg-[#111215] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Why Choose ctrl+video</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <div key={i} className="flex flex-col space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-tight">
                  {p.label}
                </span>
              </div>
              <p className="text-xs text-[#71717A] leading-snug">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
