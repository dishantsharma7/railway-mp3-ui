'use client'

import { useState, useEffect } from 'react'

export function OnlineUsers() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Generate an initial random number between 120 and 340
    const initialCount = Math.floor(Math.random() * (340 - 120 + 1)) + 120
    setCount(initialCount)

    // Simulate gently fluctuating user count
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3 // -3 to +3
        const next = prev + change
        return Math.max(10, Math.min(next, 999)) // clamp between 10 and 999
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-white/60 bg-black/20 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md transition-opacity duration-1000 ${count ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
      </div>
      <span>{count} LISTENING</span>
    </div>
  )
}
