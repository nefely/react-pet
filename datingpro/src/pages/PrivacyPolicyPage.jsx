export default function PrivacyPolicyPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <h1 className="fw-bold mb-1">Privacy Policy</h1>
      <p className="text-muted small mb-5">Last updated: May 7, 2026</p>

      <Section title="1. Information We Collect">
        <p>We collect information you provide directly when you register or use our services:</p>
        <ul>
          <li>Name, email address, and profile photo (via Google sign-in or manual registration)</li>
          <li>Profile details such as age, city, interests, and bio</li>
          <li>Usage data such as pages visited and actions taken within the platform</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>Show your profile to other users based on search filters</li>
          <li>Improve and personalise your experience on DatingPro</li>
          <li>Send transactional emails (e.g. password reset)</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>
      </Section>

      <Section title="3. Data Storage and Security">
        <p>
          Your data is stored securely using Firebase (Google Cloud infrastructure).
          We apply industry-standard security measures including encrypted transmission (HTTPS)
          and access controls. However, no system is completely secure and we cannot guarantee
          absolute security.
        </p>
      </Section>

      <Section title="4. Cookies">
        <p>
          We use essential cookies and local storage to keep you signed in and remember your
          preferences. We do not use advertising or tracking cookies.
        </p>
      </Section>

      <Section title="5. Third-Party Services">
        <p>
          We use Google Firebase for authentication and data storage. By using DatingPro you
          also agree to{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-danger">
            Google's Privacy Policy
          </a>.
        </p>
      </Section>

      <Section title="6. Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent and delete your account at any time</li>
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:support@datingpro.app" className="text-danger">support@datingpro.app</a>.</p>
      </Section>

      <Section title="7. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes by posting the new policy on this page with an updated date.
        </p>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h5 className="fw-semibold mb-3">{title}</h5>
      {children}
    </section>
  )
}
