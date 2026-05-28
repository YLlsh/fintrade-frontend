import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Music, Eye, X } from "lucide-react";
import { Card } from "../ui/card";

const verticalVideos = [
  {
    id: "v1",
    title: "How I Became a Funded Trader",
    author: "Rahul S.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "12K",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "v2",
    title: "My First Profitable Trade",
    author: "Priya V.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "8.5K",
    thumbnail: "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "v3",
    title: "Risk Management Tips",
    author: "Amit P.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "15K",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "v4",
    title: "Technical Analysis Basics",
    author: "Karan M.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "9.2K",
    thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "v5",
    title: "Day Trading Routine",
    author: "Sneha R.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "11K",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "v6",
    title: "NIFTY Analysis Explained",
    author: "Vikram D.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "7.8K",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
  },
];

export default function VerticalVideoSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with Node 3 as active
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto Slider effect
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % verticalVideos.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + verticalVideos.length) % verticalVideos.length);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % verticalVideos.length);
  };

  return (
    <section className="pt-2 pb-6 md:py-8 relative z-10 bg-[#FAFAFA] border-t border-b border-gray-100 overflow-hidden">
      {/* 1. Header Block Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-4 border border-[#D50032]/20 bg-[#D50032]/5">
              <span className="text-xs font-bold text-[#D50032] flex items-center gap-1">
                🎬 Short Videos
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Quick <span className="text-[#D50032]">Trading Tips</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-500 font-medium mt-2">
              Bite-sized trading wisdom from our community.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#D50032] hover:border-[#D50032] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#D50032] flex items-center justify-center text-white hover:bg-red-700 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Video Slider Track Container */}
      <div className="relative w-full overflow-hidden py-6 flex justify-start">
        {/* Horizontal Flex Track */}
        <div 
          className="flex gap-6 transition-transform duration-700 ease-out items-center"
          style={{
            transform: `translateX(calc(50vw - 260px / 2 - ${activeIndex * (260 + 24)}px))`,
            width: `${verticalVideos.length * (260 + 24)}px`,
          }}
        >
          {verticalVideos.map((vid, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Card
                key={vid.id}
                onClick={() => {
                  setIsAutoplay(false);
                  setSelectedVideo(vid.embedUrl);
                  setActiveIndex(idx);
                }}
                className={`flex-shrink-0 w-[260px] aspect-[9/16] overflow-hidden rounded-[32px] relative cursor-pointer transition-all duration-500 ease-out select-none border-0 ${
                  isActive 
                    ? "shadow-[0_20px_50px_rgba(213,0,50,0.18)] scale-105 z-30 ring-2 ring-[#D50032] opacity-100" 
                    : "scale-95 opacity-60 hover:opacity-85 z-10"
                }`}
              >
                {/* Backdrop Thumbnail */}
                <img 
                  src={vid.thumbnail} 
                  alt={vid.title} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/55" />

                {/* Top Right: Music note */}
                <div className="absolute top-5 right-5 text-white/50 group-hover:text-white transition-colors duration-300">
                  <Music className="h-4.5 w-4.5" />
                </div>

                {/* Top Left: Badges */}
                {isActive ? (
                  <div className="absolute top-5 left-5 bg-[#D50032] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" /> NOW PLAYING
                  </div>
                ) : (
                  <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-black px-2.5 py-1 rounded-full border border-white/15">
                    #{idx + 1}
                  </div>
                )}

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-[#D50032] text-white scale-110 shadow-[0_0_25px_rgba(213,0,50,0.65)] hover:scale-125" 
                        : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
                    }`}
                  >
                    <Play className="h-6 w-6 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <h4 className="text-white font-black text-base mb-1.5 leading-snug tracking-wide line-clamp-2">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-bold text-white/60">
                    <span>{vid.author}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {vid.views}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 3. Dot Indicators Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex gap-2.5 justify-center items-center mt-8">
          {verticalVideos.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoplay(false);
                  setActiveIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "w-6 bg-[#D50032]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Video Modal Player Popup */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2.5 transition-all cursor-pointer border border-white/10"
            >
              <X size={20} />
            </button>
            <iframe
              src={`${selectedVideo}?autoplay=1`}
              title="Quick Trading Tip Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
