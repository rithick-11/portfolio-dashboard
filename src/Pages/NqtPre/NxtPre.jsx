import { useState } from "react";

const schedule = [
  // Week 1 - Quantitative Aptitude
  { day: 1, week: 1, phase: "Quant", title: "Number System & LCM/HCF", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Number System basics, divisibility rules", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Practice 20 Number System Qs – IndiaBix", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "LCM, HCF concepts + 25 problems", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "PrepInsta TCS NQT Quant Day 1 quiz", type: "mock" },
  ]},
  { day: 2, week: 1, phase: "Quant", title: "Percentages & Profit/Loss", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Percentages: formulas, tricks, shortcuts", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "30 percentage Qs – IndiaBix", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Profit, Loss, Discount – 25 problems", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Mixed Quant quiz (50 Qs) timed", type: "mock" },
  ]},
  { day: 3, week: 1, phase: "Quant", title: "Ratio, Proportion & Mixtures", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Ratio & Proportion formulas + 25 Qs", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Alligation & Mixtures concept", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "30 Ratio + Mixture problems practice", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS NQT Quant mock test – PrepInsta", type: "mock" },
  ]},
  { day: 4, week: 1, phase: "Quant", title: "Time, Work & Speed", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Time & Work – pipes, cisterns, workers", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "20 Time & Work Qs", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Speed, Distance, Time – 25 problems", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Combined Time/Work/Speed quiz", type: "mock" },
  ]},
  { day: 5, week: 1, phase: "Quant", title: "Probability & Permutations", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Probability concepts + 20 problems", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Permutation & Combination basics", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "P&C + Probability 30 Qs – IndiaBix", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "PrepInsta TCS Quant Full Mock", type: "mock" },
  ]},
  { day: 6, week: 1, phase: "Quant", title: "Data Interpretation", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Bar charts, Pie charts, Tables – DI basics", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "2 DI sets (10 Qs each)", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Line graphs & Mixed DI – 3 sets", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS NQT Quant Previous Year Qs", type: "mock" },
  ]},
  { day: 7, week: 1, phase: "Quant", title: "Quant Revision Day", slots: [
    { time: "6:00–8:00 AM", duration: "2h", task: "Revise all week's formulas & shortcuts", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Full Quant Mock Test (60 Qs, 40 min)", type: "mock" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Analyse errors, note weak topics", type: "review" },
  ]},
  // Week 2 - Logical Reasoning
  { day: 8, week: 2, phase: "Reasoning", title: "Number Series & Analogies", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Number series patterns + 30 Qs", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Letter/Alphabet series – 20 Qs", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Analogies – Verbal & Non-verbal (30 Qs)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "PrepInsta Reasoning Day 1 Quiz", type: "mock" },
  ]},
  { day: 9, week: 2, phase: "Reasoning", title: "Blood Relations & Directions", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Blood Relations – all relationship types", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "25 Blood Relation Qs", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Directions & Distance – 25 Qs", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Mixed reasoning quiz – IndiaBix", type: "mock" },
  ]},
  { day: 10, week: 2, phase: "Reasoning", title: "Syllogisms & Coding-Decoding", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Syllogisms – Venn diagram method (30 Qs)", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Coding-Decoding patterns", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Coding-Decoding 30 Qs practice", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS NQT Reasoning Mock – PrepInsta", type: "mock" },
  ]},
  { day: 11, week: 2, phase: "Reasoning", title: "Seating Arrangements & Puzzles", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Linear & Circular seating (5 sets)", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Floor/Box puzzle practice", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Scheduling + comparison puzzles (4 sets)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS Puzzle quiz – GFG / PrepInsta", type: "mock" },
  ]},
  { day: 12, week: 2, phase: "Reasoning", title: "Data Sufficiency & Critical Reasoning", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Data Sufficiency – 30 TCS-type Qs", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Critical Reasoning basics", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Assumptions, Conclusions, Arguments (25 Qs)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Full Reasoning quiz (50 Qs timed)", type: "mock" },
  ]},
  { day: 13, week: 2, phase: "Verbal", title: "Vocabulary & Grammar", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Synonyms, Antonyms – 50 word list", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Active/Passive Voice – rules & 20 Qs", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Sentence Correction + Fill in the Blanks (30 Qs)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS Verbal Mock – PrepInsta", type: "mock" },
  ]},
  { day: 14, week: 2, phase: "Verbal", title: "Reading Comprehension & Para Jumbles", slots: [
    { time: "6:00–8:00 AM", duration: "2h", task: "RC strategy: 3 passages + Para Jumbles (20 Qs)", type: "learn" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Full Verbal Mock Test (40 Qs, 30 min)", type: "mock" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Revise weak vocab, note error patterns", type: "review" },
  ]},
  // Week 3 - Coding
  { day: 15, week: 3, phase: "Coding", title: "Language Setup & Basics", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Choose Python/Java/C++ – revise syntax, I/O", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Write 5 basic programs (factorial, fibonacci, etc.)", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Loops, Conditionals – 10 HackerRank Easy Qs", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "HackerRank 30 Days of Code – Day 1–3", type: "practice" },
  ]},
  { day: 16, week: 3, phase: "Coding", title: "Arrays & Strings", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Arrays: traversal, searching, sorting basics", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "5 Array problems – HackerRank Easy", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "String manipulation: reverse, palindrome, anagram", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "GFG TCS NQT Coding Previous Year Qs", type: "mock" },
  ]},
  { day: 17, week: 3, phase: "Coding", title: "Patterns & Number Programs", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Star patterns, number pyramids (15 programs)", type: "practice" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Prime, Armstrong, Perfect numbers", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "PrepInsta TCS NQT Coding Q bank (10 Qs)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Timed coding: solve 2 Easy Qs in 30 min each", type: "mock" },
  ]},
  { day: 18, week: 3, phase: "Coding", title: "Sorting & Searching", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Bubble, Selection, Insertion Sort – code from scratch", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Binary Search – 5 problems", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Sort-based problems on HackerRank (Easy-Medium)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS coding simulation – 2 Qs in 60 min", type: "mock" },
  ]},
  { day: 19, week: 3, phase: "Coding", title: "Functions & Recursion", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Recursion: factorial, fibonacci, tower of Hanoi", type: "learn" },
    { time: "7:30–8:00 AM", duration: "30m", task: "5 recursion problems – GFG", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Function-based problems on HackerRank", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Mixed coding quiz + review solutions", type: "mock" },
  ]},
  { day: 20, week: 3, phase: "Coding", title: "Medium Level Coding", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "2D arrays, Matrix problems (3 Qs)", type: "practice" },
    { time: "7:30–8:00 AM", duration: "30m", task: "String parsing + frequency count problems", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "HackerRank Medium level – 3 problems", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "TCS NQT Coding simulation (2 Qs in 60 min)", type: "mock" },
  ]},
  { day: 21, week: 3, phase: "Coding", title: "Coding Revision & Speed", slots: [
    { time: "6:00–8:00 AM", duration: "2h", task: "Redo 10 previous coding problems for speed", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "TCS NQT Coding Full Simulation (2 Qs, 60 min)", type: "mock" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Review solutions, optimize code", type: "review" },
  ]},
  // Week 4 - Full Mocks
  { day: 22, week: 4, phase: "Mock", title: "Full Mock Test 1", slots: [
    { time: "6:00–7:45 AM", duration: "1h 45m", task: "Full Foundation Mock (Quant + Verbal + Reasoning)", type: "mock" },
    { time: "8:00–9:00 AM", duration: "1h", task: "Analyse wrong answers – mark weak topics", type: "review" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Revise top 3 weak topics from morning mock", type: "learn" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Solve 2 coding problems (timed)", type: "practice" },
  ]},
  { day: 23, week: 4, phase: "Mock", title: "Weak Area Focus", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Focus topic 1: Deep practice (30 Qs)", type: "practice" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Focus topic 2: 20 targeted Qs", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Reasoning + Verbal speed drill (40 Qs, 25 min)", type: "mock" },
    { time: "8:00–9:00 PM", duration: "1h", task: "1 TCS coding problem – full solution", type: "practice" },
  ]},
  { day: 24, week: 4, phase: "Mock", title: "Full Mock Test 2", slots: [
    { time: "6:00–7:45 AM", duration: "1h 45m", task: "Full Foundation Mock Test 2 – PrepInsta", type: "mock" },
    { time: "8:00–9:00 AM", duration: "1h", task: "Error analysis + formula revision", type: "review" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Advanced Reasoning practice (TCS-type Qs)", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Coding: 2 Medium problems in 60 min", type: "mock" },
  ]},
  { day: 25, week: 4, phase: "Mock", title: "Advanced Section Practice", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Advanced Quant mock (Digital/Prime level)", type: "mock" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Advanced Reasoning – 20 Qs", type: "practice" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Advanced Coding – 2 Medium-Hard problems", type: "practice" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Review all solutions, study optimal approaches", type: "review" },
  ]},
  { day: 26, week: 4, phase: "Mock", title: "Full Mock Test 3", slots: [
    { time: "6:00–8:00 AM", duration: "2h", task: "Complete Full Mock (Foundation + Advanced) – GFG", type: "mock" },
    { time: "8:00–9:00 AM", duration: "1h", task: "Detailed error analysis", type: "review" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Revise all shortcuts & formulas document", type: "learn" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Coding drills – 5 Easy problems for speed", type: "practice" },
  ]},
  { day: 27, week: 4, phase: "Mock", title: "Speed & Accuracy Drills", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "Quant Speed Test: 30 Qs in 20 min (timed)", type: "mock" },
    { time: "7:30–8:00 AM", duration: "30m", task: "Verbal Speed: 20 Qs in 12 min", type: "mock" },
    { time: "Evening 6:00–7:30 PM", duration: "1.5h", task: "Reasoning Speed: 25 Qs in 20 min", type: "mock" },
    { time: "8:00–9:00 PM", duration: "1h", task: "Coding: 2 TCS PYQs under exam conditions", type: "mock" },
  ]},
  { day: 28, week: 4, phase: "Mock", title: "Full Mock Test 4 (Simulation)", slots: [
    { time: "6:00–8:00 AM", duration: "2h", task: "Full exam simulation – Foundation (75 min) + Coding", type: "mock" },
    { time: "8:00–9:00 AM", duration: "1h", task: "Score review + weakness checklist", type: "review" },
    { time: "Evening 6:00–8:00 PM", duration: "2h", task: "Revise all error-prone Quant + Reasoning topics", type: "learn" },
  ]},
  { day: 29, week: 4, phase: "Revision", title: "Final Revision Day", slots: [
    { time: "6:00–7:30 AM", duration: "1.5h", task: "All formulas & shortcuts – quick revision", type: "learn" },
    { time: "7:30–8:30 AM", duration: "1h", task: "Coding logic: review 10 key patterns/programs", type: "learn" },
    { time: "Evening 6:00–7:00 PM", duration: "1h", task: "Light mock: 20 Quant + 15 Reasoning Qs", type: "mock" },
    { time: "7:00–8:00 PM", duration: "1h", task: "Vocabulary + RC passage revision", type: "learn" },
  ]},
  { day: 30, week: 4, phase: "Revision", title: "Exam Eve – Light Prep", slots: [
    { time: "Morning", duration: "1h", task: "Skim all formula sheets & notes", type: "learn" },
    { time: "Afternoon", duration: "30m", task: "Light coding warm-up: 2 easy Qs", type: "practice" },
    { time: "Evening", duration: "30m", task: "Read TCS NQT exam rules & instructions carefully", type: "learn" },
    { time: "Night", duration: "–", task: "Rest well. Sleep by 10 PM. 🎯", type: "rest" },
  ]},
];

