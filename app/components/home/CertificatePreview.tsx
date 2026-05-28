import { useState } from "react";
import { ZoomIn, X, Download } from "lucide-react";

export default function CertificatePreview() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="py-6 md:py-12 bg-[#fafafa] relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Certificate Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div 
              onClick={() => setIsZoomed(true)}
              className="w-full max-w-xl relative group overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white border border-gray-200/80 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(213,0,50,0.08)] hover:-translate-y-1.5 cursor-zoom-in"
            >
              {/* Top Red Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D50032] via-[#FF4D6D] to-[#D50032] z-10" />
              
              {/* Image element */}
              <img 
                src="/CERTIFICATE 02 (1) (1)_page-0001.jpg" 
                alt="FinTrade Professional Trading Program Certificate" 
                className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-[1.015]" 
              />

              {/* Hover overlay with glassmorphism */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-lg flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="h-6 w-6 text-[#D50032] stroke-[2.5]" />
                </div>
              </div>
            </div>
            
            {/* Under-image tagline & interactive prompts */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-gray-400 font-semibold tracking-wide">
                Official FinTrade Certificate of Completion
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <button 
                onClick={() => setIsZoomed(true)}
                className="text-xs font-bold text-[#D50032] hover:text-[#FF3D00] transition-colors flex items-center gap-1 cursor-pointer"
              >
                Click to Zoom
              </button>
            </div>
          </div>

          {/* Right Column: Why Our Certificates Matter Info Panel */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-3xl sm:text-4.5xl font-black text-gray-950 tracking-tight leading-tight">
              Why Our Certificates <span className="text-[#D50032]">Matter</span>
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: "Industry-Recognized",
                  desc: "Accepted by leading prop firms, brokerages, and financial institutions across India.",
                  icon: (
                    <svg className="w-5 h-5 text-[#D50032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M15.4 12L17 22l-5-3-5 3 1.6-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )
                },
                {
                  title: "Verified & Tamper-Proof",
                  desc: "Each certificate carries a unique ID, digitally verifiable and tamper-proof.",
                  icon: (
                    <svg className="w-5 h-5 text-[#D50032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  )
                },
                {
                  title: "Skill-Based Assessment",
                  desc: "Certificates are awarded only after passing rigorous, performance-based evaluations.",
                  icon: (
                    <svg className="w-5 h-5 text-[#D50032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.427.76-.427.933 0l2.366 5.83a1 1 0 00.753.546l6.237.535c.465.04.65.61.298.895l-4.73 3.83a1 1 0 00-.312.961l1.455 6.096c.108.455-.386.815-.774.577L12 18.067a1 1 0 00-.96 0l-5.116 3.123c-.388.238-.882-.122-.774-.577l1.455-6.096a1 1 0 00-.312-.961l-4.73-3.83c-.352-.285-.167-.855.298-.895l6.237-.535a1 1 0 00.753-.546l2.366-5.83z" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-gray-100/90 rounded-2xl p-5 flex items-start gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:border-[#D50032]/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FFF0F2] group-hover:bg-[#D50032]/10 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-gray-900 text-base tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Premium Zoom Modal Lightbox */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300 p-4"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/15"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Download certificate image button */}
          <a 
            href="/CERTIFICATE 02 (1) (1)_page-0001.jpg" 
            download="FinTrade_Professional_Trading_Certificate.jpg"
            className="absolute top-6 right-22 h-12 px-6 rounded-full bg-white text-[#D50032] font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 shadow-xl transition-all duration-300 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
            title="Download Certificate"
          >
            <Download className="w-4.5 h-4.5 stroke-[2.5]" />
            Download
          </a>

          {/* Certificate Image inside modal */}
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src="/CERTIFICATE 02 (1) (1)_page-0001.jpg" 
              alt="FinTrade Professional Trading Program Certificate Large View" 
              className="w-full h-auto max-h-[85vh] object-contain select-none" 
            />
          </div>
        </div>
      )}
    </section>
  );
}
