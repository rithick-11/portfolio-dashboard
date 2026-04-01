import React from "react";
import { Link } from "react-router-dom";
import { Navbar, RecentVisti } from "../../Components";
import {
  LuUsers, LuFolderOpen, LuMessageSquare, LuEye,
  LuPlus, LuUser, LuClock, LuMail,
} from "react-icons/lu";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import useStore from "../../store/useStore";
import { apiStatus } from "../../store/api";

const ease = [0.25, 0.46, 0.45, 0.94];

// ── Compact stat card ──
const StatCard = ({ icon: Icon, label, value, accent, delay, href }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease, delay }}
    className="stat-card flex items-center gap-3 !py-3.5"
  >
    <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0`}
      style={{ background: "rgba(249,115,22,0.12)" }}>
      <Icon className="text-orange-500 text-sm" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] text-white/35 font-semibold uppercase tracking-widest">{label}</p>
      <p className="text-xl font-bold text-white leading-tight">
        {value ?? <span className="text-sm text-white/25 font-normal">…</span>}
      </p>
    </div>
    {href && (
      <Link to={href} className="text-[10px] text-white/25 hover:text-orange-400 transition-colors flex-shrink-0">
        →
      </Link>
    )}
  </motion.div>
);

// ── Inline latest messages panel ──
const LatestMessages = ({ messages, isLoaded }) => {
  const maskEmail = (email = "") => {
    const [u, d] = email.split("@");
    if (!u || !d) return email;
    return `${u[0]}${"*".repeat(Math.max(u.length - 2, 1))}${u.slice(-1)}@${d}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.3 }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
        <div className="flex items-center gap-2">
          <LuMessageSquare className="text-orange-500 text-base" />
          <h2 className="text-sm font-semibold text-white">Latest Messages</h2>
          {isLoaded && messages?.length > 0 && (
            <span className="text-[10px] bg-orange-500/15 border border-orange-500/25 text-orange-400 font-bold px-1.5 py-0.5 rounded-full">
              {messages.length}
            </span>
          )}
        </div>
        <Link to="/messages" className="text-[10px] text-white/30 hover:text-orange-400 transition-colors">
          View all →
        </Link>
      </div>

      {/* Message list */}
      <div className="overflow-y-auto flex-1">
        {!isLoaded && (
          <div className="p-6 text-center text-white/25 text-xs animate-pulse">Loading…</div>
        )}
        {isLoaded && (!messages || messages.length === 0) && (
          <div className="p-8 text-center text-white/20 text-xs">No messages yet</div>
        )}
        {isLoaded && messages?.length > 0 && (
          <ul className="divide-y divide-white/6">
            {[...messages]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((msg, i) => (
              <li key={i} className="px-5 py-3.5 hover:bg-white/3 transition-colors">
                {/* Sender row */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400 flex-shrink-0">
                    {msg?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-xs font-semibold text-white/80 truncate">{msg?.name}</span>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-white/25 flex-shrink-0">
                    <LuClock className="text-[8px]" />
                    {msg?.createdAt
                      ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
                      : "—"}
                  </span>
                </div>
                {/* Email */}
                <p className="text-[10px] text-white/30 flex items-center gap-1 mb-1.5">
                  <LuMail className="text-[9px]" />
                  {maskEmail(msg?.email)}
                </p>
                {/* Message preview */}
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{msg?.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

// ── Quick actions compact row ──
const actions = [
  { label: "New Project", href: "/project/new", icon: LuPlus },
  { label: "Projects",    href: "/project",     icon: LuFolderOpen },
  { label: "Users",       href: "/users",       icon: LuUsers },
  { label: "Messages",    href: "/messages",    icon: LuMessageSquare },
];

const Home = () => {
  const { getInitalData, getInitalDataStatus, vistCount, messages, projects } = useStore();

  React.useEffect(() => { getInitalData(); }, []);

  const isLoaded = getInitalDataStatus === apiStatus.success;

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8 flex flex-col gap-6">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-white/35 mt-0.5">Welcome back, Rithick.</p>
        </motion.div>

        {/* ── Compact stat row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={LuEye}           label="Visitors" value={isLoaded ? (vistCount ?? 0) : null} delay={0} />
          <StatCard icon={LuMessageSquare} label="Messages" value={isLoaded ? (messages?.length ?? 0) : null} delay={0.06} href="/messages" />
          <StatCard icon={LuFolderOpen}    label="Projects" value={isLoaded ? (projects?.length ?? "—") : null} delay={0.12} href="/project" />
          <StatCard icon={LuUsers}         label="Users"    value="—" delay={0.18} href="/users" />
        </div>

        {/* ── Quick action pills ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap"
        >
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.href} to={a.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-orange-500/35 hover:bg-orange-500/8 text-white/55 hover:text-white text-xs font-medium transition-all">
                <Icon className="text-xs" /> {a.label}
              </Link>
            );
          })}
        </motion.div>

        {/* ══════ PRIMARY: Recent Visits + Messages ══════ */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Recent visits — wider */}
          <div className="xl:col-span-3 min-h-0">
            <RecentVisti />
          </div>

          {/* Latest messages — narrower */}
          <div className="xl:col-span-2 min-h-0">
            <LatestMessages messages={messages} isLoaded={isLoaded} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
