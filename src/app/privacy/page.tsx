import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-20">
          <article className="prose prose-lg max-w-none text-muted-foreground prose-h1:font-headline prose-h1:text-foreground prose-h2:font-headline prose-h2:text-foreground prose-h2:mt-12 prose-h2:mb-4 prose-h3:font-headline prose-h3:text-foreground prose-headings:font-headline prose-strong:text-foreground">
            <h1>Privacy Policy</h1>
            <p>Effective Date: {new Date().toLocaleDateString()}</p>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <p>This Privacy Policy describes how Close Kit ("We," "Our," or "Close Kit"), acting as a Data Controller, collects, uses, and shares personal data related to individuals who interact with our business (e.g., Authorized Users, billing contacts, website visitors).</p>

            <h2>1. Our Role as Data Controller and Processor</h2>
            <p><strong>1.1. Controller Role:</strong> Close Kit acts as the Data Controller with respect to the personal information of our corporate clients (Customers) and their Authorized Users (e.g., login credentials, job titles, billing information, usage metrics within the platform). This Policy addresses the processing activities in our capacity as Controller.</p>
            <p><strong>1.2. Processor Role:</strong> When processing the personal data of the Customer’s end-clients (e.g., homeowner names, addresses, job site history, proposal details), Close Kit acts solely as a Data Processor. This processing is governed strictly by the instructions of the Customer (the Data Controller) and is detailed in a separate Data Processing Addendum (DPA).</p>

            <h2>2. Personal Data We Collect (As Controller)</h2>
            <p>We collect the following types of data about our Customer’s personnel (Authorized Users, billing contacts):</p>
            <ul>
              <li><strong>2.1. Business Contact Information:</strong> Names, job titles, company affiliation, work email addresses, and work phone numbers.</li>
              <li><strong>2.2. Financial Data:</strong> Payment method details, billing address, and transaction history related to subscription payments processed through our third-party payment processor, PayPal/Braintree.</li>
              <li><strong>2.3. Mobile and Geolocation Data (High-Risk Category):</strong>
                <ul className='my-4'>
                    <li>GPS Tracking: Precise geolocation data (GPS coordinates) is collected from the mobile devices of Authorized Users (e.g., field technicians) only when the mobile application is actively running and with explicit, opt-in consent.</li>
                    <li>Purpose: This data is collected to provide essential field service management functionality, including enabling features like technician dispatching, automated time tracking, job site arrival/departure verification, and optimal routing.</li>
                </ul>
              </li>
              <li><strong>2.4. Usage and Log Data:</strong> Information about how Authorized Users access and use the Service, including login times, features accessed, API interaction data, and device identifiers (IP addresses, operating system).</li>
            </ul>

            <h2>3. How We Use the Data</h2>
            <p>We use the collected data for the following lawful bases:</p>
            <ul>
                <li><strong>3.1. Contract Fulfillment:</strong> To provide, maintain, and support the Service, process billing, manage subscriptions, and communicate service updates.</li>
                <li><strong>3.2. Legitimate Interest:</strong> To improve the application, troubleshoot errors, and enhance the security of the platform. This includes analyzing aggregated and anonymized Usage Data to identify trends in platform adoption.</li>
                <li><strong>3.3. Compliance:</strong> To comply with legal obligations (e.g., tax reporting, regulatory compliance).</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We share personal data only as necessary for service delivery and compliance:</p>
            <ul>
                <li><strong>4.1. Third-Party Service Providers (Sub-processors):</strong> We engage critical third-party vendors for hosting (cloud providers), data storage (for RAG knowledge bases), security, and other operational needs. We commit to ensuring all sub-processors maintain high security standards (e.g., SOC 2, ISO 27001).</li>
                <li><strong>4.2. Payment Processors:</strong> We share necessary financial and contact information with PayPal/Braintree to process recurring subscription payments. The processing of this data is subject to the Payment Processor’s own terms and privacy policies.</li>
                <li><strong>4.3. AI Functionality:</strong> Data, excluding proprietary Customer Content, may be used for technical operations, such as feeding the RAG architecture to generate accurate proposals. As stated in the ToS, we do not use Customer Content to train generalized AI models without consent.</li>
                <li><strong>4.4. Legal Compliance:</strong> Data may be disclosed if required by law, court order, or governmental authority.</li>
            </ul>

            <h2>5. Data Security and International Transfers</h2>
            <p><strong>5.1. Security Commitment:</strong> We maintain robust technical and organizational measures to protect data from unauthorized access, loss, or misuse, including but not limited to the use of encryption (AES-256 at rest, TLS 1.3 in transit) and mandatory multi-factor authentication (MFA) for staff and Authorized Users.</p>
            <p><strong>5.2. International Transfers:</strong> Data may be stored and processed in countries outside the Customer’s jurisdiction. Where required by GDPR or CCPA, international transfers are protected by standard contractual clauses (SCCs) and adherence to a Data Processing Addendum.</p>
            
            <h2>6. Your Privacy Rights</h2>
            <p>Depending on jurisdiction (e.g., GDPR, CCPA), Authorized Users and data subjects may have the right to access, delete, correct, or restrict the processing of their personal data. Requests regarding end-client data (where the Customer is the Controller) must be directed to the Customer, and Close Kit will assist the Customer as required by the DPA.</p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us by email: <a href="mailto:autobriefaiv1@gmail.com">autobriefaiv1@gmail.com</a>
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
