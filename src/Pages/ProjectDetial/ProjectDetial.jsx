import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../../Components";
import {
  LuArrowLeft, LuGlobe, LuGithub, LuPencil,
  LuTag, LuCode, LuExternalLink, LuImageOff,
} from "react-icons/lu";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3010";
const ease = [0.25, 0.46, 0.45, 0.94];

const ProjectDetial = () => {
  const { id } = useParams();
  const [state, setState] = useState({ status: "loading", project: null });

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch(`${API}/admin/project/${id}`);
        const data = await res.json();
        // Admin route returns { project: {...} }  ← singular, not plural
        if (data.project) {
          setState({ status: "success", project: data.project });
        } else {
          setState({ status: "error", project: null });
        }
      } catch {
        setState({ status: "error", project: null });
      }
    };
    load();
  }, [id]);

  const { status, project } = state;

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8 pb-16">

        {/* ── Back ── */}
        <Link
          to="/project"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors group"
        >
          <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* ── Loading ── */}
        {status === "loading" && (
          <div className="glass-card p-12 text-center animate-pulse">
            <div className="h-6 w-48 bg-white/10 rounded-lg mx-auto mb-3" />
            <div className="h-4 w-32 bg-white/5 rounded-lg mx-auto" />
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <div className="glass-card p-10 text-center">
            <p className="text-red-400/70 text-sm mb-3">Failed to load project data.</p>
            <Link to="/project" className="text-orange-400 text-sm hover:underline">← Go back</Link>
          </div>
        )}

        {/* ── Success ── */}
        {status === "success" && project && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                {project.category && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-full">
                    <LuTag className="text-[10px]" />
                    {project.category}
                  </span>
                )}
              </div>
              <Link
                to={`/project/edit/${id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-500/20 flex-shrink-0"
              >
                <LuPencil className="text-sm" /> Edit Project
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ── LEFT: Image + desc ── */}
              <div className="lg:col-span-3 flex flex-col gap-5">

                {/* Image */}
                <div className="glass-card overflow-hidden rounded-2xl bg-black/30">
                  {project.projectImg ? (
                    <img
                      src={project.projectImg}
                      alt={project.name}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="aspect-video flex items-center justify-center">
                      <LuImageOff className="text-4xl text-white/15" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="glass-card p-5">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Description</p>
                  <p className="text-sm text-white/60 leading-relaxed">{project.desc || "No description provided."}</p>
                </div>
              </div>

              {/* ── RIGHT: Details ── */}
              <div className="lg:col-span-2 flex flex-col gap-4">

                {/* Tech stack */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <LuCode className="text-orange-500 text-base" />
                    <h2 className="text-sm font-semibold text-white">Tech Stack</h2>
                  </div>
                  {project.techStack?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-300/80 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white/25">No tech stack listed.</p>
                  )}
                </div>

                {/* Links */}
                <div className="glass-card p-5 flex flex-col gap-3">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Links</p>
                  {project.siteLink ? (
                    <a href={project.siteLink} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors w-full">
                      <LuGlobe className="text-sm" /> Open Live Demo
                      <LuExternalLink className="ml-auto text-xs opacity-70" />
                    </a>
                  ) : (
                    <p className="text-xs text-white/25">No live link.</p>
                  )}
                  {project.sourceCode ? (
                    <a href={project.sourceCode} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-sm font-medium transition-all w-full">
                      <LuGithub className="text-sm" /> View Source Code
                      <LuExternalLink className="ml-auto text-xs opacity-70" />
                    </a>
                  ) : (
                    <p className="text-xs text-white/25">No source code link.</p>
                  )}
                </div>

                {/* Meta info */}
                <div className="glass-card p-5">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Details</p>
                  <dl className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-white/40">Display Order</dt>
                      <dd className="text-xs font-semibold text-white/70">#{project.order ?? "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-white/40">Category</dt>
                      <dd className="text-xs font-semibold text-white/70">{project.category || "—"}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-xs text-white/40">Tech count</dt>
                      <dd className="text-xs font-semibold text-white/70">{project.techStack?.length ?? 0} technologies</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetial;
