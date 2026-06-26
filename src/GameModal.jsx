import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── SNOW ─────────────────────────────────────────────────────────────────────
const FLAKES = Array.from({ length: 22 }, (_, i) => ({
  id: i, x: Math.random() * 100,
  delay: Math.random() * 6, dur: 5 + Math.random() * 8,
  size: 2 + Math.random() * 3.5, op: 0.3 + Math.random() * 0.45,
}));
function Snow() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {FLAKES.map((f) => (
        <motion.div key={f.id}
          style={{ position:"absolute", left:`${f.x}%`, top:-8, width:f.size, height:f.size, borderRadius:"50%", background:`rgba(255,255,255,${f.op})` }}
          animate={{ y:"106vh" }}
          transition={{ duration:f.dur, delay:f.delay, repeat:Infinity, ease:"linear" }}
        />
      ))}
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
const LABELS = ["","Enter Rink","Suit Up","Balance","Skate","Pass","Shoot","Trophy"];
function ProgressBar({ current }) {
  return (
    <div style={{ padding:"11px 18px 9px", background:"rgba(0,3,18,0.96)", borderBottom:"1px solid rgba(0,87,255,0.16)", flexShrink:0 }}>
      <div style={{ display:"flex", gap:4, marginBottom:5 }}>
        {Array.from({ length:7 }, (_,i) => (
          <div key={i} style={{ flex:1, height:4, borderRadius:99,
            background: i < current ? "linear-gradient(90deg,#0057FF,#00A3FF)" : "rgba(215,226,234,0.1)",
            transition:"background 0.45s" }} />
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span style={{ color:"rgba(215,226,234,0.38)", fontSize:"0.62rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>
          {LABELS[current] || "Begin"}
        </span>
        <span style={{ color:"#0099FF", fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>
          {current} / 7
        </span>
      </div>
    </div>
  );
}

// ─── SHARED BUTTON ────────────────────────────────────────────────────────────
function GameBtn({ children, onClick, disabled=false, variant="primary" }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale:1.04 } : {}}
      whileTap={!disabled ? { scale:0.96 } : {}}
      onClick={disabled ? undefined : onClick}
      style={{
        background: disabled ? "rgba(215,226,234,0.07)"
          : variant==="secondary" ? "transparent"
          : "linear-gradient(123deg,#000B2E 7%,#0057FF 37%,#00A3FF 72%,#00D4FF 100%)",
        color: disabled ? "rgba(215,226,234,0.22)" : "#fff",
        border: variant==="secondary" ? "1.5px solid rgba(215,226,234,0.22)" : "none",
        borderRadius:100, padding:"13px 32px",
        fontSize:"0.8rem", fontWeight:700, textTransform:"uppercase",
        letterSpacing:"0.12em", cursor: disabled ? "not-allowed" : "pointer",
        fontFamily:"Kanit,sans-serif",
        boxShadow: disabled||variant==="secondary" ? "none" : "0 4px 20px rgba(0,87,255,0.32)",
      }}
    >{children}</motion.button>
  );
}

// ─── SVG CHARACTERS ───────────────────────────────────────────────────────────
function PlayerSVG({ gear=[], size=120 }) {
  const has = (k) => gear.includes(k);
  const w = size * 0.5, h = size;
  return (
    <svg viewBox="0 0 80 160" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
      {has("helmet") ? (
        <g>
          <circle cx="40" cy="26" r="16" fill="#1A3A8F"/>
          <path d="M24,26 Q24,10 40,10 Q56,10 56,26" fill="#0A2060" stroke="#2255CC" strokeWidth="1.5"/>
          <rect x="30" y="24" width="20" height="5" rx="2.5" fill="#0d0d1e" opacity="0.75"/>
        </g>
      ) : (
        <g>
          <circle cx="40" cy="26" r="15" fill="#FFCBA4"/>
          <circle cx="35" cy="22" r="1.5" fill="#333"/>
          <circle cx="45" cy="22" r="1.5" fill="#333"/>
          <path d="M35,32 Q40,36 45,32" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      )}
      <rect x="24" y="46" width="32" height="44" rx="7" fill="#0A2060"/>
      <text x="40" y="70" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontWeight="700">HOIF</text>
      {has("pads") && <>
        <rect x="13" y="46" width="13" height="16" rx="5" fill="#0A2060" stroke="#2255CC" strokeWidth="1"/>
        <rect x="54" y="46" width="13" height="16" rx="5" fill="#0A2060" stroke="#2255CC" strokeWidth="1"/>
      </>}
      <rect x="15" y="56" width="10" height="28" rx="5" fill={has("pads") ? "#0A2060" : "#FFCBA4"}/>
      <rect x="55" y="56" width="10" height="28" rx="5" fill={has("pads") ? "#0A2060" : "#FFCBA4"}/>
      {has("gloves") ? <>
        <rect x="11" y="82" width="15" height="11" rx="4" fill="#111130" stroke="#2255CC" strokeWidth="1"/>
        <rect x="54" y="82" width="15" height="11" rx="4" fill="#111130" stroke="#2255CC" strokeWidth="1"/>
      </> : <>
        <ellipse cx="19" cy="88" rx="7" ry="6" fill="#FFCBA4"/>
        <ellipse cx="61" cy="88" rx="7" ry="6" fill="#FFCBA4"/>
      </>}
      <rect x="26" y="90" width="11" height="36" rx="4" fill="#0D1A3A"/>
      <rect x="43" y="90" width="11" height="36" rx="4" fill="#0D1A3A"/>
      {has("skates") ? <>
        <rect x="19" y="123" width="19" height="8" rx="2.5" fill="#111130"/>
        <line x1="19" y1="131" x2="38" y2="131" stroke="rgba(180,220,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="42" y="123" width="19" height="8" rx="2.5" fill="#111130"/>
        <line x1="42" y1="131" x2="61" y2="131" stroke="rgba(180,220,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
      </> : <>
        <ellipse cx="31" cy="128" rx="10" ry="5" fill="#444"/>
        <ellipse cx="49" cy="128" rx="10" ry="5" fill="#444"/>
      </>}
      {has("stick") && <>
        <rect x="63" y="60" width="5" height="58" rx="2.5" fill="#8B5E3C"/>
        <path d="M63,116 L77,128" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round"/>
      </>}
    </svg>
  );
}

function CoachSVG({ waving=false }) {
  return (
    <svg viewBox="0 0 80 150" width="58" height="109" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="24" r="14" fill="#FFCBA4"/>
      <circle cx="35" cy="20" r="1.5" fill="#333"/>
      <circle cx="45" cy="20" r="1.5" fill="#333"/>
      <path d="M35,30 Q40,35 45,30" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="28" y="13" width="24" height="7" rx="3.5" fill="#0A2060"/>
      <rect x="25" y="11" width="30" height="5" rx="2" fill="#0A2060"/>
      <rect x="24" y="42" width="32" height="42" rx="7" fill="#003399"/>
      <motion.g
        animate={waving ? { rotate:[0,-30,0,-25,0] } : {}}
        transition={{ duration:1.4, repeat:Infinity, ease:"easeInOut" }}
        style={{ transformOrigin:"18px 58px" }}
      >
        <rect x="12" y="52" width="10" height="26" rx="5" fill="#003399"/>
        <ellipse cx="17" cy="81" rx="7" ry="6" fill="#FFCBA4"/>
      </motion.g>
      <rect x="58" y="52" width="10" height="26" rx="5" fill="#003399"/>
      <rect x="55" y="70" width="16" height="20" rx="3" fill="#EEE"/>
      <line x1="58" y1="76" x2="68" y2="76" stroke="#bbb" strokeWidth="1"/>
      <line x1="58" y1="80" x2="68" y2="80" stroke="#bbb" strokeWidth="1"/>
      <rect x="27" y="84" width="11" height="34" rx="4" fill="#1A1A3A"/>
      <rect x="42" y="84" width="11" height="34" rx="4" fill="#1A1A3A"/>
      <ellipse cx="32" cy="120" rx="11" ry="5" fill="#222"/>
      <ellipse cx="48" cy="120" rx="11" ry="5" fill="#222"/>
    </svg>
  );
}

// ─── ICE RINK WRAPPER ─────────────────────────────────────────────────────────
function IceRink({ children, style={} }) {
  return (
    <div style={{ position:"relative", background:"linear-gradient(180deg,#C5E5FF 0%,#E4F4FF 50%,#F4FAFF 100%)", borderRadius:20, overflow:"hidden", border:"1.5px solid rgba(0,100,255,0.18)", ...style }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.11 }} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="200" cy="100" rx="185" ry="88" fill="none" stroke="#0055FF" strokeWidth="2.5"/>
        <line x1="200" y1="12" x2="200" y2="188" stroke="#FF2222" strokeWidth="2"/>
        <circle cx="200" cy="100" r="22" fill="none" stroke="#0055FF" strokeWidth="2"/>
        <line x1="0" y1="100" x2="400" y2="100" stroke="#0055FF" strokeWidth="1.5" opacity="0.5"/>
      </svg>
      {children}
    </div>
  );
}

// ─── SCENE 0: INTRO ───────────────────────────────────────────────────────────
function SceneIntro({ onNext }) {
  const [name, setName] = useState("");
  const valid = name.trim().length > 0;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:22, padding:"30px 24px", maxWidth:380, margin:"0 auto" }}>
      <motion.div initial={{ scale:0.85, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:200 }}
        style={{ width:"100%", height:190, borderRadius:20, overflow:"hidden", border:"2px solid rgba(0,163,255,0.28)", boxShadow:"0 8px 32px rgba(0,87,255,0.22)" }}>
        <img src="/game-intro.jpg" alt="Hockey" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%" }}/>
      </motion.div>
      <motion.div initial={{ y:18, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.2 }} style={{ textAlign:"center" }}>
        <h2 style={{ color:"#fff", fontSize:"clamp(1.45rem,5vw,2rem)", fontWeight:900, textTransform:"uppercase", margin:0, letterSpacing:"-0.01em" }}>
          First Time on Ice
        </h2>
        <p style={{ color:"rgba(215,226,234,0.5)", fontSize:"0.86rem", marginTop:9, lineHeight:1.65 }}>
          Experience ice hockey in 7 fun steps — no skates required (yet).
        </p>
      </motion.div>
      <motion.div initial={{ y:18, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.32 }} style={{ width:"100%" }}>
        <label style={{ display:"block", color:"rgba(215,226,234,0.38)", fontSize:"0.63rem", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:7 }}>
          Your name, future hockey player
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key==="Enter" && valid && onNext(name.trim())}
          placeholder="Enter your name" autoFocus
          style={{ width:"100%", padding:"13px 15px", borderRadius:14, background:"rgba(215,226,234,0.05)", border:"1px solid rgba(215,226,234,0.16)", color:"#D7E2EA", fontSize:"1rem", outline:"none", boxSizing:"border-box", fontFamily:"Kanit,sans-serif" }}
          onFocus={(e) => (e.target.style.borderColor="rgba(0,163,255,0.55)")}
          onBlur={(e) => (e.target.style.borderColor="rgba(215,226,234,0.16)")}
        />
      </motion.div>
      <motion.div initial={{ y:18, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.46 }}>
        <GameBtn onClick={() => valid && onNext(name.trim())} disabled={!valid}>Start Journey →</GameBtn>
      </motion.div>
    </div>
  );
}

