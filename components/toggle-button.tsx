"use client"

interface ToggleButtonProps {
  label: string
  active: boolean
  onToggle: () => void
}

export function ToggleButton({ label, active, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative px-8 py-5 rounded-full font-mono uppercase tracking-wider text-sm
        bg-white/5 border-2 transition-all duration-300
        ${
          active
            ? "border-green-400 bg-green-500/10 text-green-400 shadow-lg shadow-green-500/20"
            : "border-white/30 text-blue-400 hover:border-white/50"
        }
      `}
    >
      <span className="relative z-10">{label}</span>
      <div
        className={`absolute top-1 right-1 w-2 h-2 rounded-full transition-colors ${
          active ? "bg-green-400 animate-pulse" : "bg-gray-500"
        }`}
      />
    </button>
  )
}
