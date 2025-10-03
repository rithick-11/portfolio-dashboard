import React, { useState } from "react";

import {
  PhotoIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { HiMiniXMark } from "react-icons/hi2";

const ProjectFormContainer = ({
  projectData,
  handleChange,
  onAddTechStack,
  onDeleteTechStack,
  techStack,
  setTechStack,
  submitText,
  onSubmitForm,
  projectImg,
  setProjectImg,
  btnLoading,
}) => {
  // console.log(projectData);

  return (
    <form className="mt-6 space-y-6" onSubmit={onSubmitForm}>
      {projectData.projectImg ? (
        <div className="">
          <div className="relative grid grid-cols-4">
            <img
              className="w-full col-span-4 aspect-16/9 md:col-span-2 lg:col-span-2"
              src={projectData.projectImg}
              alt="Project"
            />
          </div>
          <button
            onClick={() => setProjectData({ ...projectData, projectImg: "" })}
            className=""
          >
            <XCircleIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      ) : (
        <div className="">
          <label
            htmlFor="cover-photo"
            className="block text-sm/6 font-medium text-white"
          >
            project image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto size-12 text-gray-600"
              />
              <div className="mt-4 flex text-sm/6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type=""
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* project name */}
      <div className="">
        <div className="sm:col-span-4">
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-white"
          >
            project name
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="name"
                name="name"
                type="text"
                value={projectData.name}
                onChange={handleChange}
                placeholder="project name"
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* project category */}
      <div className="">
        <div className="sm:col-span-4">
          <label
            htmlFor="category"
            className="block text-sm/6 font-medium text-white"
          >
            project category
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="category"
                name="category"
                type="text"
                value={projectData.category}
                onChange={handleChange}
                placeholder="project name"
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* project description */}
      <div className="">
        <label
          htmlFor="desc"
          className="block text-sm/6 font-medium text-white"
        >
          project description
        </label>
        <div className="mt-2">
          <textarea
            id="desc"
            name="desc"
            value={projectData.desc}
            onChange={handleChange}
            placeholder="project description"
            rows={4}
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            defaultValue={""}
          />
        </div>
        <p className="mt-3 text-sm/6 text-gray-400">
          Write a few sentences about project.
        </p>
      </div>

      {/* tech stack */}
      <div>
        <label
          htmlFor="techStack"
          className="block text-sm/6 font-medium text-white"
        >
          Tech Stack
        </label>
        <ul className="flex gap-2 my-2 flex-wrap my-2">
          {}
          {projectData?.techStack?.map((tech, index) => (
            <li
              key={index}
              className="bg-white/5 p-1 text-sm rounded px-2 relative flex"
            >
              <p>{tech}</p>
              <button
                onClick={(e) => onDeleteTechStack(e, index)}
                className="border-l  pl-2 ml-2 border-white/25 text-gray-400 hover:text-gray-200"
              >
                <HiMiniXMark className="text-white" />
              </button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-12">
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Add the tech stack"
            className="block col-span-5 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <button
            onClick={onAddTechStack}
            className="col-span-2 ml-2 rounded-md bg-indigo-500 px-3 py-1.5 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm/6"
          >
            Add
          </button>
        </div>
      </div>

      {/* source code */}
      <div className="">
        <div className="sm:col-span-4">
          <label
            htmlFor="sourceCode"
            className="block text-sm/6 font-medium text-white"
          >
            Source Code link
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="sourceCode"
                name="sourceCode"
                type="url"
                placeholder="eg. https://github.com/"
                onChange={handleChange}
                value={projectData.sourceCode}
                required
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-white"
          >
            Project live link
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="siteLink"
                name="siteLink"
                type="url"
                placeholder="eg. https://yourproject.com/"
                required
                value={projectData.siteLink}
                onChange={handleChange}
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      {/* source code */}
      <div className="">
        <div className="sm:col-span-4">
          <label
            htmlFor="order"
            className="block text-sm/6 font-medium text-white"
          >
            project display order
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="order"
                name="order"
                type="number"
                placeholder="eg. https://github.com/"
                onChange={handleChange}
                value={projectData.order}
                required
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md w-full bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {btnLoading ? "Loading..." : submitText}
      </button>
    </form>
  );
};

export default ProjectFormContainer;
