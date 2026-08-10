'use client'

import { useCallback, useState, useEffect } from 'react'
import { AudioEngine, AudioFallback, AmbientAudio } from '@/components/AudioEngine'
import { AmbientSFX } from '@/components/AmbientSFX'
import { Controls } from '@/components/Controls'
import { StationBoard } from '@/components/StationBoard'
import { Clock } from '@/components/Clock'
import { OnlineUsers } from '@/components/OnlineUsers'
import { playlist } from '@/data/playlist'
import { TrainFront } from 'lucide-react'

export default function Page() {
  const [boarded, setBoarded] = useState(false)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(62)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(playlist[0].duration)
  const [clatter, setClatter] = useState(false)
  const [chai, setChai] = useState(false)
  const [controls, setControls] = useState<{ seek: (s: number) => void; playNext?: (vid: string, offset?: number) => void } | null>(null)
  
  const next = useCallback(() => { 
    setIndex((current) => {
      const nextIdx = (current + 1) % playlist.length
      const nextTrack = playlist[nextIdx]
      if (controls?.playNext) {
        controls.playNext(nextTrack.youtubeId, nextTrack.offset)
      }
      return nextIdx
    })
    setCurrentTime(0) 
  }, [controls])
  
  const previous = useCallback(() => { 
    setIndex((current) => {
      const prevIdx = (current - 1 + playlist.length) % playlist.length
      const prevTrack = playlist[prevIdx]
      if (controls?.playNext) {
        controls.playNext(prevTrack.youtubeId, prevTrack.offset)
      }
      return prevIdx
    })
    setCurrentTime(0) 
  }, [controls])
  
  const [seek, setSeek] = useState<(seconds: number) => void>(() => () => undefined)
  const track = playlist[index]
  
  const handleProgress = useCallback((current: number, total: number) => { setCurrentTime(current); if (total > 0) setDuration(total) }, [])
  const handleReady = useCallback((c: any) => { setControls(c); setSeek(() => c.seek) }, [])



  return (
    <>
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero_bg.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
      </div>
      <AudioEngine videoId={track.youtubeId} startOffset={track.offset} isPlaying={isPlaying} volume={volume} onProgress={handleProgress} onPlayingChange={setIsPlaying} onReady={handleReady} onError={next} />
      <AmbientAudio videoId="lca-9fw9B8Y" isPlaying={clatter && isPlaying} volume={Math.min(volume * 0.8, 100)} />
      <AmbientAudio videoId="KcAhQU5xXbU" isPlaying={chai && isPlaying} volume={Math.min(volume * 0.6, 100)} />
      
      {!boarded ? (
        <main className="min-h-dvh flex items-center justify-center p-6 relative z-10">
          <div className="glass-panel p-10 max-w-md w-full rounded-2xl text-center shadow-2xl transition-opacity duration-500">
            <TrainFront size={48} className="mx-auto mb-6 text-white/80" />
            <div className="text-xs tracking-widest text-white/60 mb-2 font-mono">IR • 1997</div>
            <div className="text-xl md:text-2xl font-hindi text-white/50 mb-4">भारतीय रेल</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-white mb-6 tracking-tighter drop-shadow-2xl flex flex-col items-center leading-none">
              <span className="bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent pb-1">Window Seat</span>
              <span className="text-white/60 italic font-light tracking-wide text-4xl sm:text-5xl md:text-6xl -mt-2 sm:-mt-3">Radio</span>
            </h1>
            <p className="text-sm text-white/70 mb-10">Close the door. Let the landscape blur. Your night train is waiting.</p>
            <button type="button" className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm hover:scale-105 transition active:scale-95 shadow-lg" onClick={() => { setBoarded(true); setIsPlaying(true) }}>
              BOARD TRAIN
            </button>
          </div>
        </main>
      ) : (
        <main className="min-h-dvh flex flex-col justify-between items-center relative overflow-hidden animate-in fade-in duration-700 z-10">
          <AudioFallback isPlaying={isPlaying} />
          
          <header className="w-full p-6 sm:p-10 flex justify-between items-center relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 text-white/80 z-10">
              <TrainFront size={22} className="shrink-0 text-white/70" />
              <div className="hidden md:flex flex-col justify-center">
                <span className="font-serif tracking-wide text-lg drop-shadow-md leading-none">
                  Window Seat <span className="text-white/60 italic font-light tracking-widest">Radio</span>
                </span>
              </div>
            </div>
            
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 mt-1">
              <span className="text-3xl sm:text-4xl font-hindi text-white/50 drop-shadow-lg">भारतीय रेल</span>
              <OnlineUsers />
            </div>

            <div className="z-10">
              <AmbientSFX clatter={clatter} chai={chai} onClatter={() => setClatter((value) => !value)} onChai={() => setChai((value) => !value)} />
            </div>
          </header>

          <div className="flex-1 flex items-end justify-center w-full px-4 sm:px-6 z-10 pb-4 sm:pb-8">
            <div className="glass-panel w-full max-w-lg sm:max-w-xl rounded-[3rem] sm:rounded-full p-3 sm:p-4 pr-5 sm:pr-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 shadow-2xl">
              {/* Spinning Record */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden [transform:translateZ(0)]">
                <div 
                  className="w-full h-full rounded-full bg-black/60 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden animate-[spin_10s_linear_infinite]"
                  style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                >
                   {/* Gradient simulating light reflection on vinyl */}
                   <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.1)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.1)_225deg,transparent_270deg)] mix-blend-overlay" />
                   
                   {/* Record grooves */}
                   <div className="absolute inset-2 border border-white/5 rounded-full" />
                   <div className="absolute inset-4 border border-white/5 rounded-full" />
                   <div className="absolute inset-6 border border-white/5 rounded-full" />
                   <div className="absolute inset-8 border border-white/5 rounded-full" />
                   
                   {/* Center Label (Album Art) */}
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] bg-black">
                      <img 
                         src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`} 
                         alt={track.title} 
                         className="w-full h-full object-cover scale-125 opacity-90 rounded-full" 
                      />
                      {/* Spindle hole */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-white/10" />
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="flex-1 w-full flex flex-col sm:flex-row items-center justify-between min-w-0 gap-4 sm:gap-6">
                <div className="flex-1 min-w-0 w-full">
                  <StationBoard track={track} index={index} total={playlist.length} currentTime={currentTime} duration={duration} onSeek={seek} />
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Controls isPlaying={isPlaying} volume={volume} onToggle={() => setIsPlaying((playing) => !playing)} onPrevious={previous} onNext={next} onVolume={setVolume} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center w-full pb-6 pt-2 sm:absolute sm:bottom-6 sm:right-10 sm:w-auto sm:pb-0 sm:pt-0 z-20">
            <Clock />
          </div>
        </main>
      )}
    </>
  )
}
