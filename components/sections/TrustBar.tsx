export function TrustBar() {
  const points = [
    { label: 'Zero Telemetry', desc: 'No tracking, identifiers, or remote data collection' },
    { label: '100% Local Execution', desc: 'Child process execution on your CPU/GPU — no cloud queues' },
    { label: 'MIT Open Source', desc: 'Auditable Flutter & Rust codebase published on GitHub' },
    { label: 'Self-Healing Engine', desc: 'Automated yt-dlp & ffmpeg updates with SHA-256 verification' },
  ];

  return (
    <section className="border-y border-[#2E2E38] bg-[#17171C] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Why Choose ctrl+video</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <div
              key={i}
              className="p-4 rounded-[10px] bg-[#22222A] border border-[#2E2E38] flex flex-col space-y-1.5 md3-state-layer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#EBEBF0] tracking-tight">
                  {p.label}
                </span>
              </div>
              <p className="text-xs text-[#9EA0AB] leading-snug">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
