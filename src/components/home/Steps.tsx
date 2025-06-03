import React, { useState, useEffect } from "react";
import { CheckCircle, DollarSign, BookOpen, Shield, LucideIcon } from "lucide-react";

// Define the type for a step item
interface StepItem {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

// Props type for StepCard
interface StepCardProps {
  item: StepItem;
  index: number;
  isVisible: boolean;
}

// Sample data
const data: StepItem[] = [
  {
    id: 1,
    title: "Easy to use",
    icon: CheckCircle,
    description: "The most secure way to sell your Bitcoin!",
    color: "#10b981",
  },
  {
    id: 2,
    title: "Fast payments",
    icon: DollarSign,
    description:
      "Open the app and follow the quick and easy sign-up process. All you need is your basic personal information.",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "Free registration",
    icon: BookOpen,
    description: "The most secure way to sell your Bitcoin!",
    color: "#3b82f6",
  },
  {
    id: 4,
    title: "Safe and secured",
    icon: Shield,
    description: "The most secure way to sell your Bitcoin!",
    color: "#ef4444",
  },
];

const StepCard: React.FC<StepCardProps> = ({ item, index, isVisible }) => {
  const Icon = item.icon;

  return (
    <div
      className={`group flex md:gap-8 gap-5 w-full md:py-8 py-6 bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-700 transform hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="relative flex-shrink-0">
        <div className="xl:w-16 xl:h-16 w-12 h-12 rounded-xl bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 flex items-center justify-center shadow-lg group-hover:bg-[#FEFD0C]/20 group-hover:scale-110 transition-all duration-500">
          <Icon className="xl:text-2xl text-xl text-[#FEFD0C] transition-all duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm bg-[#FEFD0C]" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 bg-[#FEFD0C]"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `iconFloat ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="relative">
          <h3 className="font-bold xl:text-2xl text-lg text-white mb-3 group-hover:text-[#FEFD0C] transition-colors duration-300 tracking-wide">
            {item.title}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full shadow-lg shadow-[#FEFD0C]/20 mb-4 transition-all duration-500 group-hover:w-20" />
          <p className="text-gray-300 group-hover:text-gray-200 font-normal xl:text-base text-sm leading-relaxed transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Steps: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section
        className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
        style={{
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#FEFD0C]/10 rounded-full backdrop-blur-sm"
              style={{
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `backgroundFloat ${10 + Math.random() * 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-4 py-2 rounded-full text-sm mb-4 border border-[#FEFD0C]/20 backdrop-blur-sm">
              ✨ Why Choose Us
            </div>
            {/* Changed this block to put the heading on the same line */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Simple Steps to <span className="text-[#FEFD0C]">Get Started</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8"></div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Follow these simple steps to join thousands of satisfied users and start your crypto journey with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {data.map((item, index) => (
              <StepCard key={item.id} item={item} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes backgroundFloat {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(-5px) translateX(-5px); }
            75% { transform: translateY(-15px) translateX(3px); }
          }

          @keyframes iconFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
          }
        `}</style>
      </section>
    </>
  );
};

export default Steps;
