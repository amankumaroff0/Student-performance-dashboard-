import React, { useState, useEffect } from 'react';
import {
    Terminal, Activity, Zap, Shield, Clock,
    ChevronLeft, ChevronRight, Flame, TrendingUp,
    AlertTriangle, CheckCircle, XCircle, BarChart3,
    Swords, Skull
} from 'lucide-react';

// --- 1. THE DATABASE (Single Source of Truth) ---
// Extracted from MathonGo Priority PDF
const INITIAL_SYLLABUS = [
    // === PHYSICS ===
    // Priority A
    { id: 'p_a1', subject: 'Physics', tier: 'A', name: 'Current Electricity' },
    { id: 'p_a2', subject: 'Physics', tier: 'A', name: 'Electrostatics' },
    { id: 'p_a3', subject: 'Physics', tier: 'A', name: 'Ray Optics' },
    { id: 'p_a4', subject: 'Physics', tier: 'A', name: 'Magnetic Effects of Current' },
    { id: 'p_a5', subject: 'Physics', tier: 'A', name: 'Thermodynamics' },
    { id: 'p_a6', subject: 'Physics', tier: 'A', name: 'Dual Nature of Matter' },
    { id: 'p_a7', subject: 'Physics', tier: 'A', name: 'Atomic Physics' },
    // Priority B
    { id: 'p_b1', subject: 'Physics', tier: 'B', name: 'Rotational Motion' },
    { id: 'p_b2', subject: 'Physics', tier: 'B', name: 'Gravitation' },
    { id: 'p_b3', subject: 'Physics', tier: 'B', name: 'Mech. Properties of Fluids' },
    { id: 'p_b4', subject: 'Physics', tier: 'B', name: 'Semiconductors' },
    { id: 'p_b5', subject: 'Physics', tier: 'B', name: 'Work Power Energy' },
    { id: 'p_b6', subject: 'Physics', tier: 'B', name: 'Units and Dimensions' },
    { id: 'p_b7', subject: 'Physics', tier: 'B', name: 'Wave Optics' },
    { id: 'p_b8', subject: 'Physics', tier: 'B', name: 'Laws of Motion' },
    { id: 'p_b9', subject: 'Physics', tier: 'B', name: 'Motion In One Dimension' },
    // Priority C
    { id: 'p_c1', subject: 'Physics', tier: 'C', name: 'Alternating Current' },
    { id: 'p_c2', subject: 'Physics', tier: 'C', name: 'Capacitance' },
    { id: 'p_c3', subject: 'Physics', tier: 'C', name: 'EMI' },
    { id: 'p_c4', subject: 'Physics', tier: 'C', name: 'Nuclear Physics' },
    { id: 'p_c5', subject: 'Physics', tier: 'C', name: 'KTG' },
    { id: 'p_c6', subject: 'Physics', tier: 'C', name: 'Oscillations' },
    { id: 'p_c7', subject: 'Physics', tier: 'C', name: 'EM Waves' },
    // Priority D
    { id: 'p_d1', subject: 'Physics', tier: 'D', name: 'Motion In Two Dimensions' },
    { id: 'p_d2', subject: 'Physics', tier: 'D', name: 'Mech. Properties of Solids' },
    { id: 'p_d3', subject: 'Physics', tier: 'D', name: 'Waves and Sound' },
    { id: 'p_d4', subject: 'Physics', tier: 'D', name: 'Mathematics in Physics' },
    { id: 'p_d5', subject: 'Physics', tier: 'D', name: 'COM & Momentum' },
    { id: 'p_d6', subject: 'Physics', tier: 'D', name: 'Thermal Properties' },
    { id: 'p_d7', subject: 'Physics', tier: 'D', name: 'Magnetic Properties' },
    { id: 'p_d8', subject: 'Physics', tier: 'D', name: 'Experimental Physics' },

    // === MATH ===
    // Priority A
    { id: 'm_a1', subject: 'Maths', tier: 'A', name: '3D Geometry' },
    { id: 'm_a2', subject: 'Maths', tier: 'A', name: 'Sequences and Series' },
    { id: 'm_a3', subject: 'Maths', tier: 'A', name: 'Matrices & Determinants' },
    { id: 'm_a4', subject: 'Maths', tier: 'A', name: 'Vector Algebra' },
    { id: 'm_a5', subject: 'Maths', tier: 'A', name: 'Definite Integration' },
    { id: 'm_a6', subject: 'Maths', tier: 'A', name: 'Functions' },
    { id: 'm_a7', subject: 'Maths', tier: 'A', name: 'Binomial Theorem' },
    { id: 'm_a8', subject: 'Maths', tier: 'A', name: 'Differential Equations' },
    // Priority B
    { id: 'm_b1', subject: 'Maths', tier: 'B', name: 'Probability' },
    { id: 'm_b2', subject: 'Maths', tier: 'B', name: 'Permutation Combination' },
    { id: 'm_b3', subject: 'Maths', tier: 'B', name: 'Straight Lines' },
    { id: 'm_b4', subject: 'Maths', tier: 'B', name: 'Area Under Curves' },
    { id: 'm_b5', subject: 'Maths', tier: 'B', name: 'Complex Number' },
    { id: 'm_b6', subject: 'Maths', tier: 'B', name: 'Application of Derivatives' },
    { id: 'm_b7', subject: 'Maths', tier: 'B', name: 'Sets and Relations' },
    { id: 'm_b8', subject: 'Maths', tier: 'B', name: 'Quadratic Equation' },
    // Priority C
    { id: 'm_c1', subject: 'Maths', tier: 'C', name: 'Circle' },
    { id: 'm_c2', subject: 'Maths', tier: 'C', name: 'Statistics' },
    { id: 'm_c3', subject: 'Maths', tier: 'C', name: 'Limits' },
    { id: 'm_c4', subject: 'Maths', tier: 'C', name: 'Parabola' },
    { id: 'm_c5', subject: 'Maths', tier: 'C', name: 'Hyperbola' },
    { id: 'm_c6', subject: 'Maths', tier: 'C', name: 'Continuity & Diff' },
    { id: 'm_c7', subject: 'Maths', tier: 'C', name: 'Ellipse' },
    // Priority D
    { id: 'm_d1', subject: 'Maths', tier: 'D', name: 'Inverse Trig Functions' },
    { id: 'm_d2', subject: 'Maths', tier: 'D', name: 'Indefinite Integration' },
    { id: 'm_d3', subject: 'Maths', tier: 'D', name: 'Trigonometric Equations' },
    { id: 'm_d4', subject: 'Maths', tier: 'D', name: 'Differentiation' },
    { id: 'm_d5', subject: 'Maths', tier: 'D', name: 'Trig Ratios & Identities' },
    { id: 'm_d6', subject: 'Maths', tier: 'D', name: 'Basic of Mathematics' },

    // === CHEMISTRY ===
    // Priority A
    { id: 'c_a1', subject: 'Chemistry', tier: 'A', name: 'GOC' },
    { id: 'c_a2', subject: 'Chemistry', tier: 'A', name: 'Coordination Compounds' },
    { id: 'c_a3', subject: 'Chemistry', tier: 'A', name: 'Chemical Bonding' },
    { id: 'c_a4', subject: 'Chemistry', tier: 'A', name: 'd and f Block Elements' },
    { id: 'c_a5', subject: 'Chemistry', tier: 'A', name: 'Thermodynamics (Chem)' },
    { id: 'c_a6', subject: 'Chemistry', tier: 'A', name: 'Electrochemistry' },
    // Priority B
    { id: 'c_b1', subject: 'Chemistry', tier: 'B', name: 'Structure of Atom' },
    { id: 'c_b2', subject: 'Chemistry', tier: 'B', name: 'Solutions' },
    { id: 'c_b3', subject: 'Chemistry', tier: 'B', name: 'Hydrocarbons' },
    { id: 'c_b4', subject: 'Chemistry', tier: 'B', name: 'Amines' },
    { id: 'c_b5', subject: 'Chemistry', tier: 'B', name: 'p Block Elements' },
    { id: 'c_b6', subject: 'Chemistry', tier: 'B', name: 'Chemical Kinetics' },
    { id: 'c_b7', subject: 'Chemistry', tier: 'B', name: 'Biomolecules' },
    // Priority C
    { id: 'c_c1', subject: 'Chemistry', tier: 'C', name: 'Mole Concept' },
    { id: 'c_c2', subject: 'Chemistry', tier: 'C', name: 'Aldehydes and Ketones' },
    { id: 'c_c3', subject: 'Chemistry', tier: 'C', name: 'Periodic Table' },
    { id: 'c_c4', subject: 'Chemistry', tier: 'C', name: 'Haloalkanes & Haloarenes' },
    { id: 'c_c5', subject: 'Chemistry', tier: 'C', name: 'Alcohols Phenols Ethers' },
    // Priority D
    { id: 'c_d1', subject: 'Chemistry', tier: 'D', name: 'Practical Chemistry' },
    { id: 'c_d2', subject: 'Chemistry', tier: 'D', name: 'Carboxylic Acid Deriv' },
    { id: 'c_d3', subject: 'Chemistry', tier: 'D', name: 'Ionic Equilibrium' },
    { id: 'c_d4', subject: 'Chemistry', tier: 'D', name: 'Redox Reactions' },
    { id: 'c_d5', subject: 'Chemistry', tier: 'D', name: 'Chemical Equilibrium' },
];

