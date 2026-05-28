import ExpertProfile from "../components/home/ExpertProfile";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#fafafa] pt-8 md:pt-14 pb-4 md:pb-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full mb-3 border border-[#D50032]/25 bg-[#D50032]/5">
            <span className="text-[#D50032] font-extrabold text-xs tracking-wider uppercase flex items-center gap-1">
              🚨 Who We Are
            </span>
          </div>
          <h1 className="text-4xl md:text-5.5xl font-black mb-4 text-gray-900 tracking-tight leading-none">
            About <span className="text-[#D50032]">FinTrade</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Building India's most trusted prop trading education and capital allocation ecosystem
          </p>
        </div>

        {/* High-Impact Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 md:mb-12 select-none">
          {[
            { value: "1,200+", label: "Students Trained" },
            { value: "95%", label: "Failure Rate Addressed" },
            { value: "₹50+", label: "Crore Live Market Exp." }
          ].map((metric, idx) => (
            <div 
              key={idx}
              className="bg-white border border-gray-100/90 rounded-[24px] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.012)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.03)] hover:border-[#D50032]/10 transition-all duration-300 text-center"
            >
              <div className="text-4xl font-black text-[#D50032] leading-none mb-2 font-sans">
                {metric.value}
              </div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Double Columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch select-none mb-8 md:mb-12">
          
          {/* Column 1: About Us & Growth Trajectory Curve (Left) */}
          <div className="flex">
            <div className="w-full bg-white border border-gray-100/90 rounded-[32px] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.012)] flex flex-col justify-between items-stretch">
              <div>
                {/* Header title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] flex items-center justify-center flex-shrink-0 text-[#D50032] font-black text-sm font-sans">
                    FT
                  </div>
                  <h3 className="text-xl font-black text-gray-950 tracking-tight">
                    About Us
                  </h3>
                </div>

                <div className="w-full h-[1px] bg-gray-100 my-5" />

                {/* Description paragraphs */}
                <div className="space-y-4 text-gray-500 text-sm leading-relaxed text-left font-medium">
                  <p>
                    FinTrade is a <span className="text-gray-900 font-extrabold">results-driven prop trading academy</span> focused on developing skilled and disciplined traders. We combine practical learning, live market exposure, and structured mentorship to bridge the gap between knowledge and real trading performance.
                  </p>
                  <p>
                    Our programs are designed to build consistency, confidence, and profitability, guiding students from basics to <span className="text-gray-900 font-extrabold">professional-level trading</span>.
                  </p>
                  <p className="font-extrabold mt-6">
                    At FinTrade, we don't just teach trading — <span className="text-[#D50032] font-black">we build traders.</span>
                  </p>
                </div>
              </div>

              {/* Growth Trajectory SVG Curve */}
              <div className="mt-8 border-t border-gray-100 pt-5">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-4 block">
                  Growth Trajectory
                </span>
                
                {/* SVG Curve line graph */}
                <div className="w-full flex justify-center">
                  <svg className="w-full max-w-[380px] h-[130px] overflow-visible" viewBox="0 0 400 130">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D50032" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#D50032" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Shadow Area grid fill */}
                    <path 
                      d="M 30,105 Q 100,85 160,75 T 290,45 T 370,25 L 370,110 L 30,110 Z" 
                      fill="url(#chart-gradient)" 
                    />
                    
                    {/* Main Line path */}
                    <path 
                      d="M 30,105 Q 100,85 160,75 T 290,45 T 370,25" 
                      fill="none" 
                      stroke="#D50032" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />

                    {/* Coordinates node targets (dots on path) */}
                    {[
                      { x: 30, y: 105, label: "2021" },
                      { x: 98, y: 85, label: "2022" },
                      { x: 166, y: 74, label: "2023" },
                      { x: 234, y: 55, label: "2024" },
                      { x: 302, y: 38, label: "2025" },
                      { x: 370, y: 25, label: "Now" }
                    ].map((dot, dIdx) => (
                      <g key={dIdx}>
                        <circle 
                          cx={dot.x} 
                          cy={dot.y} 
                          r="4" 
                          fill="#D50032" 
                          stroke="white" 
                          strokeWidth="1.5" 
                        />
                        <text 
                          x={dot.x} 
                          y="124" 
                          textAnchor="middle" 
                          fill="#9CA3AF" 
                          fontSize="9" 
                          fontWeight="bold"
                          className="font-sans"
                        >
                          {dot.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Our Vision Concentric & Transformation Timeline (Right) */}
          <div className="flex flex-col gap-6 items-stretch justify-between">
            
            {/* Top Card: Our Vision */}
            <div className="w-full bg-white border border-gray-100/90 rounded-[32px] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.012)] flex flex-col justify-between items-stretch min-h-[230px]">
              <div>
                {/* Header title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] flex items-center justify-center flex-shrink-0 text-[#D50032]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-955 tracking-tight">
                    Our Vision
                  </h3>
                </div>

                <div className="w-full h-[1px] bg-gray-100 my-5" />

                {/* Concentric rings & details */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-3">
                  
                  {/* Concentric solar-system ring SVG */}
                  <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Ring 3 (Outer - Funded Professionals) */}
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
                      <circle cx="92" cy="50" r="3.5" fill="#D50032" stroke="white" strokeWidth="1" />
                      
                      {/* Ring 2 (Middle - Capital Allocation) */}
                      <circle cx="50" cy="50" r="27" fill="none" stroke="#FF4D6D" strokeWidth="1.5" strokeDasharray="3 2.5" opacity="0.8" />
                      <circle cx="50" cy="23" r="3.5" fill="#FF4D6D" stroke="white" strokeWidth="1" />

                      {/* Ring 1 (Inner core - Education) */}
                      <circle cx="50" cy="50" r="12" fill="#D50032" opacity="0.95" />
                      <circle cx="50" cy="50" r="5" fill="white" />
                    </svg>
                  </div>

                  {/* Description & List items */}
                  <div className="flex-1 space-y-4 text-left">
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium">
                      To build India's most trusted, full-stack <span className="text-gray-900 font-extrabold">Prop Trading Education & Capital Allocation ecosystem</span> — transforming retail traders into consistently profitable, funded professionals.
                    </p>
                    
                    {/* Pink Bullet tags */}
                    <div className="flex flex-col gap-2">
                      {[
                        "Trusted Education Platform",
                        "Capital Allocation Ecosystem",
                        "Funded Professionals"
                      ].map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D50032]" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Card: The FinTrade Transformation */}
            <div className="w-full bg-white border border-gray-100/90 rounded-[32px] p-7 shadow-[0_12px_40px_rgba(0,0,0,0.012)] flex flex-col justify-between items-stretch min-h-[200px]">
              <div>
                
                {/* Header title */}
                <div className="space-y-0.5 text-left">
                  <h3 className="text-xl font-black text-gray-950 tracking-tight leading-none">
                    The FinTrade Transformation
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold leading-none">
                    From retail trader to funded professional
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gray-100 my-4" />

                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-5 block">
                  Your Transformation
                </span>

                {/* Progress bar timeline track */}
                <div className="relative w-full flex justify-between items-center px-4 py-4 pb-8">
                  {/* Connecting Line gradient background */}
                  <div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-[#D50032] z-0 rounded-full" />

                  {/* Marker 1 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-md" />
                    <span className="text-[10px] font-black text-emerald-600 absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Retail Trader
                    </span>
                  </div>

                  {/* Marker 2 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-md" />
                    <span className="text-[10px] font-black text-emerald-600 absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Educated Trader
                    </span>
                  </div>

                  {/* Marker 3 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#D50032] border-4 border-white flex items-center justify-center shadow-md" />
                    <span className="text-[10px] font-black text-[#D50032] absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      Funded Professional
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Leadership Section at bottom */}
        <div className="mt-8 border-t border-gray-200/60 pt-6">
          <ExpertProfile />
        </div>

      </div>
    </div>
  );
}
