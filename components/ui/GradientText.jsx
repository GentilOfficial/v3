"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react"

export default function GradientText({
  children,
  className = "",
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 8,
  direction = "horizontal",
  yoyo = true,
}) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const animationDuration = animationSpeed * 1000

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += deltaTime

    if (yoyo) {
      const fullCycle = animationDuration * 2
      const cycleTime = elapsedRef.current % fullCycle

      progress.set(
        cycleTime < animationDuration
          ? (cycleTime / animationDuration) * 100
          : 100 - ((cycleTime - animationDuration) / animationDuration) * 100,
      )
      return
    }

    // Keep the gradient moving continuously when yoyo is disabled.
    progress.set((elapsedRef.current / animationDuration) * 100)
  })

  useEffect(() => {
    elapsedRef.current = 0
    lastTimeRef.current = null
    progress.set(0)
  }, [animationSpeed, progress, yoyo])

  const backgroundPosition = useTransform(progress, (value) => {
    if (direction === "vertical") {
      return `50% ${value}%`
    }

    if (direction === "diagonal") {
      return `${value}% ${value}%`
    }

    return `${value}% 50%`
  })

  const gradientAngle =
    direction === "vertical"
      ? "to bottom"
      : direction === "diagonal"
        ? "to bottom right"
        : "to right"

  const gradientColors = [...colors, colors[0]].join(", ")

  return (
    <motion.span className={className}>
      <motion.span
        className="relative z-2 inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
          backgroundPosition,
          backgroundRepeat: "repeat",
          backgroundSize:
            direction === "horizontal"
              ? "300% 100%"
              : direction === "vertical"
                ? "100% 300%"
                : "300% 300%",
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
