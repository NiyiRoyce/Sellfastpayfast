import React, { useState, useEffect } from "react";
import { CheckCircle, DollarSign, BookOpen, Shield } from "lucide-react";

// Define the type for a step item
interface StepItem {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
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
    color: "#FEFD0C",
  },
  {
    id: 2,
    title: "Fast payments",
    icon: DollarSign,
    description:
      "Open the app and follow the quick and easy sign-up process. All you need is your basic personal information.",
    color: "#FEFD0C",
  },
  {
    id: 3,
    title: "Free registration",
    icon: BookOpen,
    description: "The most secure way to sell your Bitcoin!",
    color: "#FEFD0C",
  },
  {
    id: 4,
    title: "Safe and secured",
    icon: Shield,
    description: "The most secure way to sell your Bitcoin!",
    color: "#FEFD0C",
  },
];

const StepCard: React.FC<StepCardProps> = ({ item, index, isVisible }) => {
  const Icon = item.icon;

  return (
    <div
      className={`group flex md:gap-8 gap-5 w-full md:py-8 py-6 bg-black/40 backdrop-blur-md border border-[#FEFD0C]/10 rounded-2xl p-6 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 hover:bg-black/60 transition-all duration-500 ease-out transform hover:scale-102 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="relative flex-shrink-0">
        <div className="xl:w-16 xl:h-16 w-12 h-12 rounded-xl bg-black/30 border border-[#FEFD0C]/20 flex items-center justify-center shadow-lg group-hover:bg-[#FEFD0C]/10 group-hover:scale-105 group-hover:border-[#FEFD0C]/40 transition-all duration-400 ease-out">
          <Icon className="xl:text-2xl text-xl text-[#FEFD0C] transition-all duration-400 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 ease-out blur-sm bg-[#FEFD0C]" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 ease-out bg-[#FEFD0C]"
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
          <h3 className="font-bold xl:text-2xl text-lg text-white mb-3 group-hover:text-[#FEFD0C] transition-colors duration-400 ease-out tracking-wide">
            {item.title}
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full shadow-lg shadow-[#FEFD0C]/20 mb-4 transition-all duration-500 ease-out group-hover:w-20 group-hover:shadow-[#FEFD0C]/30" />
          <p className="text-white/70 group-hover:text-white/90 font-normal xl:text-base text-sm leading-relaxed transition-colors duration-400 ease-out">
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
      <section
        className="w-full py-20 bg-black relative overflow-hidden"
        style={{
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
        }}
      >
        {/* Enhanced Background - matching Review component */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FEFD0C]/5 via-transparent to-transparent"></div>
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(254,253,12,0.1) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-[#FEFD0C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-[#FEFD0C]/3 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FEFD0C]/2 rounded-full blur-3xl"></div>
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

        <div className="container mx-auto px-6 xl:px-24 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-black/40 text-[#FEFD0C] font-semibold px-6 py-3 rounded-full text-sm mb-8 border border-[#FEFD0C]/20 backdrop-blur-sm hover:bg-[#FEFD0C]/10 hover:scale-105 transition-all duration-300">
              ✨ Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Simple Steps to{' '}
              <span className="text-[#FEFD0C] hover:text-[#FEFD0C]/90 transition-colors duration-300">
                Get Started
              </span>
            </h2>
            <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8 hover:w-24 hover:shadow-[#FEFD0C]/40 transition-all duration-500"></div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed hover:text-white/90 transition-colors duration-300">
              Follow these simple steps to join thousands of satisfied users and start your crypto journey with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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