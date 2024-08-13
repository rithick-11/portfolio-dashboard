import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Card } from "../../StyledComponents/StyledComponents";
import RecentVist from "../../Components/RecentVist/RecentVist";
import { Link } from "react-router-dom";

const domainUrl = {
  loaclHost: "http://localhost:3010",
  cloud: "https://portfolio-server-9ly0.onrender.com",
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

const Home = () => {
  const [apiRes, setApiRes] = useState(apiStateInit);

  const getVistCount = async () => {
    setApiRes((pre) => ({ ...pre, status: apiStatusconstan.loading }));
    const countApi = `${domainUrl.cloud}/admin/vist-count`;
    const option = {
      method: "get",
    };
    try {
      const res = await fetch(countApi, option);
      const data = await res.json();
      setApiRes((pre) => ({
        ...pre,
        status: apiStatusconstan.success,
        data: data,
      }));
      console.log(data);
    } catch (err) {
      setApiRes((pre) => ({ ...pre, status: apiStatusconstan.fail }));
    }
  };

  useEffect(() => {
    getVistCount();
  }, []);

  const renderCountData = () => {
    switch (apiRes.status) {
      case apiStatusconstan.success:
        return <p className="text-xl font-bold">{apiRes.data.count}</p>;
      case apiStatusconstan.fail:
        return <p>can not fetch data</p>;
      case apiStatusconstan.loading:
        return (
          <ColorRing
            height="18"
            width="18"
            ariaLabel="color-ring-loading"
            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
          />
        );
      default:
        return null;
    }
  };

  const renderRecentVist = () => {
    switch (apiRes.status) {
      case apiStatusconstan.success:
        return <RecentVist data={apiRes.data.recentVist} />;
      case apiStatusconstan.fail:
        return <p>can not fetch data</p>;
      case apiStatusconstan.loading:
        return (
          <ColorRing
            height="18"
            width="18"
            ariaLabel="color-ring-loading"
            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="px-4 sm:px-10 md:px-26 my-4 text-white">
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="grid grid-cols-5 gap-3 mt-5">
        <Card className="card col-span-2 h-28 flex items-center justify-center flex-col gap-3">
          <h1 className="text-lg font-light">Vist Count</h1>
          {renderCountData()}
        </Card>
      </div>
      <Card className="card mt-5 px-4 py-6">
        <h1 className="text-lg font-light mb-4">Recent Vist</h1>
        {renderRecentVist()}
      </Card>

      <Link to="/users" className="text-white inline-block mt-5" >User List</Link>
      <br />
      <Link to="/project" className="text-white inline-block mt-5" >Project List</Link>
    </section>
  );
};

export default Home;
