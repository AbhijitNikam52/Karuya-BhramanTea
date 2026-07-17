import { FaFileSignature, FaInfoCircle } from "react-icons/fa";

function TermsConditions() {
  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm space-y-8 text-left">
        
        {/* Header */}
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-700">
            <FaFileSignature className="text-xl" />
            <span className="text-xs uppercase tracking-widest font-bold font-sans">Legal Agreement</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight font-display">
            Terms & Conditions
          </h1>
          <p className="text-xs text-gray-455 font-light mt-1">Last Updated: July 18, 2026</p>
        </div>

        {/* Narrative content */}
        <div className="space-y-6 text-gray-600 font-light text-sm md:text-base leading-relaxed">
          <p>
            Please read these Terms and Conditions carefully before using our booking website or purchasing 
            our travel services. By accessing or using any part of this site, you agree to be bound by these terms.
          </p>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">1. Booking Agreement and Payments</h2>
            <p>
              When booking a package (e.g. Tadoba safaris or Ladakh group departures), your reservation is only 
              proves confirmed once the primary advance payment is processed and a booking voucher is issued. 
              The balance payment must be cleared 15 days prior to the departure date.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">2. Travel Credentials and Documents</h2>
            <p>
              Passengers are solely responsible for providing correct personal details and valid documents 
              (such as passport validation, valid visas, and identity cards) inside the document locker. 
              Karuya BhramanTea is not liable for booking failures resulting from outdated passport details.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">3. Tour Adjustments and Cancellations</h2>
            <p>
              We reserve the right to modify itineraries, change hotel bookings, or cancel scheduled departures 
              due to weather disruptions, landslides, national park closure notifications, or safety hazards. 
              Refund terms are as follows:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-550">
              <li>Cancellations 30+ days prior to trip: 75% refund.</li>
              <li>Cancellations 15-30 days prior: 50% refund.</li>
              <li>Cancellations under 15 days: Non-refundable.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">4. Limitation of Liability</h2>
            <p>
              Karuya BhramanTea operates as an intermediary organizer linking hotels, transports, and safari 
              operators. We are not responsible for direct or indirect losses, luggage loss, flight delays, 
              accident injuries, or medical expenses incurred during tours. We recommend securing active travel 
              insurance prior to your trip.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">5. Governing Law</h2>
            <p className="flex items-center gap-1.5">
              <FaInfoCircle className="text-amber-700 text-xs" />
              <span>These terms are governed by the laws of Maharashtra, India. Any disputes are subject to the exclusive jurisdiction of the courts in Nashik/Pune.</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TermsConditions;
