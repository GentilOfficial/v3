import {cn} from "@/lib/utils";

export default function Divider({position = "horizontal", className}) {
    if (position === "vertical") {
        return (
            <span className={cn(
                "block h-8 w-px mx-2 bg-linear-to-b from-foreground/0 via-foreground/10 to-foreground/0",
                className
            )}></span>
        );
    }

    return (
        <span className={cn(
            "block h-px w-4/5 my-2 bg-linear-to-r from-foreground/0 via-foreground/20 to-foreground/0",
            className
        )}></span>
    );
}