const phaseColors = {
  Quant: { bg: "bg-blue-900/40", badge: "bg-blue-500", dot: "#3b82f6", text: "text-blue-300" },
  Reasoning: { bg: "bg-purple-900/40", badge: "bg-purple-500", dot: "#a855f7", text: "text-purple-300" },
  Verbal: { bg: "bg-emerald-900/40", badge: "bg-emerald-500", dot: "#10b981", text: "text-emerald-300" },
  Coding: { bg: "bg-orange-900/40", badge: "bg-orange-500", dot: "#f97316", text: "text-orange-300" },
  Mock: { bg: "bg-red-900/40", badge: "bg-red-500", dot: "#ef4444", text: "text-red-300" },
  Revision: { bg: "bg-yellow-900/40", badge: "bg-yellow-500", dot: "#eab308", text: "text-yellow-300" },
};

const typeStyle = {
  learn: { icon: "📘", label: "Learn", color: "text-sky-400" },
  practice: { icon: "✏️", label: "Practice", color: "text-green-400" },
  mock: { icon: "🎯", label: "Mock", color: "text-orange-400" },
  review: { icon: "🔍", label: "Review", color: "text-purple-400" },
  rest: { icon: "😴", label: "Rest", color: "text-gray-400" },
};

const weekLabels = ["Week 1 — Quantitative Aptitude", "Week 2 — Reasoning & Verbal", "Week 3 — Coding", "Week 4 — Full Mocks & Revision"];

