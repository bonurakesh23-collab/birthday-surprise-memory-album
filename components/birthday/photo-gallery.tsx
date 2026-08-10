'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeading, SectionIntro, SectionLabel } from './section-heading'

type Photo = {
  src: string
  caption: string
  height: string
  rotate: number
}

const photos: Photo[] = [
  { src: '/gallery/photo-1.png', caption: 'Keep Smiling', height: 'h-72', rotate: -2 },
  { src: '/gallery/photo-2.png', caption: "You're Brave", height: 'h-96', rotate: 2 },
  { src: '/gallery/photo-3.png', caption: 'Too Kind', height: 'h-64', rotate: -1.5 },
  { src: '/gallery/photo-4.png', caption: 'Haha', height: 'h-96', rotate: 1.5 },
  { src: '/gallery/photo-5.png', caption: 'View You Love', height: 'h-72', rotate: -2 },
  { src: '/gallery/photo-6.png', caption: 'Keep Going', height: 'h-80', rotate: 2 },
]

export function PhotoGallery() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionLabel>Celebrating You</SectionLabel>
          <SectionHeading lead="Aap Ka" highlight="Photos" />
          <SectionIntro>Every photo tells a story of how amazing you are</SectionIntro>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.figure
              key={photo.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
              whileHover={{ scale: 1.03, y: -8, rotate: photo.rotate }}
              className="polaroid group cursor-pointer self-start"
            >
              <div className={`relative w-full overflow-hidden rounded-sm ${photo.height}`}>
                <Image
                  src={photo.src || '/placeholder.svg'}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <figcaption className="pt-4 text-center font-sans text-sm italic text-muted-foreground">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
