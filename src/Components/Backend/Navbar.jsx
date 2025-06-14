import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/PCClogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email) {
      setIsLoggedIn(true);
    }
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Documents", href: "/documents" },
    { name: "Upload", href: "/upload" },
    ...(isLoggedIn ? [] : [{ name: "Login/SignUp", href: "/login" }]),
    { name: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bg-[#800000] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Name */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="ChurchNest" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">ChurchNest</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-[#FFD700] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#800000] px-4 pb-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-white hover:text-[#FFD700] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      
    </nav>
  );
}
