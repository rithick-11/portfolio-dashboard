import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const domainUrl = {
  loaclHost: "http://localhost:3010",
  cloud: "https://portfolio-server-9ly0.onrender.com",
  vercel:'https://portfolio-server-pink-seven.vercel.app'
};

const apiStatusconstan = {
  initial: "intial",
  loading: "loading",
  success: "success",
  fail: "fail",
  errMsg: "",
};

const apiStateInit = {
  status: apiStatusconstan.initial,
  errMsg: "",
  data: {},
};

const Users = () => {

    const [apiRes, setApiRes] = useState(apiStateInit);
    

  const getUsersData = async () => {
    setApiRes((pre) => ({ ...pre, status: apiStatusconstan.loading }));
    try {
      const res = await fetch(`${domainUrl.vercel}/admin/projects`);
      const data = await res.json();
      setApiRes((pre) => ({
        ...pre,
        status: apiStatusconstan.success,
        data: data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {getUsersData()}, []);

  const renderUserListView = () => {
    const {total, projects} = apiRes.data
    
    return(
        <div className="mt-8">
            <h1 className="text-md font-light">total user's : <span className="text-blue-500 font-bold text-lg">{total}</span></h1>
            <ul className="flex flex-col gap-4 mt-5">
                {projects.map((each,i) => <li key={each._id} className="card px-3 py-1 flex justify-between items-center">
                    <div>
                    <h1>Name: {each.name}</h1>
                    <p>{each.likes}</p>
                    </div>
                    <Link to={`/project/${each.id}`} className="inline-block">More</Link>
                </li>)}
            </ul>
        </div>
    )
  }

  const renderView = () => {
    switch (apiRes.status) {
        case apiStatusconstan.success:
          return renderUserListView()
        case apiStatusconstan.fail:
          return <p>can not fetch data</p>;
        case apiStatusconstan.loading:
          return (
            <div className="h-[60vh] w-[80%] flex justify-center items-center">
                <ColorRing
              height="18"
              width="18"
              ariaLabel="color-ring-loading"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
            </div>
          );
        default:
          return null;
      }
  }

  return (
    <section className="px-4 sm:px-10 md:px-26 my-4 text-white">
      <h1 className="text-2xl font-medium">Prject Detial</h1>
      {renderView()}
    </section>
  );
};

export default Users;
