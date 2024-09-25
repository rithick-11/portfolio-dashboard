import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";

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

const ProjectDetial = () => {
  const { id } = useParams();

  const [apiRes, setApiRes] = useState(apiStateInit);

  const getUsersData = async () => {
    setApiRes((pre) => ({ ...pre, status: apiStatusconstan.loading }));
    try {
      const res = await fetch(`${domainUrl.vercel}/admin/project/${id}`);
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

  useEffect(() => {
    getUsersData();
  }, []);

  const renderUserListView = () => {
    let { category, projectImg, likedUser, siteLink, desc, name } =
      apiRes.data.projects;
     likedUser = [...likedUser].reverse()

    return (
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg">{name}</h1>
          <p className="text-sm">({category})</p>
        </div>
        <img src={projectImg} alt={name} className="h-52" />
        <p className="text-sm font-light">{desc}</p>
        <a href={siteLink} target="_blank" rel="noreferrer" >Vist</a>
        <ul className="flex flex-col gap-4 mt-5">
        <h1 className="text-md">Liked Users : {likedUser.length}</h1>
          {likedUser.map((each) => (
            <li>
                <p className="text-sm font-medium">{each.username}</p>
                <p className="text-sm font-light">{new  Date(each.likedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderView = () => {
    switch (apiRes.status) {
      case apiStatusconstan.success:
        return renderUserListView();
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
  };

  return (
    <section className="px-4 sm:px-10 md:px-26 my-4 text-white">
      <h1 className="text-2xl font-medium">Project data</h1>
      {renderView()}
    </section>
  );
};

export default ProjectDetial;
