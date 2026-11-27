import PageHeader from "@/components/PageHeader";
import { site } from "@/config/site";

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy & Cookies Policy" />
      <section className="section">
        <div className="container max-w-3xl space-y-8 text-ink/80 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
          <p className="text-sm text-ink/50">Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>

          <div>
            <h2>Who we are</h2>
            <p>
              This website is operated by {site.companyName}, trading as "{site.tradingAs}", of {site.address.full}.
              We are the data controller for any personal information collected through this website. You can contact
              us at {site.email} or on {site.phone}.
            </p>
          </div>

          <div>
            <h2>What information we collect</h2>
            <ul className="space-y-1">
              <li>Details you give us through our contact form, such as your name, email address and message.</li>
              <li>Details you give us when applying for a job, such as your name, contact details, availability and any information you choose to share.</li>
              <li>Basic technical information needed to deliver the website, such as your browser type.</li>
            </ul>
          </div>

          <div>
            <h2>How we use your information</h2>
            <p>
              We use your information only to reply to your enquiry or to consider your job application. Our lawful
              bases are our legitimate interests in responding to you and, for job applications, taking steps at your
              request before entering into a contract. We do not sell your data or use it for marketing without your consent.
            </p>
          </div>

          <div>
            <h2>How long we keep it</h2>
            <p>
              Enquiries are kept for up to 12 months. Job applications are kept for up to 6 months after the
              recruitment process ends, unless you are employed, in which case they form part of your staff record.
            </p>
          </div>

          <div>
            <h2>Sharing your information</h2>
            <p>
              We may use trusted service providers (for example, website hosting and form-handling services) who
              process data on our behalf under appropriate safeguards. We will only otherwise share information where
              the law requires it.
            </p>
          </div>

          <div>
            <h2>Your rights</h2>
            <p>
              Under UK data protection law you have the right to access, correct or delete your personal data, to
              object to or restrict its use, and to data portability. To exercise these rights, please contact us. If
              you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office
              (ICO) at ico.org.uk.
            </p>
          </div>

          <div>
            <h2>Cookies</h2>
            <p>
              Our website itself does not set advertising or tracking cookies. Our location map is provided by Google
              Maps, which may set its own cookies when the map loads; please see Google's privacy policy for details.
              Fonts are loaded from Google Fonts. You can block or delete cookies at any time through your browser settings.
            </p>
          </div>

          <div>
            <h2>Changes to this policy</h2>
            <p>We may update this policy from time to time. Any changes will be posted on this page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
