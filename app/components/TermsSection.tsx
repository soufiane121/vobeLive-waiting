interface TermsSectionProps {
  appName: string;
  contactEmail: string;
  companyName: string;
  companyAddress: string;
}

export default function TermsSection({
  appName,
  contactEmail,
  companyName,
  companyAddress,
}: TermsSectionProps) {
  return (
    <section
      className="w-full max-w-2xl mx-auto px-4 pt-16 pb-12"
    >
      <div className="terms-section">
        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--hot-primary)] mb-6">
          Terms of Use — Waitlist
        </h3>

        <div className="space-y-5 text-[13px] leading-[1.7] text-brand-text-secondary font-body">
          <p>
            By joining the waitlist for {appName} and ticking the consent
            checkbox, you are agreeing to the following.
          </p>

          <div>
            <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
              What we will do with your information
            </p>
            <p>
              We will use your email address to contact you directly about{" "}
              {appName}. This includes:
            </p>
            <ul className="mt-2 space-y-1 ml-4 list-none">
              <li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
                Notifying you when {appName} launches in your city
              </li>
              <li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
                Sending you updates about the product during the pre-launch
                period
              </li>
              <li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
                Sending you marketing communications about {appName}, including
                feature announcements, launch news, and promotional content
              </li>
              <li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
                Contacting you to invite you to test early versions of the app
              </li>
            </ul>
            <p className="mt-2">
              We may contact you more than once during the pre-launch period.
            </p>
          </div>

          <div>
            <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
              Your rights
            </p>
            <p>
              You can unsubscribe from our emails at any time by clicking the
              unsubscribe link in any email we send. Unsubscribing removes you
              from all future marketing communications. It does not delete your
              waitlist position.
            </p>
            <p className="mt-2">
              If you want your data deleted entirely, email us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="underline underline-offset-2 hover:text-brand-text transition-colors"
              >
                {contactEmail}
              </a>{" "}
              and we will remove your record within 30 days.
            </p>
          </div>

          <div>
            <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
              How we handle your data
            </p>
            <p>
              We store your email address and, if provided, your city, to manage
              the waitlist and personalise our communications.
            </p>
            <p className="mt-2">
              We do not sell your personal data to third parties.
            </p>
            <p>
              We do not share your email with third parties for their own
              marketing.
            </p>
          </div>

          <div>
            <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
              Data retention
            </p>
            <p>
              We retain waitlist data until {appName} launches publicly or for a
              maximum of 24 months from the date you signed up, whichever comes
              first.
            </p>
          </div>

          <div>
            <p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
              Contact
            </p>
            <p>
              If you have questions about how we use your data:
              <br />
              <a
                href={`mailto:${contactEmail}`}
                className="underline underline-offset-2 hover:text-brand-text transition-colors"
              >
                {contactEmail}
              </a>
            </p>
            <p className="mt-3">
              This waitlist is operated by:
              <br />
              {companyName}
              <br />
              {companyAddress}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
