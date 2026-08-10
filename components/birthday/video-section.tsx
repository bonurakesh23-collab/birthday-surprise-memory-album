'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react'
import { SectionHeading, SectionIntro, SectionLabel } from './section-heading'

const VIDEO_SRC = '/birthday-video.mp4'
const VIDEO_POSTER = '/gallery/komali-2.jpeg'

export function VideoSection() {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const close = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setPlaying(false)
    setOpen(false)
  }

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>A Special Moment</SectionLabel>
          <SectionHeading lead="Birthday" highlight="Memories" />
          <SectionIntro>Press play to watch something special</SectionIntro>
        </div>

        <div className="mt-14 flex justify-center">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="watch-btn"
                type="button"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Play className="h-4 w-4" fill="currentColor" />
                Watch Birthday Video
              </motion.button>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="relative rounded-2xl bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 p-[2px] shadow-2xl">
                  <div
                    className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => playing && setShowControls(false)}
                  >
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover"
                      poster={VIDEO_POSTER}
                      playsInline
                      onEnded={() => setPlaying(false)}
                    >
                      <source src={VIDEO_SRC} type="video/mp4" />
                    </video>

                    {/* corner brackets */}
                    <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-primary/70" />
                    <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-primary/70" />
                    <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-primary/70" />
                    <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-primary/70" />

                    {/* close */}
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close video"
                      className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* controls */}
                    <AnimatePresence>
                      {showControls && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-10 flex flex-col justify-between"
                        >
                          <div className="flex flex-1 items-center justify-center">
                            <button
                              type="button"
                              onClick={togglePlay}
                              aria-label={playing ? 'Pause' : 'Play'}
                              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg backdrop-blur transition hover:scale-105"
                            >
                              {playing ? (
                                <Pause className="h-6 w-6" fill="currentColor" />
                              ) : (
                                <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                            <span className="text-xs font-medium tracking-wide text-white">
                              Birthday Video
                            </span>
                            <button
                              type="button"
                              onClick={toggleMute}
                              aria-label={muted ? 'Unmute' : 'Mute'}
                              className="rounded-full bg-white/20 p-1.5 text-white backdrop-blur transition hover:bg-white/30"
                            >
                              {muted ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm italic text-muted-foreground">
                  Every moment with you is worth celebrating
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
