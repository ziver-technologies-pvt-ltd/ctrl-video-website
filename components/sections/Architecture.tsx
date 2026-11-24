export function Architecture() {
  return (
    <section id="architecture" className="py-24 bg-[#0B0C0E] border-y border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
            Dealt Moment: Zero-Cloud Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Your machine. Your data. Your storage.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA]">
            Unlike web services that route your videos through external servers or cloud queues, ctrl+video executes the entire pipeline locally.
          </p>
        </div>

        {/* Animated SVG Architecture Pipeline */}
        <div className="bg-[#131316] border border-[#27272A] rounded-xl p-6 sm:p-10 shadow-2xl overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-4 gap-4 items-center relative">
              {/* Step 1 */}
              <div className="p-4 rounded-lg bg-[#18191E] border border-[#27272A] space-y-2 text-center hover-lift">
                <div className="w-8 h-8 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  01
                </div>
                <h4 className="text-xs font-semibold text-white font-mono">URL Input</h4>
                <p className="text-[11px] text-[#A1A1AA]">Local URI validation & platform parsing</p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-lg bg-[#18191E] border border-[#27272A] space-y-2 text-center hover-lift">
                <div className="w-8 h-8 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  02
                </div>
                <h4 className="text-xs font-semibold text-white font-mono">yt-dlp Engine</h4>
                <p className="text-[11px] text-[#A1A1AA]">Direct manifest query via local child process</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-lg bg-[#18191E] border border-[#27272A] space-y-2 text-center hover-lift">
                <div className="w-8 h-8 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  03
                </div>
                <h4 className="text-xs font-semibold text-white font-mono">libmpv Preview</h4>
                <p className="text-[11px] text-[#A1A1AA]">Hardware video render & I/O mark timestamps</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-lg bg-[#18191E] border border-[#27272A] space-y-2 text-center hover-lift">
                <div className="w-8 h-8 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  04
                </div>
                <h4 className="text-xs font-semibold text-white font-mono">Local Disk</h4>
                <p className="text-[11px] text-[#A1A1AA]">ffmpeg remux & SQLite audit history</p>
              </div>
            </div>

            {/* Pipeline Features Strip */}
            <div className="mt-8 pt-6 border-t border-[#22242B] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-[#D4D4D8]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span>Zero intermediate cloud proxies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span>Zero bandwidth caps or throttle filters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span>Atomic self-healing engine rollback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
