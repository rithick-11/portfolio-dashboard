import React, { useState } from "react";
import Cookies from "js-cookie";
import { ColorRing } from "react-loader-spinner";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const ease = [0.25, 0.46, 0.45, 0.94];

const API = "https://portfolio-server-pink-seven.vercel.app";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/60 focus:bg-orange-500/5 outline-none text-sm text-white placeholder:text-white/25 transition-all";

const Field = ({ label, id, icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
      {icon}{label}
    </label>
    {children}
  </div>
);

const STATUS = { idle: "idle", loading: "loading" };

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ username: "", password: "" });
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError]   = useState("");

  if (Cookies.get("user_token") !== undefined) return <Navigate to="/" />;

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus(STATUS.loading);
    setError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 200) {
        Cookies.set("user_token", data.token, { expires: 2 });
        navigate("/");
      } else {
        setError(data.msg || "Login failed.");
      }
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setStatus(STATUS.idle);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[#0a0a0c] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.12),transparent)] -z-10" />
      <div className="fixed inset-0 -z-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-orange-500/15 border border-orange-500/25 mb-4">
              <span className="text-orange-500 font-bold text-xl">R</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
            <p className="text-xs text-white/35 mt-1">Portfolio Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Field label="Username" id="username" icon={<FaUser className="text-[10px]" />}>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Admin username"
                value={form.username}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
            <Field label="Password" id="password" icon={<FaLock className="text-[10px]" />}>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                ✕ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === STATUS.loading}
              className="mt-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              {status === STATUS.loading ? (
                <><ColorRing height="18" width="18" colors={["#fff","#fff","#fff","#fff","#fff"]} /> Signing in…</>
              ) : "Sign In"}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-white/20 mt-5">
          Rithick Portfolio · Admin Only
        </p>
      </div>
    </div>
  );
};

export default Login;
