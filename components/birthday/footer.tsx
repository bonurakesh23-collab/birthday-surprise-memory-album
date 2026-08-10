'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          Made with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <Heart className="h-4 w-4 text-rose" fill="currentColor" />
          </motion.span>
          for my friend
        </p>
        <p className="text-xs text-muted-foreground/80">
          Hope you will achieve everything you want in your life...
        </p>
      </div>
    </footer>
  )
}
