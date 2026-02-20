import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-fit mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font uppercase">
          Not found
      </h2>
      <p>
          Could not find the requested resource
      </p>
        <div className="h-0.5 w-4/5 my-4 mx-auto lg:mx-0 bg-linear-to-r from-foreground/0 via-foreground/10 to-foreground/0"></div>
      <Link href="/">
        <Button variant="outline" className="hover:cursor-pointer">
          Return Home
        </Button>
      </Link>
    </div>
  )
}
