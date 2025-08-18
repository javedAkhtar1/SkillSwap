import Link from "next/link";
import React from "react";

function TermsPage() {
  return (
    <section className="border-t">
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>
      <p className="mb-4 text-sm text-gray-600 text-center">
        Last updated: August 2025
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using{" "}
          <Link href={"/"} className="hover:underline">
          <span className="text-blue-900 font-semibold hover">Skill</span>
          <span className="text-black font-semibold hover">Swap</span>
          </Link>
          , you agree to be
          bound by these Terms & Conditions. If you do not agree, please do not
          use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. About SkillSwap</h2>
        <p>
          SkillSwap is a platform that enables users to connect and exchange
          skills. We do not sell services directly and are not responsible for
          the outcomes of skill exchanges between users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            You must provide accurate information when creating an account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            We reserve the right to suspend or terminate accounts for misuse,
            fraud, or violation of these terms.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Acceptable Use</h2>
        <p>Users agree not to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the platform for unlawful purposes.</li>
          <li>Harass, spam, or harm other users.</li>
          <li>Post or share offensive, misleading, or harmful content.</li>
          <li>Exploit the platform for commercial gain without permission.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Skill Exchanges</h2>
        <p>
          All skill swaps are voluntary agreements between users. SkillSwap is
          not responsible for the quality, safety, legality, or outcome of any
          exchange. Users are encouraged to communicate clearly and respectfully
          before agreeing to a skill swap.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Privacy</h2>
        <p>
          Your use of the platform is also governed by our{" "}
          <Link
            href="/privacy-policy"
            className="text-blue-700 hover:underline"
          >
            Privacy Policy
          </Link>
          , which explains how we collect and use your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          7. Limitation of Liability
        </h2>
        <p>
          SkillSwap is provided on an &quot;as-is&quot; basis. We make no
          guarantees about the availability, security, or reliability of the
          platform. To the maximum extent permitted by law, we are not liable
          for any damages resulting from your use of SkillSwap.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions from time to time. Continued
          use of SkillSwap after changes are made constitutes your acceptance of
          the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms & Conditions, you can
          reach us at:{" "}
          <span className="text-blue-800 hover:underline">
            jved004@gmail.com
          </span>
        </p>
      </section>
    </div>
    </section>
  );
}

export default TermsPage;
