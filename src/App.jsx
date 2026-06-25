import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/hoif-hero.png";

// ─── HOCKEY SVG DECORATIONS ──────────────────────────────────────────────────

const PuckDecor = ({ style }) => (
  <svg viewBox="0 0 120 60" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="60" cy="34" rx="56" ry="24" fill="#050516" stroke="rgba(80,160,255,0.5)" strokeWidth="2"/>
    <ellipse cx="60" cy="26" rx="56" ry="22" fill="#0a0a28"/>
    <ellipse cx="60" cy="30" rx="38" ry="14" fill="none" stroke="rgba(80,160,255,0.3)" strokeWidth="1.5"/>
    <ellipse cx="60" cy="30" rx="20" ry="7" fill="none" stroke="rgba(80,160,255,0.18)" strokeWidth="1"/>
  </svg>
);

const StickDecor = ({ style }) => (
  <svg viewBox="0 0 60 260" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="26" y="0" width="8" height="195" rx="4" fill="rgba(80,160,255,0.18)"/>
    <rect x="27" y="0" width="6" height="192" rx="3" fill="rgba(215,226,234,0.05)"/>
    <path d="M26,192 C19,204 10,216 6,230 C2,242 8,254 18,255 L46,255 C56,255 60,242 56,230 C51,217 40,204 34,193 Z" fill="rgba(80,160,255,0.18)"/>
  </svg>
);

const RinkCircleDecor = ({ style }) => (
  <svg viewBox="0 0 300 300" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(0,120,255,0.14)" strokeWidth="2"/>
    <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(0,120,255,0.08)" strokeWidth="1.5"/>
    <circle cx="150" cy="150" r="14" fill="rgba(0,100,255,0.12)" stroke="rgba(0,140,255,0.3)" strokeWidth="2"/>
    <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(0,120,255,0.07)" strokeWidth="1"/>
    <path d="M 125 138 Q 150 120 175 138" fill="none" stroke="rgba(0,140,255,0.22)" strokeWidth="2"/>
    <path d="M 125 162 Q 150 180 175 162" fill="none" stroke="rgba(0,140,255,0.22)" strokeWidth="2"/>
  </svg>
);

const GoalNetDecor = ({ style }) => (
  <svg viewBox="0 0 200 140" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="4" width="182" height="92" rx="4" fill="none" stroke="rgba(80,160,255,0.28)" strokeWidth="2.5"/>
    <rect x="4" y="96" width="182" height="36" rx="2" fill="none" stroke="rgba(80,160,255,0.14)" strokeWidth="1.5"/>
    {[30,56,82,108,134,160].map(x => (
      <line key={x} x1={x} y1="4" x2={x} y2="96" stroke="rgba(80,160,255,0.08)" strokeWidth="1"/>
    ))}
    {[28,52,76].map(y => (
      <line key={y} x1="4" y1={y} x2="186" y2={y} stroke="rgba(80,160,255,0.08)" strokeWidth="1"/>
    ))}
  </svg>
);

const SkateDecor = ({ style }) => (
  <svg viewBox="0 0 160 80" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M25,8 L88,8 Q104,8 104,22 L104,44 L10,44 Q4,44 4,36 L4,28 Q4,8 18,8 Z" fill="rgba(80,160,255,0.22)"/>
    <rect x="12" y="8" width="78" height="6" rx="2" fill="rgba(80,160,255,0.12)"/>
    <rect x="14" y="44" width="80" height="10" rx="3" fill="rgba(80,160,255,0.18)"/>
    <path d="M8,54 Q54,67 106,54" fill="none" stroke="rgba(180,220,255,0.6)" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M30,12 L30,44" stroke="rgba(215,226,234,0.08)" strokeWidth="1"/>
    <path d="M60,12 L60,44" stroke="rgba(215,226,234,0.08)" strokeWidth="1"/>
    <path d="M85,12 L85,44" stroke="rgba(215,226,234,0.08)" strokeWidth="1"/>
  </svg>
);

const IceLineSVG = ({ style }) => (
  <svg viewBox="0 0 800 4" style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="0" y1="2" x2="800" y2="2" stroke="rgba(0,120,255,0.18)" strokeWidth="3"/>
  </svg>
);

