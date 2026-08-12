'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react'
import { SectionHeading, SectionLabel } from './section-heading'

const AUDIO_SRC = '/Pi7_merged_audio.mp3'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrent(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>Your Favourite Song</SectionLabel>
          <SectionHeading lead="Press" highlight="Play" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 w-full max-w-[440px] rounded-2xl border border-border bg-card p-8 shadow-xl"
        >
          <audio ref={audioRef} src={AUDIO_SRC} loop preload="metadata" />

          {/* album art */}
          <div className="flex justify-center">
            <motion.div
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={
                playing
                  ? { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }
                  : { duration: 0.4 }
              }
              className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-primary/70 via-accent to-rose/70 shadow-inner"
            >
              <Music className="h-14 w-14 text-primary-foreground" />
              <span className="absolute h-6 w-6 rounded-full bg-card ring-2 ring-border" />
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="font-serif text-2xl text-card-foreground">Your Special Song</h3>
            <p className="mt-1 text-sm text-muted-foreground">A song that reminds me of you</p>
          </div>

          {/* progress */}
          <div className="mt-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="rounded-full p-2 text-muted-foreground transition hover:text-foreground"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <motion.button
              type="button"
              onClick={togglePlay}
              whileTap={{ scale: 0.92 }}
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            >
              {playing ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
              )}
            </motion.button>
            <span className="h-9 w-9" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
