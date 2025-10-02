import React, { useEffect } from "react";
import { Navbar } from "../../Components";
import useStore from "../../store/useStore";

import { IoConstructOutline } from "react-icons/io5";
import { apiStatus } from "../../store/api";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";

const Project = () => {
  const { getInitalProjectData, projects, getInitalProjectsStatus } =
    useStore();

  useEffect(() => {
    getInitalProjectData();
  }, []);

  return (
    <section className="container-width">
      <Navbar />
      <div className="flex items-center justify-between my-4">
        <h1 className="text-lg font-normal flex items-center gap-2">
          <IoConstructOutline className="text-3xl" />
          Projects
        </h1>
        <Link
          to={"/project/new"}
          className="bg-white/90 text-black px-2 py-1 rounded-md hover:bg-transparent border text-sm font-medium hover:border-white hover:text-white transition-all duration-200"
        >
          {" "}
          New Project{" "}
        </Link>
      </div>
      <ul className="mt-6 mb-6 grid grid-cols-1 h-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getInitalProjectsStatus === apiStatus.loading && "Loading..."}
        {getInitalProjectsStatus === apiStatus.error && "Error"}
        {getInitalProjectsStatus === apiStatus.success &&
          projects?.map((project) => (
            <ProjectCard key={project._id} data={project} />
          ))}
      </ul>
    </section>
  );
};

export default Project;
