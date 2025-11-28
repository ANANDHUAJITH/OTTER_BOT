"use client"

interface TerminalProps {
  logs: string[]
}

export function Terminal({ logs }: TerminalProps) {
  return (
    <div className="bg-black/80 rounded-lg border border-white/20 p-3 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-blue-400 text-xs font-mono ml-2">TRANSMISSION LOG</span>
      </div>
      <div className="font-mono text-xs space-y-1 flex-1 overflow-y-auto scrollbar-thin">
        {logs.map((log, i) => (
          <div key={i} className="text-blue-300/80">
            <span className="text-blue-500">&gt;</span> {log}
          </div>
        ))}
      </div>
    </div>
  )
}
