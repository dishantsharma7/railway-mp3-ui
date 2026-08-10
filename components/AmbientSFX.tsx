'use client'

import { Coffee, AudioLines } from 'lucide-react'

export function AmbientSFX({ clatter, chai, onClatter, onChai }: { clatter: boolean; chai: boolean; onClatter: () => void; onChai: () => void }) {
  return (
    <div className="flex items-center gap-3" aria-label="Ambient sounds">
      <button 
        type="button" 
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${clatter ? 'bg-white/20 text-white' : 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white/80'}`} 
        onClick={onClatter} 
        aria-pressed={clatter}
        title="Track Clatter"
      >
        <AudioLines size={18} />
      </button>
      <button 
        type="button" 
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${chai ? 'bg-white/20 text-white' : 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white/80'}`} 
        onClick={onChai} 
        aria-pressed={chai}
        title="Chai Vendor"
      >
        <Coffee size={18} />
      </button>
    </div>
  )
}
