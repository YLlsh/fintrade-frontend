import { useState, useEffect, useRef } from "react";

export default function EMIHighlight() {
  const plans = [
    {
      title: "3 Month EMI",
      price: "₹4,999",
      period: "/month",
      details: "Total ₹14,997 + GST",
      badge: null,
      recommended: false,
      features: [
        "Split into 3 easy installments",
        "No processing fee",
        "Instant approval"
      ]
    },
    {
      title: "6 Month EMI",
      price: "₹2,999",
      period: "/month",
      details: "Total ₹17,994 + GST",
      badge: "0% Interest",
      badgeBg: "bg-[#D50032]",
      recommended: true,
      features: [
        "Split into 6 easy installments",
        "0% interest for 6 months",
        "No processing fee",
        "Instant approval"
      ]
    },
    {
      title: "12 Month EMI",
      price: "₹1,599",
      period: "/month",
      details: "Total ₹19,188 + GST",
      badge: "Lowest EMI",
      badgeBg: "bg-gray-950",
      recommended: false,
      features: [
        "Lowest monthly payment",
        "Flexible tenure",
        "CIBIL 730+ required"
      ]
    }
  ];

  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const emiScrollRef = useRef<HTMLDivElement>(null);
  const [isEmiPaused, setIsEmiPaused] = useState(false);
  const emiTouchTimeoutRef = useRef<any>(null);

  const handleEmiScroll = () => {
    if (!emiScrollRef.current) return;
    const container = emiScrollRef.current;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
    const gap = 20; // gap-5 is 20px
    const scrollLeft = container.scrollLeft;
    const currentIdx = Math.round(scrollLeft / (cardWidth + gap));
    if (currentIdx !== activePlanIdx && currentIdx >= 0 && currentIdx < plans.length) {
      setActivePlanIdx(currentIdx);
    }
  };

  const handleEmiTouchStart = () => {
    setIsEmiPaused(true);
    if (emiTouchTimeoutRef.current) clearTimeout(emiTouchTimeoutRef.current);
  };

  const handleEmiTouchEnd = () => {
    if (emiTouchTimeoutRef.current) clearTimeout(emiTouchTimeoutRef.current);
    emiTouchTimeoutRef.current = setTimeout(() => {
      setIsEmiPaused(false);
    }, 8000);
  };

  useEffect(() => {
    if (isEmiPaused) return;

    const timer = setInterval(() => {
      if (window.innerWidth < 768 && emiScrollRef.current) {
        const nextIdx = (activePlanIdx + 1) % plans.length;
        setActivePlanIdx(nextIdx);

        const container = emiScrollRef.current;
        const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
        const gap = 20;
        container.scrollTo({
          left: nextIdx * (cardWidth + gap),
          behavior: "smooth"
        });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activePlanIdx, isEmiPaused, plans.length]);

  return (
    <section className="py-4 md:py-6 bg-[#fafafa] relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2 border border-[#D50032]/25 bg-[#D50032]/5">
            <span className="text-[#D50032] font-extrabold text-xs tracking-wider uppercase flex items-center gap-1">
              💳 Easy Payments
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1.5 text-gray-900 tracking-tight">
            Flexible <span className="text-[#D50032]">EMI & Payment Plans</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Invest in your trading career with our convenient payment options
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          ref={emiScrollRef}
          onScroll={handleEmiScroll}
          onTouchStart={handleEmiTouchStart}
          onTouchEnd={handleEmiTouchEnd}
          className="flex md:grid md:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 -mx-4 md:px-0 md:mx-0 items-stretch max-w-4xl mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {plans.map((plan, index) => {
            return (
              <div
                key={index}
                className={`min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center relative bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-stretch transition-all duration-300 select-none ${plan.recommended
                    ? "border-2 border-[#D50032] shadow-[0_15px_35px_rgba(213,0,50,0.07)] md:-translate-y-1 z-10"
                    : "border border-gray-100/90 shadow-[0_12px_40px_rgba(0,0,0,0.015)] hover:border-gray-200"
                  }`}
              >
                {/* Top Center Floating Badge */}
                {plan.badge && (
                  <div className={`absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 py-0.5 rounded-full text-[9px] font-black text-white ${plan.badgeBg} uppercase tracking-wider shadow-sm z-20`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan Content */}
                <div className="space-y-3.5">

                  {/* Plan Identifier & Recommended Label */}
                  <div>
                    {plan.recommended && (
                      <div className="text-[#D50032] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 mb-1">
                        ★ Recommended
                      </div>
                    )}
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest leading-none">
                      {plan.title}
                    </span>
                  </div>

                  {/* Pricing Box */}
                  <div>
                    <div className="flex items-baseline gap-1 leading-none">
                      <span className="text-3xl sm:text-3.5xl font-black text-[#D50032] tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-400 mt-1 tracking-wide uppercase">
                      {plan.details}
                    </p>
                  </div>

                  {/* Horizontal Line Separator */}
                  <div className="w-full h-[1px] bg-gray-100" />

                  {/* Features List */}
                  <div className="space-y-2.5 pt-0.5 pb-2">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-[11px] font-medium text-gray-700">
                        <span className="w-4.5 h-4.5 rounded-full border border-emerald-100 bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="leading-tight mt-0.5">{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* CTA Action Button */}
                <div className="mt-4 pt-1">
                  {plan.recommended ? (
                    <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D50032] to-[#FF3D00] text-white font-extrabold text-xs uppercase tracking-wider hover:shadow-[0_8px_25px_rgba(213,0,50,0.35)] transition-all duration-300 transform active:scale-98 cursor-pointer">
                      Choose Plan
                    </button>
                  ) : (
                    <button className="w-full py-2.5 px-4 rounded-xl border border-[#D50032]/45 text-[#D50032] font-extrabold text-xs uppercase tracking-wider bg-white hover:bg-[#D50032]/5 hover:border-[#D50032] transition-all duration-300 transform active:scale-98 cursor-pointer">
                      Choose Plan
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Dot Indicators for EMI Section */}
        <div className="flex md:hidden gap-1.5 justify-center items-center mt-2 w-full">
          {plans.map((_, idx) => {
            const isActive = idx === activePlanIdx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsEmiPaused(true);
                  setActivePlanIdx(idx);
                  const container = emiScrollRef.current;
                  if (container) {
                    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
                    const gap = 20;
                    container.scrollTo({
                      left: idx * (cardWidth + gap),
                      behavior: "smooth"
                    });
                  }
                  if (emiTouchTimeoutRef.current) clearTimeout(emiTouchTimeoutRef.current);
                  emiTouchTimeoutRef.current = setTimeout(() => {
                    setIsEmiPaused(false);
                  }, 8000);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive ? "w-5 bg-[#D50032]" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
