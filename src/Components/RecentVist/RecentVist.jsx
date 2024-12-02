import React from "react";
import { format } from "date-fns";

const RecentVist = ({ data }) => {
  let dates = [...data].reverse().slice(0, 20);
  return (
    <ul className=" h-64 overflow-y-auto">
      <li className="grid grid-cols-6 gap-1 text-center border rounded-t-md font-semibold">
        <p className="col-span-2 px-2 py-1">Time</p>
        <h1 className=" px-2 py-1">Location</h1>
        <h1 className=" px-2 py-1">Platform</h1>
        <h1 className="col-span-2 px-2 py-1">Browser</h1>
      </li>
      {dates.map(({ date, record }, i) => (
        <li className="grid grid-cols-6 gap-1 text-center border font-light">
          <p className="col-span-2">{`${format(date, "dd-MMM-yy hh:mm a")}`}</p>
          <h1>{record.location}</h1>
          <h1>{record.platform.trim('"')}</h1>
          <h1 className="col-span-2">{record.browser.split(";")[0]}</h1>
        </li>
      ))}
    </ul>
  );
};

export default RecentVist;