// ─── LEVEL 1: ENTER THE RINK ──────────────────────────────────────────────────
function Level1({ playerName, onNext }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step === 1) { const t = setTimeout(() => setStep(2), 900); return () => clearTimeout(t); }
  }, [step]);
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, padding:"22px 20px", maxWidth:400, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.2rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Welcome to the Ice Rink
      </h3>
      <div style={{ width:"100%", height:255, background:"linear-gradient(180deg,#010A1F 0%,#021030 55%,#0A2050 100%)", borderRadius:20, position:"relative", overflow:"hidden", border:"1.5px solid rgba(0,87,255,0.2)" }}>
        {Array.from({ length:14 }, (_,i) => (
          <div key={i} style={{ position:"absolute", width: i%3===0?2.5:1.5, height: i%3===0?2.5:1.5, borderRadius:"50%", background:"white", opacity:0.35+i%3*0.15, left:`${6+i*6.5}%`, top:`${4+(i%5)*9}%` }}/>
        ))}
        <div style={{ position:"absolute", bottom:0, left:"8%", right:"8%", height:"62%", background:"linear-gradient(180deg,#0C2A5A,#071428)", borderRadius:"10px 10px 0 0", border:"1px solid rgba(0,87,255,0.26)", borderBottom:"none" }}>
          <div style={{ position:"absolute", top:13, left:"50%", transform:"translateX(-50%)", background:"#0057FF", borderRadius:7, padding:"4px 13px", color:"white", fontSize:"0.6rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
            Hockey On Ice Foundation
          </div>
          {[22,42,62,78].map((x) => (
            <div key={x} style={{ position:"absolute", top:"36%", left:`${x}%`, width:13, height:13, borderRadius:3, background:"rgba(100,180,255,0.2)", border:"1px solid rgba(100,180,255,0.28)" }}/>
          ))}
          <motion.div
            animate={step>=1 ? { scaleX:0.07 } : { scaleX:1 }}
            transition={{ duration:0.85, ease:[0.4,0,0.2,1] }}
            style={{ position:"absolute", bottom:0, left:"calc(50% - 30px)", width:60, height:86, background: step>=1 ? "#5ADAFF" : "#1A3A6A", borderRadius:"6px 6px 0 0", border:"2px solid rgba(0,120,255,0.5)", transformOrigin:"left center" }}
          >
            <div style={{ position:"absolute", right:8, top:"50%", width:4, height:4, borderRadius:"50%", background:"#FFD700" }}/>
          </motion.div>
          <AnimatePresence>
            {step>=1 && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                style={{ position:"absolute", bottom:0, left:"calc(50% - 65px)", width:130, height:120, background:"radial-gradient(ellipse at bottom,rgba(90,200,255,0.4) 0%,transparent 70%)" }}/>
            )}
          </AnimatePresence>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:16, background:"#070F20" }}/>
        <AnimatePresence>
          {step>=2 && (
            <motion.div initial={{ x:48, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ type:"spring", stiffness:150 }}
              style={{ position:"absolute", bottom:16, right:"15%" }}>
              <CoachSVG waving={true}/>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step>=2 && (
            <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.35, type:"spring" }}
              style={{ position:"absolute", bottom:"53%", right:"30%", background:"white", borderRadius:"12px 12px 2px 12px", padding:"8px 12px", maxWidth:148, zIndex:5 }}>
              <p style={{ margin:0, fontSize:"0.67rem", color:"#0C0C0C", fontWeight:600, lineHeight:1.45 }}>
                Welcome, {playerName}!<br/>Ready for the ice? 🏒
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p style={{ color:"rgba(215,226,234,0.45)", fontSize:"0.8rem", textAlign:"center", margin:0, lineHeight:1.55 }}>
        {step===0 && "The arena awaits. Let's begin your hockey journey!"}
        {step===1 && "The doors are opening…"}
        {step>=2 && `Your coach is ready, ${playerName}. Step inside!`}
      </p>
      {step===0 && <GameBtn onClick={() => setStep(1)}>Open the Doors</GameBtn>}
      {step>=2 && <GameBtn onClick={onNext}>Enter the Rink →</GameBtn>}
    </div>
  );
}

