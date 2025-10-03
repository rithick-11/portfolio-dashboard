import React, { useState } from "react";

import {
  PhotoIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { HiMiniXMark } from "react-icons/hi2";

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

const ProjectFormContainer = ({
  projectData = initProjectData,
  handleChange = () => {},
  onAddTechStack = () => {},
  onDeleteTechStack = () => {},
  techStack = [],
  setTechStack = () => {},
  submitText = "Submit",
  onSubmitForm = () => {},
  onRemoveImage = () => {},
  btnLoading = false,
}) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Pass the file object to handleChange
      handleChange({
        target: {
          name: 'projectImg',
          value: file,
          type: 'file'
        }
      });
    }
  };

  return (
    <form className="mt-6 space-y-6" onSubmit={onSubmitForm}>
      <div>
        {projectData.projectImg ? (
        <div className="relative grid grid-cols-6">
          <div className="relative col-span-6 md:col-span-4 lg:col-span-2">
            <img
              className="w-full aspect-video object-cover rounded-lg"
              src={typeof projectData.projectImg === 'string' 
                ? projectData.projectImg 
                : URL.createObjectURL(projectData.projectImg)}
              alt="Project preview"
            />
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
            >
              <XCircleIcon className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label
            htmlFor="cover-photo"
            className="block text-sm/6 font-medium text-white"
          >
            Project Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto size-12 text-gray-600"
              />
              <div className="mt-4 flex text-sm/6 text-gray-400">
                <label
                  htmlFor="projectImg"
                  className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                >
                  <span>Upload a file</span>
                  <input
                    id="projectImg"
                    name="projectImg"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
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
      </div>

      {/* project name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-white"
        >
          Project Name
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
            <input
              id="name"
              name="name"
              type="text"
              value={projectData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      {/* project category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm/6 font-medium text-white"
        >
          Project Category
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
            <input
              id="category"
              name="category"
              type="text"
              value={projectData.category}
              onChange={handleChange}
              placeholder="Enter project category"
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      {/* project description */}
      <div>
        <label
          htmlFor="desc"
          className="block text-sm/6 font-medium text-white"
        >
          Project Description
        </label>
        <div className="mt-2">
          <textarea
            id="desc"
            name="desc"
            value={projectData.desc}
            onChange={handleChange}
            placeholder="Write a few sentences about your project..."
            rows={4}
            required
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
        </div>
        <p className="mt-3 text-sm/6 text-gray-400">
          Write a few sentences about your project.
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
        {projectData?.techStack?.length > 0 && (
          <ul className="flex gap-2 my-3 flex-wrap">
            {projectData.techStack.map((tech, index) => (
              <li
                key={index}
                className="bg-white/5 p-1 text-sm rounded px-2 relative flex items-center"
              >
                <p>{tech}</p>
                <button
                  type="button"
                  onClick={(e) => onDeleteTechStack(e, index)}
                  className="border-l pl-2 ml-2 border-white/25 text-gray-400 hover:text-gray-200"
                >
                  <HiMiniXMark className="text-white" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="grid grid-cols-12 gap-2">
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Add a technology (e.g., React, Node.js)"
            className="block col-span-6 md:col-end-3  rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <button
            type="button"
            onClick={onAddTechStack}
            className="rounded-md col-span-3 md:col-span-2 lg:col-span-1 bg-indigo-500 px-4 py-1.5 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm/6"
          >
            Add
          </button>
        </div>
      </div>

      {/* source code */}
      <div>
        <label
          htmlFor="sourceCode"
          className="block text-sm/6 font-medium text-white"
        >
          Source Code Link
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
            <input
              id="sourceCode"
              name="sourceCode"
              type="url"
              placeholder="e.g., https://github.com/username/repo"
              onChange={handleChange}
              value={projectData.sourceCode}
              required
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      {/* live link */}
      <div>
        <label
          htmlFor="siteLink"
          className="block text-sm/6 font-medium text-white"
        >
          Project Live Link
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
            <input
              id="siteLink"
              name="siteLink"
              type="url"
              placeholder="e.g., https://yourproject.com"
              required
              value={projectData.siteLink}
              onChange={handleChange}
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      {/* display order */}
      <div>
        <label
          htmlFor="order"
          className="block text-sm/6 font-medium text-white"
        >
          Project Display Order
        </label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
            <input
              id="order"
              name="order"
              type="number"
              placeholder="e.g., 1"
              onChange={handleChange}
              value={projectData.order}
              required
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
        <p className="mt-3 text-sm/6 text-gray-400">
          Lower numbers appear first in the project list.
        </p>
      </div>

      <button
        type="submit"
        disabled={btnLoading}
        className="rounded-md w-full bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {btnLoading ? "Loading..." : submitText}
      </button>
    </form>
  );
};

export default ProjectFormContainer;