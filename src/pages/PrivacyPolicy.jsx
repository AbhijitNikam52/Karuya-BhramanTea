import { FaLock, FaShieldAlt } from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm space-y-8 text-left">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <FaShieldAlt className="text-xl" />
            <span className="text-xs uppercase tracking-widest font-bold font-sans">Legal Information</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-450 font-light mt-1">Last Updated: July 18, 2026</p>
        </div>

        {/* Narrative content */}
        <div className="space-y-6 text-gray-600 font-light text-sm md:text-base leading-relaxed">
          <p>
            At <strong>Karuya BhramanTea Private Limited</strong>, we value the trust you place in us. 
            This Privacy Policy explains how we collect, use, share, and protect information when you visit 
            our website and book our travel packages or document locker services.
          </p>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              We collect information directly from you when you register on our website, request custom travel 
              itineraries, book tour packages, or upload travel credentials to our Passenger Document Vault. 
              This information includes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-550">
              <li>Personal identifiers (Name, Email Address, Contact Numbers, Physical Address).</li>
              <li>Official identification documents (Passport copies, visa forms, flight boarding passes).</li>
              <li>Billing details, transaction logs, and travel preferences.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>
              The primary purpose of collecting your information is to ensure safe, legally-compliant travel 
              logistics. We use your data to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-550">
              <li>Book hotel stays, local gypsy safari permits, and national park passes.</li>
              <li>Provide custom travel suggestions and support notifications.</li>
              <li>Improve our booking software, products shop, and website stability.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">3. Passenger Document Vault Protection</h2>
            <p>
              Documents uploaded to your private locker (e.g. passport copies) are encrypted and isolated. 
              Only authorized tour managers involved in your booking process have access to these files. 
              We do not sell, distribute, or rent your identity papers to third-party marketing companies.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">4. Cookies and Analytical Tracking</h2>
            <p>
              We use standard session cookies to remember login credentials, cart items, and to understand 
              traffic patterns using analytical tools. You can disable cookies inside your browser settings 
              without affecting your basic access to the website.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">5. Contact Information</h2>
            <p className="flex items-center gap-1.5">
              <FaLock className="text-amber-700 text-xs" />
              <span>For any queries regarding this policy, contact our support team at </span>
              <a href="mailto:info@karuyabhramanti.com" className="text-[#1F4027] font-semibold underline">
                info@karuyabhramanti.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicy;
