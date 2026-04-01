import React, { useEffect } from "react";
import { Navbar } from "../../Components";
import useStore from "../../store/useStore";
import { apiStatus } from "../../store/api";
import { Link } from "react-router-dom";
import { LuFolderOpen, LuPlus, LuPencil, LuGlobe, LuGithub, LuHeart } from "react-icons/lu";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94];

const ProjectCard = ({ data, i }) => {
  const { _id, name, desc, projectImg, techStack = [], siteLink, sourceCode, likes } = data;
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease, delay: i * 0.07 }}
      className="glass-card overflow-hidden flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden flex-shrink-0 bg-black/30">
        <img
          src={projectImg}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Like count badge */}
        {likes > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
            <LuHeart className="text-red-400 text-[10px]" />
            <span className="text-white text-[10px] font-semibold">{likes}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h2 className="font-semibold text-sm text-white/90 mb-1">{name}</h2>
          <p className="text-xs text-white/45 line-clamp-2 leading-relaxed">{desc}</p>
        </div>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-300/80">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links + actions */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/8">
          {siteLink && (
            <a href={siteLink} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs text-white/45 hover:text-white transition-colors">
              <LuGlobe className="text-xs" /> Live
            </a>
          )}
          {sourceCode && (
            <a href={sourceCode} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs text-white/45 hover:text-white transition-colors">
              <LuGithub className="text-xs" /> Code
            </a>
          )}
          <Link
            to={`/project/edit/${_id}`}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-400 hover:bg-orange-500 hover:text-white text-xs font-semibold transition-all"
          >
            <LuPencil className="text-[10px]" /> Edit
          </Link>
          <Link
            to={`/project/${_id}`}
            className="flex items-center gap-1 text-xs text-white/35 hover:text-white transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.li>
  );
};

const Project = () => {
  const { getInitalProjectData, projects, getInitalProjectsStatus } = useStore();

  useEffect(() => { getInitalProjectData(); }, []);

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <LuFolderOpen className="text-orange-500 text-base" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Projects</h1>
              <p className="text-xs text-white/35 mt-0.5">
                {projects?.length ?? 0} total · sorted by display order
              </p>
            </div>
          </div>
          <Link
            to="/project/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-500/20"
          >
            <LuPlus className="text-base" /> New Project
          </Link>
        </div>

        {getInitalProjectsStatus === apiStatus.loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card animate-pulse h-72 rounded-2xl" />
            ))}
          </div>
        )}
        {getInitalProjectsStatus === apiStatus.error && (
          <div className="glass-card p-10 text-center text-red-400/70">Failed to load projects.</div>
        )}
        {getInitalProjectsStatus === apiStatus.success && (
          projects?.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <LuFolderOpen className="text-5xl text-white/15 mx-auto mb-4" />
              <p className="text-white/30 text-sm">No projects yet.</p>
              <Link to="/project/new" className="inline-block mt-4 text-orange-400 text-sm hover:underline">
                Create your first project →
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, i) => (
                <ProjectCard key={project._id} data={project} i={i} />
              ))}
            </ul>
          )
        )}
      </main>
    </div>
  );
};

export default Project;
