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
          <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
            Privacy Policy
          </h1>
          <div className="prose prose-lg mt-6 max-w-none text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>

            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Usage Data</li>
            </ul>

            <h4>Usage Data</h4>
            <p>
              Usage Data is collected automatically when using the Service.
            </p>
            <p>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser
              version, the pages of our Service that You visit, the time and
              date of Your visit, the time spent on those pages, unique device
              identifiers and other diagnostic data.
            </p>

            <h2>Use of Your Personal Data</h2>
            <p>
              The Company may use Personal Data for the following purposes:
            </p>
            <ul>
              <li>
                <strong>To provide and maintain our Service</strong>,
                including to monitor the usage of our Service.
              </li>
              <li>
                <strong>To manage Your Account:</strong> to manage Your
                registration as a user of the Service. The Personal Data You
                provide can give You access to different functionalities of the
                Service that are available to You as a registered user.
              </li>
              <li>
                <strong>To contact You:</strong> To contact You by email,
                telephone calls, SMS, or other equivalent forms of electronic
                communication.
              </li>
            </ul>

            <h2>Retention of Your Personal Data</h2>
            <p>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy.
            </p>

            <h2>Disclosure of Your Personal Data</h2>
            <p>
              The Company may be required to disclose Your Personal Data in
              certain situations, such as to comply with a legal obligation or
              to protect and defend the rights or property of the Company.
            </p>

            <h2>Security of Your Personal Data</h2>
            <p>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure.
            </p>

            <h2>Changes to this Privacy Policy</h2>
            <p>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <ul>
              <li>By email: autobriefaiv1@gmail.com</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
