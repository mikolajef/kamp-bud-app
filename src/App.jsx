import React, { useState, useEffect, useRef } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <div style={{padding:40,fontFamily:"monospace",background:"#fff0f0",minHeight:"100vh"}}>
        <h2 style={{color:"red",marginBottom:16}}>Błąd aplikacji</h2>
        <pre style={{background:"#fee",padding:16,borderRadius:8,fontSize:12,whiteSpace:"pre-wrap"}}>
          {this.state.error?.toString()}{"\n\n"}{this.state.error?.stack}
        </pre>
      </div>
    );
    return this.props.children;
  }
}


const C = {
  navBg: "#1a1a1a",
  green: "#b5e71d",
  greenDark: "#7aaa0a",
  greenLight: "#e8f9a0",
  greenLighter: "#f4fcd8",
  accent: "#f5f5f0",
  border: "#e5e7eb",
  textMain: "#1a1a1a",
  textMuted: "#6b7280",
};

const ETAP_STYLES = {
  "Oferta zaakceptowana":       { bg:"#dbeeff", color:"#1a6abf", border:"#a8cff0" },
  "Projektowanie i pozwolenia": { bg:"#fdf6e3", color:"#92680a", border:"#f0d898" },
  "Realizacja":                 { bg:"#e6fbd0", color:"#3a7d1e", border:"#b2e890" },
  "Odbiór":                     { bg:"#f0eafb", color:"#6b3db0", border:"#d9c8f0" },
  "Zrealizowano":               { bg:"#c8eac8", color:"#1a5c1a", border:"#7ec87e" },
  "NIEAKTYWNY":                 { bg:"#f0f0f0", color:"#9ca3af", border:"#d1d5db" },
};

const SC = {
  ZAAKCEPTOWANE: { bg:"white",   color:"#374151", border:"#e5e7eb" },
  MODYFIKACJA:   { bg:"#fff3cd", color:"#856404", border:"#ffc107" },
  REZYGNACJA:    { bg:"#f8d7da", color:"#721c24", border:"#f5c6cb" },
  ZREALIZOWANE:  { bg:"#d4edda", color:"#155724", border:"#c3e6cb" },
  "OPÓŹNIENIE":  { bg:"#fef9c3", color:"#854d0e", border:"#fde68a" },
  PRZELEW:       { bg:"#d1ecf1", color:"#0c5460", border:"#bee5eb" },
  GOTÓWKA:       { bg:"#d4edda", color:"#155724", border:"#c3e6cb" },
  ZAPLANOWANE:   { bg:"#e2e3e5", color:"#383d41", border:"#d6d8db" },
  TAK:           { bg:"#d4edda", color:"#155724", border:"#c3e6cb" },
  NIE:           { bg:"#f8d7da", color:"#721c24", border:"#f5c6cb" },
};

const PROJEKT_OPTIONS = [
  "77m² - PODDASZE","106m² - PODDASZE","114m² - PODDASZE","129m² - PODDASZE",
  "61m² - PARTER","69m² - PARTER","78m² - PARTER","90m² - PARTER",
  "100m² - PARTER","28m² - ZGŁOSZENIE","55m² - ZGŁOSZENIE","57m² - ZGŁOSZENIE","106m² - ZGŁOSZENIE",
];
const PROJEKT_CENY = {
  "77m² - PODDASZE":323400,"106m² - PODDASZE":413400,"114m² - PODDASZE":456000,
  "129m² - PODDASZE":541800,"61m² - PARTER":298900,"69m² - PARTER":345000,
  "78m² - PARTER":390000,"90m² - PARTER":459000,"100m² - PARTER":510000,
};
const GARAZ_OPTIONS = ["NIE","JEDNOSTANOWISKOWY (4m szer.)","PÓŁTORASTANOWISKOWY (5m szer.)","DWUSTANOWISKOWY (6,75m szer.)","WIATA GARAŻOWA"];
const GARAZ_CENY = {"NIE":0,"JEDNOSTANOWISKOWY (4m szer.)":2300,"PÓŁTORASTANOWISKOWY (5m szer.)":2400,"DWUSTANOWISKOWY (6,75m szer.)":2500,"WIATA GARAŻOWA":60000};
const TARAS_OPTIONS = ["NIE","PEŁNA KONSTRUKCJA (bez zadaszenia)","SŁUPY FUNDAMENTOWE (bez konstrukcji)"];
const TARAS_CENY = {"NIE":0,"PEŁNA KONSTRUKCJA (bez zadaszenia)":1300,"SŁUPY FUNDAMENTOWE (bez konstrukcji)":700};
const GANEK_OPTIONS = ["NIE","PEŁNA KONSTRUKCJA (z dachem płaskim)"];
const GANEK_CENY = {"NIE":0,"PEŁNA KONSTRUKCJA (z dachem płaskim)":6900};
const ETAP_OPTIONS = ["Oferta zaakceptowana","Projektowanie i pozwolenia","Realizacja","Odbiór","Zrealizowano","NIEAKTYWNY"];
const PLATNOSC_OPTIONS = ["PRZELEW","GOTÓWKA","ZAPLANOWANE","OPÓŹNIENIE"];
const STATUS_TRANS_OPTIONS = ["","ZAAKCEPTOWANE","OPÓŹNIENIE","MODYFIKACJA","REZYGNACJA"];
const STATUS_WORK_OPTIONS = ["","ZAAKCEPTOWANE","MODYFIKACJA","REZYGNACJA","OPÓŹNIENIE","ZREALIZOWANE"];
const ZREAL_OPTIONS = ["TAK","NIE"];

const DETALE_ARCH = [
  {name:"Ozdoby w tynku elewacyjnym od 300 zł/m² + 8% VAT",price:300},
  {name:"Drzwi zewnętrzne z przeszkleniem od 1 000 zł + 8% VAT",price:2500},
  {name:"Dodatkowy metraż okien 950 zł/m² + 8% VAT",price:950},
  {name:"Kolorystyka okien (jednostronna) 150 zł/m² + 8% VAT",price:150},
  {name:"Szprosy w oknach od 80 zł/m² + 8% VAT",price:80},
  {name:"Zadaszenie nad drzwiami wejściowymi: 4 000 zł + 8%VAT",price:4000},
  {name:"Balustrada pojedyncza do okna balkonowego: 2 000 zł + 8%VAT",price:2000},
  {name:"Schody tarasowe: 6 500 zł + 8%VAT",price:6500},
  {name:"Przesunięcie słupa stalowego 2szt.: 4 000 zł + 8%VAT",price:2000},
  {name:"Komin do kominka na pellet w kolorze: 1 000 zł + 8%VAT",price:1000},
  {name:"Okno przesuwne w systemie SLIDE od 3 000 zł + 8% VAT",price:3000},
  {name:"Rolety zewnętrzne elektryczne od 750 zł/m² + 8% VAT",price:750},
  {name:"Żaluzje zewnętrzne – elektryczne od 1 500 zł/m² + 8% VAT",price:1500},
  {name:"Podtynkowy montaż rolet lub żaluzji od 10 000 zł + 8% VAT",price:10000},
  {name:"Jednostka rekuperacji Komfovent z wymiennikiem entalpicznym od 5 000 zł + 8% VAT",price:5000},
  {name:"Jednostka rekuperacji przeniesiona na poddasze od 2 000 zł + 8% VAT",price:2000},
  {name:"Dodatkowa instalacja klimatyzacji (bez jednostki) 3 000 zł + 8% VAT",price:3000},
  {name:"Instalacja alarmowa i monitoringu od 2 500 zł + 8% VAT",price:2500},
  {name:"Maty grzewcze w podłodze od 250 zł/m² + 8% VAT",price:250},
  {name:"Schody wewnętrzne metalowe od 10 000 zł + 8% VAT",price:10000},
  {name:"Balustrada stalowa do okna balkonowego od 2 000 zł + 8% VAT",price:2000},
  {name:"Balustrada szklana do okna balkonowego od 3 000 zł + 8% VAT",price:3000},
  {name:"Komin zewnętrzny w kolorze od 1 000 zł + 8% VAT",price:1000},
  {name:"Przedłużenie dachu na ściany zewnętrzne od 10 000 zł + 8% VAT",price:10000},
  {name:"Daszek nad drzwiami wejściowymi od 5 000 zł + 8% VAT",price:5000},
  {name:"Zadaszenie wejścia ozdobne od 10 000 zł + 8% VAT",price:10000},
  {name:"Przeniesienie słupa stalowego od 2 000 zł + 8% VAT",price:2000},
  {name:"Usunięcie słupa stalowego i montaż dźwigara od 8 000 zł + 8% VAT",price:8000},
  {name:"Projekt wnętrza wycena indywidualna",price:0},
  {name:"Projekt elewacji wycena indywidualna",price:0},
  {name:"Indywidualny projekt funkcjonalny wycena indywidualna",price:0},
];

// ─── helpers ────────────────────────────────────────────────────────────────
const zł = (v) => {
  if (!v && v !== 0) return "";
  const n = Math.round(v);
  return n.toLocaleString("pl-PL") + " zł";
};
const daysDiff = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.ceil((t - d) / 86400000);
};
const fmt = (s) => {
  if (!s) return "";
  const [y,m,d] = s.split("-");
  return `${d}.${m}.${y}`;
};
// Dashboard globals (shared with HomeScreen)
const ff   = "'Barlow Condensed',sans-serif";
const fmtD = fmt; // alias for dashboard use

// ─── micro components ───────────────────────────────────────────────────────
const Lbl = ({c}) => (
  <div style={{fontSize:10,fontWeight:700,color:C.textMuted,letterSpacing:"0.5px",
    textTransform:"uppercase",marginBottom:3,fontFamily:"'Barlow Condensed',sans-serif"}}>{c}</div>
);

const RO = ({v, small, bold}) => (
  <div style={{background:C.greenLight,border:"1px solid #c8f041",borderRadius:4,
    padding:small?"3px 7px":"5px 9px",fontSize:small?11:12,fontWeight:bold?700:600,
    color:"#4a7009",display:"flex",alignItems:"center",justifyContent:"flex-end",
    minHeight:small?24:30,fontFamily:"'Barlow Condensed',monospace"}}>
    {v}
  </div>
);

const TI = ({v, set, type="text", ph, style={}}) => (
  <input type={type} value={v??""} onChange={e=>set(e.target.value)} placeholder={ph}
    style={{width:"100%",padding:"5px 8px",borderRadius:4,fontSize:12,border:`1px solid ${C.border}`,
      background:"white",color:C.textMain,outline:"none",boxSizing:"border-box",
      fontFamily:"'Barlow Condensed',sans-serif",...style}}
    onFocus={e=>e.target.style.borderColor=C.green}
    onBlur={e=>e.target.style.borderColor=C.border}/>
);

const TS = ({v, set, opts, cm, style={}}) => {
  const s = cm?(cm[v]||{}):{};
  return (
    <select value={v??""} onChange={e=>set(e.target.value)}
      style={{width:"100%",padding:"5px 8px",borderRadius:4,fontSize:12,
        border:`1px solid ${C.border}`,background:s.bg||"white",
        color:s.color||C.textMain,fontWeight:s.bg?700:400,
        outline:"none",boxSizing:"border-box",cursor:"pointer",
        fontFamily:"'Barlow Condensed',sans-serif",...style}}>
      {opts.map(o=><option key={o} value={o} style={{background:"white",color:C.textMain,fontWeight:400}}>{o||"–"}</option>)}
    </select>
  );
};

const TH = ({c,style={}}) => (
  <th style={{background:C.green,color:"#1a1a1a",padding:"5px 7px",fontSize:10,fontWeight:700,
    letterSpacing:"0.4px",textAlign:"center",whiteSpace:"nowrap",
    fontFamily:"'Barlow Condensed',sans-serif",...style}}>{c}</th>
);

const SumBar = ({netto}) => (
  <div style={{display:"flex",justifyContent:"flex-end",gap:16,marginTop:8,padding:"6px 10px",
    background:C.greenLighter,borderRadius:4,fontSize:12,fontWeight:700,color:C.greenDark,
    fontFamily:"'Barlow Condensed',sans-serif"}}>
    SUMA NETTO: {zł(Math.round(netto))} &nbsp;|&nbsp; VAT 8%: {zł(Math.round(netto*0.08))} &nbsp;|&nbsp; BRUTTO: {zł(Math.round(netto*1.08))}
  </div>
);

// Collapsible panel with button trigger
const Panel = ({title, icon, color=C.green, children}) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{marginBottom:8,borderRadius:8,overflow:"hidden",
      boxShadow:"0 1px 4px rgba(0,0,0,0.1)"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"11px 16px",background:open?color:C.navBg,border:"none",cursor:"pointer",
        color: open ? "#1a1a1a" : "white",
        fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
        fontSize:13,letterSpacing:"0.8px",textTransform:"uppercase",transition:"background 0.2s",
      }}>
        <span style={{display:"flex",alignItems:"center",gap:8}}>{icon} {title}</span>
        <span style={{fontSize:18,transition:"transform 0.25s",display:"inline-block",
          transform:open?"rotate(180deg)":"none"}}>▾</span>
      </button>
      {open && (
        <div style={{background:"white",padding:"14px 16px",
          borderTop:`3px solid ${color}`}}>
          {children}
        </div>
      )}
    </div>
  );
};

// Work rows table used for 3 sections
const WorkTable = ({rows, upd}) => (
  <div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr>
        <TH c="LP." style={{width:30}}/>
        <TH c="KATEGORIA" style={{textAlign:"left",minWidth:220}}/>
        <TH c="CENA ZŁ/M²" style={{minWidth:80}}/>
        <TH c="ILOŚĆ" style={{minWidth:55}}/>
        <TH c="NETTO"/>
        <TH c="VAT 8%"/>
        <TH c="BRUTTO"/>
        <TH c="STATUS" style={{minWidth:110}}/>
      </tr></thead>
      <tbody>
        {rows.map((r,i)=>{
          const n=(r.cena||0)*(r.qty||0);
          const s=SC[r.status]||{};
          const bg=r.status==="REZYGNACJA"?"#fff5f5":r.status==="OPÓŹNIENIE"?"#fef9c3":r.status==="ZREALIZOWANE"?"#f0fdf4":"white";
          return (
            <tr key={i} style={{background:bg}}>
              <td style={{textAlign:"center",color:C.textMuted,fontSize:11,padding:"3px 5px"}}>{r.lp}</td>
              <td style={{padding:"3px 5px"}}>
                <input value={r.kat} onChange={e=>upd(i,"kat",e.target.value)}
                  style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11}}/>
              </td>
              <td style={{padding:"3px 4px"}}>
                <input type="number" value={r.cena||""} onChange={e=>upd(i,"cena",e.target.value)}
                  style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/>
              </td>
              <td style={{padding:"3px 4px"}}>
                <input type="number" value={r.qty||""} onChange={e=>upd(i,"qty",e.target.value)}
                  style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/>
              </td>
              <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(n))} small/></td>
              <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(n*.08))} small/></td>
              <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(n*1.08))} small/></td>
              <td style={{padding:"3px 4px"}}>
                <select value={r.status} onChange={e=>upd(i,"status",e.target.value)}
                  style={{width:"100%",padding:"3px 5px",border:`1px solid ${C.border}`,borderRadius:3,
                    fontSize:11,background:s.bg||"white",color:s.color||C.textMain,fontWeight:s.bg?700:400}}>
                  {STATUS_WORK_OPTIONS.map(o=><option key={o} value={o} style={{background:"white",color:C.textMain}}>{o||"–"}</option>)}
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ─── project defaults per ID ─────────────────────────────────────────────────
const PROJECT_DEFAULTS = {
  A1: { kod:"A1", klient:"Józef Robak",      tel:"555 555 555", email:"jozef.robak@gmail.com",   data:"2026-03-15", etap:"Zrealizowano" },
  B2: { kod:"B2", klient:"Mikołaj Firmanty", tel:"600 100 200", email:"m.firmanty@gmail.com",    data:"2026-03-20", etap:"Projektowanie i pozwolenia" },
  C3: { kod:"C3", klient:"Patryk Bujanowicz",tel:"700 200 300", email:"p.bujanowicz@gmail.com",  data:"2026-02-10", etap:"Realizacja" },
  D4: { kod:"D4", klient:"Johnny Walker",    tel:"800 300 400", email:"j.walker@gmail.com",       data:"2026-03-20", etap:"Oferta zaakceptowana" },
  E5: { kod:"E5", klient:"",                 tel:"",            email:"",                         data:"",           etap:"Oferta zaakceptowana" },
  D6: { kod:"D6", klient:"",                 tel:"",            email:"",                         data:"",           etap:"Oferta zaakceptowana" },
};

