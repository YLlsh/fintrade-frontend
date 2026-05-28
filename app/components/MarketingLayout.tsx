import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { Search, Phone, Instagram, Facebook, Youtube, Linkedin, X, Download, UserCircle, Save, Mail, Smartphone, Menu, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import logo from "../../imports/fintrade_logo.png";
import api from "../services/api";

export default function MarketingLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  // Close mobile sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout API failed", e);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/login");
  };

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const isAuthenticated = !!localStorage.getItem("token");
  const initials = useMemo(() => {
    return (profileForm.full_name || "User")
      .split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profileForm.full_name]);

  useEffect(() => {
    if (!profileOpen || !isAuthenticated) return;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setProfileForm({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      } catch {
        // API data below will refresh the form.
      }
    }

  }, [profileOpen, isAuthenticated]);

  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setProfileSaving(true);

    try {
      // Call backend API to update the profile in the database
      const res = await api.put("/auth/my-profile", profileForm);
      
      // Update localStorage with the latest server data
      localStorage.setItem("user", JSON.stringify(res.data));
      setProfileOpen(false);
    } catch (err) {
      console.error("Profile update failed", err);
      // Fallback local storage update
      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : {};
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          full_name: profileForm.full_name,
          email: profileForm.email,
          phone: profileForm.phone || null,
        })
      );
      setProfileOpen(false);
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: "radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F8F8F8 50%, #F4F4F4 100%)" }}>
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-32" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <Search className="h-5 w-5 text-gray-400" />
              <input autoFocus type="text" placeholder="Search courses, topics, videos..." className="flex-1 text-lg outline-none bg-transparent" style={{ color: "#121212" }} />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2 py-1 rounded bg-gray-100">ESC</button>
            </div>
            <div className="p-4 text-sm text-gray-500">
              <p className="font-medium mb-3" style={{ color: "#121212" }}>Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Technical Analysis", "Options Trading", "Risk Management", "NIFTY", "Candlestick Patterns", "Trading Psychology"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer hover:bg-[#D50032] hover:text-white transition-colors" style={{ background: "rgba(213,0,50,0.08)", color: "#D50032" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Utility Top Bar */}
      <div className="w-full z-[101] bg-[#121212] text-white" style={{ borderBottom: "1px solid rgba(213,0,50,0.2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white bg-[#D50032] px-3.5 py-1.5 rounded-full font-bold shadow-[0_0_15px_rgba(213,0,50,0.45)] hover:bg-[#FF0000] hover:scale-105 transition-all duration-300">
                <Phone className="h-3.5 w-3.5 fill-current" /> <span className="hidden sm:inline">+91 98765 43210</span><span className="sm:hidden">Call</span>
              </a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-400 hidden sm:inline">Support & Info</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/the.fintrade/", label: "Instagram" },
                  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61589528075521", label: "Facebook" },
                  { icon: Youtube, href: "https://www.youtube.com/@The_FinTrade", label: "YouTube" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/the-fintrade-7230b040a/", label: "LinkedIn" },
                  { icon: X, href: "#", label: "X" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-[#D50032] transition-colors" title={s.label}>
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <span className="text-gray-600">|</span>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-[#D50032] transition-colors font-medium">
                <Download className="h-4 w-4" /> Download App
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-[100] transition-all duration-300 bg-white/90 border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center h-[50px] w-[140px] md:h-[60px] md:w-[220px]">
              <Link to="/" className="flex items-center justify-center h-full w-full overflow-hidden">
                <img
                  src={logo}
                  alt="FinTrade"
                  className="h-full w-full object-contain scale-[2.5] md:scale-[3.5] -translate-x-2 md:-translate-x-6 -translate-y-1 md:-translate-y-1.5"
                  style={{
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
                    transformOrigin: "center center"
                  }}
                />
              </Link>
            </div>
            
            {/* Center navigation links */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Home</Link>
              <Link to="/courses" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Courses</Link>
              <Link to="/markets" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Markets</Link>
              <Link to="/category/all" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Categories</Link>
              <Link to="/updates" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Update</Link>
              <Link to="/blog" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">Blog</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#D50032] transition-colors font-medium">About</Link>
            </div>
            
            {/* Right icons & login */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(true)} className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all text-gray-600 hover:text-[#D50032] hover:bg-[#D50032]/10" title="Search">
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all text-gray-700 hover:text-[#D50032] hover:bg-[#D50032]/10"
                  title="Profile"
                  aria-label="Profile"
                >
                  <UserCircle className="h-8 w-8" />
                </button>
              ) : (
                <Link to="/login">
                  <Button className="bg-[#D50032] hover:bg-[#FF3D00] text-white rounded-xl shadow-lg shadow-[#D50032]/25 font-bold h-10 px-5 flex items-center gap-1.5 transition-all duration-300">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                    </svg>
                    Login
                  </Button>
                </Link>
              )}
              {/* Mobile Sidebar Hamburger Trigger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="w-8 h-8 rounded-full flex md:hidden items-center justify-center transition-all text-gray-600 hover:text-[#D50032] hover:bg-[#D50032]/10 ml-1"
                title="Open Navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Sidebar */}
      <div 
        className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Drawer slide-in panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[290px] bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#121212]/5">
            <div className="h-8 flex items-center overflow-hidden">
              <img
                src={logo}
                alt="FinTrade"
                className="h-full w-auto object-contain scale-[2.2] -translate-x-1"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.05))"
                }}
              />
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#D50032] hover:bg-[#D50032]/10 transition-colors shadow-sm"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col space-y-1 px-4">
              {[
                { name: "Home", path: "/" },
                { name: "Courses", path: "/courses" },
                { name: "Markets", path: "/markets" },
                { name: "Categories", path: "/category/all" },
                { name: "Updates", path: "/updates" },
                { name: "Blog", path: "/blog" },
                { name: "About Us", path: "/about" },
              ].map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-black text-sm transition-all group ${
                      isActive 
                        ? "bg-[#D50032] text-white shadow-md shadow-[#D50032]/25" 
                        : "text-gray-700 hover:bg-[#D50032]/5 hover:text-[#D50032]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#D50032]"}`} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer inside mobile sidebar */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
            <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-white bg-[#D50032] py-3.5 rounded-2xl font-bold shadow-[0_0_15px_rgba(213,0,50,0.35)] hover:bg-[#FF0000] active:scale-98 transition-all duration-300 w-full text-sm">
              <Phone className="h-4 w-4 fill-current" /> Call Support
            </a>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Connect with us</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/the.fintrade/", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61589528075521", label: "Facebook" },
                { icon: Youtube, href: "https://www.youtube.com/@The_FinTrade", label: "YouTube" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/the-fintrade-7230b040a/", label: "LinkedIn" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-150 flex items-center justify-center text-gray-500 hover:text-[#D50032] hover:border-[#D50032]/35 shadow-sm transition-all" title={s.label}>
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-[460px] bg-white p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <DialogTitle className="text-[#121212] flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-[#D50032] text-white flex items-center justify-center text-sm font-bold">
                {initials}
              </span>
              Profile
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleProfileSave} className="px-6 py-5 space-y-4">
            <div>
              <Label htmlFor="publicProfileName">Full Name</Label>
              <div className="relative mt-2">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="publicProfileName"
                  value={profileForm.full_name}
                  onChange={(event) => setProfileForm((current) => ({ ...current, full_name: event.target.value }))}
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-[#D50032] focus:ring-[#D50032]"
                  disabled={profileSaving}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="publicProfileEmail">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="publicProfileEmail"
                  type="email"
                  value={profileForm.email}
                  onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))}
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-[#D50032] focus:ring-[#D50032]"
                  disabled={profileSaving}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="publicProfilePhone">Phone Number</Label>
              <div className="relative mt-2">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="publicProfilePhone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))}
                  className="pl-10 bg-gray-50 border-gray-300 focus:border-[#D50032] focus:ring-[#D50032]"
                  disabled={profileSaving}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <Button
                type="submit"
                className="flex-1 bg-[#D50032] hover:bg-[#b00029] text-white font-bold"
                disabled={profileSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                {profileSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold border border-gray-200"
              >
                Logout
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-12 relative z-10" style={{ background: "#121212", color: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-1 flex flex-col items-start gap-4">
              <div className="h-[45px] flex items-center justify-start">
                <img
                  src={logo}
                  alt="FinTrade"
                  className="h-10 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
                India's first structured Prop Trading Academy. Learn, trade, and build a professional trading career.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-[#D50032] transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-[#D50032] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#D50032] transition-colors">Press</a></li>
                <li><Link to="/blog" className="hover:text-[#D50032] transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-[#D50032] transition-colors">Basic Trading</Link></li>
                <li><Link to="/courses" className="hover:text-[#D50032] transition-colors">Intermediate Trading</Link></li>
                <li><Link to="/courses" className="hover:text-[#D50032] transition-colors">Advanced Trading</Link></li>
                <li><Link to="/courses" className="hover:text-[#D50032] transition-colors">Master Trading</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/updates" className="hover:text-[#D50032] transition-colors">Market Updates</Link></li>
                <li><Link to={isAuthenticated ? "/student/lectures" : "/login"} className="hover:text-[#D50032] transition-colors">Live Classes</Link></li>
                <li><Link to={isAuthenticated ? "/student/ai-tutor" : "/login"} className="hover:text-[#D50032] transition-colors">AI Tutor</Link></li>
                <li><a href="#" className="hover:text-[#D50032] transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61589528075521" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D50032] transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D50032] transition-colors"><X className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/in/the-fintrade-7230b040a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D50032] transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/the.fintrade/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D50032] transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="https://www.youtube.com/@The_FinTrade" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D50032] transition-colors"><Youtube className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} FinTrade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
