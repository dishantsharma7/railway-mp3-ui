'use client'

import { MapPin } from 'lucide-react'
import type { Track } from '@/data/playlist'

interface StationBoardProps {
  track: Track
  index: number
  total: number
  currentTime: number
  duration: number
  onSeek: (seconds: number) => void
}

const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`

export function StationBoard({ track, index, total, currentTime, duration, onSeek }: StationBoardProps) {
  const percent = duration ? Math.min(100, (currentTime / duration) * 100) : 0
  
  return (
    <div className="w-full flex flex-col w-full min-w-0" aria-label="Now playing">
      <h2 className="truncate text-base sm:text-lg font-semibold text-white drop-shadow-sm leading-tight">{track.title}</h2>
      <p className="truncate text-xs sm:text-sm text-white/70 mb-2">{track.artist} <span className="opacity-50">•</span> {track.movie}</p>
      
      <div className="w-full mb-1">
        <div className="railway-progress w-full group">
          <div className="railway-progress-fill bg-white" style={{ width: `${percent}%` }} />
          <button type="button" className="railway-progress-hit" aria-label="Seek through song" onClick={(event) => { const rect = event.currentTarget.getBoundingClientRect(); onSeek(((event.clientX - rect.left) / rect.width) * duration) }} />
        </div>
      </div>
      <div className="flex justify-between text-[11px] font-mono text-white/50 tracking-wider">
        <span>{formatTime(currentTime)}</span>
        <span className="opacity-50">STATION {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
        <span>{formatTime(duration || track.duration)}</span>
      </div>
    </div>
  )
}