function FloatingPuck({ style }) {
  return (
    <motion.div
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <PuckDecor style={{ width: "100%", height: "100%" }}/>
    </motion.div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: "01",
    name: "Grassroots Development",
    desc: "Introducing children to skating and hockey through structured beginner programmes — 10,000+ new participants, 50+ introductory camps, and 100+ school demonstrations annually.",
  },
  {
    num: "02",
    name: "Player Development",
    desc: "Providing long-term athlete development pathways from beginner to competitive hockey — targeting 500+ active players, 200+ advanced athletes, and District, State & National representation.",
  },
  {
    num: "03",
    name: "Coach Development",
    desc: "Training coaches and volunteers to build local hockey communities — 100 new coaches, 300 volunteers trained, and certification workshops every year.",
  },
  {
    num: "04",
    name: "School Programmes",
    desc: "Partnering with educational institutions to introduce hockey as a development sport — reaching 100 schools and 25,000 students across the country.",
  },
  {
    num: "05",
    name: "Community Events",
    desc: "Organising festivals, exhibitions and public activations to increase awareness — 30 public events and 100,000+ visitors engaged annually.",
  },
];

const programmes = [
  {
    num: "01",
    category: "Beginner",
    name: "Learn to Skate",
    target: "5,000 participants annually",
    desc: "A beginner programme introducing skating fundamentals — the essential first step toward ice hockey.",
    images: {
      col1a: "https://images.pexels.com/photos/6539437/pexels-photo-6539437.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col1b: "https://images.pexels.com/photos/10676419/pexels-photo-10676419.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col2:  "https://images.pexels.com/photos/6468586/pexels-photo-6468586.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
    },
  },
  {
    num: "02",
    category: "Competitive",
    name: "Youth Development League",
    target: "20 teams every season",
    desc: "Structured leagues for junior players — building team skills, game intelligence, and competitive experience.",
    images: {
      col1a: "https://images.pexels.com/photos/12955702/pexels-photo-12955702.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col1b: "https://images.pexels.com/photos/6468719/pexels-photo-6468719.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col2:  "https://images.pexels.com/photos/1921325/pexels-photo-1921325.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
    },
  },
  {
    num: "03",
    category: "Inclusion",
    name: "Girls in Hockey",
    target: "40% female participation",
    desc: "Increasing female participation through dedicated programmes — ensuring equal opportunity on and off the ice.",
    images: {
      col1a: "https://images.pexels.com/photos/6539350/pexels-photo-6539350.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col1b: "https://images.pexels.com/photos/6539439/pexels-photo-6539439.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
      col2:  "https://images.pexels.com/photos/6468714/pexels-photo-6468714.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1",
    },
  },
];

const impactStats = [
  ["50,000+", "Youth Reached"],
  ["200+", "Development Camps"],
  ["25+", "Cities"],
  ["100+", "Schools"],
  ["500+", "Players in Structured Programmes"],
  ["300+", "Volunteers"],
  ["100+", "Certified Coaches"],
  ["10+", "International Collaborations"],
];

const roadmap = [
  { phase: "Phase 1", year: "2026–27", items: ["5 cities", "5,000 participants", "20 schools", "25 camps"] },
  { phase: "Phase 2", year: "2028", items: ["10 cities", "15,000 participants", "National youth league", "50 schools"] },
  { phase: "Phase 3", year: "2029", items: ["18 cities", "30,000 participants", "Regional development centres", "International exchange programmes"] },
  { phase: "Phase 4", year: "2030", items: ["25+ cities", "50,000+ participants", "100 schools", "500+ competitive athletes", "Sustainable national ecosystem"] },
];

const partnerOpportunities = [
  "Grassroots Development",
  "School Outreach",
  "Youth Athlete Scholarships",
  "Equipment Sponsorship",
  "Infrastructure Development",
  "National Events",
  "International Exchange Programmes",
];

