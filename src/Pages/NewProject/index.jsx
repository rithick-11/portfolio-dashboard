import React, { useState } from "react";
import { Navbar } from "../../Components";
import { ProjectFormContainer } from "../../Components";
import { LuFolderPlus, LuArrowLeft, LuCheck } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { toast } from "react-hot-toast";

const initProjectData = {
  name: "", desc: "", category: "", techStack: [],
  projectImg: "", siteLink: "", sourceCode: "", order: 0,
};

const NewProject = () => {
  const navigate = useNavigate();
  const [project, setProject]     = useState(initProjectData);
  const [btnLoading, setBtnLoading] = useState(false);
  const { onCreateNewProject }    = useStore();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) : value;
    setProject((p) => ({ ...p, [name]: val }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (project.projectImg && typeof project.projectImg !== "string") {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const newProject = { ...project, projectImg: reader.result };
          await onCreateNewProject(newProject);
          toast.success("Project created!");
          navigate("/project");
        };
        reader.readAsDataURL(project.projectImg);
      } else {
        await onCreateNewProject(project);
        toast.success("Project created!");
        navigate("/project");
      }
    } catch (err) {
      toast.error("Failed to create project.");
      console.error(err);
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
              <LuFolderPlus className="text-orange-500 text-base" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">New Project</h1>
              <p className="text-xs text-white/35 mt-0.5">Add a new project to your portfolio</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 max-w-3xl">
          <ProjectFormContainer
            projectData={project}
            handleChange={handleChange}
            submitText="Create Project"
            onSubmitForm={onSubmit}
            btnLoading={btnLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default NewProject;
