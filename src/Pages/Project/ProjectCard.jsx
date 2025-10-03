import React from "react";
import { FaCode, FaGlobe } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ data }) => {
  const {
    category,
    desc,
    name,
    order,
    techStack = ["react", "next", "node"],
    projectImg,
    siteLink,
    sourceCode,
    _id,
  } = data;
  return (
    <li className="text-sm border border-white/10 rounded-md overflow-hidden">
      <img
        className="w-full aspect-16/9 object-cover"
        src={projectImg}
        alt={name}
      />
      <div className="p-4 flex flex-col h-full gap-2">
        <h2 className="font-normal">{name}</h2>
        <p className="text-xs font-light text-white/50">{desc}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-sm flex items-center gap-2 font-normal self-baseline-last">
            <FaCode /> Teach Stack:
          </h1>
          <ul className="flex items-center gap-2 flex-wrap text-xs">
            {techStack.map((tech) => (
              <li className="bg-amber-50/90 text-black px-1 rounded-sm">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-sm flex items-center gap-2 font-normal self-baseline-last">
            <FaGithub /> Source Code:{" "}
          </h1>
          <a
            className="underline"
            href={sourceCode}
            target="_blank"
            rel="noreferrer"
          >
            {sourceCode}
          </a>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-sm flex items-center gap-2 font-normal self-baseline-last">
            <FaGlobe /> Live link:{" "}
          </h1>
          <a
            href={siteLink}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {siteLink}
          </a>
        </div>
        <Link
          to={`/project/edit/${_id}`}
          className="bg-white/90 self-end text-sm mb-0 px-2 py-1 rounded  block text-center font-bold  text-black w-full"
        >
          Edit Project
        </Link>
      </div>
    </li>
  );
};

export default ProjectCard;