// Hockey-themed marquee cards — all images from verified Pexels IDs
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=500&dpr=1`;

const marqueeRow1 = [
  { type: "img", src: PX(1921325),   label: "Game Action" },
  { type: "img", src: PX(10676419),  label: "Ice Skate Blade" },
  { type: "img", src: PX(15343890),  label: "Elite Training" },
  { type: "img", src: PX(6557335),   label: "Hockey Skates" },
  { type: "img", src: PX(6539437),   label: "Learn to Skate" },
  { type: "img", src: PX(6468714),   label: "Championship Goal" },
  { type: "img", src: PX(6468586),   label: "On the Ice" },
  { type: "quote", text: "Building India's Ice Hockey Legacy", sub: "HOIF · MISSION 2030", img: PX(6468586) },
  { type: "img", src: PX(20025288),  label: "Competitive League" },
  { type: "img", src: PX(6468719),   label: "Hockey Sticks" },
  { type: "img", src: PX(12955702),  label: "Youth Development" },
];

const marqueeRow2 = [
  { type: "img", src: PX(6539355),   label: "On the Rink" },
  { type: "img", src: PX(8974839),   label: "Future Champions" },
  { type: "quote", text: "Every child deserves to skate", sub: "HOIF GRASSROOTS INITIATIVE", img: PX(6539355) },
  { type: "img", src: PX(1757186),   label: "Ice & Speed" },
  { type: "img", src: PX(6539439),   label: "Girls in Hockey" },
  { type: "img", src: PX(6539350),   label: "Lacing Up" },
  { type: "img", src: PX(9630669),   label: "Hockey India" },
  { type: "quote", text: "The rink is the classroom of champions", sub: "HOIF COACHING PHILOSOPHY", img: PX(1921325) },
  { type: "img", src: PX(8975011),   label: "Skating Hard" },
  { type: "img", src: PX(6468714),   label: "National Championship" },
];

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const inZone =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (inZone) {
        const dx = (e.clientX - centerX) / strength;
        const dy = (e.clientY - centerY) / strength;
        el.style.transform = `translate3d(${dx}px,${dy}px,0)`;
        el.style.transition = "transform 0.3s ease-out";
      } else {
        el.style.transform = "translate3d(0,0,0)";
        el.style.transition = "transform 0.6s ease-in-out";
      }
    };

    const handleLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
      el.style.transition = "transform 0.6s ease-in-out";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [padding, strength]);

  return (
    <div ref={ref} style={{ willChange: "transform", display: "inline-block" }}>
      {children}
    </div>
  );
}

function AnimatedChar({ char, scrollYProgress, start, end }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span style={{ opacity: 0 }}>{char === " " ? " " : char}</span>
      <motion.span
        style={{ position: "absolute", top: 0, left: 0, opacity, whiteSpace: "pre" }}
      >
        {char === " " ? " " : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = text.split("");

  return (
    <p ref={ref} className={className} style={{ position: "relative", ...style }}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          start={i / chars.length}
          end={(i + 1) / chars.length}
        />
      ))}
    </p>
  );
}

function ContactButton({ label = "Contact Us", onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest rounded-full text-white border-0"
      style={{
        background: "linear-gradient(123deg, #000B2E 7%, #0057FF 37%, #00A3FF 72%, #00D4FF 100%)",
        boxShadow: "0px 4px 16px rgba(0, 87, 255, 0.45), 4px 4px 14px rgba(0, 100, 255, 0.35) inset",
        outline: "2px solid rgba(255,255,255,0.55)",
        outlineOffset: "-3px",
      }}
    >
      {label}
    </button>
  );
}

function LiveProjectButton({ label = "Learn More" }) {
  return (
    <button
      className="px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest rounded-full transition-colors"
      style={{ border: "2px solid #D7E2EA", color: "#D7E2EA", background: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(215,226,234,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </button>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function HeroSection({ onJoin }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const skip = () => { vid.currentTime = 2; };
    vid.addEventListener("loadedmetadata", skip);
    return () => vid.removeEventListener("loadedmetadata", skip);
  }, []);

  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: "clip", background: "#050A14" }}
    >
      {/* ── Looping fullscreen background video (starts at 2 s) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}
      >
        {/* Man ice skating with a hockey stick – Pexels #6847317 by Tima Miroshnichenko */}
        <source src="https://videos.pexels.com/video-files/6847317/6847317-hd_1920_1080_25fps.mp4" type="video/mp4"/>
        <source src="https://videos.pexels.com/video-files/6847317/6847317-hd_1280_720_25fps.mp4" type="video/mp4"/>
        {/* Fallback: hockey players skating */}
        <source src="https://videos.pexels.com/video-files/6340278/6340278-hd_1920_1080_25fps.mp4" type="video/mp4"/>
      </video>

      {/* Gradient overlay — dark vignette so text stays crisp */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,4,20,0.72) 0%, rgba(0,4,20,0.38) 45%, rgba(0,4,20,0.80) 100%)",
      }}/>

      {/* Side darkening for text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,4,20,0.55) 100%)",
      }}/>

      {/* Hockey decorations — raised above overlay (z:2) */}
      <StickDecor style={{
        position: "absolute", left: "2vw", top: "12%",
        width: "clamp(36px, 4vw, 56px)", height: "auto",
        opacity: 0.4, pointerEvents: "none", zIndex: 2,
      }}/>

      <GoalNetDecor style={{
        position: "absolute", right: "2vw", top: "20%",
        width: "clamp(100px, 14vw, 200px)", height: "auto",
        opacity: 0.35, pointerEvents: "none", zIndex: 2,
      }}/>

      <FloatingPuck style={{
        position: "absolute", left: "4vw", bottom: "16%",
        width: "clamp(70px, 9vw, 130px)",
        pointerEvents: "none", zIndex: 2,
      }}/>

      <SkateDecor style={{
        position: "absolute", right: "3vw", bottom: "22%",
        width: "clamp(80px, 11vw, 150px)", height: "auto",
        opacity: 0.35, pointerEvents: "none", zIndex: 2,
      }}/>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full" style={{ position: "relative", zIndex: 10 }}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {["About", "Programmes", "Impact", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#D7E2EA" }}
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden w-full px-2 sm:px-4 md:px-6" style={{ position: "relative", zIndex: 10 }}>
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
            style={{ fontSize: "clamp(3rem, 14vw, 16vw)" }}
          >
            Hockey On Ice
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto" style={{ position: "relative", zIndex: 10 }}>
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ color: "#D7E2EA", fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            Building India&apos;s largest grassroots ecosystem for ice hockey through youth development, coaching &amp; international collaboration.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label="Join the Movement" onClick={onJoin} />
        </FadeIn>
      </div>

    </section>
  );
}

// ─── MARQUEE SECTION ─────────────────────────────────────────────────────────

function MarqueeCard({ card }) {
  if (card.type === "img") {
    return (
      <div className="relative flex-shrink-0 rounded-2xl overflow-hidden" style={{ width: 420, height: 270 }}>
        <img src={card.src} alt="" loading="lazy" className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)" }}/>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "#0066FF" }}/>
          <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "rgba(215,226,234,0.7)" }}>HOIF</span>
        </div>
        <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(215,226,234,0.9)" }}>
          {card.label}
        </span>
      </div>
    );
  }
  if (card.type === "stat") {
    return (
      <div
        className="relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between p-7"
        style={{
          width: 420, height: 270,
          background: "linear-gradient(135deg, #000B2E 0%, #001840 60%, #000520 100%)",
          border: "1px solid rgba(0,87,255,0.22)",
        }}
      >
        <RinkCircleDecor style={{ position: "absolute", right: -90, top: -90, width: 300, opacity: 0.55, pointerEvents: "none" }}/>
        <div className="relative z-10">
          <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: card.accent || "#0066FF" }}>
            HOIF · IMPACT
          </div>
          <div className="font-black leading-none" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#FFFFFF" }}>
            {card.value}
          </div>
        </div>
        <div className="relative z-10">
          <div className="font-medium uppercase tracking-wide text-sm mb-2" style={{ color: "rgba(215,226,234,0.6)" }}>
            {card.label}
          </div>
          <div className="w-10 h-0.5" style={{ background: card.accent || "#0066FF" }}/>
        </div>
      </div>
    );
  }
  if (card.type === "quote") {
    return (
      <div className="relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col justify-end px-8 py-7" style={{ width: 420, height: 270 }}>
        {/* Background image */}
        <img src={card.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
        {/* Dark overlay — heavier so text pops */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,4,20,0.92) 0%, rgba(0,4,20,0.55) 55%, rgba(0,0,0,0.2) 100%)" }}/>
        {/* Text */}
        <div className="relative z-10 w-8 h-0.5 mb-4" style={{ background: "#0066FF" }}/>
        <p className="relative z-10 font-black uppercase leading-tight mb-3" style={{ color: "#FFFFFF", fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}>
          &ldquo;{card.text}&rdquo;
        </p>
        <span className="relative z-10 text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#3399FF" }}>
          {card.sub}
        </span>
      </div>
    );
  }
  return null;
}

function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tripled1 = [...marqueeRow1, ...marqueeRow1, ...marqueeRow1];
  const tripled2 = [...marqueeRow2, ...marqueeRow2, ...marqueeRow2];

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden" style={{ background: "#0C0C0C" }}>
      <div className="flex gap-3 mb-3" style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}>
        {tripled1.map((card, i) => <MarqueeCard key={i} card={card}/>)}
      </div>
      <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}>
        {tripled2.map((card, i) => <MarqueeCard key={i} card={card}/>)}
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function AboutSection({ onPartner }) {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 md:px-10 py-20"
      style={{ background: "#0C0C0C" }}
    >
      {/* Decorative corners */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-[120px] sm:w-[160px] md:w-[210px]"/>
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-[100px] sm:w-[140px] md:w-[180px]"/>
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-[120px] sm:w-[160px] md:w-[210px]"/>
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-[130px] sm:w-[170px] md:w-[220px]"/>
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10 w-full">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
            About HOIF
          </h2>
        </FadeIn>

        {/* Fixed centering: wrap in a centered div */}
        <div className="mx-auto w-full" style={{ maxWidth: 560 }}>
          <AnimatedText
            text="Hockey On Ice Foundation is a non-profit initiative dedicated to transforming ice hockey into one of India's fastest-growing emerging sports. Our mission is to create structured opportunities for children, youth, and aspiring athletes through coaching, competitions, infrastructure, and education. Rather than focusing only on elite players, HOIF invests in grassroots participation — ensuring every child has an opportunity to experience the sport regardless of background."
            className="font-medium text-center leading-relaxed"
            style={{ color: "#D7E2EA", fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 z-10">
        <ContactButton label="Become a Partner" onClick={onPartner} />
      </div>
    </section>
  );
}

// ─── SERVICES SECTION (WHAT WE DO) ───────────────────────────────────────────

function ServicesSection() {
  return (
    <section
      id="programmes"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Hockey stick watermark */}
      <StickDecor style={{
        position: "absolute", right: "5%", top: "5%",
        width: "clamp(60px, 8vw, 120px)", height: "auto",
        opacity: 0.07, pointerEvents: "none",
        transform: "rotate(20deg)",
      }}/>
      <StickDecor style={{
        position: "absolute", left: "3%", bottom: "10%",
        width: "clamp(50px, 6vw, 90px)", height: "auto",
        opacity: 0.06, pointerEvents: "none",
        transform: "rotate(-15deg)",
      }}/>
      {/* Rink circle watermark */}
      <RinkCircleDecor style={{
        position: "absolute", right: "-8%", bottom: "5%",
        width: "clamp(200px, 30vw, 420px)", height: "auto",
        opacity: 0.06, pointerEvents: "none",
      }}/>

      <FadeIn delay={0} y={40}>
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 12vw, 160px)" }}>
          What We Do
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto relative">
        {pillars.map((pillar, i) => (
          <FadeIn key={pillar.num} delay={i * 0.1} y={20}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "1px solid rgba(12,12,12,0.12)" : undefined,
                borderBottom: "1px solid rgba(12,12,12,0.12)",
              }}
            >
              {/* Blue accent left bar */}
              <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #0057FF, #00BFFF)", opacity: 0.6 }}/>
              <span
                className="font-black leading-none flex-shrink-0"
                style={{
                  fontSize: "clamp(3rem, 10vw, 140px)",
                  background: "linear-gradient(180deg, #0057FF 0%, #00BFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {pillar.num}
              </span>
              <div className="flex flex-col justify-center gap-2 pt-2">
                <h3 className="font-medium uppercase" style={{ color: "#0C0C0C", fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                  {pillar.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl" style={{ color: "#0C0C0C", opacity: 0.6, fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── PROGRAMMES SECTION (STICKY CARDS) ───────────────────────────────────────

function ProgrammeCard({ programme, index, totalCards, scrollYProgress }) {
  const start = index / totalCards;
  const end = (index + 1) / totalCards;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [start, end], [1, targetScale]);
  const borderRadius = "clamp(24px, 5vw, 60px)";

  return (
    <div style={{ height: "85vh", position: "relative" }}>
      <motion.div
        style={{ scale, position: "sticky", top: `calc(${6 * 4}rem + ${index * 28}px)`, willChange: "transform" }}
        className="p-4 sm:p-6 md:p-8"
      >
        <div
          className="w-full h-full p-4 sm:p-6 md:p-8"
          style={{ borderRadius, border: "2px solid rgba(0,87,255,0.3)", background: "#0C0C0C", height: "calc(85vh - 8rem)", overflowY: "auto" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-baseline gap-4 sm:gap-6">
              <span
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(3rem, 8vw, 100px)",
                  background: "linear-gradient(180deg, #0057FF 0%, #00BFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {programme.num}
              </span>
              <div className="flex flex-col gap-1">
                <span className="uppercase tracking-widest font-light" style={{ color: "rgba(0,163,255,0.7)", fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)" }}>
                  {programme.category}
                </span>
                <span className="font-medium uppercase" style={{ color: "#D7E2EA", fontSize: "clamp(1rem, 2.5vw, 2rem)" }}>
                  {programme.name}
                </span>
              </div>
            </div>
            <LiveProjectButton label={programme.target} />
          </div>

          <div className="flex gap-3 sm:gap-4" style={{ height: "clamp(300px, 45vh, 580px)" }}>
            <div className="flex flex-col gap-3 sm:gap-4" style={{ width: "40%" }}>
              <img src={programme.images.col1a} alt="" loading="lazy" className="w-full object-cover" style={{ height: "clamp(130px, 16vw, 230px)", borderRadius }}/>
              <img src={programme.images.col1b} alt="" loading="lazy" className="w-full object-cover flex-1" style={{ borderRadius }}/>
            </div>
            <div style={{ width: "60%" }}>
              <img src={programme.images.col2} alt="" loading="lazy" className="w-full h-full object-cover" style={{ borderRadius }}/>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProgrammesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section
      id="impact"
      ref={containerRef}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
      style={{ background: "#0C0C0C" }}
    >
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20">
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Programmes
        </h2>
      </FadeIn>

      {programmes.map((prog, i) => (
        <ProgrammeCard key={prog.num} programme={prog} index={i} totalCards={programmes.length} scrollYProgress={scrollYProgress}/>
      ))}
    </section>
  );
}

// ─── IMPACT SECTION ──────────────────────────────────────────────────────────

function ImpactSection() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 z-10 relative overflow-hidden"
      style={{ background: "#F2F6FF" }}
    >
      {/* Ice rink circle watermark */}
      <RinkCircleDecor style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "clamp(320px, 60vw, 700px)", height: "auto",
        opacity: 0.18, pointerEvents: "none",
      }}/>

      {/* Puck bottom-left */}
      <PuckDecor style={{
        position: "absolute", left: "3%", bottom: "8%",
        width: "clamp(80px, 12vw, 180px)", height: "auto",
        opacity: 0.12, pointerEvents: "none",
      }}/>

      {/* Skate top-right */}
      <SkateDecor style={{
        position: "absolute", right: "2%", top: "10%",
        width: "clamp(90px, 13vw, 200px)", height: "auto",
        opacity: 0.12, pointerEvents: "none",
      }}/>

      {/* Goal net top-left */}
      <GoalNetDecor style={{
        position: "absolute", left: "1%", top: "8%",
        width: "clamp(80px, 11vw, 170px)", height: "auto",
        opacity: 0.1, pointerEvents: "none",
      }}/>

      {/* Stick bottom-right */}
      <StickDecor style={{
        position: "absolute", right: "4%", bottom: "4%",
        width: "clamp(40px, 5vw, 70px)", height: "auto",
        opacity: 0.1, pointerEvents: "none",
        transform: "rotate(15deg)",
      }}/>

      <FadeIn delay={0} y={40}>
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 relative z-10" style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Our Impact
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {impactStats.map(([value, label], i) => (
          <FadeIn key={label} delay={i * 0.07} y={20}>
            <div
              className="flex flex-col gap-2 p-4 sm:p-5 rounded-2xl"
              style={{
                border: "1.5px solid rgba(0,87,255,0.18)",
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(4px)",
              }}
            >
              <strong
                className="font-black leading-none"
                style={{
                  color: "#0C0C0C",
                  fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                  wordBreak: "keep-all",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "clip",
                  display: "block",
                }}
              >
                {value}
              </strong>
              <div className="w-6 h-0.5 rounded-full" style={{ background: "#0057FF" }}/>
              <span className="font-light uppercase tracking-wide" style={{ color: "#0C0C0C", opacity: 0.6, fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)" }}>
                {label}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── ROADMAP SECTION ─────────────────────────────────────────────────────────

function RoadmapSection() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 z-20 relative overflow-hidden"
      style={{ background: "#0C0C0C" }}
    >
      {/* Background rink decorations */}
      <RinkCircleDecor style={{
        position: "absolute", right: "-10%", top: "10%",
        width: "clamp(250px, 40vw, 560px)", height: "auto",
        opacity: 0.5, pointerEvents: "none",
      }}/>
      <GoalNetDecor style={{
        position: "absolute", left: "1%", bottom: "8%",
        width: "clamp(100px, 14vw, 220px)", height: "auto",
        opacity: 0.14, pointerEvents: "none",
      }}/>
      <StickDecor style={{
        position: "absolute", left: "8%", top: "5%",
        width: "clamp(35px, 4vw, 55px)", height: "auto",
        opacity: 0.3, pointerEvents: "none",
        transform: "rotate(-10deg)",
      }}/>

      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Roadmap
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px hidden sm:block"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #0057FF 15%, #00BFFF 85%, transparent 100%)",
            left: "calc(clamp(2.5rem, 7vw, 5.5rem) / 2)",
            opacity: 0.4,
          }}
        />

        {roadmap.map((phase, i) => (
          <FadeIn key={phase.phase} delay={i * 0.1} y={20}>
            <div
              className="flex flex-col sm:flex-row sm:items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12 relative"
              style={{
                borderTop: i === 0 ? "1px solid rgba(215,226,234,0.12)" : undefined,
                borderBottom: "1px solid rgba(215,226,234,0.12)",
              }}
            >
              {/* Puck marker on timeline */}
              <div className="hidden sm:flex items-start justify-center flex-shrink-0" style={{ width: "clamp(2.5rem, 7vw, 5.5rem)" }}>
                <div className="relative" style={{ marginTop: 8 }}>
                  <PuckDecor style={{ width: "clamp(32px, 4vw, 48px)", height: "auto" }}/>
                  {/* Blue glow */}
                  <div style={{
                    position: "absolute", inset: 0,
                    boxShadow: "0 0 12px rgba(0,87,255,0.6)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}/>
                </div>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-start gap-6 md:gap-10">
                <div className="flex-shrink-0 min-w-[130px]">
                  <span
                    className="font-black leading-none block"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 80px)",
                      background: "linear-gradient(180deg, #0057FF 0%, #00BFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {phase.year}
                  </span>
                  <span
                    className="uppercase tracking-widest font-medium block mt-1"
                    style={{ color: "rgba(0,163,255,0.55)", fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}
                  >
                    {phase.phase}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 pt-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="font-light leading-relaxed flex items-center gap-3"
                      style={{ color: "rgba(215,226,234,0.8)", fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#0066FF", opacity: 0.8 }}/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── PARTNER / CTA SECTION ───────────────────────────────────────────────────

function CTASection({ onJoin }) {
  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 z-30 relative"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="font-black uppercase text-center mb-6" style={{ color: "#0C0C0C", fontSize: "clamp(3rem, 10vw, 130px)" }}>
            Join the Movement
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <p className="font-light text-center leading-relaxed mb-12 sm:mb-16 max-w-2xl mx-auto" style={{ color: "#0C0C0C", opacity: 0.65, fontSize: "clamp(0.95rem, 1.8vw, 1.3rem)" }}>
            Whether you&apos;re a student, parent, coach, school, corporate partner, volunteer, or sports enthusiast — there&apos;s a place for you in building the future of Indian ice hockey.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-16">
          {partnerOpportunities.map((item, i) => (
            <FadeIn key={item} delay={i * 0.07} y={20}>
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-2xl font-medium uppercase tracking-wide"
                style={{ border: "1px solid rgba(0,87,255,0.18)", color: "#0C0C0C", fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)" }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0057FF" }}/>
                {item}
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center">
          <ContactButton label="Become a Partner" onClick={onJoin} />
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-12 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 z-40 relative"
      style={{ background: "#0C0C0C" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-black uppercase tracking-tight leading-none mb-3" style={{ color: "#D7E2EA", fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>
            Hockey On Ice Foundation
          </p>
          <p className="font-light max-w-sm" style={{ color: "rgba(215,226,234,0.5)", fontSize: "clamp(0.8rem, 1.4vw, 1rem)" }}>
            Building India&apos;s largest grassroots ice hockey ecosystem through access, coaching, and collaboration.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <span className="font-medium uppercase tracking-widest" style={{ color: "rgba(215,226,234,0.35)", fontSize: "0.75rem" }}>Target 2030</span>
          <span className="font-medium uppercase tracking-widest" style={{ color: "rgba(215,226,234,0.35)", fontSize: "0.75rem" }}>© 2026 HOIF</span>
        </div>
      </div>
    </footer>
  );
}

// ─── JOIN MODAL ──────────────────────────────────────────────────────────────

function JoinModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("scroll-locked");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => { setSent(false); setSending(false); }, 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(18px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-6 sm:p-8"
        style={{ background: "#111111", border: "1px solid rgba(0,87,255,0.25)", boxShadow: "0 24px 90px rgba(0,40,120,0.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-xl font-light"
          style={{ color: "#D7E2EA", background: "rgba(215,226,234,0.08)" }}
          onClick={onClose}
        >
          ×
        </button>
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(123deg, #0057FF, #00A3FF)", color: "white" }}
            >
              HOIF
            </div>
            <h3 className="font-black uppercase text-2xl" style={{ color: "#D7E2EA" }}>Request received</h3>
            <p className="font-light" style={{ color: "rgba(215,226,234,0.6)" }}>
              Thanks for reaching out. We&apos;ll follow up with programme, volunteer, support, or partnership details.
            </p>
            <ContactButton label="Close" onClick={onClose} />
          </div>
        ) : (
          <>
            <h3 className="font-black uppercase mb-1" style={{ color: "#D7E2EA", fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
              Join the Movement
            </h3>
            <p className="font-light mb-6" style={{ color: "rgba(215,226,234,0.5)", fontSize: "0.875rem" }}>
              Tell us how you want to support Indian ice hockey.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-4">
              {[
                { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              ].map(({ label, name, type, placeholder }) => (
                <label key={name} className="flex flex-col gap-1.5">
                  <span className="uppercase tracking-widest font-medium text-xs" style={{ color: "rgba(215,226,234,0.5)" }}>{label}</span>
                  <input
                    required name={name} type={type} placeholder={placeholder}
                    className="w-full rounded-2xl px-4 py-3 font-light text-sm outline-none"
                    style={{ background: "rgba(215,226,234,0.05)", border: "1px solid rgba(215,226,234,0.15)", color: "#D7E2EA" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,87,255,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(215,226,234,0.15)")}
                  />
                </label>
              ))}
              <label className="flex flex-col gap-1.5">
                <span className="uppercase tracking-widest font-medium text-xs" style={{ color: "rgba(215,226,234,0.5)" }}>Interest</span>
                <textarea
                  required name="interest" rows={3}
                  placeholder="Programme, volunteering, partnership, school outreach..."
                  className="w-full rounded-2xl px-4 py-3 font-light text-sm outline-none resize-none"
                  style={{ background: "rgba(215,226,234,0.05)", border: "1px solid rgba(215,226,234,0.15)", color: "#D7E2EA" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,87,255,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(215,226,234,0.15)")}
                />
              </label>
              <ContactButton label={sending ? "Sending..." : "Send Request"} />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ overflowX: "clip", background: "#0C0C0C" }}>
      <HeroSection onJoin={() => setModalOpen(true)} />
      <MarqueeSection />
      <AboutSection onPartner={() => setModalOpen(true)} />
      <ServicesSection />
      <ProgrammesSection />
      <ImpactSection />
      <RoadmapSection />
      <CTASection onJoin={() => setModalOpen(true)} />
      <Footer />
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
