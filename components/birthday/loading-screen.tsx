'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + Math.random() * 12 + 4, 100)
      })
    }, 180)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <Heart className="h-14 w-14 text-primary" fill="currentColor" />
      </motion.div>

      <p className="mt-8 text-sm tracking-wide text-muted-foreground">
        Preparing something special...
      </p>

      <div className="mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
