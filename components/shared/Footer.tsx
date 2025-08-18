import React from "react";
import Link from "next/link";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-[#FAF9F6] to-blue-100 text-gray-800 pt-10 pb-6 font-inter">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center"></div>

        <h1 className="text-lg font-bold font-inter">
          <span className="text-blue-800">Skill</span>
          <span className="">Swap</span>
        </h1>
        <p className="mb-6 text-sm md:text-base text-slate-700 font-nunito">
          Empowering peer-to-peer learning
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link
            href="https://github.com/javedAkhtar1/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-[#2d4373] p-3 rounded-full text-white shadow-md"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://x.com/javed999_"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-[#222] p-3 rounded-full text-white shadow-md"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://www.linkedin.com/in/javed-akhtar-85012b2a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077b5] hover:bg-[#005582] p-3 rounded-full text-white shadow-md"
          >
            <FaLinkedinIn />
          </Link>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 text-sm mb-6 text-slate-600">
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms and Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-500 font-inter">
          &#169; 2025{" "}
          <span className="text-blue-900 font-semibold mr-3 font-inter">SkillSwap</span>
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
