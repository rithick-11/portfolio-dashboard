import React, { useEffect, useState } from "react";
import { Navbar, ProjectFormContainer } from "../../Components";
import { IoConstructOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useStore from "../../store/useStore";
import { apiStatus } from "../../store/api";

const initProjectData = {
  name: "loading...",
  desc: "loading...",
  category: "",
  techStack: [],
  projectImg:
    "https://res.cloudinary.com/dwpmsw2i4/image/upload/v1740225007/DALL_E_2025-01-23_20.09.44_-_A_conceptual_illustration_of_a_RESTful_API_for_a_blog_management_system._The_design_includes_a_central_node_labeled_API_connected_to_user_roles_Adm_xi76et.webp",
  siteLink: "",
  sourceCode: "",
  order: 0,
};

const ProjectEdit = () => {
  const { id } = useParams();
  const [project, setProject] = useState(initProjectData);
  const { getProjectById, onUpadateProject } = useStore();
  const [apiState, setApiState] = useState(apiStatus.initial);
  const [techStack, setTechStack] = useState([]);
  const [projectImg, setProjectImg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const getProjectDetails = async () => {
    try {
      setApiState(apiStatus.loading);
      const projectDetails = await getProjectById(id);
      setProject(projectDetails);
      setApiState(apiStatus.success);
    } catch (error) {
      console.log(error);
      setApiState(apiStatus.error);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) : value;
    setProject({ ...project, [name]: val });
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

  const onUpdateProject = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const res = await onUpadateProject(id, project);
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

  return (
    <section className="container-width pb-5">
      <Navbar />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-lg font-normal flex items-center gap-2">
          <IoConstructOutline className="text-3xl" />
          Edit project
        </h1>
      </div>
      {apiState === apiStatus.loading && (
        <div className="text-center text-lg font-medium my-10">Loading...</div>
      )}
      {apiState === apiStatus.error && (
        <div className="text-center text-lg font-medium my-10">
          Something went wrong!
        </div>
      )}
      {apiState === apiStatus.success && (
        <ProjectFormContainer
          projectData={project}
          handleChange={handleChange}
          onAddTechStack={onAddTechStack}
          onDeleteTechStack={onDeleteTechStack}
          techStack={techStack}
          setTechStack={setTechStack}
          submitText={"Update Project"}
          onSubmitForm={onUpdateProject}
          projectImg={projectImg}
          setProjectImg={setProjectImg}
          btnLoading={btnLoading}
        />
      )}
    </section>
  );
};

export default ProjectEdit;
