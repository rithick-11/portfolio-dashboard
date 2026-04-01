import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components";
import { ProjectFormContainer } from "../../Components";
import { LuPencil, LuArrowLeft } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { apiStatus } from "../../store/api";
import { toast } from "react-hot-toast";

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, onUpadateProject } = useStore();

  const [project, setProject]     = useState(null);
  const [fetchStatus, setFetch]   = useState(apiStatus.loading);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
        setFetch(apiStatus.success);
      } catch {
        setFetch(apiStatus.error);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) : value;
    setProject((p) => ({ ...p, [name]: val }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await onUpadateProject(id, project);
      toast.success("Project updated!");
      navigate("/project");
    } catch {
      toast.error("Failed to update project.");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <Link to="/project"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-4 transition-colors group">
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <LuPencil className="text-orange-500 text-base" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Edit Project</h1>
              <p className="text-xs text-white/35 mt-0.5">{project?.name ?? "Loading…"}</p>
            </div>
          </div>
        </div>

        {fetchStatus === apiStatus.loading && (
          <div className="glass-card p-12 text-center text-white/30 animate-pulse max-w-3xl">
            Loading project data…
          </div>
        )}
        {fetchStatus === apiStatus.error && (
          <div className="glass-card p-10 text-center text-red-400/70 max-w-3xl">
            Failed to load project. <Link to="/project" className="text-orange-400 hover:underline">Go back</Link>
          </div>
        )}
        {fetchStatus === apiStatus.success && project && (
          <div className="glass-card p-6 max-w-3xl">
            <ProjectFormContainer
              projectData={project}
              handleChange={handleChange}
              submitText="Update Project"
              onSubmitForm={onSubmit}
              btnLoading={btnLoading}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectEdit;
