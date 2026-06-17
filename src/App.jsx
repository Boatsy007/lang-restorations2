import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight, 
  Settings, 
  Zap, 
  Wrench, 
  ShieldCheck, 
  Droplets,
  Menu,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Section = ({ title, subtitle, children, id, className = "", dark = true }) => (
  <section id={id} className={cn("py-24 px-6 relative overflow-hidden", dark ? "bg-black text-white" : "bg-[#111] text-white", className)}>
    <div className="max-w-7xl mx-auto relative z-10">
      {title && (
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4"
          >
            {title}
            <span className="text-red-600">.</span>
          </motion.h2>
          {subtitle && <p className="text-gray-500 uppercase font-bold tracking-[0.2em] text-sm">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
    {/* Subtle Sprocket Background Element */}
    <div className="absolute -bottom-24 -right-24 opacity-5 pointer-events-none">
       <img src="/lang-logo-new.png?v=10" alt="" className="w-96 h-96 grayscale invert animate-spin-slow" style={{ animationDuration: '60s' }} />
    </div>
  </section>
);

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black",
    outline: "border border-gray-800 text-gray-400 hover:border-red-600 hover:text-white"
  };

  return (
    <button 
      className={cn(
        "px-8 py-4 font-black uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Main App ---
export default function App() {
  const [view, setView] = useState('design'); // Defaulting to design now
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingScroll = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When we arrive on "/", check the ref for a pending scroll target and execute it
  useEffect(() => {
    if (location.pathname !== '/') return;
    const target = pendingScroll.current;
    if (!target) return;
    pendingScroll.current = null;
    let attempts = 0;
    const poll = setInterval(() => {
      const el = document.getElementById(target);
      if (el) {
        clearInterval(poll);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts >= 40) {
        clearInterval(poll);
      }
      attempts++;
    }, 50);
    return () => clearInterval(poll);
  }, [location.pathname]);

  const handleNav = (target) => {
    if (target === 'for-sale') {
      navigate('/for-sale');
      return;
    }
    if (location.pathname !== '/') {
      pendingScroll.current = target;
      navigate('/');
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

const handleMobileNav = (target) => {
  handleNav(target);
  setTimeout(() => {
    setMobileMenuOpen(false);
  }, 250);
};

  const services = [
    { title: "Full Bike Restorations", icon: Settings, desc: "Complete ground-up restorations built to period-correct standards with attention to every detail." },
    { title: "Parts Restoration", icon: Wrench, desc: "Bringing worn, damaged and aged components back to their original condition." },
    { title: "Vapor Blasting", icon: Droplets, desc: "Professional vapor blasting for a clean factory-style finish on aluminium and engine components." },
    { title: "Zinc Plating", icon: ShieldCheck, desc: "High-quality zinc plating to restore original appearance and provide long-term corrosion protection." },
    { title: "Aluminium Repairs", icon: Zap, desc: "Expert aluminium repair work for damaged, worn or cracked motorcycle components." },
    { title: "Frame Repairs", icon: Settings, desc: "Precision frame repairs and restoration work to ensure strength, alignment and reliability." },
    { title: "Parts Restoration & Zinc Plating", icon: Wrench, desc: "Individual component restoration and zinc plating. Bringing worn, oxidised and damaged parts back to factory-quality finish.", slug: "parts-restoration" }
  ];

  const [projects, setProjects] = useState([
    {
      name: "1996 Honda CR500 McGrath Tribute",
      slug: "1996-honda-cr500-mcgrath-tribute",
      type: "Motocross",
      img: "https://f.playcode.io/u/019d041a-e1dd-70ae-9f99-3dcf404d6f45/screenshots/019ea05c-5139-77fc-aa03-8fc1411b04df/processed-1780806865209.jpeg",
      beforeImg: "https://f.playcode.io/u/019d041a-e1dd-70ae-9f99-3dcf404d6f45/screenshots/019ea04f-0aaa-7087-87e5-43f26e866a65/processed-1780805995178.jpeg",
      showBefore: false,
      year: "1996",
      engine: "491cc Single-Cylinder Two-Stroke",
      work: "I've always been a big fan of Jeremy McGrath, so this build was something special from the start.\n\nThe goal was to build a CR500 that looked every bit as good as McGrath's iconic 1996 factory Honda, using HRC parts where possible and chasing the details that most people would never notice. Countless hours went into making sure the bike looked right from every angle.\n\nThe end result is a stunning tribute build that turns heads wherever it goes and is about as close as you'll get to owning a piece of motocross history.",
      status: "Completed"
    },
    {
      name: "1993 Kawasaki KX250",
      slug: "1993-kawasaki-kx250",
      type: "Motocross",
      img: "/kx250-restored.jpeg",
      img2: "/kx250-workshop.jpeg",
      beforeImg: "",
      showBefore: false,
      year: "1993",
      engine: "249cc Single-Cylinder Two-Stroke",
      work: "This KX250 wasn't about over-restoring a classic. It was about bringing a great bike back to life the right way.\n\nEvery aluminium component was vapour blasted to achieve a clean factory-style finish, while selected parts were Cerakoted for durability and long-term protection. The bike was carefully refreshed while keeping the character that makes these early 90s KXs so sought after today.\n\nIt presents beautifully, rides as good as it looks, and is the sort of bike that gets plenty of attention whenever it's out of the trailer.",
      status: "Completed"
    },
    {
      name: "1996 Honda CR250",
      slug: "1996-honda-cr250",
      type: "Motocross",
      img: "/cr250-96-progress.jpeg",
      beforeImg: "",
      showBefore: false,
      year: "1996",
      engine: "249cc Single-Cylinder Two-Stroke",
      description: "This 1996 Honda CR250 is a no-expenses-spared restoration being built using a combination of genuine HRC components and other high-end performance parts.\n\nThe goal is to create a bike that not only looks exceptional but performs at the highest level, with every detail carefully considered throughout the build. Highlights include a Showa 47mm CC fork conversion, a TSP-built engine, a hand-grained swingarm, billet components and titanium hardware used throughout the bike.\n\nThis is one of those builds where nothing is being rushed and nothing is being done twice. Every component is being restored, upgraded or refinished to an extremely high standard to create something truly special.",
      work: "No-expenses-spared frame-up restoration. Showa 47mm CC fork conversion. TSP-built engine. Hand-grained swingarm. Billet components throughout. Titanium hardware. Genuine HRC components. Every part restored, upgraded or refinished to an extremely high standard.",
      status: "In Progress"
    },
    {
      name: "2000 Yamaha YZ250 Vuillemin Tribute",
      slug: "2000-yamaha-yz250-vuillemin-tribute",
      type: "Motocross",
      img: "/yz250-restored.jpeg",
      beforeImg: "/yz250-before.jpeg",
      showBefore: false,
      year: "2000",
      engine: "249cc Two-Stroke",
      description: "This build was inspired by David Vuillemin's iconic 2000 factory Yamaha YZ250. The goal was to recreate the look and feel of his race bike while adding our own touch throughout the restoration.\n\nStarting with a tired and incomplete bike, every part was either restored, refinished or replaced. Nothing was overlooked. From the chassis and suspension through to the engine and final assembly, the focus was on producing a bike that looked and performed like a factory-level build.\n\nWhile remaining true to the original Vuillemin-inspired styling, we incorporated a number of premium components and modern refinements to create something unique. The result is a bike that captures the spirit of one of motocross's most memorable eras while showcasing the quality and attention to detail we aim for in every build.",
      work: "Factory tribute build inspired by David Vuillemin's iconic 2000 race bike. Complete frame-up restoration. Chassis, suspension, engine and all ancillaries restored, refinished or replaced. Premium components and modern refinements incorporated throughout. Finished to factory race standard.",
      buildType: "Factory Tribute",
      status: "Completed"
    },
    {
      name: "1986 Honda Z50R",
      slug: "1986-honda-z50r",
      type: "Classic",
      img: "/z50r-progress-1.jpeg",
      img2: "/z50r-progress-2.jpeg",
      beforeImg: "",
      showBefore: false,
      year: "1986",
      engine: "49cc Single-Cylinder Four-Stroke",
      description: "This 1986 Honda Z50R is being treated to a full OEM-style restoration, bringing it back as close as possible to the way it should be.\n\nThis one is a bit special, as it was the owner's first bike. Jobs like this are always awesome to work on because there's a real story behind them. It's not just another restoration — it's bringing back a piece of someone's childhood.\n\nThe aim is to restore the bike properly, keep the original character, and finish it to a standard the owner can be proud of for years to come.",
      work: "Full OEM-style restoration. Strip, inspect, and rebuild to factory specification. Frame and components restored to original finish. Engine rebuild with correct tolerances. All ancillaries restored or sourced to period-correct spec.",
      status: "In Progress"
    },
    {
      name: "1982 Honda Z50R",
      slug: "1982-honda-z50r",
      type: "Classic",
      img: "/z50r-82-restored.jpeg",
      beforeImg: "/z50r-82-before.jpeg",
      showBefore: false,
      year: "1982",
      engine: "49cc Single-Cylinder Four-Stroke",
      description: "This 1982 Honda Z50R was a special build, as it was the customer's very first bike. Projects like these are always some of our favourites because they bring back a lot of memories and have a real story behind them.\n\nThe goal was a full OEM-style restoration, returning the bike back to the way it should be while preserving the character that made it special in the first place.\n\nEvery part of the build was carefully restored, repaired or replaced where needed, resulting in a finished bike that looks just as good as it did when it first left the showroom floor.",
      work: "Full OEM-style restoration. Complete strip-down, inspect and rebuild to factory specification. Frame, plastics and bodywork restored to original finish. Engine rebuild to correct tolerances. All ancillaries restored or sourced to period-correct specification.",
      status: "Completed"
    },
   {
  name: "1954 BSA Bantam D3 Plunger",
  slug: "1954-bsa-bantam-d3-plunger",
  type: "Vintage",
  img: "/bsa-progress-1.jpeg",
  img2: "/bsa-progress-2.jpeg",
  beforeImg: "",
  showBefore: false,
  year: "1954",
  engine: "148cc Single-Cylinder Two-Stroke",
  work: "This build is a full OEM-style restoration of a classic 1954 BSA Bantam D3 Plunger, being carefully rebuilt to retain its original character while benefiting from a modern 12-volt ignition system for improved reliability and everyday usability.\n\nNo shortcuts are being taken on this one. Every component is being inspected, repaired, restored or replaced where required to bring the bike back to the standard it deserves. Countless hours have already gone into the project, with a strong focus on authenticity, quality workmanship and attention to detail.\n\nThis restoration is currently in progress, with more updates to come as the build continues.",
  status: "In Progress"
},
    {
      name: "1978 Honda Z50 J1",
      slug: "1978-honda-z50-j1",
      type: "Classic",
      img: "/z50j1-78-restored.jpeg",
      beforeImg: "/z50j1-78-before.jpeg",
      showBefore: false,
      year: "1978",
      engine: "49cc Single-Cylinder Four-Stroke",
      description: "This 1978 Honda Z50 J1 was a special restoration, as it was the owner's very first bike. Because of the memories attached to it, the goal from day one was simple — make it as good as new, with no compromises along the way.\n\nA lot of sentimental value sits behind this build, so every part was restored, refinished or replaced where needed to bring the bike back to the standard it deserved. No shortcuts were taken, and attention to detail was a priority throughout the entire restoration.\n\nThe result is a fully restored Z50 J1 that looks just as special as the day it first rolled out of the showroom. A build we're proud of and one the owner will be able to enjoy for many years to come.",
      work: "Full OEM-style restoration. Complete strip-down and rebuild to factory specification. All bodywork, frame and components restored or replaced to correct period specification. Engine rebuilt to correct tolerances. Every detail attended to with no shortcuts taken.",
      status: "Completed"
    },
    {
      name: "1972 Honda Z50A U-Type",
      slug: "1972-honda-z50a-u-type",
      type: "Vintage",
      img: "/z50a-72-restored.jpeg",
      beforeImg: "/z50a-72-before.jpeg",
      showBefore: false,
      year: "1972",
      engine: "49cc Single-Cylinder Four-Stroke",
      description: "This 1972 Honda Z50 A U-Type was built as a no-expenses-spared restoration back to original factory specification. The goal was to create a bike that looked and presented exactly as Honda intended, using OEM parts wherever possible and restoring every component to the highest standard.\n\nUnlike most of our builds, this bike was restored specifically for resale. We only build a small number of these bikes each year, making each one a carefully selected project rather than a production build.\n\nStarting with a tired and heavily worn original bike, the restoration involved a complete strip-down and rebuild, with every component either restored, refinished or replaced. The finished result is a showroom-quality Z50 A U-Type that stays true to its original heritage while presenting better than new.\n\nThis bike has since been sold.",
      work: "Full OEM restoration back to factory specification. Complete strip-down and rebuild. All components restored, refinished or replaced to correct period specification. OEM parts used wherever possible. Engine rebuilt to correct tolerances. Finished to showroom standard.",
      status: "Completed"
    },
    {
      name: "1997/99 Honda CR250 Lusk Tribute",
      slug: "1997-99-honda-cr250-lusk-tribute",
      type: "Motocross",
      img: "/lusk-progress-3.jpeg",
      img2: "/lusk-progress-1.jpeg",
      beforeImg: "",
      showBefore: false,
      year: "1997/99",
      engine: "249cc Two-Stroke",
      description: "The 1997/99 Honda CR250 Lusk Tribute is one of our upcoming collaboration builds with Black Blox Finishes.\n\nThis project will pay tribute to one of the most iconic CR250 race bikes of the late 90s while incorporating the attention to detail, workmanship and finish quality both workshops are known for.\n\nThe build is currently in the planning and parts sourcing stage, with the goal of creating a bike that captures the look and feel of Jeremy Lusk's factory-era Honda while adding our own touch throughout the restoration.\n\nAs with all of our tribute builds, no shortcuts will be taken. Every component will be carefully selected, restored, refinished or replaced to ensure the finished bike is something special.\n\nThis build is yet to commence, and updates will be added as the project progresses.",
      work: "Tribute build in collaboration with Black Blox Finishes. Planning and parts sourcing underway. Full restoration to tribute specification. All components to be carefully selected, restored, refinished or replaced. No shortcuts taken.",
      collaboration: "Black Blox Finishes",
      buildType: "Tribute Build",
      status: "About To Start"
    }
  ]);

  const forsaleListings = [
    {
      name: "2017 Honda Z50 Monkey 50th Anniversary Chrome",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "Rare 50th Anniversary Chrome Edition Honda Monkey. A highly collectible modern classic and one of the most sought-after Monkey models ever produced. Presented in excellent condition and ready for a collector or enthusiast.",
      slug: "for-sale-2017-honda-monkey-chrome"
    },
    {
      name: "2017 Honda Z50 Monkey 50th Anniversary",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "50th Anniversary Honda Monkey finished in factory colours. A fantastic example of Honda's iconic mini bike and a great addition to any collection.",
      slug: "for-sale-2017-honda-monkey"
    },
    {
      name: "2000 Yamaha YZ250 Vuillemin Tribute",
      category: "Restored",
      status: "Available",
      price: "POA",
      img: "/yz250-restored.jpeg",
      desc: "Built as a tribute to David Vuillemin's 2000 race bike while adding our own touches throughout the build. Every component was either restored or replaced with new parts. A no-compromise restoration completed to an extremely high standard.",
      slug: "for-sale-2000-yamaha-yz250-vuillemin"
    },
    {
      name: "1990 Yamaha YZ250WR",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "Classic Yamaha enduro machine restored with attention to detail throughout. A rare opportunity to own a sought-after vintage Yamaha WR.",
      slug: "for-sale-1990-yamaha-yz250wr"
    },
    {
      name: "1976 Honda Z50 J1 Parakeet Yellow",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "Fully restored back to original factory specifications in the iconic Parakeet Yellow colour scheme. A highly collectible Honda mini bike restored with a focus on originality and detail.",
      slug: "for-sale-1976-honda-z50-j1-parakeet"
    },
    {
      name: "1972 Honda Z50 A U-Type Mex Yellow",
      category: "Restored",
      status: "Available",
      price: "POA",
      img: "/z50a-72-restored.jpeg",
      desc: "No-expense-spared restoration completed using predominantly genuine OEM parts. One of only a small number of bikes we restore each year for sale. A beautiful example of Honda's early Mini Trail range.",
      slug: "for-sale-1972-honda-z50a-mex-yellow"
    },
    {
      name: "1970 Honda Z50 A K2 GE Yellow",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "Factory-style restoration completed to a high standard. Finished in the iconic GE Yellow colour scheme and restored with originality in mind.",
      slug: "for-sale-1970-honda-z50a-k2-yellow"
    },
    {
      name: "1970 Honda Z50 A K2 GE Red",
      category: "Restored",
      status: "Available",
      price: "POA",
      desc: "Fully restored Honda Z50 A K2 finished in factory GE Red. A highly desirable early Mini Trail and an excellent collector bike.",
      slug: "for-sale-1970-honda-z50a-k2-red"
    },
    {
      name: "1997/99 Honda CR250 Lusk Tribute",
      category: "Restored",
      status: "Available",
      price: "POA",
      img: "/lusk-progress-3.jpeg",
      desc: "A collaboration build inspired by Jeremy Lusk's legendary CR250 race bikes of the late 1990s, featuring custom finishes and high-end components throughout. Built as a tribute to one of motocross's most iconic eras.",
      slug: "for-sale-1997-99-honda-cr250-lusk"
    },
  ];

  const toggleProject = (index) => {
    setProjects(prev => prev.map((p, i) => i === index ? { ...p, showBefore: !p.showBefore } : p));
  };

  return (
    <div className={cn("min-h-screen selection:bg-red-600 selection:text-white antialiased", view === 'wireframe' ? 'bg-white text-black font-mono' : 'bg-black text-white font-sans')}>

      {view === 'wireframe' ? (
        <WireframeLayout />
      ) : (
        <>
          {/* Header */}
          <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-500 px-6",
            isScrolled ? "bg-black/95 backdrop-blur-md border-b border-gray-900 h-16 md:h-20" : "bg-transparent h-20 md:h-24"
          )}>
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center relative">
              <Link to="/" className="relative group flex items-center h-full w-32 md:w-48" onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
                <img 
                  src="/lang-logo-new.png?v=10" 
                  alt="Lang Restorations" 
                  className={cn(
                    "w-auto absolute left-0 transition-all duration-500 group-hover:scale-105 drop-shadow-2xl",
                    isScrolled 
                      ? "h-28 md:h-40 top-1/2 -translate-y-1/2" 
                      : "h-32 md:h-48 -top-1 md:-top-2"
                  )}
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-10">
                {['About', 'Services', 'Projects', 'Process', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNav(item.toLowerCase())}
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => handleNav('for-sale')}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-red-600 hover:text-white transition-colors"
                >
                  For Sale
                </button>
                <Button variant="primary" className="py-2.5 px-6" onClick={() => handleNav('contact')}>
                  Book a Build
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
            <motion.div 
  initial={{ opacity: 0, x: '100%' }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: '100%' }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="fixed inset-0 z-[100] bg-black p-8 flex flex-col"
              >
                <div className="flex justify-between items-center mb-16">
                  <img src="/lang-logo-new.png?v=10" alt="Logo" className="h-32 w-auto drop-shadow-2xl" />
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={32} /></button>
                </div>
                <div className="flex flex-col gap-8">
                  {['About', 'Services', 'Projects', 'Process', 'Contact'].map((item) => (
                    <button
                      key={item}
                      className="text-4xl font-black uppercase tracking-tighter text-left"
                      onClick={() => handleMobileNav(item.toLowerCase())}
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    className="text-4xl font-black uppercase tracking-tighter text-red-600 text-left"
                    onClick={() => handleMobileNav('for-sale')}
                  >
                    For Sale
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Routes>
          <Route path="/" element={<>
          {/* Hero */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img src="/hero-bike.jpeg" alt="Workshop" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-0 -mt-15 md:mt-0 md:pt-36 md:pb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-red-600" />
                  <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Traralgon, VIC</span>
                </div>
                <h1 className="text-[12vw] md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6 italic">
                  Restore<span className="text-red-600">.</span><br/>
                  Revive<span className="text-red-600">.</span><br/>
                  Ride<span className="text-red-600">.</span>
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                  Motocross. Classic. Vintage. <br/>
                  <span className="text-white">Built properly for over 20 years. No shortcuts. No cheap work. Just quality restorations built to last.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/for-sale">
                    <Button variant="primary" className="px-12 w-full sm:w-auto">
                      For Sale <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Button variant="secondary" className="px-12" onClick={() => handleNav('projects')}>
                    View Projects
                  </Button>
                  <Button variant="secondary" className="px-12" onClick={() => handleNav('contact')}>
                    Get In Touch
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] vertical-text">Scroll</span>
              <div className="w-px h-12 bg-white/50" />
            </div>
          </section>

          {/* About */}
          <Section id="about" title="THE WORKSHOP" subtitle="ESTABLISHED 2004">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 border border-red-600/30 group-hover:-inset-6 transition-all duration-700" />
                <img src="/about-workshop.jpeg" alt="Workshop Close-up" className="relative z-10 w-full h-auto hover:scale-105 transition-all duration-700 shadow-2xl" />
                <div className="absolute bottom-10 right-10 z-20 bg-red-600 p-6 shadow-2xl">
                   <p className="text-white font-black text-4xl italic">20+</p>
                   <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Years Exp.</p>
                </div>
              </div>
              <div className="space-y-8">
                <p className="text-3xl md:text-4xl font-black italic leading-tight uppercase tracking-tighter">
                  "Every build is treated with precision, patience and respect for the machine."
                </p>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                    I've been bringing old bikes back to life for over 20 years, and I still get just as excited about every build that rolls into the workshop. Whether it's a vintage motocross weapon, a classic road bike, or something with a bit of family history behind it, I treat every project like it’t do "near enough".
                  </p>
                  <p>
                    This isn’t a production shop pumping out quick jobs. Every restoration is treated as a piece of history. We use the right techniques, the right tools, and the right attitude.
                  </p>
                </div>
                <div className="pt-6 flex flex-wrap gap-8">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">No Cheap Work</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">Australian Owned</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">True Quality</span>
                   </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Services */}
          <Section id="services" title="CAPABILITIES" subtitle="SERVICES" className="bg-[#0a0a0a]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-900 border border-gray-900">
              {services.map((service, i) => (
                service.slug ? (

                  <Link to={`/services/${service.slug}`} key={service.title} className="block">
                    <motion.div 
                      whileHover={{ backgroundColor: '#111' }}
                      className="bg-black p-12 group transition-all duration-300 h-full"
                    >
                      <service.icon className="text-red-600 mb-8 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">{service.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm mb-6">{service.desc}</p>
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 group-hover:gap-3 transition-all duration-300">
                        View Gallery <ArrowRight className="w-3 h-3" />
                      </span>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div 
                    key={service.title}
                    whileHover={{ backgroundColor: '#111' }}
                    className="bg-black p-12 group transition-all duration-300"
                  >
                    <service.icon className="text-red-600 mb-8 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{service.desc}</p>
                  </motion.div>
                )
              ))}
              {/* Filler cells: 7 cards in a 3-col grid leaves 2 empty cells whose bg-gray-900 shows as a dark rectangle. These invisible black divs fill them on lg only. */}
              <div className="hidden lg:block bg-black" aria-hidden="true" />
              <div className="hidden lg:block bg-black" aria-hidden="true" />
            </div>
          </Section>

          {/* Featured Builds */}
          <Section id="projects" title="FEATURED BUILDS" subtitle="RECENT PROJECTS">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, i) => (
                <motion.div 
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/projects/${project.slug}`} className="block relative overflow-hidden aspect-[4/3] mb-6 bg-gray-900">
                    {project.img
                      ? <img
                          src={project.img}
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      : <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-700 text-[10px] font-black uppercase tracking-widest">Coming Soon</span>
                        </div>
                    }
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                        {project.type}
                      </span>
                    </div>
                  </Link>
                  <Link to={`/projects/${project.slug}`} className="flex justify-between items-end border-b border-gray-900 pb-6 group/link">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 group-hover/link:text-red-500 transition-colors">{project.name}</h3>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Ground-Up Restoration</p>
                    </div>
                    <ChevronRight className="text-red-600 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* For Sale Preview */}
          <Section id="for-sale" title="FOR SALE" subtitle="BIKES AVAILABLE NOW" className="bg-[#0a0a0a]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {forsaleListings.map((listing, i) => (
                <motion.div
                  key={listing.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex flex-col"
                >
                  {/* Image / placeholder */}
                  <div className="aspect-[4/3] bg-gray-900 border border-gray-800 flex items-center justify-center mb-5 relative overflow-hidden">
                    {listing.img
                      ? <img src={listing.img} alt={listing.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <span className="text-gray-700 text-[10px] font-black uppercase tracking-widest">Images Coming Soon</span>
                    }
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`text-[10px] font-black px-3 py-1 uppercase tracking-widest shadow-xl ${listing.status === 'Available' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">{listing.category}</p>
                    <h3 className="text-lg font-black uppercase tracking-tighter leading-tight mb-3">{listing.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{listing.desc}</p>
                    <div className="flex justify-between items-center border-t border-gray-900 pt-4">
                      <span className="text-red-600 font-black uppercase tracking-widest text-sm">{listing.price}</span>
                      <Link to="/for-sale" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-1 group/link">
                        Enquire <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/for-sale">
                <Button variant="secondary" className="px-12">View All Listings <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </Section>

          {/* Process */}
          <Section id="process" title="THE FLOW" subtitle="METHODOLOGY" className="bg-[#0a0a0a]">
            <div className="grid md:grid-cols-5 gap-12 text-center relative">
              <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gray-800 z-0" />
              {['Consult', 'Inspect', 'Restore', 'Build', 'Ride'].map((step, i) => (
                <div key={step} className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-black border-2 border-red-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-black italic shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                    {i + 1}
                  </div>
                  <h3 className="font-black uppercase tracking-tighter text-xl">{step}</h3>
                  <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest leading-loose px-4">Direct, professional {step.toLowerCase()} phase.</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Testimonials */}
          <Section id="testimonials" title="REPUTATION" subtitle="CLIENT FEEDBACK">
            <div className="grid md:grid-cols-2 gap-20">
              <div className="space-y-6">
                <div className="text-red-600 flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Zap key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
                  "Nick’s work is next level. The attention to detail is unreal. Best vintage bike restoration work I’ve seen in years."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-gray-700" />
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">— Dave, Vintage MX Rider</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-red-600 flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Zap key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
                  "Straight shooter, knows his stuff. My Husqvarna came back looking better than it did on the showroom floor in '74."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-gray-700" />
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">— Mick, Classic Collector</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" title="BOOK A BUILD" subtitle="CONTACT" className="bg-[#111] pb-32">
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-16">
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                      <MapPin className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-2">Location</h4>
                      <p className="text-gray-400">Traralgon, Victoria, Australia</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                      <Phone className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-2">Phone</h4>
                      <p className="text-gray-400">0439 744 632</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-900 flex items-center justify-center shrink-0">
                      <Mail className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm mb-2">Email</h4>
                      <p className="text-gray-400">info@langrestorations.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                   <h4 className="font-black uppercase text-sm">Follow the Builds</h4>
                   <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 bg-gray-900 flex items-center justify-center hover:bg-red-600 transition-colors">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="w-12 h-12 bg-gray-900 flex items-center justify-center hover:bg-red-600 transition-colors">
                        <Facebook size={20} />
                      </a>
                   </div>
                </div>
              </div>

              <form className="bg-black p-10 border border-gray-900 space-y-6 shadow-2xl relative">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-red-600" />
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                     <input type="text" className="w-full bg-[#111] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                     <input type="email" className="w-full bg-[#111] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors" />
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Service Required</label>
                  <select className="w-full bg-[#111] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors appearance-none">
                    <option>Full Restoration</option>
                    <option>Engine Rebuild</option>
                    <option>Custom Fabrication</option>
                    <option>General Repair</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Your Bike & Vision</label>
                  <textarea rows={5} className="w-full bg-[#111] border border-gray-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors"></textarea>
                </div>
                <Button variant="primary" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </Section>
          </>} />
          <Route path="/projects/:slug" element={<ProjectPage projects={projects} />} />
          <Route path="/for-sale" element={<ForSalePage forsaleListings={forsaleListings} />} />
          <Route path="/services/parts-restoration" element={<PartsRestorationPage />} />
          </Routes>

          {/* Footer */}
          <footer className="py-12 px-6 bg-black border-t border-gray-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-6">
                 <img src="/lang-logo-new.png?v=10" alt="Logo" className="h-32 w-auto opacity-80 drop-shadow-2xl" />
                 <div className="opacity-80">
                   <p className="font-black uppercase tracking-tighter leading-none">Lang</p>
                   <p className="text-[8px] font-bold text-red-600 uppercase tracking-[0.3em]">Restorations</p>
                 </div>
              </div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">© 2026 Lang Restorations. Traralgon, VIC. AU.</p>
              <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-red-600">Privacy</a>
                <a href="#" className="hover:text-red-600">Terms</a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

// --- Parts Restoration & Zinc Plating Page ---
function PartsRestorationPage() {
  const navigate = useNavigate();

  const galleryImages = [
    '/parts-gallery-1.jpeg',
    '/parts-gallery-2.jpeg',
    '/parts-gallery-3.jpeg',
    '/parts-gallery-4.jpeg',
    '/parts-gallery-5.jpeg',
    '/parts-gallery-6.jpeg',
    '/parts-gallery-7.jpeg',
    '/parts-gallery-8.jpeg',
    '/parts-gallery-9.jpeg',
  ];

  const servicesList = [
    'Engine case restoration',
    'Vapour blasting',
    'Aluminium refinishing',
    'Swingarm restoration',
    'Small component restoration',
    'Zinc plating',
    'Fastener restoration',
    'OEM-style finishes',
    'Preparation for show-quality restorations',
  ];

  const handleBack = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  const handleContact = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <div className="pt-40 pb-16 px-6 border-b border-gray-900">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-xs font-black uppercase tracking-widest mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back To Services
          </button>
          <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">Services</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            Parts Restoration<br />& Zinc Plating
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Description */}
          <div className="lg:col-span-2 space-y-5 text-gray-400 leading-relaxed text-base">
            <p>Not every restoration needs a full bike rebuild. We also offer individual component restoration, bringing worn, oxidised and damaged parts back to life.</p>
            <p>From engine cases and cylinder heads through to swingarms, hubs, covers and small components, every part is carefully stripped, cleaned, repaired where required and refinished to suit the original factory appearance.</p>
            <p>Our zinc plating service restores the correct finish to bolts, brackets, fasteners and hardware, helping complete a restoration properly rather than cutting corners with replacement hardware.</p>
            <p>Whether you're restoring a single component or an entire motorcycle, we can help return your parts to a factory-quality finish.</p>
          </div>

          {/* Services Include */}
          <div className="bg-[#0a0a0a] border border-gray-900 p-8">
            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-6">Services Include</p>
            <ul className="space-y-3">
              {servicesList.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="text-red-600 mt-0.5 flex-shrink-0 font-black">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-24">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-10">
            Examples Of Recent Parts Restoration Work
          </p>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="break-inside-avoid mb-4 overflow-hidden bg-gray-900 group">
                <img
                  src={src}
                  alt={`Parts restoration example ${i + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-gray-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Ready To Get Started?</p>
            <p className="text-white font-black text-lg uppercase tracking-tight">Get in touch to discuss your parts.</p>
          </div>
          <button
            onClick={handleContact}
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300 flex-shrink-0"
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- For Sale Page ---
function ForSalePage({ forsaleListings }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restored = forsaleListings.filter(l => l.category === 'Restored');
  const project  = forsaleListings.filter(l => l.category === 'Project');

  const ListingCard = ({ listing }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col"
    >
      <div className="aspect-[4/3] bg-gray-900 border border-gray-800 flex items-center justify-center mb-5 relative overflow-hidden">
        {listing.img
          ? <img src={listing.img} alt={listing.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <span className="text-gray-700 text-[10px] font-black uppercase tracking-widest">Images Coming Soon</span>
        }
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-black px-3 py-1 uppercase tracking-widest shadow-xl ${listing.status === 'Available' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {listing.status}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">{listing.category}</p>
        <h3 className="text-xl font-black uppercase tracking-tighter leading-tight mb-3">{listing.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{listing.desc}</p>
        <div className="flex justify-between items-center border-t border-gray-900 pt-4">
          <span className="text-red-600 font-black uppercase tracking-widest text-sm">{listing.price}</span>
          <button
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-1 group/btn"
          >
            Enquire <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-24 md:pt-32 min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <button
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-white font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 italic"
        >
          For Sale<span className="text-red-600">.</span>
        </motion.h1>
        <p className="text-gray-500 uppercase font-bold tracking-[0.2em] text-sm">Restored Bikes & Project Bikes Available</p>
      </div>

      {/* Restored Bikes */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-red-600" />
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">Restored Bikes For Sale</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {restored.map(listing => <ListingCard key={listing.slug} listing={listing} />)}
        </div>
      </div>

      {/* Project Bikes */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-gray-600" />
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Project Bikes Available</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {project.map(listing => <ListingCard key={listing.slug} listing={listing} />)}
        </div>
      </div>
    </div>
  );
}

// --- Project Detail Page ---
function ProjectPage({ projects }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Build Not Found</h1>
          <p className="text-gray-500">This project doesn't exist.</p>
          <button onClick={() => navigate('/')} className="text-red-600 font-black uppercase tracking-widest text-xs hover:text-white transition-colors flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-500 hover:text-white font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to All Builds
        </button>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="relative overflow-hidden aspect-[16/9] bg-gray-900">
          <img 
            src={project.img} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 flex gap-3">
            <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-widest shadow-xl">
              {project.type}
            </span>
            <span className="bg-white text-black text-[10px] font-black px-4 py-1.5 uppercase tracking-widest shadow-xl">
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid lg:grid-cols-3 lg:items-start gap-16">
          {/* Title + Restoration — always first on mobile and desktop */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4">{project.year} · {project.type}</p>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 italic">
                {project.name}<span className="text-red-600">.</span>
              </h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter">The Restoration</h2>
              <p className="text-gray-400 text-lg leading-relaxed">{project.work}</p>
            </div>
          </div>

          {/* Sidebar Specs — second on mobile (before Before&After), right column on desktop spanning both rows */}
          <div className="space-y-8 lg:row-span-2">
            <div className="border border-gray-900 p-8 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-red-600">Build Sheet</h3>
              <div className="space-y-5">
                {[
                  { label: "Model", value: project.name },
                  { label: "Year", value: project.year },
                  { label: "Engine", value: project.engine },
                  { label: "Type", value: project.type },
                  { label: "Status", value: project.status },
                ].map(spec => (
                  <div key={spec.label} className="border-b border-gray-900 pb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">{spec.label}</p>
                    <p className="text-white font-bold text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                navigate('/');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="w-full bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-red-700 active:scale-95 flex items-center justify-center gap-2"
            >
              Start Your Build <ArrowRight size={16} />
            </button>
          </div>

          {/* Photo section — third on mobile (after Build Sheet), bottom-left on desktop */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {(project.status === 'In Progress' || project.status === 'About To Start') ? 'Build Progress' : project.beforeImg ? 'Before & After' : 'Completed Build'}
            </h2>
            {(project.status === 'In Progress' || project.status === 'About To Start') ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                    <img src={project.img} alt="Build in progress" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Work In Progress</p>
                </div>
                {project.img2 && (
                  <div className="space-y-3">
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                      <img src={project.img2} alt="Build in progress" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Work In Progress</p>
                  </div>
                )}
              </div>
            ) : project.beforeImg ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                    <img src={project.beforeImg} alt="Before" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Before</p>
                </div>
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                    <img src={project.img} alt="Restored" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Restored</p>
                </div>
              </div>
            ) : project.img2 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                    <img src={project.img} alt="Restored" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Restored</p>
                </div>
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                    <img src={project.img2} alt="Build Detail" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-600">In The Workshop</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-w-2xl">
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                  <img src={project.img} alt="Restored" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Restored</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Wireframe Layout (Simplified Version of previous) ---
function WireframeLayout() {
  return (
    <div className="p-20 text-center space-y-10">
      <h1 className="text-4xl font-black uppercase">Wireframe View</h1>
      <p className="text-gray-500 font-mono">Structure and content focus. Toggle back to see the design.</p>
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
         {[1,2,3,4].map(i => <div key={i} className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-mono text-gray-400">Section {i}</div>)}
      </div>
    </div>
  )
}
