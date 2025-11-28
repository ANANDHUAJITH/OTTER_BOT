"use client"

interface SpeedSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  vertical?: boolean
  height?: number
}

export function SpeedSlider({ label, value, onChange, vertical = true, height = 200 }: SpeedSliderProps) {
  const segments = 12

  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} items-center gap-2`}>
      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">{label}</span>
      <div
        className={`relative bg-black/40 rounded-lg border border-white/30 p-2 ${vertical ? "w-10" : "h-10"}`}
        style={{ height: vertical ? height : undefined, width: vertical ? undefined : height }}
      >
        <div className={`flex ${vertical ? "flex-col-reverse" : "flex-row"} gap-1 h-full w-full`}>
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              onClick={() => onChange(((i + 1) / segments) * 100)}
              className={`flex-1 rounded-sm cursor-pointer transition-all ${
                i < Math.floor((value / 100) * segments)
                  ? "bg-gradient-to-t from-blue-600 to-blue-400 shadow-sm shadow-blue-500/50"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
      <span className="text-blue-300 text-xs font-mono">{Math.round(value)}%</span>
    </div>
  )
}
