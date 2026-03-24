import Link from "next/link";

const sections = [
  {
    id: "data-we-collect",
    title: "Data we collect",
    content: [
      {
        subtitle: "Account information",
        text: "When you create a Chopfast account, we collect your full name, email address, phone number, and password (stored as a one-way hash). If you sign up via Google or Apple, we receive only the profile information you have authorised those providers to share.",
      },
      {
        subtitle: "Order data",
        text: "Every order you place generates a record including the items ordered, restaurant, delivery address, payment method used, order timestamp, and delivery status. This data is linked to your account and retained to provide order history and customer support.",
      },
      {
        subtitle: "Location data",
        text: "With your permission, we collect your device's precise GPS location to show nearby restaurants, calculate delivery fees, and route riders to your address. Location data is only accessed while the app is in use, never in the background, unless you explicitly enable background location for live tracking.",
      },
      {
        subtitle: "Device and usage data",
        text: "We collect technical information about your device including device model, operating system, app version, IP address, and crash reports. We also collect in-app behaviour data such as screens viewed, buttons tapped, and session duration to improve the user experience.",
      },
      {
        subtitle: "Payment information",
        text: "We do not store your full card number on our servers. Payment processing is handled by our certified PCI-DSS compliant payment partners. We retain only a masked card reference (e.g. **** **** **** 4242) and the payment provider's transaction ID for reconciliation and refund purposes.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your data",
    content: [
      {
        subtitle: "Providing the service",
        text: "Your data is primarily used to process orders, connect you with restaurants and riders, provide customer support, and send you order confirmations and delivery notifications.",
      },
      {
        subtitle: "Personalisation",
        text: "We use your order history, location, and in-app behaviour to personalise your home feed — recommending restaurants and dishes most relevant to you. You can opt out of personalised recommendations in your account settings.",
      },
      {
        subtitle: "Platform improvement",
        text: "Aggregated and anonymised usage data helps our product and engineering teams identify bugs, optimise performance, and prioritise new features. No personally identifiable information is included in these analyses.",
      },
      {
        subtitle: "Marketing communications",
        text: "With your consent, we send promotional emails, push notifications, and SMS messages about offers, new restaurants, and platform updates. You can manage your communication preferences at any time from Settings → Notifications.",
      },
      {
        subtitle: "Fraud prevention and safety",
        text: "We use account data, device fingerprints, and behavioural signals to detect and prevent fraudulent activity, protect the safety of riders and customers, and comply with legal obligations.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Sharing your data",
    content: [
      {
        subtitle: "Restaurant partners",
        text: "When you place an order, we share your name, delivery address, order details, and phone number with the restaurant preparing your food. This is necessary to fulfil your order. Restaurants are contractually prohibited from using this data for any other purpose.",
      },
      {
        subtitle: "Delivery riders",
        text: "Riders receive your name, delivery address, and a masked version of your phone number for the purpose of completing delivery. Once an order is complete, the rider no longer has access to your personal details.",
      },
      {
        subtitle: "Service providers",
        text: "We engage third-party companies to help us operate the platform — including cloud hosting providers (AWS), analytics platforms, payment processors, and customer support tools. All service providers are bound by data processing agreements and may only use your data as directed by Chopfast.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose your data to law enforcement, regulators, or courts when required to do so by applicable Nigerian or international law, or when necessary to protect the rights, property, or safety of Chopfast, our users, or the public.",
      },
      {
        subtitle: "We do not sell your data",
        text: "Chopfast does not sell, rent, or trade your personal information to third parties for their own marketing or commercial purposes. Period.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    content: [
      {
        subtitle: "What we use",
        text: "The Chopfast website uses cookies and similar tracking technologies to maintain session state, remember your preferences, and measure website traffic. The mobile app uses equivalent local storage and analytics SDKs.",
      },
      {
        subtitle: "Types of cookies",
        text: "We use essential cookies (required for the platform to function), functional cookies (to remember your preferences), and analytics cookies (to understand how users interact with the platform). We do not use third-party advertising cookies.",
      },
      {
        subtitle: "Managing cookies",
        text: "You can control cookie preferences through your browser settings or by using the cookie preference centre accessible from the footer of our website. Disabling essential cookies may affect the functionality of the platform.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data retention",
    content: [
      {
        subtitle: "Active accounts",
        text: "We retain your personal data for as long as your account remains active. Your order history, saved addresses, and profile information are stored to enable a seamless experience each time you use Chopfast.",
      },
      {
        subtitle: "Account deletion",
        text: "If you delete your Chopfast account, we will erase your personal profile, saved addresses, and preferences within 30 days. Order history and transaction records are retained for up to 7 years to comply with Nigerian tax and financial regulations.",
      },
      {
        subtitle: "Anonymised data",
        text: "Aggregated and anonymised analytics data — which cannot be used to identify you — may be retained indefinitely for business intelligence and research purposes.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: [
      {
        subtitle: "Access and portability",
        text: "You have the right to request a copy of all personal data we hold about you. You can download a machine-readable export of your Chopfast data at any time from Settings → Privacy → Download my data.",
      },
      {
        subtitle: "Correction",
        text: "If any personal data we hold about you is inaccurate or incomplete, you have the right to request correction. You can update most information directly from your account settings, or contact us at privacy@chopfast.com.",
      },
      {
        subtitle: "Deletion",
        text: "You have the right to request deletion of your personal data. Certain data may need to be retained for legal or contractual reasons, but we will inform you of any such limitations at the time of your request.",
      },
      {
        subtitle: "Objection and restriction",
        text: "You have the right to object to certain processing activities (such as direct marketing) and to request that we restrict processing of your data in certain circumstances. Contact us at privacy@chopfast.com to exercise these rights.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    content: [
      {
        subtitle: "Data controller",
        text: "The data controller responsible for your personal information is Chopfast Technologies Limited, incorporated in Nigeria (RC: 1847291), with registered offices at 14 Admiralty Way, Lekki Phase 1, Lagos State, Nigeria.",
      },
      {
        subtitle: "Privacy enquiries",
        text: "For all questions, requests, or concerns relating to this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@chopfast.com. We aim to respond to all privacy requests within 30 days.",
      },
      {
        subtitle: "Complaints",
        text: "If you believe we have not handled your personal data in accordance with applicable law, you have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) at ndpc.gov.ng.",
      },
    ],
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
            <span>
              <strong className="text-gray-700">Effective date:</strong> January 1, 2024
            </span>
            <span className="hidden sm:block">·</span>
            <span>
              <strong className="text-gray-700">Last updated:</strong> January 1, 2024
            </span>
          </div>
          <div
            className="mt-6 p-4 rounded-xl text-sm leading-relaxed"
            style={{ backgroundColor: "#FF5A1F15", color: "#1A1A2E" }}
          >
            At Chopfast, your privacy matters to us. This policy explains what personal data we collect, why we collect it, how we use and protect it, and what rights you have. We've written it in plain language because we believe you deserve to understand how your data is handled.
          </div>
        </section>

        {/* Table of contents */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold mb-4" style={{ color: "#1A1A2E" }}>
              Table of contents
            </h2>
            <ol className="space-y-1.5 list-none">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "#FF5A1F" }}
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sections */}
        <section className="space-y-8 mb-14">
          {sections.map((s, idx) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <h2
                className="text-xl font-bold mb-5 flex items-center gap-3"
                style={{ color: "#1A1A2E" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                  style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
                >
                  {idx + 1}
                </span>
                {s.title}
              </h2>
              <div className="space-y-5">
                {s.content.map((item) => (
                  <div key={item.subtitle}>
                    <h3
                      className="text-sm font-bold mb-1"
                      style={{ color: "#1A1A2E" }}
                    >
                      {item.subtitle}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact card */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Questions about your privacy?
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Our Data Protection Officer is available to help.
          </p>
          <a
            href="mailto:privacy@chopfast.com"
            className="inline-block font-bold px-8 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FF5A1F", color: "#fff" }}
          >
            privacy@chopfast.com
          </a>
        </div>
      </div>
    </div>
  );
}
