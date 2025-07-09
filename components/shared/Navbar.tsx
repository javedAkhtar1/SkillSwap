import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="max-w-7xl py-5 mx-auto flex justify-between">
      <h1 className="text-2xl font-bold">
        <span className="text-blue-800 font-poppins">Skill</span>
        <span className="font-inter">Swap</span>
      </h1>
      <div className="space-x-4">
        <Link className="hover:text-blue-800" href="/">Home</Link>
        <Link className="hover:text-blue-800" href="/browse">Browse</Link>
        <Link className="hover:text-blue-800" href="/about">About</Link>
        <Link className="hover:text-blue-800" href="/contact">Contact</Link>
      </div> 
      <div className="flex gap-3">
        <Button variant="secondary" className="cursor-pointer hover:bg-gray-200">Login</Button>
        <Button variant="default" className="cursor-pointer bg-blue-800 hover:bg-gray-200 hover:text-black">Signup</Button>
      </div>
    </nav>
  );
}

export default Navbar;