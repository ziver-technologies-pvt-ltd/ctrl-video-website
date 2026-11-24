export function Comparison() {
  const rows = [
    {
      feature: 'Privacy & Telemetry',
      web: 'Ad tracking, redirect popups, cookie logging',
      gui: 'Telemetry, upgrade nag screens, license locks',
      cli: '100% private, local execution',
      ctrl: '100% private, zero telemetry, local SQLite',
    },
    {
      feature: 'Stream In-App Preview',
      web: 'None (blind download)',
      gui: 'None or post-download only',
      cli: 'None (requires piping mpv manually)',
      ctrl: 'Native libmpv low-bandwidth preview before saving',
    },
    {
      feature: 'Precision Trimming',
      web: 'Server-side paywalls or unavailable',
      gui: 'Requires separate video editing software',
      cli: 'Manual --download-sections syntax',
      ctrl: 'Visual timeline with Exact & Fast I/O mark modes',
    },
    {
      feature: 'Codec & Stream Transparency',
      web: 'Compressed to 720p/1080p fake re-encodes',
      gui: 'Presets only, hidden streams',
      cli: 'Full access to raw format IDs',
      ctrl: 'Visual inspector (AV1, VP9, HDR, Opus, FLAC)',
    },
    {
      feature: 'Engine Maintenance',
      web: 'Frequent downtime when platforms change',
      gui: 'Delayed proprietary patch releases',
      cli: 'Manual pip / brew terminal upgrade',
      ctrl: 'Automated self-healing updates with SHA-256 rollback',
    },
  ];

  return (
    <section id="comparison" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
          Objective Assessment
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Every alternative has a trade-off. This one doesn&apos;t.
        </h2>
        <p className="text-sm sm:text-base text-[#A1A1AA]">
          Compare the realities of online converters, proprietary desktop bloatware, bare CLI, and ctrl+video.
        </p>
      </div>

      <div className="overflow-x-auto border border-[#27272A] rounded-xl bg-[#131316] shadow-xl">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-[#27272A] bg-[#18191E] font-mono text-xs text-[#A1A1AA]">
              <th className="p-4 w-1/4">Capability / Dimension</th>
              <th className="p-4 w-1/5 text-[#EF4444]">Web Converters</th>
              <th className="p-4 w-1/5 text-[#F59E0B]">Bloated GUIs</th>
              <th className="p-4 w-1/5 text-[#A1A1AA]">Raw CLI</th>
              <th className="p-4 w-1/4 text-[#22C55E] bg-[#1E1F24] border-x border-[#27272A]">
                ctrl+video
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22242B] text-xs">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-[#16171C] transition-colors">
                <td className="p-4 font-mono font-medium text-white">{r.feature}</td>
                <td className="p-4 text-[#A1A1AA]">{r.web}</td>
                <td className="p-4 text-[#A1A1AA]">{r.gui}</td>
                <td className="p-4 text-[#A1A1AA]">{r.cli}</td>
                <td className="p-4 text-white font-medium bg-[#1A1B20] border-x border-[#27272A]">
                  <span className="flex items-start gap-1.5">
                    <span className="text-[#22C55E]">✓</span>
                    <span>{r.ctrl}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
