import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "13px",
          },
          success: { iconTheme: { primary: "#f97316", secondary: "#fff" } },
          error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      <BrowserRouter basename="/portfolio-dashboard">
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/nqt-preparation" element={<NxtPre />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/"               element={<Home />} />
            <Route exact path="/users"          element={<Users />} />
            <Route exact path="/project"        element={<Project />} />
            <Route exact path="/messages"       element={<MessagesPage />} />
            <Route exact path="/project/new"    element={<NewProject />} />
            <Route exact path="/project/edit/:id" element={<ProjectEdit />} />
            <Route exact path="/project/:id"    element={<ProjectDetial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
