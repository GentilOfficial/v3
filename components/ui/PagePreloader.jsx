'use client'

import { useLoading } from '@/providers/LoadingProvider'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function PagePreloader({ content }) {
  const { setIsLoading } = useLoading()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('INITIALIZING_SYSTEM')

  const { loadingSteps } = content

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            setIsLoading(false)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const stepIndex = Math.min(Math.floor((progress / 100) * loadingSteps.length), loadingSteps.length - 1)
    setStatus(loadingSteps[stepIndex])
  }, [progress])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background p-6 font-mono"
        >
          <div className="relative w-full max-w-xs flex flex-col gap-4">
            <div className="flex justify-between items-end text-[10px] uppercase tracking-widest text-foreground/40">
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-bold"
              >
                {status}
              </motion.span>
              <span>{Math.floor(progress)}%</span>
            </div>

            <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden border border-foreground/5">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="grid grid-cols-10 gap-1 opacity-20">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.2 }}
                  animate={{
                    opacity: progress > (i / 40) * 100 ? 1 : 0.2,
                    scale: progress > (i / 40) * 100 ? 1.1 : 1,
                  }}
                  className={`size-1 rounded-full ${progress > (i / 40) * 100 ? 'bg-primary' : 'bg-foreground/20'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
