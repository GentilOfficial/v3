"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const hasMoved = useRef(false);

    useEffect(() => {
        const moveCursor = (e) => {
            const isTouch = e.pointerType === "touch";

            if (!hasMoved.current) {
                if (isTouch) return;
                hasMoved.current = true;
                gsap.set(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                });
                return;
            }

            gsap.to(cursorRef.current, {
                x: !isTouch ? e.clientX : undefined,
                y: !isTouch ? e.clientY : undefined,
                opacity: isTouch ? 0 : 1,
                duration: isTouch ? 0 : 1,
                ease: "power2.out",
            });
        };

        window.addEventListener("pointermove", moveCursor);
        return () => window.removeEventListener("pointermove", moveCursor);
    }, []);

    return (
        <div className="pointer-events-none fixed -z-10">
            <div
                ref={cursorRef}
                className="follower size-3 rounded-full bg-secondary-foreground/50 fixed mix-blend-difference -left-1.5"
                style={{ opacity: 0 }}
            />
        </div>
    );
};

export default CustomCursor;
