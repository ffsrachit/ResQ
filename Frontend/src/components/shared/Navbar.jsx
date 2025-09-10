import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          DRRM Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/disasters" className="hover:text-blue-600">Disasters</Link>
          <Link to="/resources" className="hover:text-blue-600">Resources</Link>
          <Link to="/volunteers" className="hover:text-blue-600">Volunteers</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="destructive">Request Help</Button>
          <Button>Donate</Button>
          <Button variant="outline">Login</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-3">
          <Link to="/disasters" className="block">Disasters</Link>
          <Link to="/resources" className="block">Resources</Link>
          <Link to="/volunteers" className="block">Volunteers</Link>
          <Link to="/about" className="block">About</Link>
          <Button className="w-full" variant="destructive">Request Help</Button>
          <Button className="w-full">Donate</Button>
          <Button className="w-full" variant="outline">Login</Button>
        </div>
      )}
    </nav>
  )
}
