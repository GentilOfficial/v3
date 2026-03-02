"use client"

import React from "react"

const POSITIONS = {
    top: {
        top: 0,
        left: 0,
        right: 0,
        maskImage: "linear-gradient(to top, transparent, black)",
    },
    bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        maskImage: "linear-gradient(to bottom, transparent, black)",
    },
    left: {
        top: 0,
        bottom: 0,
        left: 0,
        maskImage: "linear-gradient(to left, transparent, black)",
    },
    right: {
        top: 0,
        bottom: 0,
        right: 0,
        maskImage: "linear-gradient(to right, transparent, black)",
    },
}

const GradualBlur = ({
                         position = "bottom",
                         strength = 2,
                         size = "6rem",
                         opacity = 1,
                         zIndex = 1000,
                         target = "parent",
                         className = "",
                         style = {},
                     }) => {
    const pos = POSITIONS[position] || POSITIONS.bottom
    const isVertical = ["top", "bottom"].includes(position)

    const containerStyle = {
        position: target === "page" ? "fixed" : "absolute",
        pointerEvents: "none",
        zIndex: target === "page" ? zIndex + 100 : zIndex,
        ...(isVertical
            ? {height: size, width: "100%", ...pos}
            : {width: size, height: "100%", ...pos}),
        maskImage: pos.maskImage,
        WebkitMaskImage: pos.maskImage,
        backdropFilter: `blur(${strength * 0.25}rem)`,
        WebkitBackdropFilter: `blur(${strength * 0.25}rem)`,
        opacity,
        ...style,
    }

    return (
        <div
            className={`gradual-blur ${className}`}
            style={containerStyle}
        />
    )
}

export default React.memo(GradualBlur)