"use client"

interface ScoreTerminalProps {
  teamName: string
  score: number | null
  matchData?: {
    opponent?: string
    round?: string
  }
}

export function ScoreTerminal({ teamName, score, matchData }: ScoreTerminalProps) {
  return (
    <div className="bg-black/5 rounded-2xl border border-white/20 p-6 w-[70%] h-[60%] flex flex-col items-center justify-center">
      <div className="text-blue-500 text-xs font-mono mb-2 uppercase tracking-widest">
        {matchData?.round || "LIVE MATCH"}
      </div>
      <div className="text-2xl font-bold text-white mb-2">{teamName}</div>
      {score !== null ? (
        <div className="text-4xl font-bold text-blue-400 animate-pulse">{score}</div>
      ) : (
        <div className="text-blue-300/60 text-sm font-mono">Awaiting API Data...</div>
      )}
      {matchData?.opponent && (
        <div className="mt-3 text-sm text-blue-300/80 font-mono">
          VS <span className="text-red-400">{matchData.opponent}</span>
        </div>
      )}
    </div>
  )
}
