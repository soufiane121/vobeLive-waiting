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
		<div className="terms-section">
			<h3 className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--hot-primary)] mb-6">
				Terms of Use — Waitlist
			</h3>

			<div className="space-y-5 text-[13px] leading-[1.7] text-brand-text-secondary font-body">
				<p>
					By joining the waitlist for {appName || "the app"} (the “App”) and
					ticking the consent checkbox, you acknowledge that you have read and
					agree to these terms.
				</p>

				<p>
					The App name, branding, features, and availability are subject to
					change at any time prior to launch. References to the App in these
					terms apply regardless of its final name or form.
				</p>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Use of your information
					</p>
					<p>
						By joining the waitlist, you consent to us collecting, storing, and
						using the information you provide to manage and operate the waitlist
						and to communicate with you about the App.
					</p>
					<p className="mt-2">This may include:</p>
					<ul className="mt-2 space-y-1 ml-4 list-none">
						<li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
							Notifying you when the App becomes available in your area
						</li>
						<li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
							Sending updates during the pre-launch period
						</li>
						<li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
							Sending marketing communications, including product updates,
							feature announcements, and promotional content
						</li>
						<li className="before:content-['—'] before:mr-2 before:text-brand-text-tertiary">
							Inviting you to participate in testing, surveys, or early access
							programs
						</li>
					</ul>
					<p className="mt-2">
						We may contact you multiple times. We make no guarantee regarding
						the frequency, timing, or content of communications.
					</p>
				</div>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						No obligation
					</p>
					<p>
						Joining the waitlist does not guarantee access to the App, early
						access, or availability in your area. We reserve the right to limit,
						delay, or deny access to any ব্যক্তি at our sole discretion.
					</p>
					<p className="mt-2">
						We may modify, suspend, or discontinue the App or the waitlist at
						any time without notice or liability.
					</p>
				</div>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Your rights
					</p>
					<p>
						You may unsubscribe from marketing communications at any time using
						the unsubscribe link included in our emails. Unsubscribing will stop
						future communications but does not automatically remove your
						waitlist entry.
					</p>
					<p className="mt-2">
						To request deletion of your data, contact us at{" "}
						<a
							href={`mailto:${contactEmail}`}
							className="underline underline-offset-2 hover:text-brand-text transition-colors"
						>
							{contactEmail}
						</a>
						. We will process valid requests within a reasonable timeframe, not
						to exceed 30 days where required by applicable law.
					</p>
				</div>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Data handling
					</p>
					<p>
						We store the information you provide, which may include your email
						address and location data, for the purpose of operating the waitlist
						and improving our communications.
					</p>
					<p className="mt-2">
						We do not sell your personal data. We do not share your personal
						data with third parties for their independent marketing purposes.
					</p>
					<p>
						We may use third-party service providers to process and store data
						on our behalf, subject to appropriate safeguards.
					</p>
				</div>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Data retention
					</p>
					<p>
						We retain waitlist data for as long as necessary to fulfill the
						purposes outlined in these terms, unless a longer retention period
						is required or permitted by law. In general, data will be deleted
						upon launch of the App or within 24 months of sign-up, whichever
						occurs first.
					</p>
				</div>

				<div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Limitation of liability
					</p>
					<p>
						To the maximum extent permitted by law, we are not liable for any
						direct, indirect, incidental, or consequential damages arising from
						or related to your participation in the waitlist or your inability
						to access or use the App.
					</p>
				</div>

				{/* <div>
					<p className="text-brand-text-secondary font-medium uppercase tracking-wider text-[11px] mb-2">
						Contact
					</p>
					<p>
						If you have questions about these terms or how your data is used:
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
				</div> */}
			</div>
		</div>
	);
}
