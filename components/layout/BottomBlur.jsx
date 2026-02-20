import dynamic from "next/dynamic";

const GradualBlur = dynamic(() => import("@/components/ui/GradualBlur"));

export default function BottomBlur() {
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
        />
    );
}
