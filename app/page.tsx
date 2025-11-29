"use client"

import { useState, useCallback, useEffect } from "react"
import { Settings, Wifi, WifiOff, Bluetooth, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Joystick } from "@/components/joystick"
import { SpeedSlider } from "@/components/speed-slider"
import { ControlButton } from "@/components/control-button"
import { ToggleButton } from "@/components/toggle-button"
import { Terminal } from "@/components/terminal"
import { ScoreTerminal } from "@/components/score-terminal"
import { SettingsModal } from "@/components/settings-modal"
import { PWAInstall } from "@/components/pwa-install"

let Haptics: any = null
let ScreenOrientation: any = null
let StatusBar: any = null

if (typeof window !== "undefined") {
  import("@capacitor/haptics").then((mod) => {
    Haptics = mod.Haptics
  })
  import("@capacitor/screen-orientation").then((mod) => {
    ScreenOrientation = mod.ScreenOrientation
  })
  import("@capacitor/status-bar").then((mod) => {
    StatusBar = mod.StatusBar
  })
}

export default function OtterBotController() {
  const [isConnected, setIsConnected] = useState(false)
  const [spinnerActive, setSpinnerActive] = useState(false)
  const [flipperActive, setFlipperActive] = useState(false)
  const [motorSpeed, setMotorSpeed] = useState(50)
  const [escSpeed, setEscSpeed] = useState(50)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [logs, setLogs] = useState<string[]>(["System initialized...", "Waiting for connection..."])

  const [activeControls, setActiveControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const [settings, setSettings] = useState({
    connectionType: "wifi" as "wifi" | "ble",
    pin: "",
    commands: {
      forward: "FWD",
      backward: "BWD",
      left: "LFT",
      right: "RGT",
      spinner: "SPN",
      flipper: "FLP",
    },
  })

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && "lock" in screen.orientation) {
          await screen.orientation.lock("landscape")
        }
      } catch (e) {
        // Orientation lock not supported
      }
    }

    const enterFullscreen = () => {
      const doc = document.documentElement
      if (doc.requestFullscreen) {
        doc.requestFullscreen().catch(() => {})
      }
    }

    // Fullscreen on first touch
    const handleFirstTouch = () => {
      enterFullscreen()
      lockOrientation()
      document.removeEventListener("touchstart", handleFirstTouch)
    }

    document.addEventListener("touchstart", handleFirstTouch)
    lockOrientation()

    return () => document.removeEventListener("touchstart", handleFirstTouch)
  }, [])

  const triggerHaptic = (type: "light" | "medium" | "heavy" = "medium") => {
    if ("vibrate" in navigator) {
      const duration = type === "light" ? 10 : type === "medium" ? 25 : 50
      navigator.vibrate(duration)
    }
  }

  const addLog = (message: string) => {
    setLogs((prev) => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const handleConnect = () => {
    triggerHaptic("heavy")
    setIsConnected(!isConnected)
    addLog(isConnected ? "Disconnected from bot" : `Connected via ${settings.connectionType.toUpperCase()}`)
  }

  const handleJoystickMove = useCallback(
    (x: number, y: number) => {
      const threshold = 0.3
      const newControls = {
        forward: y < -threshold,
        backward: y > threshold,
        left: x < -threshold,
        right: x > threshold,
      }
      setActiveControls(newControls)

      if (newControls.forward && !activeControls.forward) {
        triggerHaptic("light")
        addLog(`TX: ${settings.commands.forward}`)
      }
      if (newControls.backward && !activeControls.backward) {
        triggerHaptic("light")
        addLog(`TX: ${settings.commands.backward}`)
      }
      if (newControls.left && !activeControls.left) {
        triggerHaptic("light")
        addLog(`TX: ${settings.commands.left}`)
      }
      if (newControls.right && !activeControls.right) {
        triggerHaptic("light")
        addLog(`TX: ${settings.commands.right}`)
      }
    },
    [activeControls, settings.commands],
  )

  const handleJoystickRelease = useCallback(() => {
    setActiveControls({ forward: false, backward: false, left: false, right: false })
    addLog("TX: STOP")
  }, [])

  const handleSpinnerToggle = () => {
    triggerHaptic("medium")
    setSpinnerActive(!spinnerActive)
    addLog(`TX: ${settings.commands.spinner}_${!spinnerActive ? "ON" : "OFF"}`)
  }

  const handleFlipperPress = () => {
    triggerHaptic("heavy")
    setFlipperActive(true)
    addLog(`TX: ${settings.commands.flipper}_ON`)
  }

  const handleFlipperRelease = () => {
    setFlipperActive(false)
    addLog(`TX: ${settings.commands.flipper}_OFF`)
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <PWAInstall />

      <div
        className="relative w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.png')",
          aspectRatio: "16/9",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        {/* Main Content */}
        <div className="relative z-10 h-full p-4 flex flex-col">
          <header className="flex items-start justify-between h-[20%] pt-2">
            {/* Transmission Log - 35% width */}
            <div className="w-[35%] h-full">
              <Terminal logs={logs} />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-4 text-center">
              <h1 className="text-2xl font-bold text-blue-400 font-mono tracking-wider">OTTER_BOT</h1>
              <p className="text-blue-300/60 text-xs font-mono">CROB CONTROLLER</p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border ${
                  isConnected ? "border-green-400/40 text-green-400" : "border-white/30 text-white/70"
                }`}
              >
                {settings.connectionType === "wifi" ? (
                  isConnected ? (
                    <Wifi size={16} />
                  ) : (
                    <WifiOff size={16} />
                  )
                ) : (
                  <Bluetooth size={16} />
                )}
                <span className="text-xs font-mono uppercase">
                  {isConnected ? settings.connectionType.toUpperCase() : `${settings.connectionType.toUpperCase()} OFF`}
                </span>
              </div>

              <ControlButton onClick={handleConnect} active={isConnected} size="sm">
                {isConnected ? "Disconnect" : "Connect"}
              </ControlButton>

              <ControlButton onClick={() => setSettingsOpen(true)} variant="circle" size="sm">
                <Settings size={18} />
              </ControlButton>
            </div>
          </header>

          <div className="flex-1 flex gap-6">
            <div className="flex gap-[3px]">
              {/* ESC Speed Bar - leftmost element */}
              <div className="flex flex-col items-center justify-between py-4">
                <SpeedSlider label="ESC" value={escSpeed} onChange={setEscSpeed} height={280} />

                <div className="flex gap-3 mt-4">
                  <ControlButton
                    onPress={() => {
                      triggerHaptic("medium")
                      setActiveControls((c) => ({ ...c, left: true }))
                      addLog(`TX: ${settings.commands.left}`)
                    }}
                    onRelease={() => {
                      setActiveControls((c) => ({ ...c, left: false }))
                      addLog("TX: STOP")
                    }}
                    active={activeControls.left}
                    variant="circle"
                    size="xl"
                  >
                    <ArrowLeft size={28} />
                  </ControlButton>
                  <ControlButton
                    onPress={() => {
                      triggerHaptic("medium")
                      setActiveControls((c) => ({ ...c, right: true }))
                      addLog(`TX: ${settings.commands.right}`)
                    }}
                    onRelease={() => {
                      setActiveControls((c) => ({ ...c, right: false }))
                      addLog("TX: STOP")
                    }}
                    active={activeControls.right}
                    variant="circle"
                    size="xl"
                  >
                    <ArrowRight size={28} />
                  </ControlButton>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <ToggleButton label="Spinner" active={spinnerActive} onToggle={handleSpinnerToggle} />
                <ControlButton
                  onPress={handleFlipperPress}
                  onRelease={handleFlipperRelease}
                  active={flipperActive}
                  variant="hold"
                  size="lg"
                >
                  FLIP
                  <span className="block text-[10px] opacity-60">HOLD</span>
                </ControlButton>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-8">
              <ScoreTerminal
                teamName="OTTER_BOT"
                score={null}
                matchData={{ round: "QUALIFYING", opponent: "IRON CLAW" }}
              />
            </div>

            {/* Right Side - Joystick, Forward/Back, Motor Speed */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center justify-center gap-4 pt-8">
                <Joystick onMove={handleJoystickMove} onRelease={handleJoystickRelease} size={130} />

                <div className="flex gap-3 mt-6">
                  <ControlButton
                    onPress={() => {
                      triggerHaptic("medium")
                      setActiveControls((c) => ({ ...c, backward: true }))
                      addLog(`TX: ${settings.commands.backward}`)
                    }}
                    onRelease={() => {
                      setActiveControls((c) => ({ ...c, backward: false }))
                      addLog("TX: STOP")
                    }}
                    active={activeControls.backward}
                    size="lg"
                  >
                    <ArrowDown size={22} />
                    <span className="ml-1">BACK</span>
                  </ControlButton>
                  <ControlButton
                    onPress={() => {
                      triggerHaptic("medium")
                      setActiveControls((c) => ({ ...c, forward: true }))
                      addLog(`TX: ${settings.commands.forward}`)
                    }}
                    onRelease={() => {
                      setActiveControls((c) => ({ ...c, forward: false }))
                      addLog("TX: STOP")
                    }}
                    active={activeControls.forward}
                    size="lg"
                  >
                    <ArrowUp size={22} />
                    <span className="ml-1">FWD</span>
                  </ControlButton>
                </div>
              </div>

              {/* Motor Speed Bar - increased length */}
              <div className="flex flex-col items-center justify-center">
                <SpeedSlider label="Motor" value={motorSpeed} onChange={setMotorSpeed} height={280} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-2 text-center">
            <p className="text-blue-400/40 text-xs font-mono">OTTER_BOT for CROB • Developed by Anandhu</p>
          </footer>
        </div>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          settings={settings}
          onSave={setSettings}
        />
      </div>
    </div>
  )
}
