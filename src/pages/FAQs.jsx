import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import HandloomBreadcrumb from "../components/layout/breadcrumb";

const FAQs = () => {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  // FAQ data
  const faqData = [
    {
      question: "What shipping methods are available for worldwide shipping?",
      answer:
        "We offer multiple shipping options to accommodate our global customers. Depending on your location, you can choose between standard shipping, express shipping, and premium delivery. All international shipments are sent via trusted carriers with tracking information provided once your order is dispatched.",
    },
    {
      question: "Do you deliver in the USA?",
      answer:
        "Yes, we deliver to all 50 states in the USA. Our rugs are shipped directly to your doorstep, and we work with reliable shipping partners to ensure safe and timely delivery across the United States.",
    },
    {
      question: "How much is the estimated shipping charge for delivery to the USA?",
      answer:
        "Shipping charges to the USA typically range from $50-150 depending on the rug size, weight, and your specific location. For smaller rugs (under 5x8 ft), shipping generally costs between $50-80, while larger rugs (8x10 ft and above) may cost $100-150 to ship. During checkout, you'll see the exact shipping cost calculated based on your order and delivery address.",
    },
    {
      question: "Where are your products sent from?",
      answer:
        "All our rugs are handcrafted in Mirzapur, Uttar Pradesh, India – a region renowned for its centuries-old tradition of exceptional rug making. We ship directly from our workshop in India to customers worldwide, eliminating intermediaries to provide you with authentic, high-quality products at better prices.",
    },
    {
      question: "How long will it take to get my package?",
      answer:
        "Delivery times vary based on your location and the shipping method chosen. For the USA and Canada, standard shipping typically takes 10-15 business days. European deliveries usually arrive within 12-18 business days. For express shipping, delivery times are reduced to 5-7 business days for most destinations. Please note that custom-made rugs require an additional 3-4 weeks of production time before shipping.",
    },
    {
      question: "What is a hand-tufted area rug?",
      answer:
        "A hand-tufted rug is created using a specialized hand-operated tool called a tufting gun. Skilled artisans use this tool to punch wool or other fibers through a backing material, following a pre-drawn pattern. The loops created are then sheared to create a smooth pile surface. This process allows for intricate designs and patterns while maintaining a more accessible price point than fully hand-knotted rugs. Our hand-tufted rugs offer excellent durability and visual appeal while representing authentic craftsmanship.",
    },
    {
      question: "Why New Zealand wool?",
      answer:
        "New Zealand wool is widely considered the premium choice for high-quality rugs for several reasons. It features longer, stronger fibers with exceptional whiteness that accepts dyes beautifully, resulting in vibrant, long-lasting colors. The wool has natural stain and soil resistance properties, is hypoallergenic, and provides superior durability. Additionally, New Zealand wool is sustainably harvested and biodegradable, making it an environmentally responsible choice that doesn't compromise on quality or performance.",
    },
    {
      question: "How are hand-tufted rugs different from other types of rugs?",
      answer:
        "Hand-tufted rugs differ from hand-knotted rugs (which are created by individually tying thousands of knots) and machine-made rugs (which are produced on mechanical looms). Hand-tufted rugs offer a perfect middle ground – they feature the artistic craftsmanship of handmade products while being more affordable than hand-knotted rugs. Compared to machine-made rugs, hand-tufted pieces offer greater uniqueness, customization options, and typically better durability. Each hand-tufted rug represents genuine artisanal work with subtle variations that make each piece special.",
    },
    {
      question: "Are hand-tufted rugs made from New Zealand wool easy to clean?",
      answer:
        "Yes, hand-tufted rugs made from New Zealand wool are relatively easy to maintain. The natural properties of the wool make it resistant to staining and soiling. For regular maintenance, vacuum regularly on a low setting without a beater bar. For spills, blot immediately with a clean white cloth and mild detergent diluted in water. Avoid scrubbing, which can damage the fibers. We recommend professional cleaning every 1-2 years to maintain your rug's appearance and extend its lifespan.",
    },
    {
      question:
        "How long can I expect a hand-tufted rug made from New Zealand wool to last?",
      answer:
        "With proper care and maintenance, a quality hand-tufted rug made from New Zealand wool can last 10-20 years or more. New Zealand wool's natural resilience allows it to maintain its appearance even in areas with moderate foot traffic. Regular maintenance, prompt attention to spills, and periodic professional cleaning will significantly extend your rug's lifespan.",
    },
    {
      question: "Are hand-tufted rugs suitable for high-traffic areas?",
      answer:
        "Hand-tufted wool rugs are suitable for most high-traffic areas in residential settings. New Zealand wool is naturally durable and resilient, allowing it to withstand regular use while maintaining its appearance. For extremely high-traffic commercial areas, you might want to consider our more densely tufted options or explore our specially designed commercial-grade rugs. When using any rug in high-traffic areas, we recommend using a quality rug pad underneath to reduce friction and extend the life of your rug.",
    },
    {
      question: "Do hand-tufted rugs shed?",
      answer:
        "Some initial shedding is normal with new hand-tufted wool rugs and is simply part of the natural breaking-in process. This typically subsides after a few months of regular vacuuming. Premium New Zealand wool, which we use in our rugs, tends to shed less than other types of wool. To minimize shedding, vacuum regularly on a low setting without using a beater bar, which can damage the fibers. Rest assured that moderate shedding does not affect the durability or longevity of your hand-tufted rug.",
    },
    {
      question: "How should I maintain my hand-tufted rug?",
      answer:
        "To maintain your hand-tufted rug: 1) Vacuum regularly on a low setting without a beater bar, 2) Rotate your rug every 6 months to ensure even wear, 3) Clean spills immediately by blotting (never rubbing) with a clean, dry cloth, 4) Use a rug pad underneath to prevent slipping and reduce wear, 5) Keep out of direct sunlight to prevent color fading, 6) Have your rug professionally cleaned every 1-2 years. For more detailed care instructions, visit our Care Guide page.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <HandloomBreadcrumb category="FAQs"/>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-stone-600 mb-10">
          Find answers to common questions about our products and services
        </p>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-stone-200 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-stone-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <span className="text-stone-500">
                  {openFAQ === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>
              {openFAQ === index && (
                <div className="p-5 bg-stone-50 border-t border-stone-200">
                  <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-stone-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Can't find the answer you are looking for?
          </h2>
          <p className="text-stone-700 mb-6">We're Here to Help!</p>
          <Link
            to="/contact"
            className="inline-block bg-stone-800 hover:bg-stone-900 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200"
          >
            Contact us now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
