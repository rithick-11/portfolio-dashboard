import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Users from "./Pages/Users/Users";
import Project from "./Pages/Project/Project";
import ProjectDetial from "./Pages/ProjectDetial/ProjectDetial";
import NewProject from "./Pages/NewProject";
import ProjectEdit from "./Pages/ProjectEdit";
import MessagesPage from "./Pages/Messages";
import NxtPre from "./Pages/NqtPre/NxtPre";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/portfolio-dashboard">
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/nqt-preparation" element={<NxtPre />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/project" element={<Project />} />
            <Route exact path="/messages" element={<MessagesPage />} />
            <Route exact path="/project/new" element={<NewProject />} />
            <Route exact path="/project/edit/:id" element={<ProjectEdit />} />
            <Route exact path="/project/:id" element={<ProjectDetial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
