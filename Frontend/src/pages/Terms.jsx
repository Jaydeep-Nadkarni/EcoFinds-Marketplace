export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Terms & Conditions
      </h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to <strong>EcoFinds</strong>. By accessing and using our
            platform, you agree to comply with and be bound by these Terms &
            Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account information. Any activity under your account is your
            responsibility. Providing false or misleading information is not
            permitted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Product Listings</h2>
          <p>
            Sellers are responsible for the accuracy of their listings,
            including product descriptions, categories, and pricing. Fake,
            prohibited, or misleading listings may result in account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Transactions</h2>
          <p>
            EcoFinds provides a platform to connect buyers and sellers. We are
            not directly involved in transactions and are not liable for product
            quality, safety, or delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Prohibited Activities</h2>
          <ul className="list-disc ml-6">
            <li>Posting illegal or harmful content</li>
            <li>Spamming or fraudulent activity</li>
            <li>Reselling stolen or counterfeit items</li>
            <li>Abusing the platform or other users</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
          <p>
            EcoFinds is not responsible for damages arising from platform usage,
            including disputes between buyers and sellers. Use the platform at
            your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of
            EcoFinds after updates implies acceptance of revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            For questions or concerns regarding these Terms & Conditions, please
            contact us at{" "}
            <a href="mailto:support@ecofinds.com" className="text-green-600 font-medium">
              support@ecofinds.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
