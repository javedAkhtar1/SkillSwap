import Link from "next/link";
import React from "react";

function AboutPage() {
  return (
    <section className="border-t">
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
        <p className="mb-4 text-sm text-gray-600 text-center">
          Last updated: August 2025
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
          <p>
            <Link href={"/"} className="hover:underline">
              <span className="text-blue-900 font-semibold">Skill</span>
              <span className="text-black font-semibold">Swap</span>
            </Link>{" "}
            is a platform built to connect learners and teachers through the
            power of skill exchange. We believe that everyone has something
            valuable to offer and something new to learn.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p>
            Our mission is to make learning accessible, affordable, and
            community-driven. By enabling users to swap skills, we encourage
            collaboration, personal growth, and a culture of sharing knowledge.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Browse and connect with people who share skills.</li>
            <li>Offer your expertise in exchange for learning something new.</li>
            <li>Build meaningful connections within a global learning community.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="font-medium text-blue-900">Collaboration:</span>{" "}
              Learning works best when shared.
            </li>
            <li>
              <span className="font-medium text-blue-900">Accessibility:</span>{" "}
              Knowledge should be available to everyone, everywhere.
            </li>
            <li>
              <span className="font-medium text-blue-900">Trust:</span> We
              promote safe, respectful, and fair exchanges between users.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            Have questions or feedback? Reach out at{" "}
            <span className="text-blue-800 hover:underline">
              jved004@gmail.com
            </span>
          </p>
        </section>
      </div>
    </section>
  );
}

export default AboutPage;
