'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { SectionHeading, SectionLabel } from './section-heading'

const MESSAGE = `Happy birthday! I hope all your birthday wishes and dreams come true,

Count your life by smiles, no tears, Count your age by friends, not years. Happy Birthday!

The God given for me a greatest gift for You 🥰 ......

I am so lucky thankful to God & makes it much more joyful & colorful & happiness ☺️ ......

Wishing you all the most precious thing in life ......

may you reach your goal successfully 💐 .....`

export function HeartfeltMessage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, amount: 0.35 })
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTyped(MESSAGE.slice(0, i))
      if (i >= MESSAGE.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section className="bg-card-tint px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl" ref={containerRef}>
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>From My Heart to Yours</SectionLabel>
          <SectionHeading lead="A" highlight="Letter" className="!text-4xl md:!text-5xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-12"
        >
          {/* tape */}
          <div className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 -rotate-3 rounded-sm bg-accent/40 shadow-sm backdrop-blur-sm" />

          <div className="flex justify-center">
            <Heart className="h-7 w-7 text-primary" fill="currentColor" />
          </div>

          <p className="mt-6 whitespace-pre-wrap text-pretty font-serif text-lg leading-relaxed text-card-foreground">
            {typed}
            {!done && <span className="typing-cursor bg-primary">&nbsp;</span>}
          </p>

          <div className="mt-6 flex justify-end">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              <Heart className="h-6 w-6 text-rose" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
