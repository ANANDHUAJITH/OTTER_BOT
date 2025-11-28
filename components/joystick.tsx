"use client"

import { useRef, useState, useCallback, useEffect } from "react"

interface JoystickProps {
  onMove: (x: number, y: number) => void
  onRelease: () => void
  size?: number
}

export function Joystick({ onMove, onRelease, size = 120 }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const knobSize = size * 0.4

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      let deltaX = clientX - centerX
      let deltaY = clientY - centerY

      const maxDistance = (size - knobSize) / 2
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance
        deltaY = (deltaY / distance) * maxDistance
      }

      setPosition({ x: deltaX, y: deltaY })
      onMove(deltaX / maxDistance, deltaY / maxDistance)
    },
    [size, knobSize, onMove],
  )

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(true)
      handleMove(clientX, clientY)
    },
    [handleMove],
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
    setPosition({ x: 0, y: 0 })
    onRelease()
  }, [onRelease])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX, e.clientY)
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const handleUp = () => {
      if (isDragging) handleEnd()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleUp)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleUp)
    }
  }, [isDragging, handleMove, handleEnd])

  return (
    <div
      ref={containerRef}
      className="relative rounded-full bg-black/40 backdrop-blur-md border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
      style={{ width: size, height: size }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY)
      }}
    >
      <div className="absolute inset-2 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
      <div
        className="absolute rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50 cursor-grab active:cursor-grabbing transition-shadow"
        style={{
          width: knobSize,
          height: knobSize,
          left: `calc(50% - ${knobSize / 2}px + ${position.x}px)`,
          top: `calc(50% - ${knobSize / 2}px + ${position.y}px)`,
        }}
      />
    </div>
  )
}
