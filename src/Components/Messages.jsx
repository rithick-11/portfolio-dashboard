import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const Messages = ({ apiRes }) => {
  console.log(apiRes.data);

  function maskEmail(email) {
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.slice(0, 2) +
      "*".repeat(localPart.length - 4) +
      localPart.slice(-2);
    const [domainName, domainExt] = domain.split(".");
    const maskedDomain =
      domainName[0] + "*".repeat(domainName.length - 1) + "." + domainExt;
    return maskedLocal + "@" + maskedDomain;
  }

  return (
    <section className="mt-7">
      <h1 className="flex items-center gap-2 mb-5">
        <FaRegComment />
        Messages
      </h1>
      <ul className="flex flex-col sm:max-w-[70vw] md:max-w-[50vw] max-h-[70vh] overflow-y-auto gap-5 p-5">
        {apiRes?.data.messages?.map((data, i) => (
          <li className="p-5 rounded-lg bg-white/10 border border-orange-500 shadow shadow-white/40">
            <div className="flex items-center justify-between gap-3 border-b border-orange-400 pb-4 font-thin text-sm">
              <div className="text-gray-200 flex justify-between w-full items-center">
                <div className="flex gap-2 items-center">
                  <RxAvatar className="text-4xl font-light" />
                  <div>
                    <p className="font-medium">{data.name}</p>
                    <a
                      href={`mailto:${data.email}`}
                      className="font-extralight text-white/60"
                    >
                      {maskEmail(data.email)}
                    </a>
                  </div>
                </div>
                <p className="text-sm font-extralight">
                  {format(new Date(data.createdAt), "dd/MM/Y hh:mm a")}
                </p>
              </div>
            </div>
            <p className="pt-2 text-[1rem] font-thin text-white">
              {data.message}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Messages;
