"use client";

import dynamic from "next/dynamic";
import {motion} from "motion/react";

const ColorBends = dynamic(() => import("@/components/ui/ColorBends"), {
    ssr: false,
});

export default function BackgroundClient(props) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <ColorBends {...props} />
        </motion.div>
    );
}
