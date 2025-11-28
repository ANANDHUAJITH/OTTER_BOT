"use client"

import { useState } from "react"
import { X, Wifi, Bluetooth, Key, Terminal } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: {
    connectionType: "wifi" | "ble"
    pin: string
    commands: {
      forward: string
      backward: string
      left: string
      right: string
      spinner: string
      flipper: string
    }
  }
  onSave: (settings: SettingsModalProps["settings"]) => void
}

export function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black/80 backdrop-blur-md border border-cyan-400/40 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-cyan-400 font-mono">SETTINGS</h2>
          <button onClick={onClose} className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Connection Type */}
        <div className="mb-6">
          <label className="text-cyan-300 text-sm font-mono mb-2 block">CONNECTION TYPE</label>
          <div className="flex gap-3">
            <button
              onClick={() => setLocalSettings({ ...localSettings, connectionType: "wifi" })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                localSettings.connectionType === "wifi"
                  ? "bg-cyan-500/30 border-cyan-400 text-cyan-300"
                  : "bg-white/5 border-cyan-400/30 text-cyan-400/60"
              }`}
            >
              <Wifi size={18} />
              WiFi
            </button>
            <button
              onClick={() => setLocalSettings({ ...localSettings, connectionType: "ble" })}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                localSettings.connectionType === "ble"
                  ? "bg-cyan-500/30 border-cyan-400 text-cyan-300"
                  : "bg-white/5 border-cyan-400/30 text-cyan-400/60"
              }`}
            >
              <Bluetooth size={18} />
              BLE
            </button>
          </div>
        </div>

        {/* PIN */}
        <div className="mb-6">
          <label className="text-cyan-300 text-sm font-mono mb-2 flex items-center gap-2">
            <Key size={14} />
            LOGIN PIN
          </label>
          <input
            type="password"
            value={localSettings.pin}
            onChange={(e) => setLocalSettings({ ...localSettings, pin: e.target.value })}
            className="w-full bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-3 text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            placeholder="Enter PIN"
          />
        </div>

        {/* Commands */}
        <div className="mb-6">
          <label className="text-cyan-300 text-sm font-mono mb-3 flex items-center gap-2">
            <Terminal size={14} />
            COMMAND CONFIG
          </label>
          <div className="space-y-3">
            {Object.entries(localSettings.commands).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-cyan-400/60 text-xs font-mono w-20 uppercase">{key}</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      commands: { ...localSettings.commands, [key]: e.target.value },
                    })
                  }
                  className="flex-1 bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-cyan-300 font-mono text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            onSave(localSettings)
            onClose()
          }}
          className="w-full py-3 bg-cyan-500/30 border border-cyan-400 rounded-lg text-cyan-300 font-mono uppercase tracking-wider hover:bg-cyan-500/40 transition-all"
        >
          Save Settings
        </button>

        <div className="mt-6 pt-4 border-t border-cyan-400/20 text-center">
          <p className="text-cyan-400/40 text-xs font-mono">OTTER_BOT for CROB</p>
          <p className="text-cyan-400/30 text-xs font-mono">Developed by Anandhu</p>
        </div>
      </div>
    </div>
  )
}
