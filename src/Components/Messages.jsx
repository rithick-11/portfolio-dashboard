import { format, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import React from "react";

const Messages = ({ apiRes }) => {
  console.log(apiRes.data);

  return (
    <section className="mt-7">
      <h1>Messages</h1>
      <ul className="flex flex-col gap-3 py-5">
        {apiRes?.data.messages?.map((data, i) => (
          <li className="px-3 py-5 rounded-lg bg-white/10 border border-orange-500 shadow shadow-white/40">
            <div className="flex items-center justify-between gap-3 border-b border-orange-400 pb-2 font-thin text-sm">
              <div className="flex gap-2 items-center">
                <p>{i + 1}.</p>
                <p>{data.name}</p>
              </div>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <p className="pt-2 text-[1rem] font-extralight text-white/70">
              {data.message}
            </p>
            <p className="text-sm font-extralight text-end">{formatDistanceToNowStrict(new Date(data.createdAt))} | {format(new Date(data.createdAt), 'hh:mm a dd/mm/Y')}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Messages;