// ─── LEVEL 2: SUIT UP ─────────────────────────────────────────────────────────
const GEAR = [
  { id:"helmet", label:"Helmet",        img:"/gear/helmet.png",  imgSize:40 },
  { id:"pads",   label:"Shoulder Pads", img:"/gear/pads.png",    imgSize:58 },
  { id:"gloves", label:"Gloves",        img:"/gear/gloves.png",  imgSize:40 },
  { id:"skates", label:"Skates",        img:"/gear/skates.png",  imgSize:40 },
  { id:"stick",  label:"Stick",         img:"/gear/stick.png",   imgSize:40 },
];
const GPOS = [
  { x:5,  y:6  },
  { x:66, y:6  },
  { x:2,  y:52 },
  { x:66, y:54 },
  { x:36, y:80 },
];
function Level2({ onNext }) {
  const [equipped, setEquipped] = useState([]);
  const [shaking, setShaking] = useState(null);
  const dropRef = useRef(null);
  const done = equipped.length === GEAR.length;

  const handleDragEnd = useCallback((id, _e, info) => {
    const zone = dropRef.current;
    if (!zone) return;
    const r = zone.getBoundingClientRect();
    const { x, y } = info.point;
    if (x >= r.left-24 && x <= r.right+24 && y >= r.top-24 && y <= r.bottom+24) {
      if (!equipped.includes(id)) setEquipped((p) => [...p, id]);
    } else {
      setShaking(id);
      setTimeout(() => setShaking(null), 480);
    }
  }, [equipped]);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"18px 16px", maxWidth:420, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.15rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Suit Up! Drag gear onto your player
      </h3>
      <div style={{ width:"100%", height:340, position:"relative" }}>
        <div ref={dropRef} style={{ position:"absolute", left:"50%", top:"38%", transform:"translate(-50%,-50%)", width:108, height:176, border:`2px dashed ${done?"rgba(0,255,136,0.55)":"rgba(0,163,255,0.32)"}`, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,15,55,0.45)", transition:"border-color 0.4s", zIndex:1 }}>
          <PlayerSVG gear={equipped} size={158}/>
        </div>
        {GEAR.map((item, i) => {
          const isOn = equipped.includes(item.id);
          const pos = GPOS[i];
          return (
            <motion.div key={item.id}
              drag={!isOn} dragMomentum={false} dragSnapToOrigin
              onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
              animate={shaking===item.id ? { x:[-8,8,-6,6,-4,4,0] } : {}}
              transition={shaking===item.id ? { duration:0.4 } : {}}
              style={{ position:"absolute", left:`${pos.x}%`, top:`${pos.y}%`, cursor:isOn?"default":"grab", zIndex:isOn?0:10, opacity:isOn?0.38:1, touchAction:"none" }}
            >
              <div style={{ background:isOn?"rgba(0,255,136,0.07)":"rgba(0,18,65,0.88)", border:`1.5px solid ${isOn?"rgba(0,255,136,0.38)":"rgba(0,163,255,0.38)"}`, borderRadius:14, padding:"8px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:3, minWidth:60, userSelect:"none", backdropFilter:"blur(8px)" }}>
                <img src={item.img} alt={item.label} style={{ width:item.imgSize, height:item.imgSize, objectFit:"contain", pointerEvents:"none" }}/>
                <span style={{ color:"rgba(215,226,234,0.65)", fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.06em", textAlign:"center" }}>{item.label}</span>
                {isOn && <span style={{ color:"#00FF88", fontSize:"0.58rem", fontWeight:700 }}>✓</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p style={{ color:"rgba(215,226,234,0.4)", fontSize:"0.75rem", textAlign:"center", margin:0 }}>
        {equipped.length===0 && "Drag each piece of equipment onto the player"}
        {equipped.length>0 && !done && `${equipped.length} / ${GEAR.length} equipped — keep going!`}
        {done && "Fully geared up — let's hit the ice! 🔥"}
      </p>
      {done && (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring" }}>
          <GameBtn onClick={onNext}>Awesome! Let's Skate →</GameBtn>
        </motion.div>
      )}
    </div>
  );
}

// ─── LEVEL 3: BALANCE ─────────────────────────────────────────────────────────
function Level3({ onNext }) {
  const [balance, setBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [greenSecs, setGreenSecs] = useState(0);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);
  const balRef = useRef(0), greenRef = useRef(0), doneRef = useRef(false);
  const THRESH = 32, NEED = 7;

  useEffect(() => {
    if (!started || doneRef.current) return;
    const drift = setInterval(() => {
      balRef.current = Math.max(-100, Math.min(100, balRef.current + (Math.random()-0.46)*14));
      setBalance(balRef.current);
    }, 180);
    const tick = setInterval(() => {
      if (Math.abs(balRef.current) <= THRESH) { greenRef.current++; setGreenSecs(greenRef.current); }
      setTimeLeft((t) => {
        if (t <= 1) { doneRef.current=true; setResult(greenRef.current>=NEED?"pass":"fail"); return 0; }
        return t-1;
      });
    }, 1000);
    return () => { clearInterval(drift); clearInterval(tick); };
  }, [started]);

  const tilt = (dir) => {
    if (!started || doneRef.current) return;
    balRef.current = Math.max(-100, Math.min(100, balRef.current + dir*22));
    setBalance(balRef.current);
  };

  const reset = () => {
    balRef.current=0; greenRef.current=0; doneRef.current=false;
    setBalance(0); setTimeLeft(12); setGreenSecs(0); setResult(null); setStarted(false);
  };

  const inGreen = Math.abs(balance) <= THRESH;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"20px 20px", maxWidth:380, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.15rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Balance on Ice!
      </h3>
      <IceRink style={{ width:"100%", height:186 }}>
        <div style={{ height:"100%", display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:8 }}>
          <motion.div
            animate={started&&!result ? { rotate:balance/3.5 } : { rotate:0 }}
            transition={{ type:"spring", stiffness:180, damping:18 }}
            style={{ transformOrigin:"bottom center" }}
          >
            <PlayerSVG gear={["helmet","pads","gloves","skates","stick"]} size={128}/>
          </motion.div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:13, background:"rgba(120,190,255,0.32)", borderTop:"2px solid rgba(150,210,255,0.45)" }}/>
      </IceRink>
      <div style={{ width:"100%" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ color:"rgba(215,226,234,0.32)", fontSize:"0.6rem", textTransform:"uppercase" }}>← Left</span>
          <span style={{ color:"#00E87A", fontSize:"0.6rem", fontWeight:700, textTransform:"uppercase" }}>Green Zone</span>
          <span style={{ color:"rgba(215,226,234,0.32)", fontSize:"0.6rem", textTransform:"uppercase" }}>Right →</span>
        </div>
        <div style={{ height:18, background:"rgba(255,255,255,0.06)", borderRadius:99, position:"relative", overflow:"visible" }}>
          <div style={{ position:"absolute", left:`${50-THRESH/2}%`, right:`${50-THRESH/2}%`, top:0, bottom:0, background:"rgba(0,232,122,0.14)", borderRadius:99 }}/>
          <motion.div
            animate={{ left:`${50+balance/2}%` }}
            transition={{ type:"spring", stiffness:280, damping:22 }}
            style={{ position:"absolute", top:-3, bottom:-3, width:8, transform:"translateX(-50%)", background:inGreen?"#00E87A":"#FF4455", borderRadius:99, boxShadow:inGreen?"0 0 10px rgba(0,232,122,0.7)":"0 0 10px rgba(255,68,85,0.7)", transition:"background 0.2s,box-shadow 0.2s" }}
          />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          <span style={{ color:"rgba(215,226,234,0.4)", fontSize:"0.7rem" }}>⏱ {timeLeft}s</span>
          <span style={{ color:"#00E87A", fontSize:"0.7rem" }}>✓ {greenSecs}/{NEED}s</span>
        </div>
      </div>
      {!started && !result && <GameBtn onClick={() => setStarted(true)}>Step onto the Ice</GameBtn>}
      {started && !result && (
        <div style={{ display:"flex", gap:10, width:"100%" }}>
          {[["← Left",-1],["Right →",1]].map(([lbl,dir]) => (
            <motion.button key={lbl} onPointerDown={() => tilt(dir)} whileTap={{ scale:0.93 }}
              style={{ flex:1, padding:"17px 0", background:"rgba(0,25,80,0.65)", border:"1.5px solid rgba(0,163,255,0.3)", borderRadius:16, color:"#D7E2EA", fontSize:"0.92rem", fontWeight:700, fontFamily:"Kanit,sans-serif", cursor:"pointer" }}>
              {lbl}
            </motion.button>
          ))}
        </div>
      )}
      {result==="pass" && (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring" }} style={{ textAlign:"center" }}>
          <p style={{ color:"#00E87A", fontWeight:700, margin:"0 0 11px" }}>Great balance! You're a natural! ⭐</p>
          <GameBtn onClick={onNext}>Next Level →</GameBtn>
        </motion.div>
      )}
      {result==="fail" && (
        <div style={{ textAlign:"center" }}>
          <p style={{ color:"#FF9999", fontWeight:600, margin:"0 0 11px", fontSize:"0.85rem" }}>Ice is slippery! Every pro fell first — try again!</p>
          <GameBtn onClick={reset}>Try Again</GameBtn>
        </div>
      )}
    </div>
  );
}

// ─── LEVEL 4: LEARN TO SKATE ──────────────────────────────────────────────────
const COLS=6, ROWS=6, CELL=46;
const PUCK_STARTS=[[1,1],[4,1],[0,3],[5,4],[2,5]];

function Level4({ onNext }) {
  const [pos, setPos] = useState([2,4]);
  const [pucks, setPucks] = useState(PUCK_STARTS);
  const [collected, setCollected] = useState(0);
  const [done, setDone] = useState(false);

  const move = useCallback((dx, dy) => {
    if (done) return;
    setPos(([cx,cy]) => {
      const nx=Math.max(0,Math.min(COLS-1,cx+dx)), ny=Math.max(0,Math.min(ROWS-1,cy+dy));
      setPucks((prev) => {
        const next = prev.filter(([px,py]) => !(px===nx && py===ny));
        if (next.length!==prev.length) {
          const c = PUCK_STARTS.length - next.length;
          setCollected(c);
          if (next.length===0) setDone(true);
        }
        return next;
      });
      return [nx,ny];
    });
  }, [done]);

  useEffect(() => {
    const map = { ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1] };
    const onKey = (e) => { if (map[e.key]) { e.preventDefault(); move(...map[e.key]); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const W=COLS*CELL, H=ROWS*CELL;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:"18px 14px", maxWidth:380, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.15rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Learn to Skate!
      </h3>
      <p style={{ color:"rgba(215,226,234,0.42)", fontSize:"0.76rem", textAlign:"center", margin:0 }}>
        Collect all {PUCK_STARTS.length} pucks — buttons or arrow keys
      </p>
      <div style={{ width:W, height:H, background:"linear-gradient(135deg,#B5DEFF,#D5EEFF)", borderRadius:16, position:"relative", overflow:"hidden", border:"2px solid rgba(0,100,255,0.22)", flexShrink:0 }}>
        {Array.from({ length:COLS+1 }, (_,i) => <div key={`v${i}`} style={{ position:"absolute", top:0, bottom:0, left:i*CELL, width:1, background:"rgba(0,80,200,0.08)" }}/>)}
        {Array.from({ length:ROWS+1 }, (_,i) => <div key={`h${i}`} style={{ position:"absolute", left:0, right:0, top:i*CELL, height:1, background:"rgba(0,80,200,0.08)" }}/>)}
        <AnimatePresence>
          {pucks.map(([px,py]) => (
            <motion.div key={`${px}-${py}`} initial={{ scale:1 }} exit={{ scale:0 }} transition={{ duration:0.18 }}
              style={{ position:"absolute", left:px*CELL+CELL/2-12, top:py*CELL+CELL/2-8, width:24, height:16, background:"#111", borderRadius:"50%", border:"1.5px solid rgba(80,160,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:11, height:4, borderRadius:99, border:"1px solid rgba(80,160,255,0.28)" }}/>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ left:pos[0]*CELL+4, top:pos[1]*CELL+4 }}
          transition={{ type:"spring", stiffness:320, damping:28 }}
          style={{ position:"absolute", width:CELL-8, height:CELL-8, background:"linear-gradient(135deg,#0033AA,#0066FF)", borderRadius:10, border:"2px solid rgba(100,180,255,0.65)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 16px rgba(0,100,255,0.5)" }}>
          <motion.svg
            viewBox="0 0 32 32" width={CELL-16} height={CELL-16}
            animate={{ rotate: [-12, 12, -12] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 20%", overflow:"visible" }}
          >
            {/* Shaft */}
            <rect x="14.5" y="2" width="3.5" height="20" rx="1.5" fill="#E8C97A"/>
            <rect x="14.5" y="2" width="1.2" height="20" rx="1" fill="rgba(255,255,255,0.25)"/>
            {/* Tape stripe on shaft */}
            <rect x="14.5" y="16" width="3.5" height="2.5" rx="0.5" fill="rgba(255,255,255,0.45)"/>
            {/* Blade */}
            <path d="M14,22 Q8,23 6,26 Q5,28 8,28.5 L18,28 Q20,27.5 18,22 Z" fill="#C8A855"/>
            <path d="M14,22 Q8,23 6,26" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinecap="round"/>
            {/* Puck shadow under blade */}
            <ellipse cx="11" cy="29.5" rx="5" ry="1.5" fill="rgba(0,0,0,0.28)"/>
            {/* Puck */}
            <ellipse cx="11" cy="29" rx="4.5" ry="1.8" fill="#1a1a2e"/>
            <ellipse cx="11" cy="28.5" rx="4.5" ry="1.5" fill="#222244"/>
          </motion.svg>
        </motion.div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,50px)", gridTemplateRows:"repeat(3,50px)", gap:5 }}>
        {[[null,[0,-1],null],[[-1,0],null,[1,0]],[null,[0,1],null]].map((row,ri) =>
          row.map((cell,ci) => cell ? (
            <motion.button key={`${ri}-${ci}`} onPointerDown={() => move(...cell)} whileTap={{ scale:0.89 }}
              style={{ width:50, height:50, background:"rgba(0,25,85,0.75)", border:"1.5px solid rgba(0,163,255,0.28)", borderRadius:12, color:"#D7E2EA", fontSize:"1.25rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {ci===0?"←":ci===2?"→":ri===0?"↑":"↓"}
            </motion.button>
          ) : (
            <div key={`${ri}-${ci}`} style={{ width:50, height:50, background:"rgba(255,255,255,0.03)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {ri===1&&ci===1&&<span style={{ color:"#0099FF", fontSize:"0.63rem", fontWeight:700 }}>{collected}/{PUCK_STARTS.length}</span>}
            </div>
          ))
        )}
      </div>
      {done && (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring" }} style={{ textAlign:"center" }}>
          <p style={{ color:"#00E87A", fontWeight:700, margin:"0 0 11px" }}>You can skate! All pucks collected! ⭐</p>
          <GameBtn onClick={onNext}>Pass the Puck →</GameBtn>
        </motion.div>
      )}
    </div>
  );
}

// ─── LEVEL 5: PASS THE PUCK ───────────────────────────────────────────────────
const TMS = [{ id:0,label:"A",x:10,y:16 },{ id:1,label:"B",x:70,y:10 },{ id:2,label:"C",x:66,y:60 }];
const TOTAL_PASSES = 6;

function Level5({ onNext }) {
  const [passes, setPasses] = useState(0);
  const [targetIdx, setTargetIdx] = useState(0);
  const [puck, setPuck] = useState({ x:47, y:80 });
  const [flying, setFlying] = useState(false);
  const done = passes >= TOTAL_PASSES;

  const handlePass = (tm) => {
    if (flying || tm.id!==targetIdx || done) return;
    setFlying(true);
    setPuck({ x:tm.x+3, y:tm.y+3 });
    setTimeout(() => {
      setTargetIdx((t) => (t+1)%TMS.length);
      setPasses((p) => p+1);
      setPuck({ x:47, y:80 });
      setFlying(false);
    }, 680);
  };

  useEffect(() => { if (done) setTimeout(onNext, 700); }, [done]);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"20px 20px", maxWidth:400, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.15rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Pass the Puck!
      </h3>
      <p style={{ color:"rgba(215,226,234,0.42)", fontSize:"0.76rem", textAlign:"center", margin:0 }}>
        Tap the <span style={{ color:"#00A3FF", fontWeight:700 }}>glowing</span> teammate — {passes}/{TOTAL_PASSES} passes
      </p>
      <IceRink style={{ width:"100%", height:244, position:"relative" }}>
        {TMS.map((tm) => {
          const isTarget = tm.id===targetIdx && !done;
          return (
            <motion.button key={tm.id} onClick={() => handlePass(tm)}
              animate={isTarget ? { scale:[1,1.14,1], boxShadow:["0 0 0px rgba(0,163,255,0)","0 0 22px rgba(0,163,255,0.9)","0 0 0px rgba(0,163,255,0)"] } : {}}
              transition={{ duration:0.9, repeat:Infinity }}
              style={{ position:"absolute", left:`${tm.x}%`, top:`${tm.y}%`, width:50, height:50, background:isTarget?"linear-gradient(135deg,#0057FF,#00C3FF)":"rgba(0,18,65,0.8)", border:`2px solid ${isTarget?"#00C3FF":"rgba(0,100,200,0.28)"}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"1rem", fontWeight:900, cursor:isTarget?"pointer":"default", fontFamily:"Kanit,sans-serif" }}>
              {tm.label}
            </motion.button>
          );
        })}
        <div style={{ position:"absolute", left:"40%", top:"72%", width:50, height:50, background:"linear-gradient(135deg,#002266,#0044AA)", border:"2px solid rgba(0,163,255,0.38)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#D7E2EA", fontSize:"0.68rem", fontWeight:900, fontFamily:"Kanit,sans-serif" }}>YOU</div>
        <motion.div
          animate={{ left:`${puck.x}%`, top:`${puck.y}%` }}
          transition={{ type:"spring", stiffness:220, damping:22 }}
          style={{ position:"absolute", transform:"translate(-50%,-50%)", width:22, height:13, background:"#111", borderRadius:"50%", border:"1.5px solid rgba(80,160,255,0.5)", boxShadow:"0 0 10px rgba(0,160,255,0.4)" }}/>
        {!done && !flying && (
          <motion.div animate={{ y:[0,-5,0] }} transition={{ duration:0.7, repeat:Infinity }}
            style={{ position:"absolute", left:`${TMS[targetIdx].x+4}%`, top:`${TMS[targetIdx].y-14}%`, color:"#00C3FF", fontSize:"1rem", fontWeight:900 }}>▼</motion.div>
        )}
      </IceRink>
      {done && (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring" }} style={{ textAlign:"center" }}>
          <p style={{ color:"#00E87A", fontWeight:700, margin:"0 0 10px" }}>Perfect teamwork! Now score! 🎯</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── LEVEL 6: SHOOT THE GOAL ──────────────────────────────────────────────────
function Level6({ onNext }) {
  const [aimX, setAimX] = useState(50);
  const [puck, setPuck] = useState({ x:50, y:82 });
  const [shooting, setShooting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [scored, setScored] = useState(false);
  const [flash, setFlash] = useState(null);
  const goalieX = useRef(30 + Math.random()*28);
  const containerRef = useRef(null);
  const MAX = 3;

  const updateAim = (e) => {
    if (shooting||scored) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    setAimX(Math.max(5, Math.min(95, ((cx-rect.left)/rect.width)*100)));
  };

  const shoot = () => {
    if (shooting||scored||attempts>=MAX) return;
    setShooting(true);
    setPuck({ x:aimX, y:14 });
    setTimeout(() => {
      const inGoal = aimX>17 && aimX<83;
      const blocked = Math.abs(aimX-(goalieX.current+4)) < 17;
      const isGoal = inGoal && !blocked;
      setFlash(isGoal ? "GOAL! 🎉" : blocked ? "Saved! 🧤" : "Wide!");
      setAttempts((a) => a+1);
      if (isGoal) setScored(true);
      setTimeout(() => {
        setFlash(null); setPuck({ x:50, y:82 }); setShooting(false);
        if (!isGoal) goalieX.current = 26 + Math.random()*34;
      }, 1100);
    }, 540);
  };

  const reset = () => {
    setAimX(50); setPuck({ x:50, y:82 }); setShooting(false);
    setAttempts(0); setScored(false); setFlash(null);
    goalieX.current = 26 + Math.random()*34;
  };

  const failed = attempts>=MAX && !scored;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:13, padding:"20px 16px", maxWidth:400, margin:"0 auto" }}>
      <h3 style={{ color:"#D7E2EA", fontSize:"1.15rem", fontWeight:800, textTransform:"uppercase", textAlign:"center", margin:0 }}>
        Shoot the Goal!
      </h3>
      <p style={{ color:"rgba(215,226,234,0.42)", fontSize:"0.76rem", textAlign:"center", margin:0 }}>
        {!scored&&!failed && `Move to aim, tap Shoot — ${MAX-attempts} shot${MAX-attempts!==1?"s":""} left`}
        {scored && "GOAAAAALLLL!! You're a star! 🌟"}
        {failed && "Every legend missed at first — keep going!"}
      </p>
      <div ref={containerRef} onMouseMove={updateAim} onTouchMove={updateAim}
        style={{ width:"100%", height:234, position:"relative", background:"linear-gradient(180deg,#BEE0FF 0%,#DDEFFF 55%,#EEF8FF 100%)", borderRadius:16, overflow:"hidden", border:"1.5px solid rgba(0,100,255,0.18)", cursor:shooting?"default":"crosshair" }}>
        <div style={{ position:"absolute", top:17, left:"17%", right:"17%", height:66, border:"4px solid rgba(55,95,175,0.72)", borderBottom:"none", borderRadius:"3px 3px 0 0" }}>
          {[25,50,75].map((x) => <div key={x} style={{ position:"absolute", top:0, bottom:0, left:`${x}%`, width:1, background:"rgba(55,95,175,0.18)" }}/>)}
          {[35,68].map((y) => <div key={y} style={{ position:"absolute", left:0, right:0, top:`${y}%`, height:1, background:"rgba(55,95,175,0.18)" }}/>)}
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:78, background:"rgba(175,218,255,0.38)", borderTop:"2px solid rgba(120,178,255,0.28)" }}/>
        <motion.div
          animate={!shooting&&!scored ? { x:[0,17,0,-17,0] } : {}}
          transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", top:54, left:`${goalieX.current}%`, width:36, height:50, background:"linear-gradient(180deg,#AA2200,#771500)", borderRadius:10, border:"2px solid rgba(255,100,50,0.42)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.75)", fontSize:"0.58rem", fontWeight:700, fontFamily:"Kanit,sans-serif" }}>G</motion.div>
        {!shooting&&!scored && (
          <div style={{ position:"absolute", top:0, bottom:78, left:`${aimX}%`, width:1.5, background:"rgba(0,163,255,0.22)", transform:"translateX(-50%)", pointerEvents:"none" }}>
            <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:22, height:22, borderRadius:"50%", border:"2px solid rgba(0,163,255,0.65)", background:"rgba(0,163,255,0.1)" }}/>
          </div>
        )}
        <motion.div
          animate={{ left:`${puck.x}%`, top:`${puck.y}%` }}
          transition={{ duration:shooting?0.5:0.05, ease:"easeOut" }}
          style={{ position:"absolute", transform:"translate(-50%,-50%)", width:22, height:13, background:"#111", borderRadius:"50%", border:"1.5px solid rgba(80,160,255,0.48)", boxShadow:"0 0 8px rgba(0,130,255,0.38)" }}/>
        <AnimatePresence>
          {flash && (
            <motion.div key={flash} initial={{ scale:0.5, opacity:1 }} animate={{ scale:1.5, opacity:0 }} transition={{ duration:0.85 }}
              style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"1.7rem", fontWeight:900, color:flash.startsWith("GOAL")?"#00FF88":"#FF9999", pointerEvents:"none", whiteSpace:"nowrap" }}>
              {flash}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!scored&&!failed && <GameBtn onClick={shoot} disabled={shooting}>{shooting?"Flying…":"🏒 Shoot!"}</GameBtn>}
      {scored && (
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring" }}>
          <GameBtn onClick={onNext}>Collect Your Trophy →</GameBtn>
        </motion.div>
      )}
      {failed && (
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
          <GameBtn onClick={reset}>Try Again</GameBtn>
          <GameBtn onClick={onNext} variant="secondary">Skip to Trophy →</GameBtn>
        </div>
      )}
    </div>
  );
}

// ─── LEVEL 7: TROPHY ─────────────────────────────────────────────────────────
function Level7({ playerName, onJoin }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    const COLORS = ["#0057FF","#00A3FF","#FFD700","#00E87A","#FF6600","#ffffff","#FF3399"];
    const pieces = Array.from({ length:88 }, () => ({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height-canvas.height,
      w:5+Math.random()*9, h:4+Math.random()*7,
      color:COLORS[Math.floor(Math.random()*COLORS.length)],
      speed:1.8+Math.random()*3, angle:Math.random()*360, spin:(Math.random()-0.5)*5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach((p) => {
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle*Math.PI/180);
        ctx.fillStyle=p.color; ctx.globalAlpha=0.82;
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
        p.y+=p.speed; p.angle+=p.spin;
        if (p.y>canvas.height) { p.y=-20; p.x=Math.random()*canvas.width; }
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, padding:"22px 20px", maxWidth:400, margin:"0 auto", position:"relative" }}>
      <canvas ref={canvasRef} style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1 }}/>
      <motion.div initial={{ scale:0, rotate:-20 }} animate={{ scale:1, rotate:0 }} transition={{ type:"spring", stiffness:180, delay:0.1 }}
        style={{ position:"relative", zIndex:2 }}>
        <img src="/gear/trophy.png" alt="Trophy" style={{ width:110, height:110, objectFit:"contain" }}/>
      </motion.div>
      <motion.div initial={{ y:22, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.32 }}
        style={{ textAlign:"center", position:"relative", zIndex:2 }}>
        <h2 style={{ color:"#FFD700", fontSize:"clamp(1.55rem,5vw,2.1rem)", fontWeight:900, textTransform:"uppercase", margin:0 }}>You Did It!</h2>
        <p style={{ color:"#D7E2EA", fontSize:"0.92rem", marginTop:9, lineHeight:1.65 }}>
          Congratulations, <strong style={{ color:"#00A3FF" }}>{playerName}</strong>!<br/>
          You've completed your first hockey experience.
        </p>
      </motion.div>
      <motion.div initial={{ y:26, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.52 }}
        style={{ width:"100%", padding:"19px 22px", background:"linear-gradient(135deg,#000A26,#001040)", border:"1.5px solid rgba(0,163,255,0.28)", borderRadius:20, textAlign:"center", position:"relative", zIndex:2 }}>
        <div style={{ color:"rgba(255,215,0,0.45)", fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.22em", marginBottom:5 }}>Certificate of Completion</div>
        <div style={{ color:"rgba(215,226,234,0.32)", fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.14em" }}>Hockey On Ice Foundation</div>
        <div style={{ color:"#D7E2EA", fontSize:"1.12rem", fontWeight:700, margin:"11px 0 7px" }}>{playerName}</div>
        <div style={{ color:"rgba(215,226,234,0.42)", fontSize:"0.76rem", lineHeight:1.6 }}>
          has successfully completed<br/>
          <strong style={{ color:"#00A3FF" }}>First Time on Ice — HOIF Experience</strong>
        </div>
      </motion.div>
      <motion.div initial={{ y:18, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.82 }}
        style={{ textAlign:"center", position:"relative", zIndex:2, width:"100%" }}>
        <p style={{ color:"rgba(215,226,234,0.45)", fontSize:"0.8rem", margin:"0 0 13px" }}>Ready to try it for real?</p>
        <GameBtn onClick={onJoin}>Join Hockey On Ice Foundation →</GameBtn>
      </motion.div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function GameModal({ open, onClose, onJoin }) {
  const [level, setLevel] = useState(0);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setLevel(0); setPlayerName(""); }, 350);
      return () => clearTimeout(t);
    }
    document.documentElement.classList.add("scroll-locked");
    return () => document.documentElement.classList.remove("scroll-locked");
  }, [open]);

  const next = () => setLevel((l) => l+1);
  const handleEnd = () => { onClose(); onJoin(); };

  if (!open) return null;

  return (
    <motion.div key="game" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(0,2,12,0.97)", backdropFilter:"blur(22px)", display:"flex", flexDirection:"column", fontFamily:"Kanit,sans-serif" }}>
      <Snow/>
      <div style={{ position:"relative", zIndex:10, flexShrink:0 }}>
        {level>0 && <ProgressBar current={level}/>}
        <button onClick={onClose}
          style={{ position:"absolute", top:level>0?8:14, right:14, width:34, height:34, borderRadius:"50%", background:"rgba(215,226,234,0.07)", border:"1px solid rgba(215,226,234,0.13)", color:"#D7E2EA", fontSize:"1.1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:20 }}>
          ×
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:5, padding:"10px 0" }}>
        <AnimatePresence mode="wait">
          <motion.div key={level}
            initial={{ opacity:0, x:55 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-55 }}
            transition={{ duration:0.27 }}
            style={{ width:"100%", maxWidth:460 }}>
            {level===0 && <SceneIntro onNext={(n) => { setPlayerName(n); next(); }}/>}
            {level===1 && <Level1 playerName={playerName} onNext={next}/>}
            {level===2 && <Level2 onNext={next}/>}
            {level===3 && <Level3 onNext={next}/>}
            {level===4 && <Level4 onNext={next}/>}
            {level===5 && <Level5 onNext={next}/>}
            {level===6 && <Level6 onNext={next}/>}
            {level===7 && <Level7 playerName={playerName} onJoin={handleEnd}/>}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
