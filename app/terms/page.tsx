import TermsSection from "../components/TermsSection";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME!;
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS!;

export const metadata = {
  title: `Terms of Use — ${APP_NAME} Waitlist`,
  description: `Terms of use for the ${APP_NAME} waitlist.`,
};

export default function TermsPage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <TermsSection
        appName={APP_NAME}
        contactEmail={CONTACT_EMAIL}
        companyName={COMPANY_NAME}
        companyAddress={COMPANY_ADDRESS}
      />

      <div className="pb-12">
        <a
          href="/"
          className="text-sm font-body text-brand-text-secondary underline underline-offset-2 hover:text-brand-text transition-colors"
        >
          &larr; Back to waitlist
        </a>
      </div>
    </main>
  );
}
