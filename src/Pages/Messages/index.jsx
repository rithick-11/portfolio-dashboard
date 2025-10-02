import React from "react";

import Messages from "../../Components/Messages";
import { Navbar } from "../../Components";
import { FaRegComment } from "react-icons/fa6";

const MessagesPage = () => {
  return (
    <section className="container-width pb-5">
      <Navbar />
      <div className=" flex items-center justify-between my-4">
        <h1 className="text-lg font-normal flex items-center gap-2">
          <FaRegComment className="text-3xl" /> Messages
        </h1>
      </div>
      <Messages />
    </section>
  );
};

export default MessagesPage;
