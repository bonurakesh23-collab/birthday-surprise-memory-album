'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingScreen } from '@/components/birthday/loading-screen'
import { Sparkles } from '@/components/birthday/sparkles'
import { HeroSection } from '@/components/birthday/hero-section'
import { PhotoGallery } from '@/components/birthday/photo-gallery'
import { VideoSection } from '@/components/birthday/video-section'
import { HeartfeltMessage } from '@/components/birthday/heartfelt-message'
import { MemoryTimeline } from '@/components/birthday/memory-timeline'
import { FavoriteThings } from '@/components/birthday/favorite-things'
import { MusicPlayer } from '@/components/birthday/music-player'
import { FinalSurprise } from '@/components/birthday/final-surprise'
import { Footer } from '@/components/birthday/footer'

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <Sparkles count={25} />}

      <div className="relative z-10">
        <HeroSection revealed={revealed} onOpen={() => setRevealed(true)} />

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <PhotoGallery />
              <VideoSection />
              <HeartfeltMessage />
              <MemoryTimeline />
              <FavoriteThings />
              <MusicPlayer />
              <FinalSurprise />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
