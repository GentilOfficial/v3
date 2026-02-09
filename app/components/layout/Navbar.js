import { LanguageSwitcher } from "../ui/LanguageSwitcher"

export default function Navbar() {
  return (
    <nav className=" w-full backdrop-blur-lg bg-background/50 border-b border-foreground/5">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-center w-fit gap-5">
          <div>LOGO</div>
          <div className="h-6 w-px bg-linear-to-b from-foreground/5 via-foreground/50 to-foreground/5 rounded-full"></div>
          <div>LINKS</div>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}
