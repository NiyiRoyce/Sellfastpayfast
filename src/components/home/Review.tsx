import React, { useState } from "react";
import { MdStar, MdVerified, MdTrendingUp, MdPeople, MdThumbUp, MdShield } from "react-icons/md";

interface ReviewProps {
  review?: any;
}

const Review = () => {
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);

  const reviews = [
    {
      id: 1,
      name: "Agofure Michael",
      title:
        "Sellfastpayfast is just the best!! Quick response and good rate! He's honest and he's one person you can trust 100 ! Trade your bitcoin now with sellfastpayfast.",
      rating: 5,
      verified: true,
      tradingVolume: "₦2.5M+",
      timeframe: "6 months"
    },
    {
      id: 2,
      name: "Ayibaby",
      title:
        "Reliable, responsible, trustworthy & swift platform. I'm glad it's been working as expected, great platform, well done to the team.",
      rating: 5,
      verified: true,
      tradingVolume: "₦1.8M+",
      timeframe: "4 months"
    },
    {
      id: 3,
      name: "Monalisa Sibanda",
      title:
        "Sellfastpayfast is just the best!! Service is excellent. And best platform to use Quick response and good rate! One of the best, reliable honest person I have met 100 ! Trade your bitcoin now with sellfastpayfast. Life changing platform",
      rating: 5,
      verified: true,
      tradingVolume: "₦3.2M+",
      timeframe: "8 months"
    },
    {
      id: 4,
      name: "Kesten Bliss",
      title:
        "I like this app.. so fast and reliable. It's also worth trusting it because it's easy and secure. I'm so glad I came thru this app. Please you guys should keep this standard. Thanks Trustpilot.",
      rating: 5,
      verified: true,
      tradingVolume: "₦950K+",
      timeframe: "3 months"
    },
    {
      id: 5,
      name: "Oladunjoye Emmanuel",
      title:
        "It has been great since trading BTC with the best platform (Sellfastpayfast). The unique benefits are Fast trade, secured platforms, good rates and being available everytime. I rate you more than 5stars",
      rating: 5,
      verified: true,
      tradingVolume: "₦4.1M+",
      timeframe: "1 year"
    },
  ];

  const Item: React.FC<ReviewProps> = ({ review }) => {
    const firstLetter = review?.name && review?.name.charAt(0);
    const isHovered = hoveredReview === review?.id;

    return (
      <div 
        className="relative bg-black/70 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-3xl p-8 shadow-2xl shadow-black/50 hover:shadow-[#FEFD0C]/10 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 overflow-hidden"
        onMouseEnter={() => setHoveredReview(review?.id)}
        onMouseLeave={() => setHoveredReview(null)}
      >
        {/* Animated Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#FEFD0C]/8 via-transparent to-[#FEFD0C]/3 rounded-3xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="relative z-10">
          {/* Rating Stars - Moved to Top */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <MdStar 
                  key={i} 
                  className={`text-xl ${i < (review?.rating || 5) ? 'text-[#FEFD0C] drop-shadow-lg' : 'text-gray-600'} transition-all duration-300 group-hover:scale-110`} 
                  style={{ filter: 'drop-shadow(0 0 8px rgba(254, 253, 12, 0.3))' }}
                />
              ))}
            </div>
            {review?.verified && (
              <div className="flex items-center gap-2 bg-[#FEFD0C]/10 border border-[#FEFD0C]/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <MdShield className="text-[#FEFD0C] text-sm" />
                <span className="text-xs text-[#FEFD0C] font-medium">Verified</span>
              </div>
            )}
          </div>

          {/* Review Content */}
          <div className="mb-8">
            <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300 text-base font-light italic">
              "{review?.title}"
            </p>
          </div>

          {/* User Info Section - Redesigned */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#FEFD0C] to-yellow-300 flex items-center justify-center text-black font-bold text-2xl shadow-xl shadow-[#FEFD0C]/20 group-hover:scale-110 transition-transform duration-300 border-2 border-[#FEFD0C]/30">
                  {firstLetter}
                </div>
                {review?.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-[#FEFD0C] rounded-full p-1.5 border-2 border-black shadow-lg">
                    <MdVerified className="text-black text-sm" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mb-1">
                  {review?.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">Verified Customer</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MdTrendingUp className="text-[#FEFD0C]" />
                    <span>{review?.tradingVolume}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdPeople className="text-[#FEFD0C]" />
                    <span>{review?.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 hover:text-[#FEFD0C] transition-colors duration-300 cursor-pointer opacity-60 hover:opacity-100">
              <MdThumbUp className="text-lg" />
              <span className="text-sm font-medium">Helpful</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <section 
        className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
        style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFD0C]/10 via-transparent to-[#FEFD0C]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEFD0C]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FEFD0C]/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(254,253,12,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#FEFD0C]/10 text-[#FEFD0C] font-medium px-6 py-3 rounded-full text-sm mb-6 border border-[#FEFD0C]/20 backdrop-blur-sm hover:bg-[#FEFD0C]/15 transition-all duration-300">
              <MdStar className="inline mr-2" />
              Trusted Reviews
            </div>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.9] mb-6"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              What Our{' '}
              <span className="text-[#FEFD0C] bg-gradient-to-r from-[#FEFD0C] to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
                Customers
              </span>
              <span className="block mt-2">Say About Us</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#FEFD0C] to-[#FEFD0C]/50 rounded-full mx-auto shadow-xl shadow-[#FEFD0C]/30 mb-8"></div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-16 font-light">
              Trusted by thousands of traders across Nigeria. See what our verified customers have to say about their exceptional trading experience with us.
            </p>
            
            {/* Enhanced Review Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 shadow-xl shadow-black/50">
                <div className="w-12 h-12 bg-[#FEFD0C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300 mx-auto">
                  <MdStar className="text-[#FEFD0C] text-2xl" />
                </div>
                <p className="text-3xl font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mb-2">4.9/5</p>
                <p className="text-sm text-gray-400 font-medium">Average Rating</p>
              </div>
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 shadow-xl shadow-black/50">
                <div className="w-12 h-12 bg-[#FEFD0C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300 mx-auto">
                  <MdVerified className="text-[#FEFD0C] text-2xl" />
                </div>
                <p className="text-3xl font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mb-2">10K+</p>
                <p className="text-sm text-gray-400 font-medium">Reviews</p>
              </div>
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 shadow-xl shadow-black/50">
                <div className="w-12 h-12 bg-[#FEFD0C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300 mx-auto">
                  <MdPeople className="text-[#FEFD0C] text-2xl" />
                </div>
                <p className="text-3xl font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mb-2">50K+</p>
                <p className="text-sm text-gray-400 font-medium">Happy Customers</p>
              </div>
              <div className="bg-black/60 backdrop-blur-xl border border-[#FEFD0C]/10 rounded-2xl p-6 hover:border-[#FEFD0C]/30 transition-all duration-500 group hover:scale-105 shadow-xl shadow-black/50">
                <div className="w-12 h-12 bg-[#FEFD0C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FEFD0C]/20 transition-colors duration-300 mx-auto">
                  <MdThumbUp className="text-[#FEFD0C] text-2xl" />
                </div>
                <p className="text-3xl font-bold text-white group-hover:text-[#FEFD0C] transition-colors duration-300 mb-2">99%</p>
                <p className="text-sm text-gray-400 font-medium">Recommend Us</p>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {reviews.map((review) => (
              <Item key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
