"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/authProvider"; 

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useAuth();

  return (
    <nav className="max-w-7xl py-5 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-blue-800 font-poppins">Skill</span>
          <span className="font-inter">Swap</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link className="hover:text-blue-800 transition-colors duration-200" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-800 transition-colors duration-200" href="/browse">
            Browse
          </Link>
          <Link className="hover:text-blue-800 transition-colors duration-200" href="/about">
            About
          </Link>
          <Link className="hover:text-blue-800 transition-colors duration-200" href="/contact">
            Contact
          </Link>
        </div>

        {/* Right side (Auth buttons or Profile/Logout) */}
        <div className="hidden md:flex gap-3 font-poppins">
          {session ? (
            <ButtonsForLoggedInUsers />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => router.push("/login")}
                className="cursor-pointer hover:bg-primary-btn-hover font-semibold transition-colors duration-200"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/signup")}
                className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold transition-colors duration-200"
              >
                Signup
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          {session ? (
            <ButtonsForLoggedInUsers />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => router.push("/login")}
                className="cursor-pointer hover:bg-primary-btn-hover font-semibold py-1 px-3 text-sm transition-colors duration-200"
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => router.push("/signup")}
                className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold py-1 px-3 text-sm transition-colors duration-200"
              >
                Signup
              </Button>
            </>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-blue-800 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                opacity: { duration: 0.1 },
                height: { duration: 0.2 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.1 },
                height: { duration: 0.2 },
              },
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-4 pb-4 space-y-3">
              <Link
                className="block hover:text-blue-800 py-2 transition-colors duration-200"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className="block hover:text-blue-800 py-2 transition-colors duration-200"
                href="/browse"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                className="block hover:text-blue-800 py-2 transition-colors duration-200"
                href="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                className="block hover:text-blue-800 py-2 transition-colors duration-200"
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

function ButtonsForLoggedInUsers() {
  const router = useRouter();
  return (
    <div className="flex gap-3 font-poppins">
      <Button
        variant="secondary"
        onClick={() => router.push(`/profile/me`)}
        className="cursor-pointer hover:bg-primary-btn-hover font-semibold py-1 px-3 text-sm transition-colors duration-200"
      >
        Profile
        <User />
      </Button>
      <Button
        variant="default"
        onClick={() => router.push("/logout")}
        className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold py-1 px-3 text-sm transition-colors duration-200"
      >
        Logout
        <LogOut />
      </Button>
    </div>
  );
}