// --- 2. UTILITIES & HOOKS ---

// Hook to save state to LocalStorage
function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

const getRevisionColor = (count) => {
    if (count === 0) return 'text-slate-600';
    if (count === 1) return 'text-red-400';
    if (count === 2) return 'text-orange-400';
    if (count >= 5) return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]';
    return 'text-blue-400';
};

// --- 3. MAIN COMPONENT (CRIMSON PROTOCOL) ---

export default function JEEWarRoomDashboard() {
    // --- STATE ---
    const [view, setView] = useState('dashboard'); // 'dashboard' or 'mocklab'

    // Data States
    const [chapters, setChapters] = useStickyState(
        INITIAL_SYLLABUS.map(c => ({ ...c, status: 'pending', revisions: 0 })),
        'jee_crimson_chapters_v1'
    );
    const [mockTests, setMockTests] = useStickyState([], 'jee_crimson_mocks_v1');
    const [dailyLog, setDailyLog] = useStickyState({ physics: 0, chemistry: 0, maths: 0 }, 'jee_crimson_log_v1');

    // UI States
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
    const [activeTab, setActiveTab] = useState('Physics');

    // Input States
    const [inputSubject, setInputSubject] = useState('Physics');
    const [inputCount, setInputCount] = useState('');
    const [mockInput, setMockInput] = useState({ name: '', p: '', c: '', m: '' });

    // --- LOGIC ---

    // Countdown
    useEffect(() => {
        const timer = setInterval(() => {
            const diff = new Date('2026-01-21T00:00:00') - new Date();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                });
            }
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Handlers
    const handleLogSubmit = (e) => {
        e.preventDefault();
        if (!inputCount || isNaN(inputCount)) return;
        const key = inputSubject.toLowerCase();
        setDailyLog(prev => ({ ...prev, [key]: prev[key] + parseInt(inputCount) }));
        setInputCount('');
    };

    const handleMockSubmit = (e) => {
        e.preventDefault();
        if (!mockInput.name || !mockInput.p || !mockInput.c || !mockInput.m) return;
        const total = parseInt(mockInput.p) + parseInt(mockInput.c) + parseInt(mockInput.m);
        const newMock = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            name: mockInput.name,
            p: parseInt(mockInput.p),
            c: parseInt(mockInput.c),
            m: parseInt(mockInput.m),
            total: total,
            analyzed: false
        };
        setMockTests(prev => [...prev, newMock]);
        setMockInput({ name: '', p: '', c: '', m: '' });
    };

    const toggleAnalyzed = (id) => {
        setMockTests(prev => prev.map(m => m.id === id ? { ...m, analyzed: !m.analyzed } : m));
    };

    const updateRevision = (id, change) => {
        setChapters(prev => prev.map(ch => {
            if (ch.id === id) return { ...ch, revisions: Math.max(0, Math.min(10, ch.revisions + change)) };
            return ch;
        }));
    };

    const toggleStatus = (id) => {
        const states = ['pending', 'progress', 'mastered'];
        setChapters(prev => prev.map(ch => {
            if (ch.id === id) {
                const nextIndex = (states.indexOf(ch.status) + 1) % states.length;
                return { ...ch, status: states[nextIndex] };
            }
            return ch;
        }));
    };

    // SVG Graph Generator (Pure Score)
    const getPolylinePoints = () => {
        if (mockTests.length < 2) return "";
        const maxScore = 300;
        const width = 800;
        const height = 200;
        return mockTests.map((test, index) => {
            const x = (index / (mockTests.length - 1)) * width;
            const y = height - (test.total / maxScore) * height;
            return `${x},${y}`;
        }).join(' ');
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950 via-[#0a0000] to-black text-slate-300 font-sans pb-20 selection:bg-red-500/30">

            {/* NAVBAR */}
            <nav className="border-b border-red-900/30 bg-black/40 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-900/20 p-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse">
                            <Skull size={20} className="text-red-500" />
                        </div>
                        <h1 className="font-black text-xl tracking-[0.2em] text-white">WAR ROOM <span className="text-[10px] text-red-500 border border-red-900 px-1 rounded bg-red-950/30">CRIMSON PROTOCOL</span></h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('dashboard')}
                            className={`px-4 py-1 rounded border text-xs font-bold tracking-widest transition-all ${view === 'dashboard' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'border-transparent text-slate-500 hover:text-red-400'}`}
                        >
                            COMMAND
                        </button>
                        <button
                            onClick={() => setView('mocklab')}
                            className={`px-4 py-1 rounded border text-xs font-bold tracking-widest transition-all ${view === 'mocklab' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'border-transparent text-slate-500 hover:text-red-400'}`}
                        >
                            MOCK LAB
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

                {view === 'dashboard' ? (
                    // === VIEW 1: COMMAND CENTER ===
                    <>
                        {/* TOP GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* COUNTDOWN */}
                            <div className="bg-black/40 border border-red-900/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(127,29,29,0.2)] relative overflow-hidden flex flex-col justify-center group hover:border-red-600/50 transition-colors">
                                <div className="absolute -right-10 -top-10 opacity-10 text-red-600"><Clock size={200} /></div>
                                <h2 className="text-red-500 font-bold tracking-[0.3em] text-xs mb-4 flex items-center gap-2"><Activity size={14} /> MISSION DEADLINE</h2>
                                <div className="flex items-baseline gap-4 relative z-10">
                                    <div>
                                        <span className="text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">{timeLeft.days || 0}</span>
                                        <p className="text-xs text-red-800 font-bold uppercase tracking-widest mt-1">Days</p>
                                    </div>
                                    <div className="text-6xl text-red-900/50">:</div>
                                    <div>
                                        <span className="text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">{timeLeft.hours || 0}</span>
                                        <p className="text-xs text-red-800 font-bold uppercase tracking-widest mt-1">Hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* DAILY LOG */}
                            <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-1">
                                            <Zap className="fill-red-500/20" size={20} /> FIREPOWER LOG
                                        </h2>
                                        <p className="text-xs text-red-800/60">Log your daily question output.</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-black text-white">{dailyLog.physics + dailyLog.chemistry + dailyLog.maths}</span>
                                        <p className="text-[10px] text-red-400 uppercase tracking-wider">Total Qs</p>
                                    </div>
                                </div>
                                <form onSubmit={handleLogSubmit} className="flex gap-2 mt-4">
                                    <select value={inputSubject} onChange={(e) => setInputSubject(e.target.value)} className="bg-black/50 border border-red-900/50 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-red-200">
                                        {['Physics', 'Chemistry', 'Maths'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <input type="number" placeholder="+ Qs" value={inputCount} onChange={(e) => setInputCount(e.target.value)} className="w-24 bg-black/50 border border-red-900/50 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white" />
                                    <button type="submit" className="flex-1 bg-red-700 hover:bg-red-600 rounded text-sm font-bold transition-all text-white shadow-[0_0_15px_rgba(185,28,28,0.4)]">LOG</button>
                                </form>
                            </div>
                        </div>

                        {/* INTEL LAYER (Part 3) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Physics', 'Chemistry', 'Maths'].map(subject => {
                                const subChapters = chapters.filter(c => c.subject === subject);
                                const mastered = subChapters.filter(c => c.status === 'mastered').length;
                                const tierA = subChapters.filter(c => c.tier === 'A');
                                const tierAMastered = tierA.filter(c => c.status === 'mastered').length;
                                const percent = Math.round((mastered / subChapters.length) * 100) || 0;

                                const colors = {
                                    Physics: { text: 'text-red-400', bg: 'bg-red-600' },
                                    Chemistry: { text: 'text-blue-400', bg: 'bg-blue-600' },
                                    Maths: { text: 'text-green-400', bg: 'bg-green-600' }
                                };
                                return (
                                    <div key={subject} className="bg-black/40 border border-red-900/20 p-4 rounded-xl relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-20 h-20 ${colors[subject].bg} blur-3xl opacity-10 rounded-full -mr-10 -mt-10`}></div>
                                        <div className="flex justify-between items-end mb-2 relative z-10">
                                            <h3 className={`font-black tracking-widest uppercase text-sm ${colors[subject].text} flex items-center gap-2`}><Flame size={12} /> {subject}</h3>
                                            <span className="text-xl font-bold text-white">{percent}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                                            <div className={`h-full ${colors[subject].bg} shadow-[0_0_10px_currentColor] transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                            <span>DONE: {mastered}/{subChapters.length}</span>
                                            <span className="text-slate-400">TIER A: <span className="text-white">{tierAMastered}</span>/{tierA.length}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* CHAPTER LIST */}
                        <div className="mt-8">
                            <div className="flex gap-1 mb-4 border-b border-red-900/30">
                                {['Physics', 'Chemistry', 'Maths'].map(sub => (
                                    <button key={sub} onClick={() => setActiveTab(sub)} className={`px-6 py-3 rounded-t-lg font-bold tracking-wider text-sm transition-all ${activeTab === sub ? 'bg-red-950/30 text-red-400 border-t border-x border-red-900/50' : 'text-slate-600 hover:text-red-400'}`}>
                                        {sub.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <div className="grid gap-2">
                                {chapters.filter(ch => ch.subject === activeTab).map(chapter => (
                                    <div key={chapter.id} className="group bg-black/40 border border-red-900/10 p-3 rounded flex flex-col md:flex-row md:items-center justify-between hover:border-red-600/30 hover:bg-red-950/10 transition-all">
                                        <div className="flex-1 flex items-center gap-3">
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{chapter.name}</span>
                                            {chapter.tier && <span className={`text-[9px] px-1 rounded border uppercase font-bold ${chapter.tier === 'A' ? 'bg-red-900/20 text-red-400 border-red-900/50' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>Tier {chapter.tier}</span>}
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                            <button onClick={() => toggleStatus(chapter.id)} className={`w-20 py-1 text-[9px] font-bold uppercase tracking-wider rounded border transition-all ${chapter.status === 'mastered' ? 'bg-green-900/20 text-green-400 border-green-900/50' : chapter.status === 'progress' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50' : 'bg-slate-900 text-slate-600 border-slate-800'}`}>{chapter.status}</button>
                                            <div className="flex items-center bg-black rounded border border-red-900/20 h-6">
                                                <button onClick={() => updateRevision(chapter.id, -1)} className="px-1.5 hover:text-red-400 text-slate-700"><ChevronLeft size={12} /></button>
                                                <span className={`w-5 text-center text-xs font-bold ${getRevisionColor(chapter.revisions)}`}>{chapter.revisions}</span>
                                                <button onClick={() => updateRevision(chapter.id, 1)} className="px-1.5 hover:text-red-400 text-slate-700"><ChevronRight size={12} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // === VIEW 2: MOCK LAB ===
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* LEFT: INPUT & GRAPH */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* GRAPH CONTAINER */}
                            <div className="bg-black/40 border border-red-900/30 p-6 rounded-2xl shadow-lg relative h-64 flex items-center justify-center">
                                {mockTests.length < 2 ? (
                                    <div className="text-center text-slate-600">
                                        <BarChart3 size={48} className="mx-auto mb-2 opacity-20" />
                                        <p className="text-sm">Need at least 2 mock tests to generate trajectory.</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-700 font-mono border-l border-red-900/20 pl-1">
                                            <span>300</span><span>225</span><span>150</span><span>75</span><span>0</span>
                                        </div>
                                        <svg className="w-full h-full overflow-visible">
                                            <defs>
                                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#7f1d1d" />
                                                    <stop offset="100%" stopColor="#ef4444" />
                                                </linearGradient>
                                                <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                                            </defs>
                                            <polyline fill="none" stroke="url(#lineGradient)" strokeWidth="3" points={getPolylinePoints()} filter="url(#glow)" />
                                            {mockTests.map((test, i) => {
                                                const width = 100;
                                                const x = (i / (mockTests.length - 1)) * 100;
                                                const y = 100 - (test.total / 300) * 100;
                                                return (
                                                    <g key={test.id}>
                                                        <circle cx={`${x}%`} cy={`${y}%`} r="4" className="fill-black stroke-red-500 hover:r-6 transition-all cursor-pointer" />
                                                        <text x={`${x}%`} y={`${y - 5}%`} textAnchor="middle" className="fill-white text-[10px] opacity-0 hover:opacity-100">{test.total}</text>
                                                    </g>
                                                )
                                            })}
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* HISTORY TABLE */}
                            <div className="space-y-2">
                                <h3 className="text-red-400 text-sm font-bold tracking-widest uppercase flex items-center gap-2"><Swords size={14} /> Battle History</h3>
                                {mockTests.slice().reverse().map((test) => (
                                    <div key={test.id} className={`flex items-center justify-between p-4 rounded border transition-all ${test.analyzed ? 'bg-black/20 border-slate-800 opacity-60' : 'bg-red-950/20 border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${test.analyzed ? 'bg-slate-800 text-slate-500' : 'bg-red-900/20 text-red-500 animate-pulse'}`}>
                                                {test.analyzed ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">{test.name}</div>
                                                <div className="text-[10px] text-slate-500 font-mono">P:{test.p} C:{test.c} M:{test.m}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-white">{test.total}<span className="text-xs text-slate-500 font-normal">/300</span></div>
                                                <div className="text-[10px] text-slate-500">{test.date}</div>
                                            </div>
                                            <button
                                                onClick={() => toggleAnalyzed(test.id)}
                                                className={`text-[10px] px-2 py-1 rounded border uppercase font-bold ${test.analyzed ? 'border-slate-700 text-slate-500 hover:text-slate-300' : 'bg-red-600 text-white border-red-500 hover:bg-red-500'}`}
                                            >
                                                {test.analyzed ? 'Re-Open' : 'Analyze'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {mockTests.length === 0 && <div className="text-center text-slate-600 py-8 border border-dashed border-slate-800 rounded">No battles recorded yet.</div>}
                            </div>
                        </div>

                        {/* RIGHT: ADD FORM */}
                        <div className="bg-black/40 border border-red-900/30 p-6 rounded-2xl h-fit sticky top-24">
                            <h3 className="text-red-500 font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2"><Zap size={14} /> New Mock Entry</h3>
                            <form onSubmit={handleMockSubmit} className="space-y-4">
                                <div>
                                    <label className="text-[10px] text-red-400 uppercase font-bold">Provider / Name</label>
                                    <input type="text" value={mockInput.name} onChange={e => setMockInput({ ...mockInput, name: e.target.value })} className="w-full bg-black border border-red-900/50 rounded p-2 text-sm text-white focus:border-red-500 outline-none" placeholder="e.g. MathonGo FT-1" />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-[10px] text-red-400 uppercase font-bold">PHY</label>
                                        <input type="number" value={mockInput.p} onChange={e => setMockInput({ ...mockInput, p: e.target.value })} className="w-full bg-black border border-red-900/50 rounded p-2 text-sm text-white focus:border-red-500 outline-none" placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-blue-400 uppercase font-bold">CHEM</label>
                                        <input type="number" value={mockInput.c} onChange={e => setMockInput({ ...mockInput, c: e.target.value })} className="w-full bg-black border border-blue-900/50 rounded p-2 text-sm text-white focus:border-blue-500 outline-none" placeholder="0" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-green-400 uppercase font-bold">MATH</label>
                                        <input type="number" value={mockInput.m} onChange={e => setMockInput({ ...mockInput, m: e.target.value })} className="w-full bg-black border border-green-900/50 rounded p-2 text-sm text-white focus:border-green-500 outline-none" placeholder="0" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded font-bold tracking-widest shadow-[0_0_20px_rgba(185,28,28,0.3)] transition-all mt-4">
                                    CONFIRM SCORE
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}