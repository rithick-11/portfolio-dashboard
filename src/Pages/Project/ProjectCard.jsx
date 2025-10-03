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
    <li className="text-sm border h-full border-white/10 rounded-md overflow-hidden">
      <div className="flex h-full flex-col flex-grow">
        <img
          className="w-full aspect-16/9"
          src={projectImg}
          alt={name}
        />
        <div className="p-4 flex flex-grow flex-col gap-3">
          <h2 className="font-normal">{name}</h2>
          <p className="text-xs line-clamp-3 font-light text-white/50">
            {desc}
          </p>
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
          <div className="mt-t flex mt-auto">
            <Link
              to={`/project/edit/${_id}`}
              className="bg-white/90 text-sm block px-2 py-1 rounded text-center font-bold  text-black w-full"
            >
              Edit Project
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
