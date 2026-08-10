'use client'

import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

interface ControlsProps {
  isPlaying: boolean
  volume: number
  onToggle: () => void
  onPrevious: () => void
  onNext: () => void
  onVolume: (value: number) => void
}

export function Controls({ isPlaying, volume, onToggle, onPrevious, onNext, onVolume }: ControlsProps) {
  return (
    <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3" aria-label="Music controls">
      <div className="flex items-center gap-3">
        <button type="button" className="text-white/60 hover:text-white transition active:scale-95" onClick={onPrevious} aria-label="Previous track"><SkipBack size={18} fill="currentColor" /></button>
        <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95" onClick={onToggle} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
        <button type="button" className="text-white/60 hover:text-white transition active:scale-95" onClick={onNext} aria-label="Next track"><SkipForward size={18} fill="currentColor" /></button>
      </div>
      
      <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors sm:ml-0 ml-auto group">
        {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume} 
          onChange={(event) => onVolume(Number(event.target.value))} 
          aria-label="Volume" 
          className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer overflow-hidden [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:shadow-[-100px_0_0_100px_rgba(255,255,255,0.8)]"
        />
      </div>
    </div>
  )
}
