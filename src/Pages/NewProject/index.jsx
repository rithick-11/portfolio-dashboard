import React from "react";
import { Navbar, ProjectFormContainer } from "../../Components";
import { IoConstructOutline } from "react-icons/io5";

const initProjectData = {
  name: "",
  desc: "",
  category: "",
  techStack: [],
  projectImg:
    "https://res.cloudinary.com/dwpmsw2i4/image/upload/v1740225007/DALL_E_2025-01-23_20.09.44_-_A_conceptual_illustration_of_a_RESTful_API_for_a_blog_management_system._The_design_includes_a_central_node_labeled_API_connected_to_user_roles_Adm_xi76et.webp",
  siteLink: "",
  sourceCode: "",
  order: 0,
};

const NewProject = () => {
  return (
    <section className="container-width pb-5">
      <Navbar />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-lg font-normal flex items-center gap-2">
          <IoConstructOutline className="text-3xl" />
          New project
        </h1>
      </div>
      <ProjectFormContainer projectFormData={initProjectData} />
    </section>
  );
};

export default NewProject;
