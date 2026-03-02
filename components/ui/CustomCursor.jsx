"use client"

import {motion, useMotionValue, useSpring} from "motion/react"
import {useEffect, useRef, useState} from "react"

const CustomCursor = () => {
    const hasMoved = useRef(false)
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
        const moveCursor = (e) => {
            const isTouch = e.pointerType === "touch"

            if (isTouch) {
                opacity.set(0)
                return
            }

            if (!hasMoved.current) {
                hasMoved.current = true
                x.set(e.clientX)
                y.set(e.clientY)
                opacity.set(1)
                return
            }

            x.set(e.clientX)
            y.set(e.clientY)
            opacity.set(1)
        }

        const onMouseDown = () => setIsPressed(true)
        const onMouseUp = () => setIsPressed(false)

        window.addEventListener("pointermove", moveCursor)
        window.addEventListener("pointerdown", onMouseDown)
        window.addEventListener("pointerup", onMouseUp)

        return () => {
            window.removeEventListener("pointermove", moveCursor)
            window.removeEventListener("pointerdown", onMouseDown)
            window.removeEventListener("pointerup", onMouseUp)
        }
    }, [x, y, opacity])

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
                className="size-3 rounded-full bg-secondary-foreground/50 mix-blend-difference -translate-x-3 -translate-y-3"
            />
        </motion.div>
    )
}

export default CustomCursor