import React from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Truck, 
  Award, 
  Headphones,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    tag: "100% Guaranteed",
    description: "Guaranteed refunds and dedicated dispute concierge for every order.",
  },
  {
    icon: Sparkles,
    title: "Authentication",
    tag: "Expert Verified",
    description: "Every item is rigorously verified by master appraisers before shipping.",
  },
  {
    icon: Lock,
    title: "Data Security",
    tag: "256-Bit SSL",
    description: "Bank-level encrypted checkout with funds held securely until delivery.",
  },
  {
    icon: Truck,
    title: "Secure Shipping",
    tag: "Fully Insured",
    description: "Full transit insurance & door-to-door tracked white-glove shipping.",
  },
  {
    icon: Award,
    title: "Trusted Sellers",
    tag: "Vetted Maisons",
    description: "Exclusive community of verified luxury boutiques and collectors.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    tag: "VIP Concierge",
    description: "Round-the-clock advisory team dedicated to assisting your acquisitions.",
  },
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-10 bg-[#fafafa] border-t border-neutral-200/80 w-full relative overflow-hidden font-inter">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3 shadow-2xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
            <span>Authenticated Luxury Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-black tracking-tight mb-2.5">
            Trust & Security
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Every transaction on Gratio Collective is protected by multiple layers of security and expert quality assurance.
          </p>
        </div>

        {/* 6-Column Feature Grid with Cohesive Monochrome Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-black"
              >
                {/* Unified Modern Monochrome Icon Badge */}
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-black flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300" strokeWidth={1.75} />
                </div>

                {/* Subtag */}
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-black transition-colors mb-1">
                  {feature.tag}
                </span>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-black mb-1 tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;