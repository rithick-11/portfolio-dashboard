import React from "react";
import { LuNetwork } from "react-icons/lu";
import useStore from "../store/useStore";
import api, { apiStatus } from "../store/api";
import { format, formatDistanceToNow } from "date-fns";

const RecentVisti = () => {
  const { getInitalDataStatus, recentVist } = useStore();

  console.log(getInitalDataStatus, recentVist);

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: false });
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, " h:mm a - d MMM yyyy");
  };

  return (
    <div className="page-link col-row-3 col-span-2 h-[50vh] overflow-auto p-4 rounded-lg bg-white/10">
      <h1 className="flex items-center gap-2">
        <LuNetwork className="text-md" />
        <p className="text-md">Recent visit</p>
      </h1>
      {getInitalDataStatus === apiStatus.loading && "Loading..."}
      {getInitalDataStatus === apiStatus.error && "Error"}
      {getInitalDataStatus === apiStatus.success && (
        <table className="mt-4">
          <thead className="">
            <tr className="font-light text-sm text-white/50">
              <th className="text-left p-2">Visited At</th>
              <th className="text-left p-2">City</th>
              <th className="text-left p-2">Device</th>
              <th className="text-left p-2">Browser</th>
            </tr>
          </thead>
          <tbody>
            {recentVist?.map((item, index) => {
              return (
                <tr key={index} className="border-t text-xs border-white/10">
                  <td className="p-2 text-sm">
                    {getTimeAgo(item.date)} <br />{" "}
                    <span className="text-xs font-extralight">{getDate(item.date)}</span>{" "}
                  </td>
                  <td className="p-2 text-sm">{item?.record?.location}</td>
                  <td className="p-2 text-sm">{item?.record?.platform}</td>
                  <td className="p-2 text-sm">{item?.record?.browser}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentVisti;
