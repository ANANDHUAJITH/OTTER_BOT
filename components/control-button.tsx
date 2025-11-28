"use client"

import type { ReactNode } from "react"

interface ControlButtonProps {
  children: ReactNode
  onPress?: () => void
  onRelease?: () => void
  onClick?: () => void
  active?: boolean
  variant?: "default" | "circle" | "hold"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function ControlButton({
  children,
  onPress,
  onRelease,
  onClick,
  active = false,
  variant = "default",
  size = "md",
  className = "",
}: ControlButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
    xl: "px-6 py-5 text-lg w-16 h-16",
  }

  const baseClasses = `
    relative overflow-hidden font-mono uppercase tracking-wider
    bg-white/5 border border-white/30
    text-blue-400 transition-all duration-150
    hover:bg-white/10 hover:border-white/50
    active:scale-95 active:bg-blue-500/20
    ${active ? "bg-blue-500/20 border-blue-400/60 shadow-lg shadow-blue-500/30" : ""}
    ${variant === "circle" ? "rounded-full aspect-square flex items-center justify-center" : "rounded-xl"}
    ${sizeClasses[size]}
    ${className}
  `

  return (
    <button
      className={baseClasses}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
