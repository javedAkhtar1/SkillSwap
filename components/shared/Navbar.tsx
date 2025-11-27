"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, UserIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/authProvider";
import { signOut } from "next-auth/react";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: session } = useAuth();

  const handleLogout = () => signOut({ callbackUrl: "/" });

  return (
    <>
      <nav className="max-w-7xl py-5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-800 font-poppins">Skill</span>
            <span className="font-inter">Swap</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link className="hover:text-blue-800 transition-colors duration-200" href="/">Home</Link>
            <Link className="hover:text-blue-800 transition-colors duration-200" href="/browse">Browse</Link>
            <Link className="hover:text-blue-800 transition-colors duration-200" href="/about">About</Link>
            <Link className="hover:text-blue-800 transition-colors duration-200" href="/contact">Contact</Link>
          </div>

          <div className="hidden md:flex gap-3 font-poppins">
            {session ? (
              <ButtonsForLoggedInUsers onLogout={() => setShowLogoutModal(true)} />
            ) : (
              <>
                <Button variant="secondary" className="cursor-pointer hover:bg-primary-btn-hover font-semibold" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button variant="default" className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold" onClick={() => router.push("/signup")}>
                  Signup
                </Button>
              </>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-4">
            {session ? (
              <ButtonsForLoggedInUsers onLogout={() => setShowLogoutModal(true)} />
            ) : (
              <>
                <Button variant="secondary" className="cursor-pointer hover:bg-primary-btn-hover font-semibold py-1 px-3 text-sm" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button variant="default" className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold py-1 px-3 text-sm" onClick={() => router.push("/signup")}>
                  Signup
                </Button>
              </>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-800 transition">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden">
              <div className="mt-4 pb-4 space-y-3">
                <Link className="block hover:text-blue-800 py-2" href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link className="block hover:text-blue-800 py-2" href="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
                <Link className="block hover:text-blue-800 py-2" href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link className="block hover:text-blue-800 py-2" href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white shadow-xl rounded-xl p-6 w-80 text-center">
            <h2 className="text-xl font-semibold mb-2">Logout?</h2>
            <p className="text-gray-600 text-sm mb-5">Are you sure you want to sign out?</p>

            <div className="flex justify-center gap-3">
              <Button className="px-4 cursor-pointer hover:bg-gray-300 bg-secondary-btn text-black" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </Button>

              <Button className="bg-primary-btn hover:bg-primary-btn-hover hover:text-black px-4 font-semibold cursor-pointer"
                onClick={handleLogout}>
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

function ButtonsForLoggedInUsers({ onLogout }: { onLogout: () => void }) {
  const router = useRouter();
  return (
    <div className="flex gap-3 font-poppins items-center">
      <Button
        variant="secondary"
        onClick={() => router.push(`/profile/me`)}
        className="cursor-pointer hover:bg-primary-btn-hover font-semibold py-1 px-3 text-sm"
      >
        <UserIcon />
      </Button>

      <Button
        variant="default"
        onClick={onLogout}
        className="cursor-pointer bg-primary-btn hover:bg-primary-btn-hover hover:text-black font-semibold py-1 px-3 text-sm flex items-center gap-1"
      >
        <LogOut size={18} /> Logout
      </Button>
    </div>
  );
}