export default function NxtPre() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);

  const weekDays = schedule.filter(d => d.week === selectedWeek);

  return (
    <div style={{ fontFamily: "'DM Mono', 'Fira Code', monospace", background: "#0a0e1a", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .week-btn { transition: all 0.2s ease; }
        .week-btn:hover { transform: translateY(-1px); }
        .day-card { transition: all 0.25s ease; border: 1px solid rgba(255,255,255,0.06); }
        .day-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
        .slot-row { border-left: 2px solid rgba(255,255,255,0.08); transition: border-color 0.2s; }
        .slot-row:hover { border-left-color: rgba(99,179,237,0.4); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", borderBottom: "1px solid rgba(99,102,241,0.2)", padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 12px #6366f1" }} />
            <span style={{ fontSize: 11, letterSpacing: 3, color: "#6366f1", fontWeight: 500 }}>30-DAY PREP PLAN</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: "#f1f5f9", margin: "0 0 8px", lineHeight: 1.2 }}>
            TCS NQT 2026 Batch
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>4–5 hrs/day · Foundation + Advanced + Coding · Ninja → Digital → Prime</p>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
            {Object.entries(typeStyle).filter(([k]) => k !== "rest").map(([key, val]) => (
              <span key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                <span>{val.icon}</span> {val.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>

        {/* Week Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 28 }}>
          {[1,2,3,4].map(w => (
            <button key={w} className="week-btn"
              onClick={() => { setSelectedWeek(w); setExpandedDay(null); }}
              style={{
                padding: "10px 8px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: 0.3,
                background: selectedWeek === w ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.04)",
                color: selectedWeek === w ? "#fff" : "#64748b",
                boxShadow: selectedWeek === w ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
              }}>
              Week {w}
            </button>
          ))}
        </div>

        {/* Week Title */}
        <div style={{ marginBottom: 20, paddingLeft: 4 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#cbd5e1", margin: 0 }}>
            {weekLabels[selectedWeek - 1]}
          </h2>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>Click any day to expand the full schedule</p>
        </div>

        {/* Day Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {weekDays.map((day) => {
            const ph = phaseColors[day.phase];
            const isOpen = expandedDay === day.day;
            const totalHours = day.slots.reduce((sum, s) => {
              const match = s.duration.match(/(\d+(\.\d+)?)\s*h/);
              const mMatch = s.duration.match(/(\d+)\s*m/);
              return sum + (match ? parseFloat(match[1]) : 0) + (mMatch ? parseInt(mMatch[1]) / 60 : 0);
            }, 0);

            return (
              <div key={day.day} className="day-card" style={{ borderRadius: 14, overflow: "hidden", background: "rgba(15,23,42,0.8)" }}>
                {/* Card Header */}
                <button onClick={() => setExpandedDay(isOpen ? null : day.day)}
                  style={{ width: "100%", padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: ph.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>D{day.day}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{day.title}</span>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${ph.dot}22`, color: ph.dot, fontWeight: 500 }}>{day.phase}</span>
                    </div>
                    <div style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>
                      {day.slots.length} sessions · ~{totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1)} hrs
                    </div>
                  </div>
                  <div style={{ color: "#475569", fontSize: 18, transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</div>
                </button>

                {/* Expanded Slots */}
                {isOpen && (
                  <div style={{ padding: "0 18px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                      {day.slots.map((slot, i) => {
                        const ts = typeStyle[slot.type] || typeStyle.learn;
                        return (
                          <div key={i} className="slot-row" style={{ paddingLeft: 14, paddingTop: 2, paddingBottom: 2 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                              <span style={{ fontSize: 16, marginTop: 1 }}>{ts.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4a6fa5", background: "rgba(74,111,165,0.12)", padding: "2px 7px", borderRadius: 5 }}>{slot.time}</span>
                                  <span style={{ fontSize: 11, color: "#334155", background: "rgba(255,255,255,0.04)", padding: "2px 7px", borderRadius: 5 }}>{slot.duration}</span>
                                </div>
                                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{slot.task}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resources Footer */}
        <div style={{ marginTop: 32, padding: 20, borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "#818cf8", margin: "0 0 12px" }}>📚 Key Resources</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            {[
              ["PrepInsta", "TCS NQT mocks & PYQs"],
              ["IndiaBix", "Aptitude practice"],
              ["HackerRank", "Coding problems"],
              ["GFG", "TCS coding PYQs"],
              ["TCS iON Portal", "Official sample papers"],
            ].map(([name, desc]) => (
              <div key={name} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#c7d2fe" }}>{name}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
