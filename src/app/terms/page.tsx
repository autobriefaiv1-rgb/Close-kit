import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <div className="prose prose-lg mt-6 max-w-none text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Please read these terms and conditions carefully before using Our
              Service.
            </p>

            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>

            <h2>Acknowledgment</h2>
            <p>
              These are the Terms and Conditions governing the use of this
              Service and the agreement that operates between You and the
              Company. These Terms and Conditions set out the rights and
              obligations of all users regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on Your
              acceptance of and compliance with these Terms and Conditions.
              These Terms and Conditions apply to all visitors, users and others
              who access or use the Service.
            </p>
            <p>
              By accessing or using the Service You agree to be bound by these
              Terms and Conditions. If You disagree with any part of these Terms
              and Conditions then You may not access the Service.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend Your access immediately, without prior
              notice or liability, for any reason whatsoever, including without
              limitation if You breach these Terms and Conditions.
            </p>
            <p>
              Upon termination, Your right to use the Service will cease
              immediately.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Notwithstanding any damages that You might incur, the entire
              liability of the Company and any of its suppliers under any
              provision of this Terms and Your exclusive remedy for all of the
              foregoing shall be limited to the amount actually paid by You
              through the Service or 100 USD if You haven't purchased anything
              through the Service.
            </p>

            <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
            <p>
              The Service is provided to You "AS IS" and "AS AVAILABLE" and with
              all faults and defects without warranty of any kind. To the
              maximum extent permitted under applicable law, the Company, on its
              own behalf and on behalf of its Affiliates and its and their
              respective licensors and service providers, expressly disclaims
              all warranties, whether express, implied, statutory or otherwise,
              with respect to the Service.
            </p>

            <h2>Governing Law</h2>
            <p>
              The laws of the Country, excluding its conflicts of law rules,
              shall govern this Terms and Your use of the Service. Your use of
              the Application may also be subject to other local, state,
              national, or international laws.
            </p>

            <h2>Disputes Resolution</h2>
            <p>
              If You have any concern or dispute about the Service, You agree to
              first try to resolve the dispute informally by contacting the
              Company.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, You can
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
