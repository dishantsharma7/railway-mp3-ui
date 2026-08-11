'use client'

import { useRef } from 'react'
import { Coffee, AudioLines } from 'lucide-react'

export interface AmbientSFXProps {
  clatter: boolean
  chai: boolean
  clatterVolume: number
  chaiVolume: number
  onClatter: () => void
  onChai: () => void
  onClatterVolume: (vol: number) => void
  onChaiVolume: (vol: number) => void
}

function VerticalSlider({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handlePointer = (e: React.PointerEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    let percent = 100 - (y / rect.height) * 100
    percent = Math.max(0, Math.min(100, percent))
    onChange(Math.round(percent))
  }

  return (
    <div 
      className="h-full w-full flex items-center justify-center cursor-pointer touch-none rounded-full"
      onPointerDown={(e) => {
        isDragging.current = true
        try {
          e.currentTarget.setPointerCapture(e.pointerId)
        } catch (err) {}
        handlePointer(e)
      }}
      onPointerMove={(e) => {
        if (isDragging.current) {
          handlePointer(e)
        }
      }}
      onPointerUp={(e) => {
        isDragging.current = false
        try {
          e.currentTarget.releasePointerCapture(e.pointerId)
        } catch (err) {}
      }}
      onPointerCancel={(e) => {
        isDragging.current = false
        try {
          e.currentTarget.releasePointerCapture(e.pointerId)
        } catch (err) {}
      }}
      aria-label={label}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      tabIndex={0}
    >
      <div className="relative h-16 w-1 flex justify-center" ref={trackRef}>
        {/* Visible track background */}
        <div className="absolute inset-y-0 w-1 bg-white/20 rounded-full pointer-events-none" />
        {/* Filled track */}
        <div className="absolute bottom-0 w-1 bg-white rounded-full transition-all duration-75 pointer-events-none" style={{ height: `${value}%` }} />
        {/* Thumb */}
        <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none transition-all duration-75" style={{ bottom: `calc(${value}% - 6px)` }} />
      </div>
    </div>
  )
}

export function AmbientSFX({ clatter, chai, clatterVolume, chaiVolume, onClatter, onChai, onClatterVolume, onChaiVolume }: AmbientSFXProps) {
  return (
    <div className="flex items-center gap-4" aria-label="Ambient sounds">
      <div className="relative flex flex-col items-center">
        <button 
          type="button" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shrink-0 z-10 ${clatter ? 'bg-white/20 text-white' : 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white/80'}`} 
          onClick={onClatter} 
          aria-pressed={clatter}
          title="Track Clatter"
        >
          <AudioLines size={18} />
        </button>
        {clatter && (
          <div className="absolute top-12 flex items-center justify-center h-24 w-8 bg-black/40 backdrop-blur-md rounded-full shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <VerticalSlider value={clatterVolume} onChange={onClatterVolume} label="Track clatter volume" />
          </div>
        )}
      </div>
      <div className="relative flex flex-col items-center">
        <button 
          type="button" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shrink-0 z-10 ${chai ? 'bg-white/20 text-white' : 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white/80'}`} 
          onClick={onChai} 
          aria-pressed={chai}
          title="Chai Vendor"
        >
          <Coffee size={18} />
        </button>
        {chai && (
          <div className="absolute top-12 flex items-center justify-center h-24 w-8 bg-black/40 backdrop-blur-md rounded-full shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <VerticalSlider value={chaiVolume} onChange={onChaiVolume} label="Chai vendor volume" />
          </div>
        )}
      </div>
    </div>
  )
}
