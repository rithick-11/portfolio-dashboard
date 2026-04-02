import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components";
import { LuUsers, LuMail, LuCalendar, LuRefreshCw } from "react-icons/lu";
import { motion } from "framer-motion";
import { format } from "date-fns";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3010";
const ease = [0.25, 0.46, 0.45, 0.94];

const Users = () => {
  const [state, setState] = useState({ status: "idle", data: null, error: "" });

  const fetchUsers = async () => {
    setState((p) => ({ ...p, status: "loading" }));
    try {
      const res  = await fetch(`${API}/admin/user-detial`);
      const data = await res.json();
      setState({ status: "success", data, error: "" });
    } catch {
      setState({ status: "error", data: null, error: "Failed to load users." });
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Users</h1>
            <p className="text-sm text-white/40 mt-1">All registered portfolio users</p>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white text-sm transition-all cursor-pointer"
          >
            <LuRefreshCw className={`text-sm ${state.status === "loading" ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* ── States ── */}
        {state.status === "loading" && (
          <div className="glass-card p-12 text-center text-white/30 animate-pulse">
            Loading users…
          </div>
        )}
        {state.status === "error" && (
          <div className="glass-card p-8 text-center text-red-400/70">{state.error}</div>
        )}

        {/* ── User list ── */}
        {state.status === "success" && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm text-white/40">Total:</span>
              <span className="text-sm font-bold text-orange-500">{state.data?.total ?? 0} users</span>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data?.users?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-white/25">No users yet</td>
                    </tr>
                  )}
                  {state.data?.users?.map((user, i) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease, delay: i * 0.04 }}
                    >
                      <td className="text-white/30 font-mono">{i + 1}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-white/85 font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-mono text-xs bg-white/5 border border-white/8 px-2 py-0.5 rounded-full text-white/60">
                          @{user.username}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-1.5 text-white/50">
                          <LuMail className="text-[10px]" />
                          {user.email}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-1.5 text-white/40">
                          <LuCalendar className="text-[10px]" />
                          {format(new Date(user.createdAt), "d MMM yyyy")}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Users;
