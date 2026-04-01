import React from "react";
import Messages from "../../Components/Messages";
import { Navbar } from "../../Components";
import { LuMessageSquare } from "react-icons/lu";
import useStore from "../../store/useStore";
import { apiStatus } from "../../store/api";

const MessagesPage = () => {
  const { messages, getInitalDataStatus } = useStore();

  return (
    <div className="dash-content">
      <Navbar />
      <main className="container-width py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <LuMessageSquare className="text-orange-500 text-base" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Messages</h1>
            <p className="text-xs text-white/35 mt-0.5">
              {getInitalDataStatus === apiStatus.success
                ? `${messages?.length ?? 0} contact submissions`
                : "Loading…"}
            </p>
          </div>
        </div>

        <Messages />
      </main>
    </div>
  );
};

export default MessagesPage;
