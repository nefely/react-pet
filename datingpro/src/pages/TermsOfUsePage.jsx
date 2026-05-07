export default function TermsOfUsePage() {
  return (
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <h1 className="fw-bold mb-1">Terms of Use</h1>
      <p className="text-muted small mb-5">Last updated: May 7, 2026</p>

      <Section title="1. Acceptance of Terms">
        <p>
          By accessing or using DatingPro you agree to be bound by these Terms of Use.
          If you do not agree, please do not use our platform.
        </p>
      </Section>

      <Section title="2. Eligibility">
        <p>You must be at least 18 years old to use DatingPro. By registering, you confirm that:</p>
        <ul>
          <li>You are 18 years of age or older</li>
          <li>You are legally permitted to use dating services in your jurisdiction</li>
          <li>The information you provide is accurate and truthful</li>
        </ul>
      </Section>

      <Section title="3. User Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials.
          You may not share your account with others or create multiple accounts.
          Notify us immediately if you suspect unauthorised access to your account.
        </p>
      </Section>

      <Section title="4. Acceptable Use">
        <p>You agree not to:</p>
        <ul>
          <li>Post false, misleading, or fraudulent information</li>
          <li>Harass, threaten, or harm other users</li>
          <li>Use the platform for commercial solicitation or spam</li>
          <li>Attempt to access or tamper with other users' accounts or our systems</li>
          <li>Upload content that is illegal, offensive, or violates third-party rights</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these rules.</p>
      </Section>

      <Section title="5. Content">
        <p>
          You retain ownership of the content you post (photos, bio, etc.). By posting content
          on DatingPro you grant us a non-exclusive, royalty-free licence to display it on the
          platform for the purpose of providing the service.
        </p>
        <p>
          We do not endorse any user-generated content and are not responsible for its accuracy
          or legality.
        </p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>
          DatingPro is provided on an "as is" basis. We make no guarantees regarding the
          availability, accuracy, or fitness of the service for any particular purpose.
          To the maximum extent permitted by law, we are not liable for any indirect, incidental,
          or consequential damages arising from your use of the platform.
        </p>
      </Section>

      <Section title="7. Termination">
        <p>
          You may delete your account at any time. We reserve the right to suspend or terminate
          your access if you violate these Terms or for any other reason at our sole discretion.
        </p>
      </Section>

      <Section title="8. Governing Law">
        <p>
          These Terms are governed by applicable law. Any disputes shall be resolved through
          good-faith negotiation or, if necessary, the competent courts of the applicable jurisdiction.
        </p>
      </Section>

      <Section title="9. Changes to These Terms">
        <p>
          We may revise these Terms from time to time. Continued use of DatingPro after changes
          are posted constitutes your acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:support@datingpro.app" className="text-danger">support@datingpro.app</a>.
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
