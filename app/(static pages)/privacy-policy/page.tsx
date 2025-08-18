import React from "react";

function PrivacyPolicyPage() {
  return (
    <section className="border-t">
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-600 text-center">
        Last updated: August 2025
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          At <strong>SkillSwap</strong>, your privacy is important to us. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you use our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="font-medium text-blue-800">
              Account Information:
            </span>{" "}
            Name, email, and profile details provided during registration.
          </li>
          <li>
            <span className="font-medium text-blue-800">
              Skill Information:
            </span>{" "}
            Skills you offer and want to learn.
          </li>
          <li>
            <span className="font-medium text-blue-800">Usage Data:</span> How
            you use the platform, including interactions and connections.
          </li>
          <li>
            <span className="font-medium text-blue-800">Optional Content:</span>{" "}
            Messages, uploads, and profile pictures you share with other users.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide and improve the SkillSwap platform.</li>
          <li>Help you connect with other users for skill exchanges.</li>
          <li>Ensure safety and prevent misuse of the platform.</li>
          <li>
            Send you important updates and notifications (you may opt out of
            non-essential emails).
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          4. Sharing of Information
        </h2>
        <p>
          We do <span className="font-medium text-blue-800">not</span> sell or
          rent your personal data. We only share information when necessary:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>With other users, based on your profile visibility settings.</li>
          <li>
            With trusted service providers (e.g., hosting, authentication).
          </li>
          <li>If required by law, regulation, or legal process.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data. However, no
          method of transmission or storage is completely secure, and we cannot
          guarantee absolute protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>You may have the right to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access, update, or delete your personal data.</li>
          <li>
            Withdraw consent for data usage by contacting us at{" "}
            <span className="text-blue-800 hover:underline">
              jved004@gmail.com
            </span>
            .
          </li>
          <li>Opt out of non-essential communications.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
        <p>
          SkillSwap is not intended for children under 13. We do not knowingly
          collect data from children. If you believe we have unintentionally
          collected such data, please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Continued use of
          the platform after updates means you accept the revised policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:{" "}
          <span className="text-blue-800 hover:underline">
            jved004@gmail.com
          </span>
        </p>
      </section>
    </div>
    </section>
  );
}

export default PrivacyPolicyPage;
