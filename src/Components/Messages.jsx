import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import useStore from "../store/useStore";

const Messages = () => {
  const { getInitalDataStatus, messages } = useStore();

  console.log(getInitalDataStatus, messages);

  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    const maskedUser =
      user.length <= 2
        ? user[0] + "*"
        : user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${maskedUser}@${domain}`;
  };
  return (
    <section className="mt-7">
      <h1 className="flex items-center gap-2 mb-5">
        <FaRegComment />
        Messages
      </h1>
      <ul className="flex flex-col sm:max-w-[70vw] md:max-w-[50vw] max-h-[70vh] overflow-y-auto gap-5 p-5">
        {messages?.map((data, i) => (
          <li className="border border-white/10 px-3 py-4 rounded-md" key={i}>
            <div className="flex items-center mb-2 gap-3 border-b border-white/10 pb-3">
              <AiOutlineUser className="text-3xl" />
              <div className="text-xs">
                <h1>{data?.name}</h1>
                <p className="text-xsy font-extralight">
                  {maskEmail(data?.email)}
                </p>
              </div>
            </div>
            <p className="text-sm font-normal text-white/70">{data?.message}</p>
            <div className="text-xs font-extralight text-white/50 mt-2 flex justify-end">
              <p>{format(new Date(data?.createdAt), "h:mm a - d MMM yy")}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Messages;
