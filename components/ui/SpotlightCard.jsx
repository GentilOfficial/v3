"use client"

import {useRef, useState} from "react"
import {motion, useMotionTemplate, useMotionValue, useSpring, useTransform,} from "motion/react"

const SpotlightCard = ({
                           children,
                           className = "",
                           spotlightColor = "rgba(255, 255, 255, 0.25)",
                       }) => {
    const divRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)
    const [opacity, setOpacity] = useState(0)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = {
        stiffness: 220,
        damping: 28,
        mass: 0.6,
    }

    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    // offset translate-3 = 12px
    const offsetX = useTransform(springX, (v) => v - 12)
    const offsetY = useTransform(springY, (v) => v - 12)

    const background = useMotionTemplate`
    radial-gradient(circle at ${offsetX}px ${offsetY}px, ${spotlightColor}, transparent 80%)
  `

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return
        const rect = divRef.current.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
    }

    const handleFocus = () => {
        setIsFocused(true)
        setOpacity(0.6)
    }

    const handleBlur = () => {
        setIsFocused(false)
        setOpacity(0)
    }

    const handleMouseEnter = () => setOpacity(0.6)
    const handleMouseLeave = () => setOpacity(0)

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-border bg-background p-4 ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background,
                }}
            />
            {children}
        </div>
    )
}

export default SpotlightCard