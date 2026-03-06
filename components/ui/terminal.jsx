"use client";
import {
    Children,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import {motion, useInView} from "motion/react";

import {cn} from "@/lib/utils"

const SequenceContext = createContext(null)

const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext(null)
const useItemIndex = () => useContext(ItemIndexContext)

export const AnimatedSpan = ({
                                 children,
                                 delay = 0,
                                 className,
                                 startOnView = false,
                                 ...props
                             }) => {
    const elementRef = useRef(null)
    const isInView = useInView(elementRef, {
        amount: 0.3,
        once: true,
    })

    const sequence = useSequence()
    const itemIndex = useItemIndex()
    const shouldAnimate = sequence
        ? sequence.sequenceStarted && itemIndex !== null && sequence.activeIndex >= itemIndex
        : startOnView ? isInView : true

    return (
        <motion.span
            ref={elementRef}
            initial={{opacity: 0, y: -5}}
            animate={shouldAnimate ? {opacity: 1, y: 0} : {opacity: 0, y: -5}}
            transition={{duration: 0.3, delay: sequence ? 0 : delay / 1000}}
            className={cn("grid text-sm font-mono tracking-tight", className)}
            onAnimationComplete={() => {
                if (!sequence) return
                if (itemIndex === null) return
                if (sequence.activeIndex === itemIndex) {
                    sequence.completeItem(itemIndex)
                }
            }}
            {...props}>
            {children}
        </motion.span>
    );
}

export const TypingAnimation = ({
                                    children,
                                    className,
                                    duration = 60,
                                    delay = 0,
                                    as: Component = "span",
                                    startOnView = true,
                                    ...props
                                }) => {
    if (typeof children !== "string") {
        throw new Error("TypingAnimation: children must be a string. Received:")
    }

    const MotionComponent = useMemo(() =>
        motion.create(Component, {
            forwardMotionProps: true,
        }), [Component])

    const sequence = useSequence()
    const itemIndex = useItemIndex()

    const [displayedText, setDisplayedText] = useState("")
    const [started, setStarted] = useState(false)
    const hasStartedRef = useRef(false)
    const hasCompletedRef = useRef(false)
    const sequenceRef = useRef(sequence)
    const itemIndexRef = useRef(itemIndex)
    const elementRef = useRef(null)
    const isInView = useInView(elementRef, {
        amount: 0.3,
        once: true,
    })

    useEffect(() => {
        sequenceRef.current = sequence
        itemIndexRef.current = itemIndex
    }, [sequence, itemIndex])

    const shouldStart = useMemo(() => {
        if (sequence && itemIndex !== null) {
            return sequence.sequenceStarted && sequence.activeIndex === itemIndex
        }
        if (!startOnView) return true
        return isInView
    }, [sequence, itemIndex, startOnView, isInView])

    useEffect(() => {
        if (!shouldStart || hasStartedRef.current) return

        const startTimeout = setTimeout(() => {
            hasStartedRef.current = true
            setStarted(true)
        }, delay)

        return () => clearTimeout(startTimeout)
    }, [delay, shouldStart])

    useEffect(() => {
        if (!started || hasCompletedRef.current) return

        let i = 0
        const typingEffect = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1))
                i++
            } else {
                clearInterval(typingEffect)
                if (!hasCompletedRef.current) {
                    hasCompletedRef.current = true
                    const currentSequence = sequenceRef.current
                    const currentIndex = itemIndexRef.current
                    if (currentSequence && currentIndex !== null) {
                        currentSequence.completeItem(currentIndex)
                    }
                }
            }
        }, duration)

        return () => {
            clearInterval(typingEffect)
        };
    }, [children, duration, started])

    return (
        <MotionComponent
            ref={elementRef}
            className={cn("text-sm font-mono tracking-tight", className)}
            {...props}>
            {displayedText}
        </MotionComponent>
    );
}

export const Terminal = ({
                             children,
                             className,
                             sequence = true,
                             startOnView = true
                         }) => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, {
        amount: 0.3,
        once: true,
    })

    const [activeIndex, setActiveIndex] = useState(0)
    const sequenceHasStarted = sequence ? !startOnView || isInView : false
    const completeItem = useCallback((index) => {
        setActiveIndex((current) => (index === current ? current + 1 : current))
    }, [])

    const contextValue = useMemo(() => {
        if (!sequence) return null
        return {
            completeItem,
            activeIndex,
            sequenceStarted: sequenceHasStarted,
        };
    }, [sequence, activeIndex, sequenceHasStarted, completeItem])

    const wrappedChildren = useMemo(() => {
        if (!sequence) return children
        const array = Children.toArray(children)
        return array.map((child, index) => (
            <ItemIndexContext.Provider key={index} value={index}>
                {child}
            </ItemIndexContext.Provider>
        ));
    }, [children, sequence])

    const content = (
        <div
            ref={containerRef}
            className={cn(
                "border-border bg-background size-full rounded-xl border shadow-lg",
                className
            )}>
            <div className="border-border flex flex-col gap-y-2 border-b p-4">
                <div className="flex flex-row gap-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
            </div>
            <pre className="p-4 whitespace-pre-wrap">
              <code className="grid gap-y-1 overflow-auto">{wrappedChildren}</code>
            </pre>
        </div>
    )

    if (!sequence) return content

    return (
        <SequenceContext.Provider value={contextValue}>
            {content}
        </SequenceContext.Provider>
    );
}
