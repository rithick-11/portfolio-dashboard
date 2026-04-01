import React, { useState } from "react";
import { LuUpload, LuX, LuPlus, LuImage } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import { ColorRing } from "react-loader-spinner";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/20 focus:border-orange-500/70 focus:bg-orange-500/5 outline-none text-sm text-white placeholder:text-white/30 transition-all";

const Field = ({ label, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-white/40">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-white/25">{hint}</p>}
  </div>
);

const ProjectFormContainer = ({
  projectData = {},
  handleChange = () => {},
  submitText = "Submit",
  onSubmitForm = () => {},
  btnLoading = false,
}) => {
  const [techInput, setTechInput] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleChange({ target: { name: "projectImg", value: file, type: "file" } });
  };

  const onAddTech = (e) => {
    e.preventDefault();
    if (!techInput.trim()) return;
    handleChange({
      target: {
        name: "techStack",
        value: [...(projectData.techStack ?? []), techInput.trim()],
      },
    });
    setTechInput("");
  };

  const onRemoveTech = (e, i) => {
    e.preventDefault();
    handleChange({
      target: {
        name: "techStack",
        value: (projectData.techStack ?? []).filter((_, idx) => idx !== i),
      },
    });
  };

  const clearImage = (e) => {
    e.preventDefault();
    handleChange({ target: { name: "projectImg", value: "", type: "text" } });
  };

  const imgSrc = projectData.projectImg
    ? typeof projectData.projectImg === "string"
      ? projectData.projectImg
      : URL.createObjectURL(projectData.projectImg)
    : null;

  return (
    <form onSubmit={onSubmitForm} className="flex flex-col gap-6">

      {/* ── Image upload ── */}
      <Field label="Project Image">
        {imgSrc ? (
          <div className="relative rounded-2xl overflow-hidden aspect-video max-w-lg border border-white/10 group">
            <img src={imgSrc} alt="Project preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button type="button" onClick={clearImage}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/80 text-white text-xs font-semibold">
                <LuX /> Remove Image
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="projectImg"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 hover:border-orange-500/40 bg-white/3 hover:bg-orange-500/5 transition-all cursor-pointer py-12 px-6 max-w-lg">
            <LuImage className="text-3xl text-white/20" />
            <div className="text-center">
              <p className="text-sm font-semibold text-orange-400">Upload image</p>
              <p className="text-xs text-white/30 mt-1">PNG, JPG up to 10MB</p>
            </div>
            <input id="projectImg" name="projectImg" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
          </label>
        )}
      </Field>

      {/* ── Two-col layout for name + category ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Project Name">
          <input name="name" type="text" required placeholder="e.g. Portfolio Website"
            value={projectData.name ?? ""} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Category">
          <input name="category" type="text" placeholder="e.g. Full Stack, AI, Mobile"
            value={projectData.category ?? ""} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      {/* ── Description ── */}
      <Field label="Description" hint="Write a concise summary of the project goals and outcomes.">
        <textarea name="desc" rows={4} required placeholder="What does this project do?..."
          value={projectData.desc ?? ""} onChange={handleChange}
          className={`${inputClass} resize-none`} />
      </Field>

      {/* ── Tech Stack ── */}
      <Field label="Tech Stack">
        {(projectData.techStack?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {projectData.techStack.map((tech, i) => (
              <span key={i}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-300/90">
                {tech}
                <button type="button" onClick={(e) => onRemoveTech(e, i)}
                  className="hover:text-red-400 transition-colors">
                  <HiMiniXMark />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. React, Node.js, MongoDB"
            value={techInput} onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAddTech(e)}
            className={`${inputClass} flex-1`} />
          <button type="button" onClick={onAddTech}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400 hover:bg-orange-500 hover:text-white text-sm font-semibold transition-all cursor-pointer whitespace-nowrap">
            <LuPlus /> Add
          </button>
        </div>
      </Field>

      {/* ── Links row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="GitHub / Source Code">
          <input name="sourceCode" type="url" placeholder="https://github.com/…"
            value={projectData.sourceCode ?? ""} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Live Site URL">
          <input name="siteLink" type="url" placeholder="https://yourproject.com"
            value={projectData.siteLink ?? ""} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      {/* ── Display Order ── */}
      <Field label="Display Order" hint="Lower numbers appear first in the portfolio.">
        <input name="order" type="number" min={0} placeholder="e.g. 1"
          value={projectData.order ?? 0} onChange={handleChange}
          className={`${inputClass} max-w-xs`} />
      </Field>

      {/* ── Submit ── */}
      <button type="submit" disabled={btnLoading}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-500/20 cursor-pointer">
        {btnLoading
          ? <><ColorRing height="18" width="18" colors={["#fff","#fff","#fff","#fff","#fff"]} /> Saving…</>
          : <><LuUpload className="text-sm" /> {submitText}</>}
      </button>
    </form>
  );
};

export default ProjectFormContainer;
