export function Architecture() {
  return (
    <section id="architecture" className="py-24 bg-[#0F0F12] border-y border-[#2E2E38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B]">
            Zero-Cloud Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EBEBF0] tracking-tight">
            Your machine. Your data. Your storage.
          </h2>
          <p className="text-sm sm:text-base text-[#9EA0AB]">
            Unlike online web converters that route videos through remote servers or third-party proxies, ctrl+video processes the entire pipeline locally.
          </p>
        </div>

        {/* MD3 Architecture Pipeline */}
        <div className="bg-[#17171C] border border-[#2E2E38] rounded-[16px] p-6 sm:p-10 shadow-2xl overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-4 gap-4 items-center">
              {/* Step 1 */}
              <div className="p-4 rounded-[10px] bg-[#22222A] border border-[#2E2E38] space-y-2 text-center md3-state-layer">
                <div className="w-8 h-8 rounded-full bg-[#451A03] border border-[#F59E0B]/40 text-[#FDE68A] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  01
                </div>
                <h4 className="text-xs font-semibold text-[#EBEBF0] font-mono">URL Input</h4>
                <p className="text-[11px] text-[#9EA0AB]">Local URI validation & platform parsing</p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-[10px] bg-[#22222A] border border-[#2E2E38] space-y-2 text-center md3-state-layer">
                <div className="w-8 h-8 rounded-full bg-[#451A03] border border-[#F59E0B]/40 text-[#FDE68A] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  02
                </div>
                <h4 className="text-xs font-semibold text-[#EBEBF0] font-mono">yt-dlp Engine</h4>
                <p className="text-[11px] text-[#9EA0AB]">Direct stream manifest query via local child process</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-[10px] bg-[#22222A] border border-[#2E2E38] space-y-2 text-center md3-state-layer">
                <div className="w-8 h-8 rounded-full bg-[#451A03] border border-[#F59E0B]/40 text-[#FDE68A] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  03
                </div>
                <h4 className="text-xs font-semibold text-[#EBEBF0] font-mono">libmpv Preview</h4>
                <p className="text-[11px] text-[#9EA0AB]">Hardware video canvas & I/O mark timestamps</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-[10px] bg-[#22222A] border border-[#2E2E38] space-y-2 text-center md3-state-layer">
                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  04
                </div>
                <h4 className="text-xs font-semibold text-[#EBEBF0] font-mono">Local Storage</h4>
                <p className="text-[11px] text-[#9EA0AB]">ffmpeg stream remux & Drift SQLite log</p>
              </div>
            </div>

            {/* Pipeline Strip */}
            <div className="mt-8 pt-6 border-t border-[#2E2E38] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-[#EBEBF0]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Zero intermediate proxy servers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Zero bandwidth caps or throttle filters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Atomic engine updates with rollback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
