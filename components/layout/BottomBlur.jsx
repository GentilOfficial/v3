"use client";

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

const GradualBlur = dynamic(() => import("@/components/ui/GradualBlur"));

export default function BottomBlur() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            {threshold: 0.1}
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    if (!visible) return null;

    return (
        <GradualBlur
            target="page"
            position="bottom"
            height="7rem"
            strength={1}
            divCount={2}
            curve="bezier"
            exponential={false}
            opacity={1}
            className="hidden lg:block"
        />
    );
}