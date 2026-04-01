import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard, LuFolderOpen, LuUsers,
  LuMessageSquare, LuLogOut, LuMenu, LuX, LuEye,
} from "react-icons/lu";
import Cookies from "js-cookie";
import useStore from "../store/useStore";
import { apiStatus } from "../store/api";

const navItems = [
  { label: "Dashboard", href: "/",         icon: LuLayoutDashboard },
  { label: "Projects",  href: "/project",  icon: LuFolderOpen      },
  { label: "Users",     href: "/users",    icon: LuUsers           },
  { label: "Messages",  href: "/messages", icon: LuMessageSquare   },
];

const Navbar = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [open, setOpen] = useState(false);

  const { messages, vistCount, getInitalData, getInitalDataStatus } = useStore();

  React.useEffect(() => { getInitalData(); }, []);

  const handleLogout = () => {
    Cookies.remove("user_token");
    navigate("/login");
  };

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.href ||
      (item.href !== "/" && location.pathname.startsWith(item.href));
    const Icon = item.icon;
    const badge = item.href === "/messages" ? (messages?.length || 0) : 0;

    return (
      <Link
        to={item.href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-orange-500/15 text-orange-400 border border-orange-500/25"
            : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
      >
        <Icon className="text-base flex-shrink-0" />
        {item.label}
        {badge > 0 && (
          <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const SidebarInner = () => (
    <div className="flex flex-col h-full">
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-5 border-b border-white/8">
        <Link to="/" className="block" onClick={() => setOpen(false)}>
          <span className="text-xl font-bold text-white tracking-tight">
            Rithic<span className="text-orange-500">K</span>
          </span>
          <span className="block text-[11px] text-white/30 font-normal mt-0.5 tracking-wide">
            Admin Dashboard
          </span>
        </Link>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-3 mb-2">
          Navigation
        </p>
        {navItems.map((item) => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* ── Visitor stats pill ── */}
      {getInitalDataStatus === apiStatus.success && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-3 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3">
            <LuEye className="text-orange-500 text-lg flex-shrink-0" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Visitors</p>
              <p className="text-lg font-bold text-orange-400 leading-tight">
                {vistCount ?? 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Logout ── */}
      <div className="px-3 pb-4 border-t border-white/8 pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LuLogOut className="text-base" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ══════ Desktop sidebar (fixed left) ══════ */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-[#0f0f12] border-r border-white/8 z-30">
        <SidebarInner />
      </aside>

      {/* ══════ Mobile top bar ══════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-16 bg-[#0f0f12] border-b border-white/8">
        <Link to="/" className="text-lg font-bold text-white tracking-tight">
          Rithic<span className="text-orange-500">K</span>
        </Link>
        <button
          onClick={() => setOpen((p) => !p)}
          className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          {open ? <LuX className="text-base" /> : <LuMenu className="text-base" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-64 bg-[#0f0f12] border-r border-white/10 z-50 lg:hidden flex flex-col">
            <SidebarInner />
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
