import Link from "next/link";

const sections = [
  {
    number: "1",
    title: "Acceptance of terms",
    content: [
      "By accessing or using the Chopfast platform — including the mobile application, website, and any related services — you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must immediately cease using our platform.",
      "These Terms constitute a legally binding agreement between you and Chopfast Technologies Limited, a company incorporated under the laws of the Federal Republic of Nigeria. We reserve the right to update or modify these Terms at any time, and continued use of the platform following any such changes constitutes your acceptance of the revised Terms.",
      "Chopfast may, at its sole discretion, suspend or terminate your access to the platform at any time for violation of these Terms or for any other reason that Chopfast deems appropriate.",
    ],
  },
  {
    number: "2",
    title: "Use of service",
    content: [
      "You must be at least 18 years of age to create a Chopfast account and place orders on the platform. By registering, you represent and warrant that all information you provide is accurate, current, and complete, and that you will maintain the accuracy of such information.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Chopfast immediately of any unauthorised use of your account at support@chopfast.com.",
      "Chopfast grants you a limited, non-exclusive, non-transferable licence to use the platform for personal, non-commercial purposes. You may not sublicense, sell, resell, or otherwise commercially exploit any portion of the service.",
    ],
  },
  {
    number: "3",
    title: "Orders and payments",
    content: [
      "When you place an order through Chopfast, you are entering into a contract of sale directly with the restaurant partner. Chopfast acts as a technology intermediary and payment agent facilitating the transaction, and is not a party to the sale itself.",
      "All prices displayed on the platform are in the local currency of your operating city and are inclusive of applicable taxes unless otherwise stated. Delivery fees and service charges are displayed clearly at checkout before you confirm your order.",
      "Payment is due at the time of order placement. Chopfast processes all payments through secure third-party payment gateways and does not store your full card details on its servers. Disputed charges must be raised within 14 days of the transaction date.",
    ],
  },
  {
    number: "4",
    title: "Cancellations and refunds",
    content: [
      "You may cancel an order within 2 minutes of placement, provided the restaurant has not yet begun preparation. After this window, cancellation may not be possible and you may still be charged the full order value.",
      "Refunds for qualifying cancellations, undelivered orders, or orders with significant quality issues will be processed to your original payment method within 3–5 business days. Refunds to Chopfast Wallet are processed within 24 hours.",
      "Chopfast reserves the right to refuse refund requests where it determines, in its reasonable discretion, that abuse of the refunds policy has occurred. Repeat or fraudulent refund requests may result in account suspension.",
    ],
  },
  {
    number: "5",
    title: "Prohibited conduct",
    content: [
      "You agree not to use the Chopfast platform for any unlawful purpose, including but not limited to: placing fraudulent orders, submitting false reviews, using the platform to harass riders or restaurant staff, or attempting to circumvent the payment system.",
      "Any attempt to reverse-engineer, decompile, scrape, or otherwise extract data from the Chopfast platform without express written permission is strictly prohibited and may constitute a criminal offence under applicable Nigerian and international cybercrime law.",
      "Chopfast employs automated and manual fraud detection systems. Accounts found engaging in fraudulent activity will be permanently suspended and reported to the relevant authorities.",
    ],
  },
  {
    number: "6",
    title: "Intellectual property",
    content: [
      "All content on the Chopfast platform — including the Chopfast name, logo, app design, text, graphics, and software — is the exclusive property of Chopfast Technologies Limited or its licensors and is protected by Nigerian and international intellectual property law.",
      "You are granted no right or licence to use the Chopfast brand, marks, or any platform content for commercial purposes without prior written consent. Unauthorised use of Chopfast's intellectual property may result in civil and criminal liability.",
      "User-generated content such as reviews and ratings remains your property, but by submitting such content you grant Chopfast a perpetual, worldwide, royalty-free licence to use, display, and distribute that content in connection with the platform.",
    ],
  },
  {
    number: "7",
    title: "Limitation of liability",
    content: [
      "To the maximum extent permitted by applicable law, Chopfast's total liability to you for any claim arising out of or relating to these Terms or your use of the platform shall not exceed the total amount you paid to Chopfast in the 3 months preceding the event giving rise to the claim.",
      "Chopfast is not liable for any indirect, incidental, special, punitive, or consequential damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the platform, even if Chopfast has been advised of the possibility of such damages.",
      "Chopfast makes no warranty that the platform will be uninterrupted, error-free, or free from viruses or other harmful components. The platform is provided on an 'as is' and 'as available' basis.",
    ],
  },
  {
    number: "8",
    title: "Governing law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. The courts of Lagos, Nigeria shall have exclusive jurisdiction over any disputes arising from these Terms.",
      "Any dispute, controversy, or claim arising out of or in connection with these Terms that cannot be resolved by good-faith negotiation shall be submitted to binding arbitration in Lagos, Nigeria, in accordance with the Arbitration and Conciliation Act, Cap A18, Laws of the Federation of Nigeria 2004.",
      "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F8F9" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: "#FF5A1F" }}
        >
          ← Back to home
        </Link>

        {/* Header */}
        <section className="mb-12">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1A1A2E" }}
          >
            Terms of Service
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
            <span>
              <strong className="text-gray-700">Effective date:</strong> January 1, 2024
            </span>
            <span className="hidden sm:block">·</span>
            <span>
              <strong className="text-gray-700">Last updated:</strong> January 1, 2024
            </span>
            <span className="hidden sm:block">·</span>
            <span>
              <strong className="text-gray-700">Version:</strong> 2.0
            </span>
          </div>
          <div
            className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
            style={{ backgroundColor: "#FF5A1F15", color: "#FF5A1F" }}
          >
            <strong>Please read these Terms carefully.</strong> By using the Chopfast platform you agree to be bound by all provisions below. If you have questions, contact us at <a href="mailto:legal@chopfast.com" className="underline">legal@chopfast.com</a>.
          </div>
        </section>

        {/* Table of contents */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold mb-4" style={{ color: "#1A1A2E" }}>
              Table of contents
            </h2>
            <ol className="space-y-1.5">
              {sections.map((s) => (
                <li key={s.number}>
                  <a
                    href={`#section-${s.number}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "#FF5A1F" }}
                  >
                    {s.number}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sections */}
        <section className="space-y-10 mb-14">
          {sections.map((s) => (
            <div
              key={s.number}
              id={`section-${s.number}`}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <h2
                className="text-xl font-bold mb-4 flex items-center gap-3"
                style={{ color: "#1A1A2E" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                  style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
                >
                  {s.number}
                </span>
                {s.title}
              </h2>
              <div className="space-y-3">
                {s.content.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 pb-4">
          <p>
            Questions about these Terms?{" "}
            <a
              href="mailto:legal@chopfast.com"
              className="font-semibold hover:underline"
              style={{ color: "#FF5A1F" }}
            >
              Contact our legal team
            </a>
          </p>
          <p className="mt-1">
            Chopfast Technologies Limited · 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}
