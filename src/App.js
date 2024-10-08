import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Users from "./Pages/Users/Users";
import Project from "./Pages/Project/Project";
import ProjectDetial from "./Pages/ProjectDetial/ProjectDetial";

const App = () => {
  return (
    <>
      <div class="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <BrowserRouter basename="/portfolio-dashboard">
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/project" element={<Project />} />
            <Route exact path="/project/:id" element={<ProjectDetial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
