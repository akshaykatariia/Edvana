import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Privacy Policy</h1>

        <p className="mb-6 text-gray-600 text-center text-lg">
          Last Updated: July 8, 2025
        </p>

        <p className="mb-6">
          At <span className="font-semibold text-blue-600">Edvana</span>, your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>

        <section className="mb-8">z
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">1. Information We Collect</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>Personal details like name, email address, and contact info during registration.</li>
            <li>Course interactions and learning progress.</li>
            <li>Payment details (processed securely via third-party providers).</li>
            <li>Technical data like device, IP address, and browser type.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">2. How We Use Your Data</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>To deliver and improve learning experiences.</li>
            <li>To send important notifications and updates.</li>
            <li>To personalize course recommendations.</li>
            <li>To maintain platform security and prevent misuse.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">3. Sharing Your Information</h2>
          <p>
            We do not sell or trade your personal information. We only share it with:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>Trusted third-party payment processors.</li>
            <li>Service providers who help operate our platform.</li>
            <li>Legal authorities, when required by law.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">4. Your Rights</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>You can access, update, or delete your personal info at any time.</li>
            <li>You can unsubscribe from marketing communications.</li>
            <li>You can request a copy of your stored data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">5. Data Protection</h2>
          <p>
            We use strong encryption, secure hosting, and access control to protect your data.
            While no system is 100% secure, we do our best to keep your information safe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">6. Children’s Privacy</h2>
          <p>
            Edvana is not intended for users under the age of 13. We do not knowingly collect data from children without parental consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be posted here with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">8. Contact Us</h2>
          <p>
            If you have questions about this policy, feel free to contact us at:  
            <span className="block font-semibold text-blue-700">privacy@edvana.com</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
