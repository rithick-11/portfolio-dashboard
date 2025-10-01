import React from "react";
import { Link } from "react-router-dom";
import { Navbar, RecentVisti } from "../../Components";
import { LuUsers } from "react-icons/lu";
import { IoConstructOutline } from "react-icons/io5";
import useStore from "../../store/useStore";
import Messages from "../../Components/Messages";

const Home = () => {
  const { getInitalData } = useStore();
  React.useEffect(() => {
    getInitalData();
  }, []);

  return (
    <section className="container-width">
      <Navbar />
      <div className="mt-6 mb-6 grid grid-cols-2 h-full gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="page-link card-center-col">
          <LuUsers className="text-3xl" />
          <p className="text-md">Users</p>
          <Link to={"/users"} className="absolute inset-0 "></Link>
        </div>
        <div className="page-link card-center-col">
          <IoConstructOutline className="text-3xl" />
          <p className="text-md">Projects</p>
          <Link to={"/users"} className="absolute inset-0 "></Link>
        </div>
      </div>

      <RecentVisti />
      <Messages />
    </section>
  );
};

export default Home;
