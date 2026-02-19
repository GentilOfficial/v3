import LogoLoop from "@/components/ui/LogoLoop";
import {cn} from "@/lib/utils";

export default function TechStackLoop({icons, className}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden max-w-md w-full opacity-60 mask-[linear-gradient(to_right,transparent,white,transparent)]",
                className
            )}>
            <LogoLoop
                logos={icons}
                speed={50}
                direction="left"
                logoHeight={35}
                gap={55}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#0a0a0a0a"
                ariaLabel="Tech Stack Loop"
            />
        </div>
    );
}