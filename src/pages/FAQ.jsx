import { useState, useEffect } from "react";
import { FaChevronDown, FaQuestionCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  // Fallback sample FAQs
  const staticFaqs = [
    {
      _id: "static-faq-1",
      question: "What types of tours do you organize?",
      answer: "We specialize in wildlife safaris (like Tadoba and Gir), high-altitude mountain expeditions (Leh Ladakh, Spiti Valley), family holidays, and customized international leisure tours tailored to your budget and travel style."
    },
    {
      _id: "static-faq-2",
      question: "Are flights and train tickets included in the pricing?",
      answer: "Our standard packages list land services, stays, local gypsy safaris, and transfers. However, we have a ticketing team that can assist you in booking flight or train tickets to align with your trip itinerary."
    },
    {
      _id: "static-faq-3",
      question: "How do I upload my travel documents (passport, visas)?",
      answer: "Once you register or log in, you will have access to a secure 'My Documents' locker from the header navigation. There you can upload passport copies or flight tickets directly, which our travel agents will use to process your bookings."
    },
    {
      _id: "static-faq-4",
      question: "What is your refund and cancellation policy?",
      answer: "Cancellations made 30 days prior to departure receive a 75% refund. Between 15-30 days, we offer a 50% refund. Cancellations under 15 days are non-refundable due to pre-paid hotel and safari permits."
    },
    {
      _id: "static-faq-5",
      question: "Can I customize a private tour package?",
      answer: "Absolutely! We love curating tailor-made itineraries. Simply click on the 'Contact Us' page, select your preferred destination, duration, passenger count, and our tour managers will draft a custom plan for you."
    }
  ];

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4010/api/v1/faqs");
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setFaqs(data.data);
      } else {
        setFaqs(staticFaqs);
      }
    } catch (e) {
      console.warn("FAQ fetch failed, using fallbacks", e);
      setFaqs(staticFaqs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen py-16 px-6 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-700">Have Questions?</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-1 bg-[#1F4027] mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-500 font-light max-w-xl mx-auto text-sm md:text-base">
            Find quick answers regarding our booking procedures, tour packages, document vaults, and cancellation terms.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#1F4027] border-t-transparent" />
            <p className="text-gray-500 text-sm">Loading FAQs...</p>
          </div>
        ) : (
          /* FAQs Accordion Grid */
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = hoveredIndex === index || clickedIndex === index;

              return (
                <div
                  key={faq._id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setClickedIndex(clickedIndex === index ? null : index)}
                  className={`bg-white rounded-2xl border transition-all duration-300 p-6 cursor-pointer select-none ${
                    isOpen 
                      ? "border-[#1F4027]/40 shadow-md ring-1 ring-[#1F4027]/5 translate-x-1" 
                      : "border-gray-200/60 shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <FaQuestionCircle className={`text-sm transition-colors duration-300 ${isOpen ? "text-amber-700" : "text-gray-400"}`} />
                      <h3 className={`font-bold text-sm md:text-base transition-colors duration-300 ${isOpen ? "text-[#1F4027]" : "text-gray-800"}`}>
                        {index + 1}. {faq.question}
                      </h3>
                    </div>
                    <FaChevronDown 
                      className={`text-gray-400 transition-transform duration-500 text-xs ${isOpen ? "rotate-180 text-amber-700" : ""}`} 
                    />
                  </div>

                  {/* Slide down answer container */}
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? "12px" : "0px"
                    }}
                  >
                    <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed pl-6 border-l-2 border-amber-700/30">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA help block */}
        <div className="bg-white border border-gray-150 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-bold text-gray-800 text-lg">Still have questions?</h4>
            <p className="text-xs text-gray-400 font-light">Get in touch with our helpdesk team. We answer within 24 hours.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#1F4027] hover:bg-[#152e1c] text-white px-6 py-3 rounded-full font-semibold text-xs transition flex items-center gap-1.5 shadow"
          >
            <span>Ask a Question</span> <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
