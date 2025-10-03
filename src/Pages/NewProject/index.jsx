import React, { useState } from "react";
import { Navbar, ProjectFormContainer } from "../../Components";
import { IoConstructOutline } from "react-icons/io5";
import useStore from "../../store/useStore";

const initProjectData = {
  name: "",
  desc: "dasdasds",
  category: "",
  techStack: [],
  projectImg: "",
  siteLink: "https://claude.ai/chat/c82b30d0-2b88-4f13-9da0-840483270a81",
  sourceCode: "https://claude.ai/chat/c82b30d0-2b88-4f13-9da0-840483270a81",
  order: 0,
};

const NewProject = () => {
  const [project, setProject] = useState(initProjectData);
  const [techStack, setTechStack] = useState([]);
  const [projectImg, setProjectImg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const { onCreateNewProject } = useStore();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) : value;
    setProject({ ...project, [name]: val });
    console.log(project);
  };

  const onAddTechStack = (e) => {
    e.preventDefault();
    if (!techStack) return;
    setProject({ ...project, techStack: [...project.techStack, techStack] });
    setTechStack("");
  };

  const onDeleteTechStack = (e, index) => {
    e.preventDefault();
    const updatedTechStack = project.techStack.filter((_, i) => i !== index);
    setProject({ ...project, techStack: updatedTechStack });
    console.log(updatedTechStack);
  };

  const onAddNewProject = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newProject = { ...project, projectImg: reader.result };
      try {
        const res = await onCreateNewProject(newProject);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setBtnLoading(false);
    };

    reader.readAsDataURL(project.projectImg);
  };

  return (
    <section className="container-width pb-5">
      <Navbar />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-lg font-normal flex items-center gap-2">
          <IoConstructOutline className="text-3xl" />
          New project
        </h1>
      </div>
      <ProjectFormContainer
        projectData={project}
        handleChange={handleChange}
        onAddTechStack={onAddTechStack}
        onDeleteTechStack={onDeleteTechStack}
        techStack={techStack}
        setTechStack={setTechStack}
        submitText={"Create Project"}
        onSubmitForm={onAddNewProject}
        projectImg={projectImg}
        setProjectImg={setProjectImg}
        btnLoading={btnLoading}
      />
    </section>
  );
};

export default NewProject;