// ─── main sheet component ─────────────────────────────────────────────────────
function ProjectSheet({ projectId, onBack }) {
  const defaults = PROJECT_DEFAULTS[projectId] || PROJECT_DEFAULTS.A1;
  const STORAGE_KEY = `kamp-bud-project-${projectId}`;
  const kodPrefix = projectId;

  const getSaved = () => {
    for (const store of [sessionStorage, localStorage]) {
      try { const raw = store.getItem(STORAGE_KEY); if(raw) return JSON.parse(raw); } catch(e) {}
    }
    return null;
  };

  const [info, setInfo] = useState(() => getSaved()?.info || { ...defaults });
  const setI = (k,v) => setInfo(p=>({...p,[k]:v}));
  const [saveStatus, setSaveStatus] = useState(null);
  const kodSuffix = (info.kod||'').startsWith(kodPrefix) ? (info.kod||'').slice(kodPrefix.length).replace(/^\s*-\s*/,'') : (info.kod||'');
  const fullKod = kodSuffix.trim() ? `${kodPrefix} - ${kodSuffix.trim().toUpperCase()}` : kodPrefix;

  // Refs always hold latest state — used by handleSave to avoid stale closures
  const stateRef = useRef({});

  const [oferta, setOferta] = useState(() => getSaved()?.oferta || {
    opcja:"77m² - PODDASZE", proj:3,
    garaz:"JEDNOSTANOWISKOWY (4m szer.)", taras:"PEŁNA KONSTRUKCJA (bez zadaszenia)",
    ganek:"PEŁNA KONSTRUKCJA (z dachem płaskim)",
    transDom:"TAK", transDod:"NIE",
  });
  const setO = (k,v) => setOferta(p=>({...p,[k]:v}));

  const [tr, setTr] = useState(() => getSaved()?.tr || {km:100, tiry:9, busy:3});
  const [trRows, setTrRows] = useState(() => getSaved()?.trRows || [
    {lp:1,kat:"Transport – Dom",              szcz:"3 TIRY + 2 BUSY",          auto:true,  status:"ZAAKCEPTOWANE",kom:"termin",            manual:""},
    {lp:2,kat:"Transport – Dodatki",          szcz:"3 TIRY",                   auto:true,  status:"ZAAKCEPTOWANE",kom:"dostawa 28.05.2026",manual:""},
    {lp:3,kat:"Transport – Dom manualnie",    szcz:"niepowiązane z kalkulacją", auto:false, status:"",             kom:"",                 manual:""},
    {lp:4,kat:"Transport – Dodatki manualnie",szcz:"niepowiązane z kalkulacją", auto:false, status:"",             kom:"",                 manual:""},
  ]);
  const updTr = (i,f,v) => setTrRows(p=>p.map((r,j)=>j===i?{...r,[f]:v}:r));

  const [koszty, setKoszty] = useState(() => getSaved()?.koszty || {
    architekt:17000, elektryk:12000, spawacz:9000, fund:22000, pracownicy:120000,
    materialy:34183, dodatkowe:0, paliwo:1100,
  });
  const setK = (k,v) => setKoszty(p=>({...p,[k]:Number(v)||0}));

  const [plat, setPlat] = useState(() => getSaved()?.plat || [
    {lp:1,data:"2026-03-20",netto:100000,forma:"PRZELEW",   zreal:"TAK"},
    {lp:2,data:"2026-03-23",netto:50000, forma:"GOTÓWKA",   zreal:"TAK"},
    {lp:3,data:"2026-04-01",netto:25000, forma:"GOTÓWKA",   zreal:"TAK"},
    {lp:4,data:"2026-04-10",netto:5000,  forma:"OPÓŹNIENIE",zreal:"NIE"},
    {lp:5,data:"2026-05-20",netto:150000,forma:"ZAPLANOWANE",zreal:"NIE"},
    {lp:6,data:"2026-06-15",netto:10000, forma:"ZAPLANOWANE",zreal:"NIE"},
    {lp:7,data:"2026-08-27",netto:260000,forma:"ZAPLANOWANE",zreal:"NIE"},
    {lp:8,data:"2026-09-10",netto:44810, forma:"ZAPLANOWANE",zreal:"NIE"},
    {lp:9,data:"",netto:0,forma:"ZAPLANOWANE",zreal:"NIE"},
    {lp:10,data:"",netto:0,forma:"ZAPLANOWANE",zreal:"NIE"},
  ]);
  const updP = (i,f,v) => setPlat(p=>p.map((r,j)=>j===i?{...r,[f]:f==="netto"?Number(v)||0:v}:r));

  const mkRows = (n, overrides=[]) => Array(n).fill(null).map((_,i)=>({
    lp:i+1,kat:overrides[i]?.kat||"",cena:overrides[i]?.cena||0,qty:overrides[i]?.qty||0,status:overrides[i]?.status||""
  }));

  const [zmiany, setZmiany] = useState(() => getSaved()?.zmiany || mkRows(10,[
    {kat:"Wyciszenie ścian działowych (wełna mineralna) gr. 10 cm",cena:0,qty:40,status:"REZYGNACJA"},
    {kat:"Schody wewnętrzne drewniane (w paczce)",cena:0,qty:1,status:"MODYFIKACJA"},
    {kat:"Okna i witryny białe 3-szybowe do 22 m² w cenie",cena:0,qty:-2,status:"MODYFIKACJA"},
    {kat:"Instalacja wentylacji (rekuperacja z osprzętu)",cena:0,qty:-1,status:""},
  ]));
  const updZm = (i,f,v) => setZmiany(p=>p.map((r,j)=>j===i?{...r,[f]:f==="cena"||f==="qty"?Number(v)||0:v}:r));

  const [extra, setExtra] = useState(() => getSaved()?.extra || mkRows(10,[{kat:"montaz paneli",cena:40,qty:70,status:"MODYFIKACJA"}]));
  const updEx = (i,f,v) => setExtra(p=>p.map((r,j)=>j===i?{...r,[f]:f==="cena"||f==="qty"?Number(v)||0:v}:r));

  const [detale, setDetale] = useState(() => getSaved()?.detale || DETALE_ARCH.map((d,i)=>({
    lp:i+1,kat:d.name,cena:d.price,qty:0,
    status:["ZAAKCEPTOWANE","ZAAKCEPTOWANE","OPÓŹNIENIE","ZAAKCEPTOWANE","ZAAKCEPTOWANE",
            "ZAAKCEPTOWANE","ZAAKCEPTOWANE","ZAAKCEPTOWANE","ZAAKCEPTOWANE","ZAAKCEPTOWANE","OPÓŹNIENIE"][i]||""
  })));
  const updDet = (i,f,v) => setDetale(p=>p.map((r,j)=>j===i?{...r,[f]:f==="cena"||f==="qty"?Number(v)||0:v}:r));

  // Keep ref always up to date — all useState above must be declared first
  useEffect(() => { stateRef.current.info   = info;   }, [info]);
  useEffect(() => { stateRef.current.oferta = oferta; }, [oferta]);
  useEffect(() => { stateRef.current.tr     = tr;     }, [tr]);
  useEffect(() => { stateRef.current.trRows = trRows; }, [trRows]);
  useEffect(() => { stateRef.current.koszty = koszty; }, [koszty]);
  useEffect(() => { stateRef.current.plat   = plat;   }, [plat]);
  useEffect(() => { stateRef.current.zmiany = zmiany; }, [zmiany]);
  useEffect(() => { stateRef.current.extra  = extra;  }, [extra]);
  useEffect(() => { stateRef.current.detale = detale; }, [detale]);

  const handleSave = () => {
    setSaveStatus('saving');
    const snap = { ...stateRef.current };
    const ser  = JSON.stringify(snap);
    try { localStorage.setItem(STORAGE_KEY, ser); }   catch(e) {}
    try { sessionStorage.setItem(STORAGE_KEY, ser); } catch(e) {}
    if (window.storage) window.storage.set(STORAGE_KEY, ser).catch(()=>{});
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // ── calcs ────────────────────────────────────────────────────────────────
  const domN  = PROJEKT_CENY[oferta.opcja]||0;
  const zmN   = zmiany.reduce((s,r)=>s+(r.cena*r.qty),0);
  const exN   = extra.reduce((s,r)=>s+(r.cena*r.qty),0);
  const garazN= oferta.garaz!=="NIE"?(oferta.proj||0)*(GARAZ_CENY[oferta.garaz]||0):0;
  const tarasN= oferta.taras!=="NIE"?(oferta.proj||0)*(TARAS_CENY[oferta.taras]||0):0;
  const ganekN= oferta.ganek!=="NIE"?(oferta.proj||0)*(GANEK_CENY[oferta.ganek]||0):0;
  const detN  = detale.reduce((s,r)=>s+(r.cena*r.qty),0);
  const ofN   = domN+zmN+exN+garazN+tarasN+ganekN+detN;

  const trDomAuto = (tr.tiry*tr.km*3)+(2*tr.busy*tr.km);
  const trDodAuto = tr.tiry*tr.km*3;
  const getTrN = (r,i) => r.auto ? (i===0?trDomAuto:trDodAuto) : (Number(r.manual)||0);
  // sum exactly what each row displays - no transDom/transDod gating
  const trN = trRows.reduce((s,r,i) => s + getTrN(r,i), 0);

  const kwota = ofN+trN;
  const kwotaB = kwota*1.08;
  const rob = koszty.architekt+koszty.elektryk+koszty.spawacz+koszty.fund+koszty.pracownicy;
  const kosN = rob+koszty.materialy+koszty.dodatkowe+koszty.paliwo;
  const zysk = kwota-kosN;

  const zapl_G = plat.filter(p=>p.forma==="GOTÓWKA"  &&p.zreal==="TAK").reduce((s,p)=>s+p.netto,0);
  const zapl_P = plat.filter(p=>p.forma==="PRZELEW"  &&p.zreal==="TAK").reduce((s,p)=>s+p.netto,0);
  const zapl_all = plat.filter(p=>p.zreal==="TAK").reduce((s,p)=>s+p.netto,0);
  const doZapl = Math.max(0, kwota - zapl_all);
  const opozn  = plat.filter(p=>p.forma==="OPÓŹNIENIE"&&p.zreal==="NIE"&&p.netto>0);

  const today = new Date(); today.setHours(0,0,0,0);
  const nast  = plat.filter(p=>p.data&&new Date(p.data)>today&&p.netto>0).sort((a,b)=>new Date(a.data)-new Date(b.data))[0];
  const dni   = nast ? Math.ceil((new Date(nast.data)-today)/86400000) : null;

  const es = ETAP_STYLES[info.etap]||{bg:"#f3f4f6",color:"#374151",border:"#d1d5db"};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0f0eb;font-family:'Barlow Condensed',sans-serif;}
        input,select,textarea{font-family:'Barlow Condensed',sans-serif;}
        input:focus,select:focus{outline:none;border-color:${C.green}!important;box-shadow:0 0 0 2px ${C.greenLight};}
        input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ${info.etap==="NIEAKTYWNY"?".main-content{filter:grayscale(0.65) opacity(0.55);pointer-events:none;} .etap-always-active{filter:none!important;opacity:1!important;pointer-events:all!important;}":""}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{background:C.navBg,padding:"0 20px",display:"flex",alignItems:"center",height:54,boxShadow:"0 2px 8px rgba(0,0,0,.35)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          {/* High-quality SVG logo replicating kamp-bud.pl */}
          <svg width="190" height="40" viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Green rounded square icon */}
            <rect x="0" y="0" width="40" height="40" rx="7" fill="#b5e71d"/>
            {/* House outline icon – white */}
            <path d="M20 9 L10 18 L12.5 18 L12.5 30 L17.5 30 L17.5 23.5 L22.5 23.5 L22.5 30 L27.5 30 L27.5 18 L30 18 Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
            {/* KAMP-BUD as single text with tspan for two colors — guarantees zero gap */}
            <text x="49" y="26" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.3">
              <tspan fill="#ffffff">KAMP-</tspan><tspan fill="#b5e71d">BUD</tspan>
            </text>
            {/* Subtitle */}
            <text x="49" y="36" fontFamily="'Barlow Condensed',sans-serif" fontWeight="400" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.55)">DOMY ENERGOOSZCZĘDNE</text>
          </svg>
          <div style={{color:"rgba(255,255,255,.2)",fontSize:20,lineHeight:1}}>|</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",color:"rgba(255,255,255,.55)",fontSize:12,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase"}}>System Projektowy</div>
        </div>
        {onBack && (
          <button onClick={onBack} style={{
            marginLeft:16,background:"transparent",border:"1px solid rgba(255,255,255,.3)",
            color:"rgba(255,255,255,.7)",padding:"5px 14px",borderRadius:4,cursor:"pointer",
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:12,
            letterSpacing:"1px",textTransform:"uppercase",transition:"all .2s",
          }}
          onMouseOver={e=>{e.target.style.background="rgba(255,255,255,.1)";e.target.style.color="white";}}
          onMouseOut={e=>{e.target.style.background="transparent";e.target.style.color="rgba(255,255,255,.7)";}}>
            ← WSZYSTKIE PROJEKTY
          </button>
        )}
        <div style={{marginLeft:"auto",fontFamily:"'Barlow Condensed',sans-serif",color:"rgba(255,255,255,.45)",fontSize:11,letterSpacing:"1px"}}>
          PROJEKT · {fullKod} · {info.klient.toUpperCase()}
        </div>
      </nav>

      <div className="main-content" style={{maxWidth:1400,margin:"0 auto",padding:"14px 16px 48px"}}>

        {/* ── PODSTAWOWE INFORMACJE (always visible) ── */}
        <div style={{background:"white",borderRadius:10,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,.09)"}}>
          <div style={{background:C.navBg,padding:"8px 16px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:C.green,padding:"3px 12px",borderRadius:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,color:"#1a1a1a",letterSpacing:".5px"}}>PODSTAWOWE INFORMACJE</div>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",color:"rgba(255,255,255,.4)",fontSize:11,letterSpacing:"1px"}}>PROJEKT · {info.kod.toUpperCase()}</span>
          </div>
          <div style={{padding:"14px 16px"}}>
            {/* top row of fields */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
              <div>
                <Lbl c="NAZWA PROJEKTU"/>
                <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:4,background:"white",overflow:"hidden"}}
                  onFocusCapture={e=>e.currentTarget.style.borderColor=C.green}
                  onBlurCapture={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{padding:"5px 8px 5px 10px",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,color:"#1a1a1a",background:"#f4fcd8",borderRight:`1px solid ${C.border}`,whiteSpace:"nowrap",userSelect:"none"}}>{kodPrefix}</div>
                  <div style={{padding:"5px 4px",fontWeight:700,color:"#9ca3af",fontSize:13,userSelect:"none"}}>–</div>
                  <input value={kodSuffix} onChange={e=>setI("kod",e.target.value?`${kodPrefix} - ${e.target.value}`:kodPrefix)} placeholder="wpisz nazwę..."
                    style={{flex:1,padding:"5px 8px",border:"none",outline:"none",fontSize:12,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,textTransform:"uppercase",color:"#1a1a1a"}}/>
                </div>
              </div>
              <div>
                <Lbl c="DANE KLIENTA"/>
                <TI v={info.klient} set={v=>setI("klient",v)}/>
              </div>
              <div>
                <Lbl c="NR TELEFONU"/>
                <TI v={info.tel} set={v=>setI("tel",v)}/>
              </div>
              <div>
                <Lbl c="E-MAIL"/>
                <TI v={info.email} set={v=>setI("email",v)}/>
              </div>
              <div>
                <Lbl c="DATA PODPISANIA UMOWY"/>
                <TI type="date" v={info.data} set={v=>setI("data",v)}/>
              </div>
            </div>

            {/* ETAP – single large color-coded select, centered */}
            <div className="etap-always-active" style={{borderTop:`1px solid ${C.border}`,paddingTop:12}}>
              <Lbl c="ETAP PROJEKTU"/>
              <div style={{display:"flex",justifyContent:"center",marginTop:4}}>
                <select value={info.etap} onChange={e=>setI("etap",e.target.value)}
                  style={{width:"60%",padding:"12px 20px",borderRadius:8,fontSize:20,fontWeight:900,
                    cursor:"pointer",border:`2px solid ${es.border}`,background:es.bg,color:es.color,
                    fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1.5px",textTransform:"uppercase",
                    textAlign:"center",outline:"none",transition:"all .25s"}}>
                  {ETAP_OPTIONS.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── PODSUMOWANIE FINANSOWE (always visible) ── */}
        <div style={{background:"white",borderRadius:10,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,.09)"}}>
          <div style={{background:C.navBg,padding:"8px 16px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:C.green,padding:"3px 12px",borderRadius:3,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,color:"#1a1a1a",letterSpacing:".5px"}}>PODSUMOWANIE FINANSOWE</div>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",color:"rgba(255,255,255,.4)",fontSize:11,letterSpacing:"1px"}}>PROJEKT · {info.kod.toUpperCase()}</span>
          </div>
          <div style={{padding:"12px 16px"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
              {[
                {lbl:"KWOTA Z UMOWY (NETTO)",  v:kwota,  ok:true},
                {lbl:"KWOTA BRUTTO",           v:kwotaB, ok:true},
                {lbl:"KOSZTY NETTO",           v:kosN,   ok:false},
                {lbl:"ZYSK",                   v:zysk,   ok:zysk>=0},
              ].map(({lbl,v,ok})=>(
                <div key={lbl} style={{background:ok?C.greenLighter:"#fff5f5",border:`1px solid ${ok?"#c8f041":"#fecaca"}`,borderRadius:6,padding:"9px 12px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".4px",marginBottom:3}}>{lbl}</div>
                  <div style={{fontSize:17,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",color:ok?(lbl==="Zysk"&&zysk<0?"#dc2626":C.greenDark):"#dc2626"}}>
                    {zł(Math.round(v))}
                  </div>
                </div>
              ))}
            </div>

            {/* next payment */}
            {nast && (
              <div style={{background:"#f0f7ff",border:"1px solid #d6e8fa",borderRadius:6,padding:"7px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,fontSize:12,flexWrap:"wrap"}}>
                <span style={{fontWeight:700,color:"#5a86b8"}}>⏰ KOLEJNA PŁATNOŚĆ:</span>
                <span style={{color:C.textMuted}}>{fmt(nast.data)}</span>
                <span style={{fontWeight:700,color:"#5a86b8"}}>{zł(nast.netto)}</span>
                <span style={{background:"#d6e8fa",color:"#5a86b8",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>{dni} dni</span>
              </div>
            )}

            {/* overdue alert with dates and days elapsed */}
            {opozn.length>0 && (
              <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:6,padding:"8px 12px"}}>
                <div style={{fontWeight:700,color:"#b91c1c",fontSize:12,marginBottom:5}}>
                  ⚠️ OPÓŹNIONE PŁATNOŚCI — {opozn.length} FAKTURA(-Y) · ŁĄCZNIE {zł(opozn.reduce((s,p)=>s+p.netto,0))}
                </div>
                {opozn.map((p,i)=>{
                  const days=daysDiff(p.data);
                  return (
                    <div key={i} style={{display:"flex",flexWrap:"wrap",gap:10,fontSize:11,color:"#7f1d1d",
                      padding:"4px 0",borderTop:i>0?"1px solid #fecaca":"none",alignItems:"center"}}>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif"}}>📅 {fmt(p.data)||"brak daty"}</span>
                      <span>·</span>
                      <span style={{fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif"}}>{zł(p.netto)}</span>
                      <span>·</span>
                      <span style={{background:"#fee2e2",padding:"1px 7px",borderRadius:3,fontWeight:700,
                        fontFamily:"'Barlow Condensed',sans-serif"}}>
                        {days!==null ? (days===0?"dzisiaj":`${days} dni temu`) : "brak daty"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── COLLAPSIBLE PANELS ── */}

        {/* OFERTA */}
        <Panel title="Oferta – konfiguracja projektu" icon="🏗️" color={C.green}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 70px",gap:8,marginBottom:8}}>
            <div><Lbl c="POWIERZCHNIA – TYP"/><TS v={oferta.opcja} set={v=>setO("opcja",v)} opts={PROJEKT_OPTIONS}/></div>
            <div><Lbl c="NR PROJ."/><TI type="number" v={oferta.proj} set={v=>setO("proj",Number(v))}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
            {[
              ["GARAŻ","garaz",GARAZ_OPTIONS],
              ["TARAS","taras",TARAS_OPTIONS],
              ["GANEK / WYKUSZ","ganek",GANEK_OPTIONS],
            ].map(([lbl,k,opts])=>(
              <div key={k}>
                <Lbl c={lbl}/>
                <select value={oferta[k]} onChange={e=>setO(k,e.target.value)}
                  style={{width:"100%",padding:"6px 8px",borderRadius:4,fontSize:11,
                    border:`1px solid ${C.border}`,background:"white",color:C.textMain,
                    cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",
                    lineHeight:"1.4",height:"auto"}}>
                  {opts.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div><Lbl c="TRANSPORT – DOM"/><TS v={oferta.transDom} set={v=>setO("transDom",v)} opts={["TAK","NIE"]} cm={SC}/></div>
            <div><Lbl c="TRANSPORT – DODATKI"/><TS v={oferta.transDod} set={v=>setO("transDod",v)} opts={["TAK","NIE"]} cm={SC}/></div>
          </div>
          {/* breakdown */}
          <div style={{background:"white",border:`1px solid ${C.border}`,borderRadius:6,overflow:"hidden",marginTop:4}}>
            <div style={{background:C.green,padding:"5px 10px"}}>
              <span style={{fontSize:10,fontWeight:700,color:"#1a1a1a",textTransform:"uppercase",letterSpacing:".6px",fontFamily:"'Barlow Condensed',sans-serif"}}>SKŁADOWE OFERTY</span>
            </div>
            <div style={{padding:10}}>
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr 110px 90px 120px",fontSize:12,gap:"2px 8px"}}>
              <div style={{fontWeight:700,fontSize:10,color:C.textMuted,textTransform:"uppercase"}}>POZYCJA</div><div/>
              {["NETTO","VAT 8%","BRUTTO"].map(h=><div key={h} style={{textAlign:"right",fontWeight:700,fontSize:10,color:C.textMuted,textTransform:"uppercase"}}>{h}</div>)}
              <div style={{gridColumn:"1/-1",borderTop:`1px solid ${C.border}`,margin:"3px 0"}}/>
              {[["DOM – STAN DEWELOPERSKI",domN],["ZMIANY W ZAKRESIE PRAC",zmN],["DODATKOWE ZMIANY",exN],["GARAŻ",garazN],["TARAS",tarasN],["GANEK/WYKUSZ",ganekN],["DETALE ARCHITEKTONICZNE",detN]].map(([l,n])=>(
                <div key={l} style={{display:"contents"}}>
                  <div style={{fontSize:11,color:C.textMain,paddingTop:2,textTransform:"uppercase",letterSpacing:".2px"}}>{l}</div><div/>
                  {[n,n*.08,n*1.08].map((v,j)=><div key={j} style={{textAlign:"right",fontFamily:"'Barlow Condensed',monospace",paddingTop:2,color:C.textMain}}>{Math.round(v).toLocaleString("pl-PL")} zł</div>)}
                </div>
              ))}
              <div style={{gridColumn:"1/-1",borderTop:`2px solid ${C.green}`,margin:"4px 0"}}/>
              <div style={{fontWeight:800,color:C.greenDark,fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase"}}>SUMA</div><div/>
              {[ofN,ofN*.08,ofN*1.08].map((v,j)=><div key={j} style={{textAlign:"right",fontWeight:800,fontFamily:"'Barlow Condensed',monospace",color:C.greenDark}}>{Math.round(v).toLocaleString("pl-PL")} zł</div>)}
            </div>
            </div>
          </div>
        </Panel>

        {/* TRANSPORT */}
        <Panel title="Transport" icon="🚚" color={C.green}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
            <div><Lbl c="KM (ŁĄCZNIE W OBĘ STRONY)"/><TI type="number" v={tr.km}   set={v=>setTr(p=>({...p,km:Number(v)}))}/></div>
            <div><Lbl c="STAWKA – TIRY (ZŁ/KM)"/><TI    type="number" v={tr.tiry} set={v=>setTr(p=>({...p,tiry:Number(v)}))}/></div>
            <div><Lbl c="STAWKA – BUSY (ZŁ/KM)"/><TI    type="number" v={tr.busy} set={v=>setTr(p=>({...p,busy:Number(v)}))}/></div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>
                <TH c="LP." style={{width:30}}/><TH c="KATEGORIA" style={{textAlign:"left"}}/>
                <TH c="SZCZEGÓŁY" style={{textAlign:"left"}}/><TH c="NETTO"/><TH c="VAT 8%"/><TH c="BRUTTO"/>
                <TH c="STATUS" style={{minWidth:110}}/><TH c="KOMENTARZ" style={{minWidth:120}}/>
              </tr></thead>
              <tbody>
                {trRows.map((r,i)=>{
                  const n = r.auto ? getTrN(r,i) : (Number(r.manual)||0);
                  const s = SC[r.status]||{};
                  return (
                    <tr key={i} style={{background:i>=2?"#fffbeb":"white"}}>
                      <td style={{textAlign:"center",color:C.textMuted,fontSize:11,padding:"3px 5px"}}>{r.lp}</td>
                      <td style={{padding:"3px 5px",fontSize:11,color:i>=2?"#92400e":C.textMain,whiteSpace:"nowrap"}}>{r.kat}</td>
                      <td style={{padding:"3px 4px"}}>
                        <input value={r.szcz} onChange={e=>updTr(i,"szcz",e.target.value)}
                          style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11}}/>
                      </td>
                      {r.auto ? (
                        <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(n))} small/></td>
                      ) : (
                        <td style={{padding:"3px 4px"}}>
                          <input type="number" value={r.manual} onChange={e=>updTr(i,"manual",e.target.value)}
                            placeholder="wpisz zł"
                            style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/>
                        </td>
                      )}
                      <td style={{padding:"3px 4px"}}><RO v={n>0?zł(Math.round(n*.08)):""} small/></td>
                      <td style={{padding:"3px 4px"}}><RO v={n>0?zł(Math.round(n*1.08)):""} small/></td>
                      <td style={{padding:"3px 4px"}}>
                        <select value={r.status} onChange={e=>updTr(i,"status",e.target.value)}
                          style={{width:"100%",padding:"3px 5px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,
                            background:s.bg||"white",color:s.color||C.textMain,fontWeight:s.bg?700:400}}>
                          {STATUS_TRANS_OPTIONS.map(o=><option key={o} value={o} style={{background:"white",color:C.textMain}}>{o||"–"}</option>)}
                        </select>
                      </td>
                      <td style={{padding:"3px 4px"}}>
                        <input value={r.kom} onChange={e=>updTr(i,"kom",e.target.value)}
                          style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11}}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <SumBar netto={trN}/>
        </Panel>

        {/* KOSZTY */}
        <Panel title="Koszty" icon="💼" color={C.green}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {/* Robocizna */}
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".4px",marginBottom:6}}>ROBOCIZNA – VAT 23%</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH c="KATEGORIA" style={{textAlign:"left"}}/><TH c="NETTO"/><TH c="VAT 23%"/><TH c="BRUTTO"/></tr></thead>
                <tbody>
                  {[["ARCHITEKT","architekt"],["ELEKTRYK","elektryk"],["SPAWACZ","spawacz"],["WYKONAWCY FUNDAMENTÓW","fund"]].map(([lbl,k])=>(
                    <tr key={k}>
                      <td style={{padding:"3px 5px",fontWeight:600,fontSize:11,color:C.textMuted,textTransform:"uppercase"}}>{lbl}</td>
                      <td style={{padding:"3px 4px"}}><input type="number" value={koszty[k]||""} onChange={e=>setK(k,e.target.value)} style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/></td>
                      <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(koszty[k]*.23))} small/></td>
                      <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(koszty[k]*1.23))} small/></td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{padding:"3px 5px",fontWeight:600,fontSize:11,color:C.textMuted,textTransform:"uppercase"}}>PRACOWNICY</td>
                    <td style={{padding:"3px 4px"}}><input type="number" value={koszty.pracownicy||""} onChange={e=>setK("pracownicy",e.target.value)} style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/></td>
                    <td style={{padding:"3px 4px",textAlign:"center",fontSize:11,color:C.textMuted}}>–</td>
                    <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(koszty.pracownicy))} small/></td>
                  </tr>
                </tbody>
              </table>
              <SumBar netto={rob}/>
            </div>
            {/* Materiały */}
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".4px",marginBottom:6}}>MATERIAŁY I INNE – VAT 23%</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH c="KATEGORIA" style={{textAlign:"left"}}/><TH c="NETTO"/><TH c="VAT 23%"/><TH c="BRUTTO"/></tr></thead>
                <tbody>
                  {[["MATERIAŁY","materialy",true],["DODATKOWE KOSZTY","dodatkowe",true],["PALIWO","paliwo",false]].map(([lbl,k,ext])=>(
                    <tr key={k}>
                      <td style={{padding:"3px 5px",fontWeight:600,fontSize:11,color:C.textMuted,textTransform:"uppercase"}}>{lbl}{ext&&<span style={{fontSize:9,color:C.textMuted,fontWeight:400}}> (Z INNEJ ZAKŁADKI)</span>}</td>
                      <td style={{padding:"3px 4px"}}><input type="number" value={koszty[k]||""} onChange={e=>setK(k,e.target.value)} style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,textAlign:"right"}}/></td>
                      <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(koszty[k]*.23))} small/></td>
                      <td style={{padding:"3px 4px"}}><RO v={zł(Math.round(koszty[k]*1.23))} small/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <SumBar netto={koszty.materialy+koszty.dodatkowe+koszty.paliwo}/>
            </div>
          </div>
        </Panel>

        {/* PŁATNOŚCI */}
        <Panel title="Płatności klienta" icon="💳" color={C.green}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
            {[
              {lbl:"ZAPŁACONO GOTÓWKĄ", v:zapl_G, ok:true},
              {lbl:"ZAPŁACONO PRZELEWEM",v:zapl_P,ok:true},
              {lbl:"DO ZAPŁATY NETTO",   v:doZapl,ok:false},
            ].map(({lbl,v,ok})=>(
              <div key={lbl} style={{background:ok?C.greenLighter:"#fff5f5",border:`1px solid ${ok?"#c8f041":"#fecaca"}`,borderRadius:6,padding:"9px 12px"}}>
                <div style={{fontSize:10,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:".4px",marginBottom:2}}>{lbl}</div>
                <div style={{fontSize:17,fontWeight:800,fontFamily:"'Barlow Condensed',sans-serif",color:ok?C.greenDark:"#dc2626"}}>{zł(v)}</div>
              </div>
            ))}
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>
                <TH c="LP." style={{width:30}}/><TH c="DATA" style={{minWidth:100}}/>
                <TH c="NR FAKTURY" style={{minWidth:90}}/><TH c="NETTO" style={{minWidth:90}}/>
                <TH c="VAT 8%" style={{minWidth:80}}/><TH c="BRUTTO" style={{minWidth:95}}/>
                <TH c="FORMA PŁATNOŚCI" style={{minWidth:110}}/><TH c="ZREALIZOWANO" style={{minWidth:75}}/>
              </tr></thead>
              <tbody>
                {plat.map((p,i)=>{
                  const has = p.netto>0;
                  const vat = has?p.netto*.08:0;
                  const brutto = has?p.netto*1.08:0;
                  const nrFakt = has&&p.data ? `${new Date(p.data).getMonth()+1}/FV/${new Date(p.data).getFullYear()}` : "";
                  const sf=SC[p.forma]||{};
                  const sz=SC[p.zreal]||{};
                  const rowBg = !has?"#f9fafb":p.forma==="OPÓŹNIENIE"&&p.zreal==="NIE"?"#fff5f5":p.forma==="ZAPLANOWANE"?"#f8fafc":"white";
                  return (
                    <tr key={i} style={{background:rowBg,opacity:has?1:.65}}>
                      <td style={{textAlign:"center",color:C.textMuted,fontSize:11,padding:"3px 5px"}}>{p.lp}</td>
                      <td style={{padding:"3px 4px"}}>
                        <input type="date" value={p.data||""} onChange={e=>updP(i,"data",e.target.value)}
                          style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,
                            background:p.data&&new Date(p.data).getFullYear()!==new Date().getFullYear()?"#fef9c3":"white"}}/>
                      </td>
                      <td style={{padding:"3px 4px"}}>
                        {has ? (
                          <input value={p.nrFaktury||""} onChange={e=>updP(i,"nrFaktury",e.target.value)}
                            placeholder="nr faktury"
                            style={{width:"100%",padding:"3px 6px",border:`1px solid ${C.border}`,
                              borderRadius:3,fontSize:11,fontFamily:"'Barlow Condensed',sans-serif",
                              outline:"none"}}/>
                        ) : <div style={{fontSize:11,color:"#9ca3af",textAlign:"center"}}>–</div>}
                      </td>
                      <td style={{padding:"3px 4px"}}>
                        <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:3,background:"white",overflow:"hidden"}}>
                          <input type="number" value={p.netto||""} onChange={e=>updP(i,"netto",e.target.value)}
                            placeholder="0" style={{flex:1,padding:"3px 6px",border:"none",outline:"none",fontSize:11,textAlign:"right",minWidth:0}}/>
                          <span style={{padding:"0 5px 0 2px",fontSize:10,color:"#9ca3af",fontFamily:"'Barlow Condensed',sans-serif",flexShrink:0}}>zł</span>
                        </div>
                      </td>
                      <td style={{padding:"3px 4px"}}><RO v={has?zł(Math.round(vat)):""} small/></td>
                      <td style={{padding:"3px 4px"}}><RO v={has?zł(Math.round(brutto)):""} small/></td>
                      <td style={{padding:"3px 4px"}}>
                        {has ? (
                          <select value={p.forma} onChange={e=>updP(i,"forma",e.target.value)}
                            style={{width:"100%",padding:"3px 5px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,
                              background:sf.bg||"white",color:sf.color||C.textMain,fontWeight:sf.bg?700:400}}>
                            {PLATNOSC_OPTIONS.map(o=><option key={o} value={o} style={{background:"white",color:C.textMain}}>{o}</option>)}
                          </select>
                        ) : <div style={{textAlign:"center",color:C.textMuted,fontSize:11}}>–</div>}
                      </td>
                      <td style={{padding:"3px 4px"}}>
                        {has ? (
                          <select value={p.zreal} onChange={e=>updP(i,"zreal",e.target.value)}
                            style={{width:"100%",padding:"3px 5px",border:`1px solid ${C.border}`,borderRadius:3,fontSize:11,
                              background:sz.bg||"white",color:sz.color||C.textMain,fontWeight:sz.bg?700:400}}>
                            {ZREAL_OPTIONS.map(o=><option key={o} value={o} style={{background:"white",color:C.textMain}}>{o}</option>)}
                          </select>
                        ) : <div style={{textAlign:"center",color:C.textMuted,fontSize:11}}>–</div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* ZMIANY */}
        <Panel title="Zmiany w zakresie prac" icon="🔧" color={C.green}>
          <WorkTable rows={zmiany} upd={updZm}/>
          <SumBar netto={zmN}/>
        </Panel>

        {/* DODATKOWE */}
        <Panel title="Dodatkowe zmiany" icon="➕" color={C.green}>
          <WorkTable rows={extra} upd={updEx}/>
          <SumBar netto={exN}/>
        </Panel>

        {/* DETALE */}
        <Panel title="Detale architektoniczne" icon="🏛️" color={C.green}>
          <WorkTable rows={detale} upd={updDet}/>
          <SumBar netto={detN}/>
        </Panel>

        <div style={{textAlign:"center",color:C.textMuted,fontSize:11,padding:"16px 0",
          fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px"}}>
          KAMP-BUD · SYSTEM PROJEKTOWY · ARKUSZ {fullKod} · {info.klient.toUpperCase()}
        </div>
      </div>

      {/* ── FLOATING SAVE BUTTON ── */}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:1000,display:"flex",alignItems:"center",gap:10}}>
        {saveStatus==="saved" && (
          <div style={{background:"#1a1a1a",color:"#b5e71d",padding:"7px 14px",borderRadius:6,
            fontSize:11,fontWeight:700,letterSpacing:"1px",
            fontFamily:"'Barlow Condensed',sans-serif",
            boxShadow:"0 2px 10px rgba(0,0,0,.25)"}}>
            ✓ ZAPISANO
          </div>
        )}
        <button onClick={handleSave} disabled={saveStatus==="saving"}
          style={{
            background: saveStatus==="saving" ? "#7aaa0a" : "#b5e71d",
            color:"#1a1a1a",border:"none",borderRadius:7,
            padding:"10px 20px",cursor:saveStatus==="saving"?"wait":"pointer",
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
            letterSpacing:"1px",textTransform:"uppercase",
            boxShadow:"0 3px 14px rgba(0,0,0,.22)",
            transition:"background .15s,transform .1s",
            transform:saveStatus==="saving"?"scale(0.97)":"scale(1)",
          }}
          onMouseOver={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#c8f041";}}
          onMouseOut={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#b5e71d";}}>
          {saveStatus==="saving" ? "ZAPISUJĘ..." : "💾 ZAPISZ"}
        </button>
      </div>
    </>
  );
}

// ─── PROJECTS LIST ────────────────────────────────────────────────────────────
const PROJECTS_LIST = ["A1","B2","C3","D4","E5","D6"];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="190" height="40" viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="40" height="40" rx="7" fill="#b5e71d"/>
    <path d="M20 9 L10 18 L12.5 18 L12.5 30 L17.5 30 L17.5 23.5 L22.5 23.5 L22.5 30 L27.5 30 L27.5 18 L30 18 Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
    <text x="49" y="26" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.3">
      <tspan fill="#ffffff">KAMP-</tspan><tspan fill="#b5e71d">BUD</tspan>
    </text>
    <text x="49" y="36" fontFamily="'Barlow Condensed',sans-serif" fontWeight="400" fontSize="9" letterSpacing="1.5" fill="rgba(255,255,255,0.55)">DOMY ENERGOOSZCZĘDNE</text>
  </svg>
);

// ─── DASHBOARD HELPERS ───────────────────────────────────────────────────────
const DC = {
  bg:"#f4f4f0", card:"#fff", border:"#e8e8e3", nav:"#1a1a1a",
  lime:"#9ec417", limeDark:"#4a7009", limePale:"#eef6d0",
  textMain:"#1a1a1a", textSub:"#6b7280", textMute:"#9ca3af",
};


async function loadSnapshot(id) {
  const key = `kamp-bud-project-${id}`;
  if (window.storage) {
    try {
      const res = await window.storage.get(key);
      if (res && res.value) {
        const parsed = JSON.parse(res.value);
        try{sessionStorage.setItem(key,res.value);}catch(e){}
        try{localStorage.setItem(key,res.value);}catch(e){}
        return { id, ...parsed };
      }
    } catch(e) {}
  }
  for (const store of [sessionStorage, localStorage]) {
    try { const raw = store.getItem(key); if (raw) return { id, ...JSON.parse(raw) }; } catch(e) {}
  }
  const def = PROJECT_DEFAULTS[id] || {};
  return { id, info:def, plat:[], koszty:{} };
}

const SectionHead = ({title,sub}) => (
  <div style={{marginBottom:14,paddingBottom:10,borderBottom:`2px solid ${DC.border}`}}>
    <div style={{fontSize:18,fontWeight:900,color:DC.textMain,letterSpacing:"-0.3px",fontFamily:ff}}>{title}</div>
    {sub && <div style={{fontSize:10,color:DC.textMute,letterSpacing:"1.5px",textTransform:"uppercase",marginTop:2,fontFamily:ff}}>{sub}</div>}
  </div>
);
const Card = ({children,style={}}) => (
  <div style={{background:DC.card,border:`1px solid ${DC.border}`,borderRadius:8,padding:"16px 18px",boxShadow:"0 1px 3px rgba(0,0,0,.05)",...style}}>{children}</div>
);
const CardHead = ({children}) => (
  <div style={{fontSize:9,fontWeight:700,color:DC.textMute,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:12,fontFamily:ff}}>{children}</div>
);

function PieChart({ snaps }) {
  const COLORS = ["#9ec417","#3b82f6","#f59e0b","#8b5cf6","#ef4444","#06b6d4"];

  // Per project: total netto (ALL payments) & paid netto (zreal=TAK only)
  const rows = snaps
    .filter(s => s.info?.etap !== "NIEAKTYWNY")
    .map((s,i) => {
      const all   = (s.plat||[]).filter(p => p.netto > 0);
      const total = all.reduce((a,p) => a + p.netto, 0);
      const paid  = all.filter(p => p.zreal === "TAK").reduce((a,p) => a + p.netto, 0);
      return { id: s.id, total, paid, color: COLORS[i % COLORS.length] };
    })
    .filter(r => r.total > 0);

  // Grand totals across ALL active projects
  const grandTotal = rows.reduce((s,r) => s + r.total, 0); // suma netto wszystkich umów
  const grandPaid  = rows.reduce((s,r) => s + r.paid,  0); // suma netto zrealizowanych
  const grandPct   = grandTotal > 0 ? Math.round(grandPaid / grandTotal * 100) : 0;
  const grandLeft  = grandTotal - grandPaid;

  if(!rows.length) return <div style={{textAlign:"center",padding:"40px 0",color:DC.textMute,fontSize:11,fontFamily:ff}}>BRAK DANYCH · ZAPISZ ARKUSZE</div>;

  const toRad=d=>d*Math.PI/180;
  const CX=110,CY=110,R=88,RI=56;
  const arcPath=(cx,cy,r,a1,a2)=>{
    const x1=cx+r*Math.cos(toRad(a1-90)),y1=cy+r*Math.sin(toRad(a1-90));
    const x2=cx+r*Math.cos(toRad(a2-90)),y2=cy+r*Math.sin(toRad(a2-90));
    return `M${x1} ${y1} A${r} ${r} 0 ${a2-a1>180?1:0} 1 ${x2} ${y2}`;
  };
  const paidDeg=grandTotal>0?(grandPaid/grandTotal)*360:0;
  const gap=1.5;
  const paidPath=paidDeg>gap*2?`${arcPath(CX,CY,R,gap,paidDeg-gap)} L${CX+RI*Math.cos(toRad(paidDeg-gap-90))} ${CY+RI*Math.sin(toRad(paidDeg-gap-90))} ${arcPath(CX,CY,RI,paidDeg-gap,gap)} Z`:null;
  const unpaidPath=paidDeg<360-gap*2?`${arcPath(CX,CY,R,paidDeg+gap,360-gap)} L${CX+RI*Math.cos(toRad(360-gap-90))} ${CY+RI*Math.sin(toRad(360-gap-90))} ${arcPath(CX,CY,RI,360-gap,paidDeg+gap)} Z`:null;

  return (
    <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{flexShrink:0}}>
        <svg width={220} height={220} viewBox="0 0 220 220">
          {unpaidPath&&<path d={unpaidPath} fill="#e8e8e3"/>}
          {paidPath&&<path d={paidPath} fill="#9ec417" opacity="0.85"/>}
          <circle cx={CX} cy={CY} r={RI-2} fill="white"/>
          <text x={CX} y={CY-12} textAnchor="middle" fontSize={34} fontWeight="900" fontFamily={ff} fill="#1a1a1a">{grandPct}%</text>
          <text x={CX} y={CY+8} textAnchor="middle" fontSize={9} fontFamily={ff} fill="#9ca3af" letterSpacing="1.5">OPŁACONO</text>
          <text x={CX} y={CY+22} textAnchor="middle" fontSize={8} fontFamily={ff} fill="#9ca3af">{Math.round(grandPaid/1000)}k / {Math.round(grandTotal/1000)}k zł</text>
        </svg>
      </div>
      <div style={{flex:1,minWidth:140,display:"flex",flexDirection:"column",gap:11}}>
        <div style={{padding:"8px 10px",background:DC.limePale,borderRadius:6,border:"1px solid #c8e87a",marginBottom:2}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
            <span style={{fontSize:10,fontWeight:700,fontFamily:ff,color:DC.limeDark}}>ZAPŁACONO (ZREAL. TAK)</span>
            <span style={{fontSize:11,fontWeight:800,fontFamily:ff,color:DC.limeDark}}>{zł(grandPaid)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:10,fontWeight:700,fontFamily:ff,color:DC.textMute}}>SUMA UMÓW (NETTO)</span>
            <span style={{fontSize:11,fontWeight:800,fontFamily:ff,color:DC.textMute}}>{zł(grandTotal)}</span>
          </div>
          <div style={{height:1,background:"#c8e87a",margin:"5px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:10,fontWeight:700,fontFamily:ff,color:"#9ca3af"}}>POZOSTAŁO DO ZAPŁATY</span>
            <span style={{fontSize:11,fontWeight:800,fontFamily:ff,color:"#9ca3af"}}>{zł(grandLeft)}</span>
          </div>
        </div>
        {rows.map(r=>{
          const pct=r.total>0?Math.round(r.paid/r.total*100):0;
          return (
            <div key={r.id}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:2,background:r.color,flexShrink:0}}/>
                  <span style={{fontWeight:800,fontSize:12,fontFamily:ff,color:DC.textMain}}>{r.id}</span>
                </div>
                <span style={{fontSize:10,fontFamily:ff,color:DC.textSub}}>{pct}% · {Math.round(r.paid/1000)}k / {Math.round(r.total/1000)}k zł</span>
              </div>
              <div style={{height:5,background:"#f0f0ec",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:r.color,borderRadius:3}}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CRM PANEL ────────────────────────────────────────────────────────────────
const CRM_STATUS_STYLES = {
  "Aktywny":              {bg:"#e6fbd0",color:"#3a7d1e",border:"#b2e890"},
  "W trakcie":            {bg:"#dbeeff",color:"#1a6abf",border:"#a8cff0"},
  "Oferta wysłana":       {bg:"#fdf6e3",color:"#92680a",border:"#f0d898"},
  "Pytania klienta":      {bg:"#f0eafb",color:"#6b3db0",border:"#d9c8f0"},
  "Rezygnacja z oferty":  {bg:"#fbe8e8",color:"#b91c1c",border:"#fca5a5"},
  "Do ponowienia":        {bg:"#f0f0ec",color:"#6b7280",border:"#d1d5db"},
};
const CRM_PRIO_STYLES = {
  "Wysoki": {bg:"#fbe8e8",color:"#b91c1c"},
  "Średni": {bg:"#fdf6e3",color:"#92680a"},
  "Niski":  {bg:"#f0f0ec",color:"#6b7280"},
};
const CRM_STATUS_OPTIONS = ["Aktywny","W trakcie","Oferta wysłana","Pytania klienta","Rezygnacja z oferty","Do ponowienia"];
const CRM_PRIO_OPTIONS   = ["Wysoki","Średni","Niski"];
const CRM_SOURCE_OPTIONS = ["Facebook","Instagram","Google","Polecenie","Strona WWW","Inne"];
const CRM_KEY = "kamp-bud-crm-leads";

const EMPTY_LEAD = () => ({
  id: Date.now(),
  imie:"", nazwisko:"", email:"", tel:"", zrodlo:"Facebook",
  model:"", dataKontaktu:"", ostatniaAkcja:"", dataAkcji:"",
  nastepneDzialanie:"", dataNastepnego:"",
  status:"Aktywny", priorytet:"Wysoki", notatki:"", odpowiedzialny:"",
  kontakty:0,
});

// Global CRM input components — defined OUTSIDE CRMPanel to prevent remount on render
const TI2 = ({v,set,ph,style={}}) => (
  <input value={v||""} onChange={e=>set(e.target.value)} placeholder={ph||""}
    style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
      fontSize:11,fontFamily:ff,outline:"none",boxSizing:"border-box",...style}}
    onFocus={e=>e.target.style.borderColor="#9ec417"}
    onBlur={e=>e.target.style.borderColor="#e8e8e3"}/>
);
const TS2 = ({v,set,opts,cm}) => {
  const sc=(cm||{})[v]||{};
  return (
    <select value={v||""} onChange={e=>set(e.target.value)}
      style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
        fontSize:11,fontFamily:ff,outline:"none",background:sc.bg||"white",
        color:sc.color||"#1a1a1a",fontWeight:sc.bg?700:400,cursor:"pointer"}}>
      {opts.map(o=><option key={o} value={o} style={{background:"white",color:"#1a1a1a",fontWeight:400}}>{o}</option>)}
    </select>
  );
};

// ── CRM action status options with colors ─────────────────────────────────
const CRM_ACTION_OPTIONS = [
  "Oferta przesłana","Ponowienie kontaktu","Klient zadał pytania",
  "Odpowiedź wysłana","Umówiono spotkanie","Po spotkaniu – czeka",
  "Rezygnacja z oferty","Brak odpowiedzi","Finalizacja","Zrealizowano",
];
const CRM_ACTION_STYLES = {
  "Oferta przesłana":      {bg:"#dbeeff",color:"#1a6abf",border:"#a8cff0"},
  "Ponowienie kontaktu":   {bg:"#fdf6e3",color:"#92680a",border:"#f0d898"},
  "Klient zadał pytania":  {bg:"#f0eafb",color:"#6b3db0",border:"#d9c8f0"},
  "Odpowiedź wysłana":     {bg:"#dbeeff",color:"#1a6abf",border:"#a8cff0"},
  "Umówiono spotkanie":    {bg:"#e6fbd0",color:"#3a7d1e",border:"#b2e890"},
  "Po spotkaniu – czeka":  {bg:"#eef6d0",color:"#4a7009",border:"#c8e87a"},
  "Rezygnacja z oferty":   {bg:"#fbe8e8",color:"#b91c1c",border:"#fca5a5"},
  "Brak odpowiedzi":       {bg:"#f0f0f0",color:"#6b7280",border:"#d1d5db"},
  "Finalizacja":           {bg:"#c8eac8",color:"#1a5c1a",border:"#7ec87e"},
  "Zrealizowano":          {bg:"#c8eac8",color:"#1a5c1a",border:"#7ec87e"},
};



// ─── ZAKUPY (MATERIAŁY) ───────────────────────────────────────────────────────
const ZAKUPY_KEY = "kamp-bud-zakupy";
const KATEGORIE_MAT = ["Konstrukcja Stalowa","Drewno Konstrukcyjne","Płyta OSB","Płyta GK","Wkręty Konstrukcyjne","Śruby","Instalacje Elektryczne","Wod-Kan","Wentylacja","Klimatyzacja","Komin","Ocieplenia","Blachodachówka","Inne"];
const PROJEKTY_IDS   = ["A1","B2","C3","D4","E5","D6","Ogólne"];
const JEDNOSTKI      = ["kg","mb","m²","szt.","litr","kpl.","inne"];
const DOSTAWCY_SEED  = ["Castorama","Leroy Merlin","Obi","elektroMax","elektrex","pan heniek","pan zbyszek","pani halina","pani elżbieta","Tartak u gienka","Tartak u mietka","Inny"];

const EMPTY_MAT = () => ({
  id:Date.now(), data:"", material:"", kategoria:"Konstrukcja Stalowa",
  dostawca:"Castorama", ilosc:"", jednostka:"szt.", cenajed:"", przeznaczenie:"A1", notatki:""
});
const EMPTY_KOST = () => ({
  id:Date.now(), data:"", opis:"", kwota:"", komentarz:"", przeznaczenie:"A1"
});

const ZI = ({v,set,ph,type="text",style={}}) => (
  <input type={type} value={v||""} onChange={e=>set(e.target.value)} placeholder={ph||""}
    style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
      fontSize:11,fontFamily:ff,outline:"none",boxSizing:"border-box",...style}}
    onFocus={e=>e.target.style.borderColor="#9ec417"}
    onBlur={e=>e.target.style.borderColor="#e8e8e3"}/>
);
const ZS = ({v,set,opts}) => (
  <select value={v||""} onChange={e=>set(e.target.value)}
    style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
      fontSize:11,fontFamily:ff,outline:"none",cursor:"pointer"}}>
    {opts.map(o=><option key={o} value={o}>{o}</option>)}
  </select>
);

function ZakupyPanel() {
  const BRANZE = ["Ogólnobudowlane","Elektryczna","Drewno","Metalowa","Instalacyjna","Hydrauliczna","Dachowa","Izolacyjna","Transport","Inne"];

  const loadData = () => {
    for (const s of [sessionStorage,localStorage]) {
      try { const r=s.getItem(ZAKUPY_KEY); if(r) return JSON.parse(r); } catch(e) {}
    }
    return {
      dostawcy: [
        {id:1,nazwa:"Castorama",     branza:"Ogólnobudowlane"},
        {id:2,nazwa:"Leroy Merlin",  branza:"Ogólnobudowlane"},
        {id:3,nazwa:"Obi",           branza:"Ogólnobudowlane"},
        {id:4,nazwa:"elektroMax",    branza:"Elektryczna"},
        {id:5,nazwa:"elektrex",      branza:"Elektryczna"},
        {id:6,nazwa:"pan heniek",    branza:"Metalowa"},
        {id:7,nazwa:"pan zbyszek",   branza:"Instalacyjna"},
        {id:8,nazwa:"pani halina",   branza:"Metalowa"},
        {id:9,nazwa:"pani elżbieta", branza:"Drewno"},
        {id:10,nazwa:"Tartak u gienka",branza:"Drewno"},
        {id:11,nazwa:"Tartak u mietka",branza:"Drewno"},
      ],
      materialy: [
        {id:1,data:"2026-02-25",material:"Dwuteownik 240",   kategoria:"Konstrukcja Stalowa",   dostawca:"Castorama",        ilosc:"1500",jednostka:"kg",  cenajed:"8",   przeznaczenie:"A1",notatki:""},
        {id:2,data:"2026-02-25",material:"Dwuteownik 80",    kategoria:"Konstrukcja Stalowa",   dostawca:"Castorama",        ilosc:"700", jednostka:"kg",  cenajed:"6",   przeznaczenie:"A1",notatki:""},
        {id:3,data:"2026-02-25",material:"Profil 40x40x3",   kategoria:"Konstrukcja Stalowa",   dostawca:"Castorama",        ilosc:"800", jednostka:"mb",  cenajed:"22",  przeznaczenie:"D4",notatki:""},
        {id:4,data:"2026-02-25",material:"Profil 40x20x3",   kategoria:"Konstrukcja Stalowa",   dostawca:"Obi",              ilosc:"100", jednostka:"mb",  cenajed:"14",  przeznaczenie:"D4",notatki:""},
        {id:5,data:"2026-02-25",material:"Deska 17x4,5x600", kategoria:"Drewno Konstrukcyjne",  dostawca:"Tartak u gienka",  ilosc:"100", jednostka:"szt.",cenajed:"140", przeznaczenie:"D4",notatki:""},
        {id:6,data:"2026-02-25",material:"Deska 17x4,5x510", kategoria:"Drewno Konstrukcyjne",  dostawca:"Tartak u gienka",  ilosc:"80",  jednostka:"szt.",cenajed:"125", przeznaczenie:"A1",notatki:""},
        {id:7,data:"2026-02-25",material:"Płyta OSB 10mm",   kategoria:"Płyta OSB",             dostawca:"Leroy Merlin",     ilosc:"80",  jednostka:"m²",  cenajed:"28",  przeznaczenie:"B2",notatki:""},
        {id:8,data:"2026-02-25",material:"Płyta GK Zwykła",  kategoria:"Płyta GK",              dostawca:"Leroy Merlin",     ilosc:"250", jednostka:"m²",  cenajed:"25",  przeznaczenie:"A1",notatki:""},
        {id:9,data:"2026-03-29",material:"Kabel 3x1,5",      kategoria:"Instalacje Elektryczne",dostawca:"elektroMax",       ilosc:"800", jednostka:"mb",  cenajed:"3",   przeznaczenie:"B2",notatki:""},
        {id:10,data:"2026-04-01",material:"Komin do Kominka", kategoria:"Komin",                 dostawca:"pan heniek",       ilosc:"1",   jednostka:"szt.",cenajed:"7000",przeznaczenie:"B2",notatki:""},
      ],
      inne: [
        {id:1,data:"2026-03-25",opis:"Porada dot. zgód",    kwota:"200", komentarz:"dot. zgód",           przeznaczenie:"A1"},
        {id:2,data:"2026-03-28",opis:"Zmiana w projekcie",  kwota:"3500",komentarz:"zmiana w projekcie",  przeznaczenie:"A1"},
      ]
    };
  };

  const [data,    setData]    = useState(loadData);
  const [tab,     setTab]     = useState("materialy");
  const [filterProj, setFilterProj] = useState("ALL");
  const [filterKat,  setFilterKat]  = useState("ALL");
  const [showAddMat,  setShowAddMat]  = useState(false);
  const [showAddInn,  setShowAddInn]  = useState(false);
  const [newMat,  setNewMat]  = useState(EMPTY_MAT);
  const [newInn,  setNewInn]  = useState(EMPTY_KOST);
  const [newSup,  setNewSup]  = useState({nazwa:"",branza:"Ogólnobudowlane"});

  const save = (d) => {
    const ser=JSON.stringify(d);
    try{sessionStorage.setItem(ZAKUPY_KEY,ser);}catch(e){}
    try{localStorage.setItem(ZAKUPY_KEY,ser);}catch(e){}
    if(window.storage) window.storage.set(ZAKUPY_KEY,ser).catch(()=>{});
  };

  const addMat = () => {
    const next={...data,materialy:[...data.materialy,{...newMat,id:Date.now()}]};
    setData(next);save(next);setNewMat(EMPTY_MAT());setShowAddMat(false);
  };
  const addInn = () => {
    const next={...data,inne:[...data.inne,{...newInn,id:Date.now()}]};
    setData(next);save(next);setNewInn(EMPTY_KOST());setShowAddInn(false);
  };
  const delMat = id => { const next={...data,materialy:data.materialy.filter(r=>r.id!==id)};setData(next);save(next); };
  const delInn = id => { const next={...data,inne:data.inne.filter(r=>r.id!==id)};setData(next);save(next); };
  const addSup = () => {
    if(!newSup.nazwa.trim()) return;
    const next={...data,dostawcy:[...data.dostawcy,{id:Date.now(),...newSup}]};
    setData(next);save(next);setNewSup({nazwa:"",branza:"Ogólnobudowlane"});
  };
  const delSup = id => { const next={...data,dostawcy:data.dostawcy.filter(d=>d.id!==id)};setData(next);save(next); };
  const updMat = (id,field,val) => {
    const next={...data,materialy:data.materialy.map(r=>r.id===id?{...r,[field]:val}:r)};
    setData(next);save(next);
  };
  const updInn = (id,field,val) => {
    const next={...data,inne:data.inne.map(r=>r.id===id?{...r,[field]:val}:r)};
    setData(next);save(next);
  };

  // Build project options from PROJECT_DEFAULTS — use fullKod style
  const projOptions = Object.entries(PROJECT_DEFAULTS).map(([id,def])=>{
    const suffix = (def.kod||id).startsWith(id)?(def.kod||id).slice(id.length).replace(/^\s*-\s*/,''):(def.kod||id);
    return { value:id, label:suffix.trim()?`${id} - ${suffix.trim().toUpperCase()}`:id };
  });

  const supNames = data.dostawcy.map(d=>d.nazwa);

  const filtMat  = data.materialy.filter(r=>(filterProj==="ALL"||r.przeznaczenie===filterProj)&&(filterKat==="ALL"||r.kategoria===filterKat));
  const filtInn  = data.inne.filter(r=>filterProj==="ALL"||r.przeznaczenie===filterProj);
  const sumaMat  = filtMat.reduce((s,r)=>s+(+r.ilosc||0)*(+r.cenajed||0),0);
  const sumaInn  = filtInn.reduce((s,r)=>s+(+r.kwota||0),0);

  const inp = (v,set,ph,type="text") => (
    <input type={type} value={v||""} onChange={e=>set(e.target.value)} placeholder={ph||""}
      style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
        fontSize:11,fontFamily:ff,outline:"none",boxSizing:"border-box"}}
      onFocus={e=>e.target.style.borderColor="#9ec417"}
      onBlur={e=>e.target.style.borderColor="#e8e8e3"}/>
  );
  const sel = (v,set,opts) => (
    <select value={v||""} onChange={e=>set(e.target.value)}
      style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
        fontSize:11,fontFamily:ff,outline:"none",cursor:"pointer",background:"white"}}>
      {opts.map(o=>typeof o==="string"
        ?<option key={o} value={o}>{o}</option>
        :<option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  const TH = ({c,style={}}) => (
    <th style={{background:"#1a1a1a",color:"rgba(255,255,255,.75)",padding:"6px 8px",
      fontSize:9,fontWeight:700,letterSpacing:"0.8px",textAlign:"left",
      fontFamily:ff,whiteSpace:"nowrap",...style}}>{c}</th>
  );

  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 220px",gap:16,alignItems:"start"}}>

      {/* ── LEFT: main tables ── */}
      <div>
        {/* Tab bar */}
        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          {[["materialy","MATERIAŁY",data.materialy.length],["inne","INNE",data.inne.length]].map(([k,lbl,cnt])=>(
            <button key={k} onClick={()=>setTab(k)}
              style={{padding:"4px 12px",borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:10,
                letterSpacing:".5px",cursor:"pointer",outline:"none",
                border:`1.5px solid ${tab===k?"#9ec417":"#e8e8e3"}`,
                background:tab===k?"#eef6d0":"#fff",color:tab===k?"#4a7009":"#6b7280"}}>
              {lbl}
              <span style={{background:tab===k?"#9ec417":"#f0f0ec",color:tab===k?"#1a1a1a":"#6b7280",
                borderRadius:3,padding:"0 5px",fontSize:10,fontWeight:900,marginLeft:4}}>{cnt}</span>
            </button>
          ))}
          <div style={{marginLeft:"auto",display:"flex",gap:6,flexWrap:"wrap"}}>
            <select value={filterProj} onChange={e=>setFilterProj(e.target.value)}
              style={{padding:"4px 8px",borderRadius:4,border:"1px solid #e8e8e3",fontSize:10,
                fontFamily:ff,fontWeight:700,cursor:"pointer",color:"#6b7280",outline:"none",background:"white"}}>
              <option value="ALL">WSZYSTKIE PROJEKTY</option>
              {projOptions.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            {tab==="materialy"&&(
              <select value={filterKat} onChange={e=>setFilterKat(e.target.value)}
                style={{padding:"4px 8px",borderRadius:4,border:"1px solid #e8e8e3",fontSize:10,
                  fontFamily:ff,fontWeight:700,cursor:"pointer",color:"#6b7280",outline:"none",background:"white"}}>
                <option value="ALL">WSZYSTKIE KATEGORIE</option>
                {KATEGORIE_MAT.map(k=><option key={k} value={k}>{k}</option>)}
              </select>
            )}
            <button onClick={()=>tab==="materialy"?setShowAddMat(s=>!s):setShowAddInn(s=>!s)}
              style={{padding:"4px 14px",borderRadius:5,background:"#1a1a1a",color:"#9ec417",
                border:"none",fontFamily:ff,fontWeight:700,fontSize:10,letterSpacing:"1px",
                cursor:"pointer",outline:"none"}}>
              + DODAJ
            </button>
          </div>
        </div>

        {/* Sum bar */}
        <div style={{background:"#eef6d0",border:"1px solid #c8e87a",borderRadius:6,
          padding:"6px 14px",marginBottom:10,display:"flex",gap:16,flexWrap:"wrap"}}>
          <span style={{fontSize:10,fontFamily:ff,color:"#4a7009",fontWeight:700}}>
            {tab==="materialy"?`SUMA MATERIAŁÓW: ${Math.round(sumaMat).toLocaleString("pl-PL")} zł`:`SUMA INNE: ${Math.round(sumaInn).toLocaleString("pl-PL")} zł`}
          </span>
          <span style={{fontSize:10,fontFamily:ff,color:"#6b7280"}}>
            {tab==="materialy"?filtMat.length:filtInn.length} pozycji
          </span>
        </div>

        {/* Add form — materiały */}
        {tab==="materialy"&&showAddMat&&(
          <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,padding:14,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10,fontFamily:ff}}>NOWY MATERIAŁ</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:7}}>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>DATA</div>{inp(newMat.data,v=>setNewMat(p=>({...p,data:v})),"",     "date")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>MATERIAŁ</div>{inp(newMat.material,v=>setNewMat(p=>({...p,material:v})),"nazwa")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>KATEGORIA</div>{sel(newMat.kategoria,v=>setNewMat(p=>({...p,kategoria:v})),KATEGORIE_MAT)}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>DOSTAWCA</div>{sel(newMat.dostawca,v=>setNewMat(p=>({...p,dostawca:v})),supNames)}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:10}}>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>ILOŚĆ</div>{inp(newMat.ilosc,v=>setNewMat(p=>({...p,ilosc:v})),"","number")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>JEDNOSTKA</div>{sel(newMat.jednostka,v=>setNewMat(p=>({...p,jednostka:v})),JEDNOSTKI)}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>CENA JED.</div>{inp(newMat.cenajed,v=>setNewMat(p=>({...p,cenajed:v})),"","number")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>PRZEZNACZENIE</div>{sel(newMat.przeznaczenie,v=>setNewMat(p=>({...p,przeznaczenie:v})),projOptions)}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>NOTATKI</div>{inp(newMat.notatki,v=>setNewMat(p=>({...p,notatki:v})))}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button onClick={addMat} style={{padding:"6px 18px",background:"#9ec417",color:"#1a1a1a",border:"none",borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ZAPISZ</button>
              <button onClick={()=>setShowAddMat(false)} style={{padding:"6px 14px",background:"white",color:"#6b7280",border:"1px solid #e8e8e3",borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ANULUJ</button>
              <span style={{fontSize:10,color:"#6b7280",fontFamily:ff}}>Razem: {((+newMat.ilosc||0)*(+newMat.cenajed||0)).toLocaleString("pl-PL")} zł</span>
            </div>
          </div>
        )}

        {/* Add form — inne */}
        {tab==="inne"&&showAddInn&&(
          <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,padding:14,marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10,fontFamily:ff}}>NOWA POZYCJA</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:10}}>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>DATA</div>{inp(newInn.data,v=>setNewInn(p=>({...p,data:v})),"","date")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>OPIS</div>{inp(newInn.opis,v=>setNewInn(p=>({...p,opis:v})),"opis")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>KWOTA (zł)</div>{inp(newInn.kwota,v=>setNewInn(p=>({...p,kwota:v})),"","number")}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>PRZEZNACZENIE</div>{sel(newInn.przeznaczenie,v=>setNewInn(p=>({...p,przeznaczenie:v})),projOptions)}</div>
              <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>KOMENTARZ</div>{inp(newInn.komentarz,v=>setNewInn(p=>({...p,komentarz:v})))}</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addInn} style={{padding:"6px 18px",background:"#9ec417",color:"#1a1a1a",border:"none",borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ZAPISZ</button>
              <button onClick={()=>setShowAddInn(false)} style={{padding:"6px 14px",background:"white",color:"#6b7280",border:"1px solid #e8e8e3",borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ANULUJ</button>
            </div>
          </div>
        )}

        {/* Table — materiały */}
        {tab==="materialy"&&(
          <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr>
                    <TH c="LP." style={{width:28,textAlign:"center"}}/>
                    <TH c="DATA" style={{minWidth:80}}/>
                    <TH c="MATERIAŁ" style={{minWidth:140}}/>
                    <TH c="KATEGORIA" style={{minWidth:120}}/>
                    <TH c="DOSTAWCA" style={{minWidth:110}}/>
                    <TH c="ILOŚĆ" style={{minWidth:55,textAlign:"right"}}/>
                    <TH c="JM" style={{minWidth:45}}/>
                    <TH c="CENA JED." style={{minWidth:75,textAlign:"right"}}/>
                    <TH c="WARTOŚĆ" style={{minWidth:85,textAlign:"right"}}/>
                    <TH c="PRZEZNACZENIE" style={{minWidth:110}}/>
                    <TH c="" style={{width:24}}/>
                  </tr>
                </thead>
                <tbody>
                  {filtMat.length===0&&(
                    <tr><td colSpan={11} style={{padding:"20px",textAlign:"center",color:"#9ca3af",fontFamily:ff,fontSize:11}}>BRAK POZYCJI</td></tr>
                  )}
                  {filtMat.map((r,i)=>{
                    const cena=(+r.ilosc||0)*(+r.cenajed||0);
                    const projLabel = projOptions.find(p=>p.value===r.przeznaczenie)?.label || r.przeznaczenie;
                    return (
                      <tr key={r.id} style={{background:i%2===0?"white":"#fafafa",borderBottom:"1px solid #f3f4f6"}}>
                        <td style={{textAlign:"center",color:"#9ca3af",fontSize:10,padding:"5px 6px",fontFamily:ff}}>{i+1}</td>
                        <td style={{padding:"5px 8px",fontSize:10,color:"#6b7280",fontFamily:ff,whiteSpace:"nowrap"}}>{r.data||"—"}</td>
                        <td style={{padding:"5px 8px",fontWeight:600,color:"#1a1a1a",fontFamily:ff}}>{r.material}</td>
                        <td style={{padding:"5px 8px",fontSize:10,color:"#6b7280",fontFamily:ff}}>{r.kategoria}</td>
                        <td style={{padding:"3px 5px"}}>
                          <select value={r.dostawca||""} onChange={e=>updMat(r.id,"dostawca",e.target.value)}
                            style={{width:"100%",padding:"3px 5px",border:"1px solid #e8e8e3",borderRadius:3,
                              fontSize:10,fontFamily:ff,outline:"none",cursor:"pointer",background:"white"}}>
                            {supNames.map(n=><option key={n} value={n}>{n}</option>)}
                          </select>
                        </td>
                        <td style={{padding:"5px 8px",textAlign:"right",fontFamily:ff}}>{r.ilosc}</td>
                        <td style={{padding:"5px 8px",fontSize:10,color:"#9ca3af",fontFamily:ff}}>{r.jednostka}</td>
                        <td style={{padding:"5px 8px",textAlign:"right",fontFamily:ff}}>{r.cenajed} zł</td>
                        <td style={{padding:"5px 8px",textAlign:"right",fontWeight:700,color:"#4a7009",fontFamily:ff,whiteSpace:"nowrap"}}>{Math.round(cena).toLocaleString("pl-PL")} zł</td>
                        <td style={{padding:"3px 5px"}}>
                          <select value={r.przeznaczenie||""} onChange={e=>updMat(r.id,"przeznaczenie",e.target.value)}
                            style={{width:"100%",padding:"3px 5px",border:"1px solid #e8e8e3",borderRadius:3,
                              fontSize:10,fontFamily:ff,outline:"none",cursor:"pointer",background:"white"}}>
                            {projOptions.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
                          </select>
                        </td>
                        <td style={{padding:"3px 6px",textAlign:"center"}}>
                          <button onClick={()=>delMat(r.id)} style={{background:"none",border:"none",color:"#9ca3af",fontSize:13,cursor:"pointer",lineHeight:1,padding:2}}>×</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{background:"#eef6d0",borderTop:"2px solid #c8e87a",padding:"7px 14px",
              display:"flex",justifyContent:"flex-end",fontSize:11,fontWeight:700,color:"#4a7009",fontFamily:ff}}>
              SUMA: {Math.round(sumaMat).toLocaleString("pl-PL")} zł
            </div>
          </div>
        )}

        {/* Table — inne */}
        {tab==="inne"&&(
          <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr>
                    <TH c="LP." style={{width:28,textAlign:"center"}}/>
                    <TH c="DATA" style={{minWidth:80}}/>
                    <TH c="OPIS" style={{minWidth:180}}/>
                    <TH c="KWOTA" style={{minWidth:90,textAlign:"right"}}/>
                    <TH c="KOMENTARZ" style={{minWidth:140}}/>
                    <TH c="PRZEZNACZENIE" style={{minWidth:110}}/>
                    <TH c="" style={{width:24}}/>
                  </tr>
                </thead>
                <tbody>
                  {filtInn.length===0&&(
                    <tr><td colSpan={7} style={{padding:"20px",textAlign:"center",color:"#9ca3af",fontFamily:ff,fontSize:11}}>BRAK POZYCJI</td></tr>
                  )}
                  {filtInn.map((r,i)=>(
                    <tr key={r.id} style={{background:i%2===0?"white":"#fafafa",borderBottom:"1px solid #f3f4f6"}}>
                      <td style={{textAlign:"center",color:"#9ca3af",fontSize:10,padding:"5px 6px",fontFamily:ff}}>{i+1}</td>
                      <td style={{padding:"5px 8px",fontSize:10,color:"#6b7280",fontFamily:ff,whiteSpace:"nowrap"}}>{r.data||"—"}</td>
                      <td style={{padding:"5px 8px",fontWeight:600,color:"#1a1a1a",fontFamily:ff}}>{r.opis}</td>
                      <td style={{padding:"5px 8px",textAlign:"right",fontWeight:700,color:"#4a7009",fontFamily:ff,whiteSpace:"nowrap"}}>{(+r.kwota||0).toLocaleString("pl-PL")} zł</td>
                      <td style={{padding:"5px 8px",fontSize:10,color:"#6b7280",fontFamily:ff}}>{r.komentarz}</td>
                      <td style={{padding:"3px 5px"}}>
                        <select value={r.przeznaczenie||""} onChange={e=>updInn(r.id,"przeznaczenie",e.target.value)}
                          style={{width:"100%",padding:"3px 5px",border:"1px solid #e8e8e3",borderRadius:3,
                            fontSize:10,fontFamily:ff,outline:"none",cursor:"pointer",background:"white"}}>
                          {projOptions.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                      </td>
                      <td style={{padding:"3px 6px",textAlign:"center"}}>
                        <button onClick={()=>delInn(r.id)} style={{background:"none",border:"none",color:"#9ca3af",fontSize:13,cursor:"pointer",lineHeight:1,padding:2}}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{background:"#eef6d0",borderTop:"2px solid #c8e87a",padding:"7px 14px",
              display:"flex",justifyContent:"flex-end",fontSize:11,fontWeight:700,color:"#4a7009",fontFamily:ff}}>
              SUMA: {Math.round(sumaInn).toLocaleString("pl-PL")} zł
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: suppliers panel ── */}
      <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,overflow:"hidden",
        boxShadow:"0 1px 3px rgba(0,0,0,.05)",position:"sticky",top:16}}>
        <div style={{background:"#1a1a1a",padding:"9px 12px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:"rgba(255,255,255,.7)",fontSize:9,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",fontFamily:ff}}>DOSTAWCY</span>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead>
            <tr style={{borderBottom:"1px solid #f3f4f6"}}>
              <th style={{padding:"5px 10px",fontSize:8,fontWeight:700,color:"#9ca3af",letterSpacing:".5px",textTransform:"uppercase",textAlign:"left",fontFamily:ff}}>NAZWA</th>
              <th style={{padding:"5px 10px",fontSize:8,fontWeight:700,color:"#9ca3af",letterSpacing:".5px",textTransform:"uppercase",textAlign:"left",fontFamily:ff}}>BRANŻA</th>
              <th style={{width:24}}></th>
            </tr>
          </thead>
          <tbody>
            {data.dostawcy.map((d,i)=>(
              <tr key={d.id} style={{borderBottom:"1px solid #f3f4f6",background:i%2===0?"white":"#fafafa"}}>
                <td style={{padding:"5px 10px",fontSize:10,fontWeight:600,color:"#1a1a1a",fontFamily:ff}}>{d.nazwa}</td>
                <td style={{padding:"5px 10px",fontSize:9,color:"#9ca3af",fontFamily:ff}}>{d.branza}</td>
                <td style={{padding:"3px 6px",textAlign:"center"}}>
                  <button onClick={()=>delSup(d.id)} style={{background:"none",border:"none",color:"#9ca3af",fontSize:12,cursor:"pointer",lineHeight:1}}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add new supplier */}
        <div style={{padding:"8px 10px",borderTop:"1px solid #e8e8e3",display:"flex",flexDirection:"column",gap:5}}>
          <input value={newSup.nazwa} onChange={e=>setNewSup(p=>({...p,nazwa:e.target.value}))}
            placeholder="nazwa dostawcy"
            style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,
              fontSize:10,fontFamily:ff,outline:"none"}}
            onFocus={e=>e.target.style.borderColor="#9ec417"}
            onBlur={e=>e.target.style.borderColor="#e8e8e3"}/>
          <div style={{display:"flex",gap:5}}>
            <select value={newSup.branza} onChange={e=>setNewSup(p=>({...p,branza:e.target.value}))}
              style={{flex:1,padding:"4px 6px",border:"1px solid #e8e8e3",borderRadius:4,
                fontSize:10,fontFamily:ff,outline:"none",cursor:"pointer",background:"white"}}>
              {BRANZE.map(b=><option key={b} value={b}>{b}</option>)}
            </select>
            <button onClick={addSup}
              style={{padding:"4px 10px",background:"#9ec417",color:"#1a1a1a",border:"none",
                borderRadius:4,fontFamily:ff,fontWeight:700,fontSize:10,cursor:"pointer"}}>
              +
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function ZakupyScreen({ onBack }) {
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = () => {
    setSaveStatus('saving');
    for (const store of [sessionStorage, localStorage]) {
      try {
        const raw = store.getItem(ZAKUPY_KEY);
        if (raw) { if(window.storage) window.storage.set(ZAKUPY_KEY, raw).catch(()=>{}); break; }
      } catch(e) {}
    }
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f4f4f0;font-family:'Barlow Condensed',sans-serif;}
        input,select{font-family:'Barlow Condensed',sans-serif;}
        input:focus,select:focus{outline:none;border-color:#9ec417!important;}
      `}</style>
      <nav style={{background:"#1a1a1a",padding:"0 24px",display:"flex",alignItems:"center",
        height:54,boxShadow:"0 2px 6px rgba(0,0,0,.25)"}}>
        <Logo/>
        <div style={{color:"rgba(255,255,255,.18)",fontSize:20,margin:"0 16px"}}>|</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,letterSpacing:"2px",
          textTransform:"uppercase",fontFamily:ff}}>System Projektowy</div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
          <div style={{color:"rgba(255,255,255,.28)",fontSize:11,letterSpacing:"1px",fontFamily:ff}}>ZAKUPY</div>
          {onBack && (
            <button onClick={onBack} style={{
              background:"transparent",border:"1px solid rgba(255,255,255,.3)",
              color:"rgba(255,255,255,.7)",padding:"5px 14px",borderRadius:4,cursor:"pointer",
              fontFamily:ff,fontWeight:700,fontSize:12,letterSpacing:"1px",textTransform:"uppercase",outline:"none",
            }}
            onMouseOver={e=>{e.target.style.background="rgba(255,255,255,.1)";e.target.style.color="white";}}
            onMouseOut={e=>{e.target.style.background="transparent";e.target.style.color="rgba(255,255,255,.7)";}}>
              ← WSZYSTKIE PROJEKTY
            </button>
          )}
        </div>
      </nav>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"24px 28px 80px"}}>
        <div style={{marginBottom:20,paddingBottom:10,borderBottom:"2px solid #e8e8e3"}}>
          <div style={{fontSize:18,fontWeight:900,color:"#1a1a1a",letterSpacing:"-0.3px",fontFamily:ff}}>ZAKUPY</div>
          <div style={{fontSize:10,color:"#9ca3af",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:2,fontFamily:ff}}>MATERIAŁY I DODATKOWE KOSZTY</div>
        </div>
        <ZakupyPanel/>
      </div>
      {/* Floating save */}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:1000,display:"flex",alignItems:"center",gap:10}}>
        {saveStatus==="saved" && (
          <div style={{background:"#1a1a1a",color:"#b5e71d",padding:"7px 14px",borderRadius:6,
            fontSize:11,fontWeight:700,letterSpacing:"1px",fontFamily:"'Barlow Condensed',sans-serif",
            boxShadow:"0 2px 10px rgba(0,0,0,.25)"}}>✓ ZAPISANO</div>
        )}
        <button onClick={handleSave} disabled={saveStatus==="saving"}
          style={{background:saveStatus==="saving"?"#7aaa0a":"#b5e71d",color:"#1a1a1a",border:"none",
            borderRadius:7,padding:"10px 20px",cursor:saveStatus==="saving"?"wait":"pointer",
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
            letterSpacing:"1px",textTransform:"uppercase",boxShadow:"0 3px 14px rgba(0,0,0,.22)"}}
          onMouseOver={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#c8f041";}}
          onMouseOut={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#b5e71d";}}>
          {saveStatus==="saving"?"ZAPISUJĘ...":"💾 ZAPISZ"}
        </button>
      </div>
    </>
  );
}

function CRMScreen({ onBack }) {
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSaveCRM = () => {
    setSaveStatus('saving');
    for (const store of [sessionStorage, localStorage]) {
      try {
        const raw = store.getItem(CRM_KEY);
        if (raw) {
          if(window.storage) window.storage.set(CRM_KEY, raw).catch(()=>{});
          break;
        }
      } catch(e) {}
    }
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f4f4f0;font-family:'Barlow Condensed',sans-serif;}
        input,select{font-family:'Barlow Condensed',sans-serif;}
        input:focus,select:focus{outline:none;border-color:#9ec417!important;}
      `}</style>
      <nav style={{background:"#1a1a1a",padding:"0 24px",display:"flex",alignItems:"center",
        height:54,boxShadow:"0 2px 6px rgba(0,0,0,.25)"}}>
        <Logo/>
        <div style={{color:"rgba(255,255,255,.18)",fontSize:20,margin:"0 16px"}}>|</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,letterSpacing:"2px",
          textTransform:"uppercase",fontFamily:ff}}>System Projektowy</div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
          <div style={{color:"rgba(255,255,255,.28)",fontSize:11,letterSpacing:"1px",fontFamily:ff}}>
            BAZA NOWYCH KLIENTÓW
          </div>
          {onBack && (
            <button onClick={onBack} style={{
              background:"transparent",border:"1px solid rgba(255,255,255,.3)",
              color:"rgba(255,255,255,.7)",padding:"5px 14px",borderRadius:4,
              cursor:"pointer",fontFamily:ff,fontWeight:700,fontSize:12,
              letterSpacing:"1px",textTransform:"uppercase",
            }}
            onMouseOver={e=>{e.target.style.background="rgba(255,255,255,.1)";e.target.style.color="white";}}
            onMouseOut={e=>{e.target.style.background="transparent";e.target.style.color="rgba(255,255,255,.7)";}}>
              ← WSZYSTKIE PROJEKTY
            </button>
          )}
        </div>
      </nav>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"24px 28px 56px"}}>
        <CRMPanel onDataChange={data=>{
          const ser=JSON.stringify(data);
          try{sessionStorage.setItem(CRM_KEY,ser);}catch(e){}
          try{localStorage.setItem(CRM_KEY,ser);}catch(e){}
          if(window.storage) window.storage.set(CRM_KEY,ser).catch(()=>{});
        }}/>
      </div>

      {/* ── FLOATING SAVE BUTTON ── */}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:1000,display:"flex",alignItems:"center",gap:10}}>
        {saveStatus==="saved" && (
          <div style={{background:"#1a1a1a",color:"#b5e71d",padding:"7px 14px",borderRadius:6,
            fontSize:11,fontWeight:700,letterSpacing:"1px",
            fontFamily:"'Barlow Condensed',sans-serif",
            boxShadow:"0 2px 10px rgba(0,0,0,.25)"}}>
            ✓ ZAPISANO
          </div>
        )}
        <button onClick={handleSaveCRM} disabled={saveStatus==="saving"}
          style={{
            background:saveStatus==="saving"?"#7aaa0a":"#b5e71d",
            color:"#1a1a1a",border:"none",borderRadius:7,
            padding:"10px 20px",cursor:saveStatus==="saving"?"wait":"pointer",
            fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:13,
            letterSpacing:"1px",textTransform:"uppercase",
            boxShadow:"0 3px 14px rgba(0,0,0,.22)",
            transition:"background .15s,transform .1s",
            transform:saveStatus==="saving"?"scale(0.97)":"scale(1)",
          }}
          onMouseOver={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#c8f041";}}
          onMouseOut={e=>{if(saveStatus!=="saving")e.currentTarget.style.background="#b5e71d";}}>
          {saveStatus==="saving"?"ZAPISUJĘ...":"💾 ZAPISZ"}
        </button>
      </div>
    </>
  );
}

function CRMPanel({ onDataChange }) {
  const CRM_STATUS_COLORS = {
    "Aktywny":4, "Oferta wysłana":2, "Pytania klienta":1, "Rezygnacja z oferty":1, "Do ponowienia":1, "W trakcie":0,
  };

  const [leads, setLeads] = useState(() => {
    for (const s of [sessionStorage,localStorage]) {
      try { const r=s.getItem(CRM_KEY); if(r) return JSON.parse(r); } catch(e){}
    }
    // seed with Excel data
    return [
      {id:1,imie:"Adam",nazwisko:"Adamski",email:"Biuro@cyberopieka.org",tel:"691450300",zrodlo:"Facebook",model:"106 m²",dataKontaktu:"2026-04-22",ostatniaAkcja:"Oferta przesłana",dataAkcji:"2026-04-27",nastepneDzialanie:"Ponowienie kontaktu",dataNastepnego:"2026-04-24",status:"Aktywny",priorytet:"Wysoki",notatki:"Zainteresowany modelem 106, pyta o garaż",odpowiedzialny:"Mikołaj",kontakty:2},
      {id:2,imie:"Sebastian",nazwisko:"Subocz",email:"suboczsebastian@gmail.com",tel:"666555145",zrodlo:"Facebook",model:"106 m²",dataKontaktu:"2026-04-08",ostatniaAkcja:"Klient zadał pytania",dataAkcji:"2026-04-09",nastepneDzialanie:"Odpowiedź na pytania",dataNastepnego:"2026-04-15",status:"W trakcie",priorytet:"Wysoki",notatki:"Pytania o finansowanie i czas realizacji",odpowiedzialny:"Mikołaj",kontakty:3},
      {id:3,imie:"Piotr",nazwisko:"Zając",email:"p.zajac@onet.pl",tel:"505058371",zrodlo:"Facebook",model:"106 m²",dataKontaktu:"2026-03-25",ostatniaAkcja:"Ponowienie kontaktu",dataAkcji:"2026-04-01",nastepneDzialanie:"Telefoniczny follow-up",dataNastepnego:"2026-04-20",status:"W trakcie",priorytet:"Średni",notatki:"Odwiedził dom pokazowy, rozważa mniejszy model",odpowiedzialny:"Mikołaj",kontakty:4},
      {id:4,imie:"Maria",nazwisko:"Wiśniewska",email:"m.wisniewska@gmail.com",tel:"886518533",zrodlo:"Facebook",model:"106 m²",dataKontaktu:"2026-04-15",ostatniaAkcja:"Oferta przesłana",dataAkcji:"2026-04-15",nastepneDzialanie:"Czeka na decyzję",dataNastepnego:"2026-04-30",status:"Aktywny",priorytet:"Wysoki",notatki:"Polecona przez klienta Robaka, decyzja do końca miesiąca",odpowiedzialny:"Mikołaj",kontakty:1},
      {id:5,imie:"Tomasz",nazwisko:"Dąbrowski",email:"t.dabrowski@interia.pl",tel:"696022450",zrodlo:"Facebook",model:"106 m²",dataKontaktu:"2026-02-10",ostatniaAkcja:"Rezygnacja z oferty",dataAkcji:"2026-03-01",nastepneDzialanie:"Brak",dataNastepnego:"2026-04-23",status:"Rezygnacja z oferty",priorytet:"Niski",notatki:"Wybrał inną firmę – cena",odpowiedzialny:"Mikołaj",kontakty:5},
    ];
  });

  const [editId, setEditId]       = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [newLead, setNewLead]     = useState(EMPTY_LEAD);
  const [filterSt, setFilterSt]  = useState("ALL");
  const [expandId, setExpandId]  = useState(null);
  const csvInputRef = useRef(null);

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split('\n').filter(l => l.trim());
      const imported = lines.map((line, i) => {
        const cols = line.split(/[,;]/).map(c => c.trim().replace(/^"|"$/g, ''));
        return {
          ...EMPTY_LEAD(),
          id: Date.now() + i,
          imie:     cols[0] || "",
          nazwisko: cols[1] || "",
          tel:      cols[2] || "",
          email:    cols[3] || "",
          zrodlo:   cols[4] || "Inne",
          model:    cols[5] || "",
        };
      }).filter(l => l.imie || l.nazwisko || l.tel || l.email);
      if (imported.length > 0) {
        const next = [...leads, ...imported];
        setLeads(next); saveCRM(next);
      }
      e.target.value = "";
    };
    reader.readAsText(file, 'UTF-8');
  };

  const saveCRM = (data) => {
    try{sessionStorage.setItem(CRM_KEY,JSON.stringify(data));}catch(e){}
    try{localStorage.setItem(CRM_KEY,JSON.stringify(data));}catch(e){}
    if(window.storage) window.storage.set(CRM_KEY,JSON.stringify(data)).catch(()=>{});
    if(onDataChange) onDataChange(data);
  };

  const addLead = () => {
    const next = [...leads, {...newLead, id:Date.now()}];
    setLeads(next); saveCRM(next);
    setNewLead(EMPTY_LEAD()); setShowForm(false);
  };

  const updateLead = (id, field, val) => {
    const next = leads.map(l=>l.id===id?{...l,[field]:val}:l);
    setLeads(next); saveCRM(next);
  };

  const deleteLead = (id) => {
    const next = leads.filter(l=>l.id!==id);
    setLeads(next); saveCRM(next);
  };

  const today = new Date(); today.setHours(0,0,0,0);
  const filtered = filterSt==="ALL" ? leads : leads.filter(l=>l.status===filterSt);

  // Status summary counts
  const counts = CRM_STATUS_OPTIONS.reduce((o,s)=>({...o,[s]:leads.filter(l=>l.status===s).length}),{});


  return (
    <div>
      <SectionHead title="BAZA NOWYCH KLIENTÓW" sub="CRM – zarządzanie leadami"/>

      {/* Status counters */}
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {[["WSZYSTKIE",leads.length,"ALL"],
          ["AKTYWNI",counts["Aktywny"]||0,"Aktywny"],
          ["OFERTY",counts["Oferta wysłana"]||0,"Oferta wysłana"],
          ["PYTANIA",counts["Pytania klienta"]||0,"Pytania klienta"],
          ["REZYGNACJE",counts["Rezygnacja z oferty"]||0,"Rezygnacja z oferty"],
          ["DO PONOWIENIA",counts["Do ponowienia"]||0,"Do ponowienia"],
        ].map(([label,cnt,key])=>{
          const active=filterSt===key;
          return (
            <button key={key} onClick={()=>setFilterSt(key)}
              style={{padding:"4px 10px",borderRadius:5,border:`1.5px solid ${active?"#9ec417":"#e8e8e3"}`,
                background:active?"#eef6d0":"#fff",color:active?"#4a7009":"#6b7280",
                fontFamily:ff,fontWeight:700,fontSize:10,letterSpacing:".5px",cursor:"pointer",
                display:"flex",alignItems:"center",gap:5,outline:"none"}}>
              {label}
              <span style={{background:active?"#9ec417":"#f0f0ec",color:active?"#1a1a1a":"#6b7280",
                borderRadius:3,padding:"0px 5px",fontWeight:900,fontSize:10}}>{cnt}</span>
            </button>
          );
        })}
        <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",gap:5,alignItems:"stretch"}}>
          <button onClick={()=>{setShowForm(s=>!s);setNewLead(EMPTY_LEAD());}}
            style={{padding:"4px 14px",borderRadius:5,background:"#1a1a1a",
              color:"#9ec417",border:"none",fontFamily:ff,fontWeight:700,fontSize:10,
              letterSpacing:"1px",cursor:"pointer",outline:"none"}}>
            + DODAJ KLIENTA
          </button>
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            style={{display:"none"}}
            onChange={handleCSVImport}
          />
          <button onClick={()=>csvInputRef.current?.click()}
            style={{padding:"4px 14px",borderRadius:5,background:"white",
              color:"#6b7280",border:"1px solid #e8e8e3",fontFamily:ff,fontWeight:700,fontSize:10,
              letterSpacing:"1px",cursor:"pointer",outline:"none",textAlign:"center"}}
            title="Importuj z CSV (kolumny: imię, nazwisko, telefon, e-mail, źródło, model)">
            ↑ IMPORT CSV
          </button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,
          padding:"14px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:"1px",
            textTransform:"uppercase",marginBottom:10,fontFamily:ff}}>NOWY KLIENT</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7,marginBottom:7}}>
            <TI2 v={newLead.imie}     set={v=>setNewLead(p=>({...p,imie:v}))}     ph="Imię"/>
            <TI2 v={newLead.nazwisko} set={v=>setNewLead(p=>({...p,nazwisko:v}))} ph="Nazwisko"/>
            <TI2 v={newLead.tel}      set={v=>setNewLead(p=>({...p,tel:v}))}      ph="Telefon"/>
            <TI2 v={newLead.email}    set={v=>setNewLead(p=>({...p,email:v}))}    ph="E-mail"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:7,marginBottom:7}}>
            <TS2 v={newLead.zrodlo}       set={v=>setNewLead(p=>({...p,zrodlo:v}))}       opts={CRM_SOURCE_OPTIONS}/>
            <TI2 v={newLead.model}        set={v=>setNewLead(p=>({...p,model:v}))}        ph="Typ domu"/>
            <TS2 v={newLead.status}       set={v=>setNewLead(p=>({...p,status:v}))}       opts={CRM_STATUS_OPTIONS} cm={CRM_STATUS_STYLES}/>
            <TS2 v={newLead.priorytet}    set={v=>setNewLead(p=>({...p,priorytet:v}))}    opts={CRM_PRIO_OPTIONS}   cm={CRM_PRIO_STYLES}/>
            <TI2 v={newLead.odpowiedzialny} set={v=>setNewLead(p=>({...p,odpowiedzialny:v}))} ph="Odpowiedzialny"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:7,marginBottom:10}}>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <TI2 v={newLead.dataKontaktu} set={v=>setNewLead(p=>({...p,dataKontaktu:v}))} ph="Data kontaktu" style={{fontSize:11}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <TS2 v={newLead.ostatniaAkcja} set={v=>setNewLead(p=>({...p,ostatniaAkcja:v}))} opts={CRM_ACTION_OPTIONS} cm={CRM_ACTION_STYLES}/>
              <input type="date" value={newLead.dataAkcji||""} onChange={e=>setNewLead(p=>({...p,dataAkcji:e.target.value}))}
                style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,fontSize:11,fontFamily:ff,outline:"none",colorScheme:"light"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <TS2 v={newLead.nastepneDzialanie} set={v=>setNewLead(p=>({...p,nastepneDzialanie:v}))} opts={CRM_ACTION_OPTIONS} cm={CRM_ACTION_STYLES}/>
              <input type="date" value={newLead.dataNastepnego||""} onChange={e=>setNewLead(p=>({...p,dataNastepnego:e.target.value}))}
                style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,fontSize:11,fontFamily:ff,outline:"none",colorScheme:"light"}}/>
            </div>
            <TI2 v={newLead.notatki} set={v=>setNewLead(p=>({...p,notatki:v}))} ph="Notatki"/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addLead}
              style={{padding:"6px 18px",background:"#9ec417",color:"#1a1a1a",border:"none",
                borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ZAPISZ</button>
            <button onClick={()=>setShowForm(false)}
              style={{padding:"6px 14px",background:"white",color:"#6b7280",border:"1px solid #e8e8e3",
                borderRadius:5,fontFamily:ff,fontWeight:700,fontSize:11,cursor:"pointer"}}>ANULUJ</button>
          </div>
        </div>
      )}

      {/* Leads table */}
      <div style={{background:"white",border:"1px solid #e8e8e3",borderRadius:8,overflow:"hidden",
        boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
        {/* Table header */}
        <div style={{display:"grid",gridTemplateColumns:"26px 1fr 80px 70px 80px 120px 28px",
          gap:6,padding:"7px 12px",background:"#1a1a1a",alignItems:"center"}}>
          {["LP.","IMIĘ I NAZWISKO / KONTAKT","TYP DOMU","PRIORYTET","STATUS","AKCJA / NASTĘPNE",""].map((h,i)=>(
            <div key={i} style={{fontSize:8,fontWeight:700,color:"rgba(255,255,255,.5)",
              letterSpacing:"1px",textTransform:"uppercase",fontFamily:ff,
              textAlign:i===0?"center":i===6?"center":"left"}}>{h}</div>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{padding:"24px",textAlign:"center",color:"#9ca3af",fontSize:11,fontFamily:ff}}>
            BRAK LEADÓW W TEJ KATEGORII
          </div>
        )}

        {filtered.map((lead,idx)=>{
          const ss=CRM_STATUS_STYLES[lead.status]||{bg:"#f0f0ec",color:"#6b7280",border:"#d1d5db"};
          const ps=CRM_PRIO_STYLES[lead.priorytet]||{};
          const isExpanded=expandId===lead.id;
          const daysAgo=lead.dataAkcji ? Math.floor((today-new Date(lead.dataAkcji))/86400000) : null;
          const daysNext=lead.dataNastepnego ? Math.ceil((new Date(lead.dataNastepnego)-today)/86400000) : null;
          const overdue=daysNext!==null && daysNext<0;

          return (
            <div key={lead.id} style={{borderBottom:"1px solid #f3f4f6",
              background:idx%2===0?"white":"#fafafa"}}>
              {/* Main row */}
              <div style={{display:"grid",gridTemplateColumns:"26px 1fr 80px 70px 80px 120px 28px",
                gap:6,padding:"7px 12px",alignItems:"center",cursor:"pointer"}}
                onClick={()=>setExpandId(isExpanded?null:lead.id)}>
                <div style={{textAlign:"center",fontSize:10,fontWeight:700,color:"#9ca3af",fontFamily:ff}}>{idx+1}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:12,color:"#1a1a1a",fontFamily:ff}}>
                    {lead.imie} {lead.nazwisko}
                  </div>
                  <div style={{fontSize:9,color:"#9ca3af",fontFamily:ff}}>
                  {lead.tel}{lead.email&&` · ${lead.email}`}
                </div>
                </div>
                <div style={{fontSize:10,color:"#6b7280",fontFamily:ff}}>{lead.model||"—"}</div>
                <div>
                  {lead.priorytet && (
                    <span style={{background:ps.bg,color:ps.color,fontSize:8,fontWeight:700,
                      padding:"2px 6px",borderRadius:3,fontFamily:ff,letterSpacing:".3px"}}>{lead.priorytet}</span>
                  )}
                </div>
                <div>
                  <span style={{background:ss.bg,color:ss.color,border:`1px solid ${ss.border}`,
                    fontSize:8,fontWeight:700,padding:"2px 5px",borderRadius:3,
                    fontFamily:ff,letterSpacing:".3px",display:"inline-block",
                    maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lead.status}</span>
                </div>
                <div>
                  {lead.ostatniaAkcja && (() => {
                    const as = CRM_ACTION_STYLES[lead.ostatniaAkcja]||{bg:"#f0f0ec",color:"#6b7280"};
                    return <div style={{marginBottom:2}}>
                      <span style={{background:as.bg,color:as.color,fontSize:8,fontWeight:700,
                        padding:"1px 5px",borderRadius:3,fontFamily:ff,letterSpacing:".3px"}}>
                        {lead.ostatniaAkcja}
                      </span>
                      {lead.dataAkcji&&<span style={{fontSize:8,color:"#9ca3af",marginLeft:4}}>{fmtD(lead.dataAkcji)}</span>}
                    </div>;
                  })()}
                  {lead.nastepneDzialanie && (() => {
                    const ns = CRM_ACTION_STYLES[lead.nastepneDzialanie]||{bg:"#f0f0ec",color:"#6b7280"};
                    return <div>
                      <span style={{background:overdue?"#fbe8e8":ns.bg,color:overdue?"#b91c1c":ns.color,
                        fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:3,fontFamily:ff}}>
                        → {lead.nastepneDzialanie}
                      </span>
                    </div>;
                  })()}
                  {!lead.nastepneDzialanie && <div style={{fontSize:9,color:"#9ca3af",fontFamily:ff}}>—</div>}
                  {daysNext!==null && (
                    <div style={{fontSize:8,color:overdue?"#b91c1c":"#9ca3af",fontFamily:ff,fontWeight:overdue?700:400}}>
                      {overdue?`⚠ ${Math.abs(daysNext)}d po terminie`:`za ${daysNext}d`}
                    </div>
                  )}
                </div>
                <div style={{textAlign:"center",fontSize:10,color:"#9ca3af",fontFamily:ff,transition:"transform .15s",
                  transform:isExpanded?"rotate(180deg)":"none"}}>▾</div>
              </div>

              {/* Expanded edit row */}
              {isExpanded && (
                <div style={{padding:"10px 14px 14px",background:"#f9fafb",
                  borderTop:"1px solid #e8e8e3"}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:7}}>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>IMIĘ</div>
                      <TI2 v={lead.imie} set={v=>updateLead(lead.id,"imie",v)}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>NAZWISKO</div>
                      <TI2 v={lead.nazwisko} set={v=>updateLead(lead.id,"nazwisko",v)}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>TELEFON</div>
                      <TI2 v={lead.tel} set={v=>updateLead(lead.id,"tel",v)}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>E-MAIL</div>
                      <TI2 v={lead.email} set={v=>updateLead(lead.id,"email",v)}/></div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:7}}>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>ŹRÓDŁO</div>
                      <TS2 v={lead.zrodlo} set={v=>updateLead(lead.id,"zrodlo",v)} opts={CRM_SOURCE_OPTIONS}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>MODEL DOMU</div>
                      <TI2 v={lead.model} set={v=>updateLead(lead.id,"model",v)}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>STATUS</div>
                      <TS2 v={lead.status} set={v=>updateLead(lead.id,"status",v)} opts={CRM_STATUS_OPTIONS} cm={CRM_STATUS_STYLES}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>PRIORYTET</div>
                      <TS2 v={lead.priorytet} set={v=>updateLead(lead.id,"priorytet",v)} opts={CRM_PRIO_OPTIONS} cm={CRM_PRIO_STYLES}/></div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>ODPOWIEDZIALNY</div>
                      <TI2 v={lead.odpowiedzialny} set={v=>updateLead(lead.id,"odpowiedzialny",v)}/></div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 2fr",gap:7,marginBottom:7}}>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>DATA KONTAKTU</div>
                      <input type="date" value={lead.dataKontaktu||""} onChange={e=>updateLead(lead.id,"dataKontaktu",e.target.value)}
                        style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,fontSize:11,fontFamily:ff,outline:"none",colorScheme:"light"}}/></div>
                    <div>
                      <div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>OSTATNIA AKCJA</div>
                      <TS2 v={lead.ostatniaAkcja} set={v=>updateLead(lead.id,"ostatniaAkcja",v)} opts={CRM_ACTION_OPTIONS} cm={CRM_ACTION_STYLES}/>
                      <input type="date" value={lead.dataAkcji||""} onChange={e=>updateLead(lead.id,"dataAkcji",e.target.value)}
                        style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,fontSize:11,fontFamily:ff,outline:"none",marginTop:4,colorScheme:"light"}}/>
                    </div>
                    <div>
                      <div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>NASTĘPNE DZIAŁANIE</div>
                      <TS2 v={lead.nastepneDzialanie} set={v=>updateLead(lead.id,"nastepneDzialanie",v)} opts={CRM_ACTION_OPTIONS} cm={CRM_ACTION_STYLES}/>
                      <input type="date" value={lead.dataNastepnego||""} onChange={e=>updateLead(lead.id,"dataNastepnego",e.target.value)}
                        style={{width:"100%",padding:"4px 7px",border:"1px solid #e8e8e3",borderRadius:4,fontSize:11,fontFamily:ff,outline:"none",marginTop:4,colorScheme:"light"}}/>
                    </div>
                    <div><div style={{fontSize:9,color:"#9ca3af",fontFamily:ff,marginBottom:2}}>NOTATKI</div>
                      <TI2 v={lead.notatki} set={v=>updateLead(lead.id,"notatki",v)}/></div>
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <button onClick={()=>deleteLead(lead.id)}
                      style={{padding:"4px 12px",background:"#fbe8e8",color:"#b91c1c",border:"1px solid #fca5a5",
                        borderRadius:4,fontFamily:ff,fontWeight:700,fontSize:10,cursor:"pointer"}}>
                      USUŃ KONTAKT
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onSelect }) {
  const ETAP_DL = {
    "Oferta zaakceptowana":       {bg:"#dbeeff",color:"#1a6abf",border:"#a8cff0"},
    "Projektowanie i pozwolenia": {bg:"#fdf6e3",color:"#92680a",border:"#f0d898"},
    "Realizacja":                 {bg:"#e6fbd0",color:"#3a7d1e",border:"#b2e890"},
    "Odbiór":                     {bg:"#f0eafb",color:"#6b3db0",border:"#d9c8f0"},
    "Zrealizowano":               {bg:"#c8eac8",color:"#1a5c1a",border:"#7ec87e"},
    "NIEAKTYWNY":                 {bg:"#f0f0f0",color:"#9ca3af",border:"#d1d5db"},
  };
  const SC = {
    PRZELEW:{bg:"#e8f4fb",color:"#2563a8"},GOTÓWKA:{bg:"#eef6d0",color:"#4a7009"},
    ZAPLANOWANE:{bg:"#f0f0ec",color:"#6b7280"},"OPÓŹNIENIE":{bg:"#fbe8e8",color:"#b91c1c"},
  };
  const [snaps, setSnaps] = useState(PROJECTS_LIST.map(id=>({id,info:PROJECT_DEFAULTS[id]||{},plat:[],koszty:{}})));
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(new Set(["ALL"]));
  const toggleFilter = id => setFilters(prev=>{
    const next=new Set(prev);
    if(id==="ALL") return new Set(["ALL"]);
    next.delete("ALL");
    if(next.has(id)){next.delete(id);if(next.size===0)next.add("ALL");}
    else next.add(id);
    return next;
  });

  useEffect(()=>{
    Promise.all(PROJECTS_LIST.map(id=>loadSnapshot(id)))
      .then(r=>{setSnaps(r);setLoading(false);})
      .catch(()=>setLoading(false));
  },[]);

  const today=new Date(); today.setHours(0,0,0,0);
  const projects=snaps.map(s=>({
    id:s.id,
    klient:s.info?.klient||PROJECT_DEFAULTS[s.id]?.klient||"",
    etap:s.info?.etap||PROJECT_DEFAULTS[s.id]?.etap||"Oferta zaakceptowana",
    data:s.info?.data||PROJECT_DEFAULTS[s.id]?.data||"",
  }));

  const activeSnaps=snaps.filter(s=>(s.info?.etap||PROJECT_DEFAULTS[s.id]?.etap)!=="NIEAKTYWNY");
  const isAll=filters.has("ALL");
  const filtSnaps=isAll?activeSnaps:snaps.filter(s=>filters.has(s.id));

  const allPlat=activeSnaps.flatMap(s=>(s.plat||[]).filter(p=>p.netto>0).map(p=>({...p,projectId:s.id})));
  const filtPlat=isAll?allPlat:snaps.filter(s=>filters.has(s.id)).flatMap(s=>(s.plat||[]).filter(p=>p.netto>0).map(p=>({...p,projectId:s.id})));

  const paidAll=filtPlat.filter(p=>p.zreal==="TAK").sort((a,b)=>new Date(b.data)-new Date(a.data));
  const paidBase=paidAll.slice(0,5);
  const paidLastDate=paidBase.length>0?paidBase[paidBase.length-1].data:null;
  const paid=paidLastDate?paidAll.filter((p,i)=>i<5||p.data===paidLastDate):paidBase;
  const comingAll=filtPlat.filter(p=>p.zreal==="NIE"&&p.data&&new Date(p.data)>=today&&p.forma!=="OPÓŹNIENIE").sort((a,b)=>new Date(a.data)-new Date(b.data));
  const comingBase=comingAll.slice(0,5);
  const comingLastDate=comingBase.length>0?comingBase[comingBase.length-1].data:null;
  const coming=comingLastDate?comingAll.filter((p,i)=>i<5||p.data===comingLastDate):comingBase;
  const overdue=filtPlat.filter(p=>p.forma==="OPÓŹNIENIE"&&p.zreal==="NIE");

  const totalNetto=filtSnaps.reduce((s,snap)=>s+(snap.plat||[]).filter(p=>p.netto>0).reduce((a,p)=>a+p.netto,0),0);
  const kosColors=["#7aaa0a","#3b82f6","#f59e0b","#6366f1","#8b5cf6","#ef4444","#f97316","#06b6d4"];
  const kosCategories=[
    {label:"ARCHITEKT",key:"architekt"},{label:"ELEKTRYK",key:"elektryk"},
    {label:"SPAWACZ",key:"spawacz"},{label:"FUNDAMENTY",key:"fund"},
    {label:"PRACOWNICY",key:"pracownicy"},{label:"MATERIAŁY",key:"materialy"},
    {label:"DODATKOWE",key:"dodatkowe"},{label:"PALIWO",key:"paliwo"},
  ].map((c,i)=>({...c,color:kosColors[i],value:filtSnaps.reduce((s,snap)=>s+((snap.koszty||{})[c.key]||0),0)}));

  const PlatRow=({p})=>{
    const sc=SC[p.forma]||{bg:"#f0f0ec",color:"#6b7280"};
    return (
      <div style={{display:"grid",gridTemplateColumns:"30px 56px 1fr 68px",gap:5,alignItems:"center",padding:"6px 12px",borderBottom:"1px solid #f3f4f6",fontSize:11,fontFamily:ff}}>
        <span style={{background:"#1a1a1a",color:"#9ec417",fontWeight:900,fontSize:10,padding:"2px 4px",borderRadius:3,textAlign:"center"}}>{p.projectId}</span>
        <span style={{color:"#9ca3af",fontSize:10}}>{fmtD(p.data)||"—"}</span>
        <span style={{fontWeight:700,color:"#1a1a1a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{zł(p.netto)}</span>
        <span style={{background:sc.bg,color:sc.color,fontSize:8,fontWeight:700,padding:"2px 5px",borderRadius:3,textAlign:"center",whiteSpace:"nowrap"}}>{p.forma}</span>

      </div>
    );
  };
  const ListCard=({title,items,emptyMsg,headBg,headColor})=>(
    <div style={{background:"#fff",border:"1px solid #e8e8e3",borderRadius:8,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
      <div style={{background:headBg,padding:"10px 14px"}}>
        <div style={{fontSize:9,fontWeight:700,color:headColor,letterSpacing:"1.5px",textTransform:"uppercase",fontFamily:ff}}>{title}</div>
      </div>
      {items.length===0?<div style={{padding:"18px 14px",color:"#9ca3af",fontSize:11,fontFamily:ff,textAlign:"center"}}>{emptyMsg}</div>:items.map((p,i)=><PlatRow key={i} p={p}/>)}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f4f4f0;font-family:'Barlow Condensed',sans-serif;}
        .pbtn{transition:all .14s;cursor:pointer;}
        .pbtn:not(.inactive):hover{background:#1a1a1a!important;box-shadow:0 3px 10px rgba(0,0,0,.14)!important;}
        .pbtn:not(.inactive):hover .pid{color:#9ec417!important;}
        .pbtn:not(.inactive):hover .parr{opacity:1!important;}
        .fbtn{transition:all .14s;cursor:pointer;outline:none;}
        .fbtn:hover{border-color:#9ec417!important;}
      `}</style>
      <nav style={{background:"#1a1a1a",padding:"0 24px",display:"flex",alignItems:"center",height:54,boxShadow:"0 2px 6px rgba(0,0,0,.25)"}}>
        <Logo/>
        <div style={{color:"rgba(255,255,255,.18)",fontSize:20,margin:"0 16px"}}>|</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",fontFamily:ff}}>System Projektowy</div>
        <div style={{marginLeft:"auto",color:"rgba(255,255,255,.28)",fontSize:11,letterSpacing:"1px",fontFamily:ff}}>KAMP-BUD · RADOM</div>
      </nav>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"24px 28px 56px"}}>

        {/* ══ TOP ROW: PROJEKTY (left) + BAZA NOWYCH KLIENTÓW (right) ══ */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:36,alignItems:"start"}}>

          {/* LEFT: PROJEKTY */}
          <div>
            <div style={{marginBottom:14,paddingBottom:10,borderBottom:"2px solid #e8e8e3"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#1a1a1a",letterSpacing:"-0.3px",fontFamily:ff,lineHeight:1.2}}>PROJEKTY</div>
              <div style={{fontSize:10,color:"#9ca3af",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:2,fontFamily:ff}}>OTWÓRZ ARKUSZ PROJEKTU</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {projects.map(p=>{
                const inactive=p.etap==="NIEAKTYWNY";
                const es=ETAP_DL[p.etap]||{bg:"#f0f0ec",color:"#6b7280",border:"#e5e7eb"};
                return (
                  <div key={p.id} className={`pbtn${inactive?" inactive":""}`} onClick={()=>onSelect(p.id)}
                    style={{background:inactive?"#f5f5f3":"#fff",border:`1px solid ${inactive?"#d1d5db":"#e8e8e3"}`,
                      borderRadius:7,padding:"8px 10px",display:"flex",alignItems:"center",gap:7,
                      boxShadow:"0 1px 3px rgba(0,0,0,.05)",opacity:inactive?0.6:1}}>
                    <span className="pid" style={{fontFamily:ff,fontWeight:900,fontSize:16,
                      color:inactive?"#9ca3af":"#1a1a1a",letterSpacing:"-0.4px",flexShrink:0}}>{p.id}</span>
                    <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:2}}>
                      <span style={{background:es.bg,color:es.color,border:`1px solid ${es.border}`,
                        fontSize:7,fontWeight:700,padding:"1px 5px",borderRadius:3,
                        letterSpacing:".4px",textTransform:"uppercase",fontFamily:ff,
                        display:"inline-block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"100%"}}>
                        {inactive?"⊘ NIEAKTYWNY":p.etap}
                      </span>
                      {p.klient&&!inactive&&<span style={{fontSize:9,color:"#6b7280",fontFamily:ff,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.klient}</span>}
                    </div>
                    {p.data&&!inactive&&(()=>{
                      const s=new Date(p.data);s.setHours(0,0,0,0);
                      const n=new Date();n.setHours(0,0,0,0);
                      const days=Math.floor((n-s)/86400000);
                      return <div style={{flexShrink:0,textAlign:"center",background:"white",
                        border:"1px solid #e8e8e3",borderRadius:5,padding:"3px 6px",minWidth:36}}>
                        <div style={{fontSize:13,fontWeight:900,color:"#4b5563",fontFamily:ff,lineHeight:1.1}}>{days}</div>
                        <div style={{fontSize:6,color:"#9ca3af",fontFamily:ff,letterSpacing:".4px",textTransform:"uppercase"}}>DNI</div>
                      </div>;
                    })()}
                    <span className="parr" style={{fontSize:10,color:"#9ec417",opacity:0,flexShrink:0,fontFamily:ff,transition:"opacity .14s"}}>→</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: BAZA NOWYCH KLIENTÓW */}
          <div>
            <div style={{marginBottom:14,paddingBottom:10,borderBottom:"2px solid #e8e8e3"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#1a1a1a",letterSpacing:"-0.3px",fontFamily:ff,lineHeight:1.2}}>BAZA NOWYCH KLIENTÓW</div>
              <div style={{fontSize:10,color:"#9ca3af",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:2,fontFamily:ff}}>CRM – ZARZĄDZANIE LEADAMI</div>
            </div>
            <div className="pbtn" onClick={()=>onSelect("CRM")}
              style={{background:"#fff",border:"1px solid #e8e8e3",borderRadius:8,
                padding:"10px 14px",display:"flex",flexDirection:"column",
                justifyContent:"space-between",
                boxShadow:"0 1px 3px rgba(0,0,0,.05)",cursor:"pointer",
                minHeight:72,boxSizing:"border-box",overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <span className="pid" style={{fontFamily:ff,fontWeight:900,fontSize:20,
                  color:"#1a1a1a",letterSpacing:"-0.5px",flexShrink:0,lineHeight:1}}>CRM</span>
                <div style={{background:"#eef6d0",border:"1px solid #c8e87a",borderRadius:5,
                  padding:"3px 10px",fontSize:10,fontWeight:700,color:"#4a7009",
                  fontFamily:ff,letterSpacing:".5px",flexShrink:0,whiteSpace:"nowrap"}}>
                  OTWÓRZ →
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:1,marginTop:8}}>
                <span style={{fontSize:10,fontWeight:700,color:"#1a1a1a",fontFamily:ff,
                  letterSpacing:".3px",textTransform:"uppercase",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  BAZA NOWYCH KLIENTÓW
                </span>
                <span style={{fontSize:9,color:"#9ca3af",fontFamily:ff,
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  Leady · kontakty · statusy · follow-up
                </span>
              </div>
            </div>
          </div>
        </div>
        <SectionHead title="PODSUMOWANIE" sub="aktywne projekty"/>
        {loading&&<div style={{textAlign:"center",padding:"10px 0",fontSize:11,color:"#9ca3af",fontFamily:ff,letterSpacing:"1px"}}>⏳ ŁADOWANIE DANYCH...</div>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18,flexWrap:"wrap"}}>
          <span style={{fontSize:10,fontWeight:700,color:"#9ca3af",letterSpacing:"1px",textTransform:"uppercase",fontFamily:ff,marginRight:4}}>WYBIERZ:</span>
          {["ALL",...PROJECTS_LIST].map(id=>{
            const active=filters.has(id);
            const projEtap=(snaps.find(s=>s.id===id)?.info?.etap)||PROJECT_DEFAULTS[id]?.etap||"";
            const isInactive=projEtap==="NIEAKTYWNY";
            return <button key={id} className="fbtn" onClick={()=>toggleFilter(id)}
              style={{padding:"4px 14px",borderRadius:5,border:`1.5px solid ${active?"#9ec417":"#e8e8e3"}`,
                background:active?"#eef6d0":isInactive?"#f5f5f3":"#fff",
                color:active?"#4a7009":isInactive?"#bbb":"#6b7280",
                fontFamily:ff,fontWeight:700,fontSize:11,letterSpacing:".5px",
                opacity:isInactive&&!active?0.5:1,
                textDecoration:isInactive?"line-through":"none"}}>{id==="ALL"?"WSZYSTKIE":id}</button>;
          })}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
          {[
            {head:"WARTOŚĆ PROJEKTÓW (NETTO)",val:totalNetto,accent:true,red:false},
            {head:"WARTOŚĆ BRUTTO (8% VAT)",val:totalNetto*1.08,accent:false,red:false},
            {head:"SUMA OPÓŹNIEŃ",val:overdue.reduce((s,p)=>s+p.netto,0),accent:false,red:overdue.length>0},
          ].map(({head,val,accent,red})=>(
            <Card key={head}><CardHead>{head}</CardHead>
              <div style={{fontSize:22,fontWeight:900,fontFamily:ff,letterSpacing:"-0.5px",color:red&&val>0?"#b91c1c":accent?"#4a7009":"#1a1a1a"}}>{zł(val)}</div>
            </Card>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <Card><CardHead>OPŁACENIE PROJEKTÓW — % KWOTY Z UMOWY</CardHead><PieChart snaps={filtSnaps}/></Card>
          <Card><CardHead>KOSZTY WG KATEGORII</CardHead>
            <div style={{display:"flex",flexDirection:"column",gap:8,paddingTop:4}}>
              {kosCategories.map(c=>{
                const maxV=Math.max(...kosCategories.map(x=>x.value),1);
                return <div key={c.key} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:8,height:8,borderRadius:2,background:c.color,flexShrink:0,opacity:.8}}/>
                  <div style={{width:88,fontSize:10,fontFamily:ff,color:"#6b7280",textTransform:"uppercase",flexShrink:0}}>{c.label}</div>
                  <div style={{flex:1,height:5,background:"#f0f0ec",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:c.color,opacity:.7,borderRadius:3,width:`${Math.round(c.value/maxV*100)}%`}}/></div>
                  <div style={{width:88,fontSize:11,fontWeight:700,fontFamily:ff,color:"#1a1a1a",textAlign:"right",flexShrink:0}}>{zł(c.value)}</div>
                </div>;
              })}
              {kosCategories.every(c=>c.value===0)&&<div style={{color:"#9ca3af",fontSize:11,fontFamily:ff,textAlign:"center",padding:"20px 0"}}>BRAK DANYCH · ZAPISZ ARKUSZE PROJEKTÓW</div>}
            </div>
          </Card>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <ListCard title="OSTATNIE PŁATNOŚCI" items={paid} emptyMsg="BRAK DANYCH" headBg="#eef6d0" headColor="#4a7009"/>
          <ListCard title="NADCHODZĄCE PŁATNOŚCI" items={coming} emptyMsg="BRAK NADCHODZĄCYCH" headBg="#edf3fb" headColor="#4472a8"/>
          <ListCard title={`⚠ OPÓŹNIONE${overdue.length>0?" ("+overdue.length+")":""}`} items={overdue} emptyMsg="BRAK OPÓŹNIEŃ ✓"
            headBg={overdue.length>0?"#fbe8e8":"#f4f4f0"} headColor={overdue.length>0?"#b91c1c":"#9ca3af"}/>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  if (active === "CRM")    return <ErrorBoundary><CRMScreen    onBack={() => setActive(null)}/></ErrorBoundary>;
  if (active === "ZAKUPY") return <ErrorBoundary><ZakupyScreen onBack={() => setActive(null)}/></ErrorBoundary>;
  if (active) return <ErrorBoundary><ProjectSheet projectId={active} onBack={() => setActive(null)}/></ErrorBoundary>;
  return <ErrorBoundary><HomeScreen onSelect={setActive}/></ErrorBoundary>;
}
// v2
