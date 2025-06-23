import React, { useState } from "react";
import { Star, CheckCircle, TrendingUp, Users, ThumbsUp, Shield, Quote, Lock, MapPin } from "lucide-react";

interface ReviewProps {
  review?: any;
}

const Review = () => {
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  const reviews = [
    {
      id: 1,
      name: "Agofure Michael",
      title: "Sellfastpayfast is just the best!! Quick response and good rate! He's honest and he's one person you can trust 100% ! Trade your bitcoin now with sellfastpayfast.",
      rating: 5,
      verified: true,
      tradingVolume: "₦2.5M+",
      timeframe: "6 months",
      location: "Lagos, Nigeria"
    },
    {
      id: 2,
      name: "Ayibaby",
      title: "Reliable, responsible, trustworthy & swift platform. I'm glad it's been working as expected, great platform, well done to the team.",
      rating: 5,
      verified: true,
      tradingVolume: "₦1.8M+",
      timeframe: "4 months",
      location: "Abuja, Nigeria"
    },
    {
      id: 3,
      name: "Monalisa Sibanda",
      title: "Sellfastpayfast is just the best!! Service is excellent. And best platform to use Quick response and good rate! One of the best, reliable honest person I have met 100% ! Trade your bitcoin now with sellfastpayfast. Life changing platform",
      rating: 5,
      verified: true,
      tradingVolume: "₦3.2M+",
      timeframe: "8 months",
      location: "Port Harcourt, Nigeria"
    },
    {
      id: 4,
      name: "Kesten Bliss",
      title: "I like this app.. so fast and reliable. It's also worth trusting it because it's easy and secure. I'm so glad I came thru this app. Please you guys should keep this standard. Thanks Trustpilot.",
      rating: 5,
      verified: true,
      tradingVolume: "₦950K+",
      timeframe: "3 months",
      location: "Kano, Nigeria"
    },
    {
      id: 5,
      name: "Oladunjoye Emmanuel",
      title: "It has been great since trading BTC with the best platform (Sellfastpayfast). The unique benefits are Fast trade, secured platforms, good rates and being available everytime. I rate you more than 5stars",
      rating: 5,
      verified: true,
      tradingVolume: "₦4.1M+",
      timeframe: "1 year",
      location: "Ibadan, Nigeria"
    },
  ];

  const Item: React.FC<ReviewProps> = ({ review }) => {
    const firstLetter = review?.name && review?.name.charAt(0);
    const isHovered = hoveredReview === review?.id;

    return (
      <div 
        className="group relative h-full transform transition-all duration-500 ease-out hover:-translate-y-1"
        onMouseEnter={() => setHoveredReview(review?.id)}
        onMouseLeave={() => setHoveredReview(null)}
      >
        <div className={`relative bg-black/40 backdrop-blur-md border rounded-2xl p-6 h-full transition-all duration-500 ease-out ${
          isHovered 
            ? 'border-[#FEFD0C]/30 shadow-2xl shadow-[#FEFD0C]/10 bg-black/60 backdrop-blur-lg' 
            : 'border-[#FEFD0C]/10 shadow-xl shadow-black/20'
        }`}>
          
          {/* Quote decoration */}
          <div className={`absolute top-4 right-4 transition-all duration-500 ease-out ${
            isHovered ? 'opacity-20 scale-105' : 'opacity-10'
          }`}>
            <Quote className="text-[#FEFD0C] w-6 h-6" />
          </div>
          
          <div className="flex flex-col h-full space-y-4">
            
            {/* Header: Rating and Verification */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 transition-all duration-300 ease-out ${
                      i < (review?.rating || 5) 
                        ? 'text-[#FEFD0C] fill-[#FEFD0C]' 
                        : 'text-gray-600 fill-gray-600'
                    } ${isHovered ? 'scale-105' : ''}`}
                  />
                ))}
              </div>
              {review?.verified && (
                <div className={`flex items-center gap-2 bg-black/40 text-[#FEFD0C] px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-400 ease-out ${
                  isHovered 
                    ? 'border-[#FEFD0C]/40 bg-[#FEFD0C]/10 scale-102' 
                    : 'border-[#FEFD0C]/20'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>

            {/* Review Content */}
            <div className="flex-1">
              <p className={`leading-relaxed transition-colors duration-400 ease-out font-medium text-sm ${
                isHovered ? 'text-white' : 'text-white/90'
              }`}>
                "{review?.title}"
              </p>
            </div>

            {/* User Info Section */}
            <div className="pt-3 border-t border-[#FEFD0C]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-[#FEFD0C] to-yellow-500 flex items-center justify-center text-black font-bold text-sm transition-all duration-400 ease-out ${
                    isHovered ? 'scale-105 shadow-lg shadow-[#FEFD0C]/20' : ''
                  }`}>
                    {firstLetter}
                  </div>
                  {review?.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-[#FEFD0C] rounded-full p-0.5">
                      <CheckCircle className="text-black w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold text-base mb-0.5 transition-colors duration-400 ease-out ${
                    isHovered ? 'text-[#FEFD0C]' : 'text-white'
                  }`}>
                    {review?.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <MapPin className="w-3 h-3" />
                    <span>{review?.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Trading Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`bg-black/30 rounded-lg p-2.5 transition-all duration-400 ease-out ${
                  isHovered ? 'bg-black/50 border border-[#FEFD0C]/20' : ''
                }`}>
                  <div className="flex items-center gap-1.5 text-[#FEFD0C] text-xs font-medium mb-0.5">
                    <TrendingUp className="w-3 h-3" />
                    Volume
                  </div>
                  <p className="text-white font-semibold text-sm">{review?.tradingVolume}</p>
                </div>
                
                <div className={`bg-black/30 rounded-lg p-2.5 transition-all duration-300 ${
                  isHovered ? 'bg-black/50 border border-[#FEFD0C]/20' : ''
                }`}>
                  <div className="flex items-center gap-1.5 text-[#FEFD0C] text-xs font-medium mb-0.5">
                    <Users className="w-3 h-3" />
                    Trading
                  </div>
                  <p className="text-white font-semibold text-sm">{review?.timeframe}</p>
                </div>
              </div>
            </div>
            
            {/* Helpful Button */}
            <div className={`transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}>
              <button className="flex items-center gap-2 text-white/60 hover:text-[#FEFD0C] transition-colors duration-300 ease-out text-xs font-medium group">
                <ThumbsUp className="w-3 h-3 group-hover:scale-105 transition-transform duration-300 ease-out" />
                <span>Was this helpful?</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const trustMetrics = [
    { icon: Star, value: "4.9/5", label: "Average Rating", description: "From 10,000+ reviews" },
    { icon: CheckCircle, value: "10K+", label: "Verified Reviews", description: "Real customer feedback" },
    { icon: Users, value: "50K+", label: "Happy Customers", description: "Across Nigeria" },
    { icon: ThumbsUp, value: "99%", label: "Recommend Us", description: "Would trade again" }
  ];

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background */}
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

      <div className="container mx-auto px-6 xl:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-black/40 text-[#FEFD0C] font-semibold px-6 py-3 rounded-full text-sm mb-8 border border-[#FEFD0C]/20 backdrop-blur-sm hover:bg-[#FEFD0C]/10 hover:scale-105 transition-all duration-300">
            <Shield className="w-4 h-4" />
            Trusted by Thousands
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            What Our{' '}
            <span className="text-[#FEFD0C] hover:text-[#FEFD0C]/90 transition-colors duration-300">
              Customers
            </span>
            <br />Say About Us
          </h2>
          
          <div className="w-20 h-1 bg-[#FEFD0C] rounded-full mx-auto shadow-lg shadow-[#FEFD0C]/20 mb-8 hover:w-24 hover:shadow-[#FEFD0C]/40 transition-all duration-500"></div>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed hover:text-white/90 transition-colors duration-300">
            Trusted by thousands of traders across Nigeria. See what our verified customers have to say about their trading experience.
          </p>
        </div>
        
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const isHovered = hoveredMetric === index;
            return (
              <div 
                key={index} 
                className="group cursor-default transform transition-all duration-400 ease-out hover:-translate-y-0.5"
                onMouseEnter={() => setHoveredMetric(index)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className={`bg-black/40 backdrop-blur-md border rounded-2xl p-6 text-center transition-all duration-400 ease-out ${
                  isHovered 
                    ? 'border-[#FEFD0C]/30 shadow-2xl shadow-[#FEFD0C]/10 bg-black/60 backdrop-blur-lg' 
                    : 'border-[#FEFD0C]/10 shadow-xl shadow-black/20'
                }`}>
                  <Icon className={`text-[#FEFD0C] w-8 h-8 mx-auto mb-4 transition-transform duration-400 ease-out ${
                    isHovered ? 'scale-105' : ''
                  }`} />
                  <p className={`text-3xl font-bold mb-2 transition-colors duration-400 ease-out ${
                    isHovered ? 'text-[#FEFD0C]' : 'text-white'
                  }`}>{metric.value}</p>
                  <p className="text-sm font-semibold text-white/70 mb-1">{metric.label}</p>
                  <p className="text-xs text-white/60">{metric.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {reviews.map((review) => (
            <Item key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;