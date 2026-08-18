import React from "react";

const features = [
  {
    icon: "🛡️",
    title: "Buyer Protection",
    description:
      "Your purchases are protected with our comprehensive buyer guarantee. Enjoy hassle-free returns and dedicated support for every order.",
  },
  {
    icon: "✅",
    title: "Authentication",
    description:
      "Every item is carefully authenticated by our team of experts, ensuring you always receive genuine products.",
  },
  {
    icon: "🔒",
    title: "Data Security",
    description:
      "Your personal and payment information is encrypted and handled with the highest security standards.",
  },
  {
    icon: "🚚",
    title: "Secure Shipping",
    description:
      "Fast and secure shipping with tracking and insurance included. Monitor your order every step of the way.",
  },
  {
    icon: "🤝",
    title: "Trusted Sellers",
    description:
      "We partner only with verified sellers, so you can shop with confidence and peace of mind.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    description:
      "Our support team is available around the clock to assist you with any questions or concerns.",
  },
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-10 bg-gradient-to-br from-gray-50 to-white w-full">
      <div className="w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-playfair text-black mb-4">
          Trust & Security
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg font-playfair">
          Every transaction on Graito is protected by multiple layers of security and quality assurance. Shop confidently knowing your safety is our top priority.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg font-playfair"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 shadow">
          <span className="text-white text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
          {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;