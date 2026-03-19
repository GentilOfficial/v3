"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useRef, useState } from "react"

const FINE_POINTER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)"

const CustomCursor = () => {
  const hasMoved = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  const springConfig = {
    stiffness: 220,
    damping: 28,
    mass: 0.6,
  }

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const mediaQuery = window.matchMedia(FINE_POINTER_MEDIA_QUERY)

    const syncEnabled = () => {
      const nextEnabled = mediaQuery.matches

      setEnabled(nextEnabled)

      if (!nextEnabled) {
        hasMoved.current = false
        setIsPressed(false)
        opacity.set(0)
      }
    }

    syncEnabled()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncEnabled)
      return () => mediaQuery.removeEventListener("change", syncEnabled)
    }

    mediaQuery.addListener(syncEnabled)
    return () => mediaQuery.removeListener(syncEnabled)
  }, [opacity])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const moveCursor = (event) => {
      if (event.pointerType === "touch") {
        opacity.set(0)
        return
      }

      if (!hasMoved.current) {
        hasMoved.current = true
        x.set(event.clientX)
        y.set(event.clientY)
        opacity.set(1)
        return
      }

      x.set(event.clientX)
      y.set(event.clientY)
      opacity.set(1)
    }

    const handlePointerDown = (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        setIsPressed(true)
      }
    }

    const handlePointerUp = () => setIsPressed(false)

    window.addEventListener("pointermove", moveCursor)
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("pointermove", moveCursor)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [enabled, opacity, x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 -z-10"
      style={{
        x: springX,
        y: springY,
        opacity,
      }}
    >
      <motion.div
        animate={{
          scale: isPressed ? 0.5 : 1,
        }}
        transition={{
          type: isPressed ? "tween" : "spring",
          duration: isPressed ? 0.15 : undefined,
          stiffness: 300,
          damping: 20,
        }}
        className="size-3 rounded-full bg-foreground/20 mix-blend-difference -translate-x-3 -translate-y-3"
      />
    </motion.div>
  )
}

export default CustomCursor
