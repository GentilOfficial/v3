"use client";
import {useEffect, useRef} from "react";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const hasMoved = useRef(false);
    const pos = useRef({x: 0, y: 0});
    const current = useRef({x: 0, y: 0});
    const rafRef = useRef(null);

    useEffect(() => {
        const el = cursorRef.current;

        const animate = () => {
            current.current.x += (pos.current.x - current.current.x) * 0.12;
            current.current.y += (pos.current.y - current.current.y) * 0.12;
            el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
            rafRef.current = requestAnimationFrame(animate);
        };

        const moveCursor = (e) => {
            if (e.pointerType === "touch") {
                el.style.opacity = "0";
                return;
            }
            if (!hasMoved.current) {
                hasMoved.current = true;
                current.current = {x: e.clientX, y: e.clientY};
                el.style.opacity = "1";
            }
            pos.current = {x: e.clientX, y: e.clientY};
            el.style.opacity = "1";
        };

        const onMouseDown = () => {
            el.style.scale = "0.5";
        };
        const onMouseUp = () => {
            el.style.scale = "1";
        };

        rafRef.current = requestAnimationFrame(animate);
        window.addEventListener("pointermove", moveCursor);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("pointermove", moveCursor);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed -z-10">
            <div
                ref={cursorRef}
                className="follower size-3 rounded-full bg-secondary-foreground/50 fixed mix-blend-difference -left-1.5"
                style={{opacity: 0, transition: "scale 0.2s ease"}}
            />
        </div>
    );
};

export default CustomCursor;