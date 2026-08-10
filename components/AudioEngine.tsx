'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'

interface AudioEngineProps {
  videoId: string
  startOffset?: number
  isPlaying: boolean
  volume: number
  onProgress: (current: number, duration: number) => void
  onPlayingChange: (playing: boolean) => void
  onReady: (controls: { seek: (seconds: number) => void; playNext: (id: string, offset?: number) => void }) => void
  onError?: () => void
}

export function AudioEngine({
  videoId,
  startOffset,
  isPlaying,
  volume,
  onProgress,
  onPlayingChange,
  onReady,
  onError,
}: AudioEngineProps) {
  const [mounted, setMounted] = useState(false)
  const playerRef = useRef<YouTubePlayer>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo?.()
        } else {
          playerRef.current.pauseVideo?.()
        }
      } catch (e) {
        // ignore errors on unready players
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume?.(volume)
    }
  }, [volume])

  const stopProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current)
  }, [])

  const startProgress = useCallback(() => {
    stopProgress()
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        const played = playerRef.current.getCurrentTime()
        const duration = playerRef.current.getDuration()
        onProgress(played, duration)
      }
    }, 1000)
  }, [onProgress, stopProgress])

  const [initialVideoId] = useState(videoId)

  const handleReady = useCallback(
    (event: YouTubeEvent) => {
      playerRef.current = event.target
      playerRef.current?.setVolume?.(volume)
      if (isPlaying) {
        playerRef.current?.playVideo?.()
      } else {
        playerRef.current?.pauseVideo?.()
      }
      
      onReady({
        seek: (seconds) => {
          if (playerRef.current) {
            playerRef.current.seekTo?.(seconds, true)
          }
        },
        playNext: (vid: string, offset?: number) => {
          if (playerRef.current) {
            if (offset !== undefined) {
              playerRef.current.loadVideoById({ videoId: vid, startSeconds: offset })
            } else {
              playerRef.current.loadVideoById(vid)
            }
            playerRef.current.playVideo?.()
          }
        }
      })
    },
    [volume, isPlaying, onReady]
  )

  const handleStateChange = useCallback((event: YouTubeEvent) => {
    const state = event.data
    // 1 is PLAYING, 0 is ENDED, -1 is UNSTARTED, 5 is CUED, 2 is PAUSED, 3 is BUFFERING
    if (state === 1) {
      startProgress()
    } else {
      stopProgress()
      if (state === 0) {
        onPlayingChange(false)
      } else if (state === 2 && isPlaying) {
        event.target?.playVideo?.()
      } else if ((state === -1 || state === 5) && isPlaying) {
        event.target?.playVideo?.()
      }
    }
  }, [startProgress, stopProgress, onPlayingChange, isPlaying])

  const handleError = useCallback((event: YouTubeEvent) => {
    console.warn("YouTube Player Error:", event.data)
    if (onError) {
      setTimeout(() => onError(), 2000)
    }
  }, [onError])

  useEffect(() => {
    return stopProgress
  }, [stopProgress])

  if (!mounted) {
    return <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '100px', height: '100px', pointerEvents: 'none', opacity: 0, overflow: 'hidden' }} />
  }

  const staticOpts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
  }

  return (
    <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '100px', height: '100px', pointerEvents: 'none', opacity: 0, overflow: 'hidden' }}>
      <YouTube
        videoId={initialVideoId}
        onReady={handleReady}
        onStateChange={handleStateChange}
        onError={handleError}
        opts={staticOpts}
      />
    </div>
  )
}

export function AudioFallback({ isPlaying }: { isPlaying: boolean }) {
  return <span className="sr-only">{isPlaying ? 'Audio playing' : 'Audio paused'}</span>
}

export function AmbientAudio({ videoId, isPlaying, volume = 50 }: { videoId: string, isPlaying: boolean, volume?: number }) {
  const [mounted, setMounted] = useState(false)
  const playerRef = useRef<YouTubePlayer>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo?.()
        } else {
          playerRef.current.pauseVideo?.()
        }
      } catch (e) {
        // ignore errors on unready players
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume?.(volume)
    }
  }, [volume])

  const handleReady = useCallback((event: YouTubeEvent) => {
    playerRef.current = event.target
    playerRef.current?.setVolume?.(volume)
    if (isPlaying) {
      playerRef.current?.playVideo?.()
    } else {
      playerRef.current?.pauseVideo?.()
    }
  }, [isPlaying, volume])

  const handleStateChange = useCallback((event: YouTubeEvent) => {
    if (event.data === 0) { // ENDED
      event.target?.playVideo?.()
    }
  }, [])

  if (!mounted) return null

  return (
    <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '100px', height: '100px', pointerEvents: 'none', opacity: 0, overflow: 'hidden' }}>
      <YouTube
        videoId={videoId}
        onReady={handleReady}
        onStateChange={handleStateChange}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
        }}
      />
    </div>
  )
}
