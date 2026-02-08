import { LanguageSwitcher } from "./LanguageSwitcher"

export default function Navbar() {
  return (
    <nav className=" w-full backdrop-blur-md bg-white/30 shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-center w-fit gap-5">
          <div>LOGO</div>
          <div className="h-6 w-px bg-linear-to-b from-black/5 via-black/50 to-black/5 rounded-full"></div>
          <div>LINKS</div>
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  )
}
