import React from "react";
import { LuUser, LuMail, LuMessageSquare, LuClock } from "react-icons/lu";
import useStore from "../store/useStore";
import { apiStatus } from "../store/api";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94];

const maskEmail = (email = "") => {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const masked = user.length <= 2 ? user[0] + "*" : user[0] + "*".repeat(user.length - 2) + user.slice(-1);
  return `${masked}@${domain}`;
};

const Messages = () => {
  const { getInitalDataStatus, messages } = useStore();

  if (getInitalDataStatus === apiStatus.loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="glass-card animate-pulse h-40 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className="glass-card p-16 text-center mt-4">
        <LuMessageSquare className="text-5xl text-white/10 mx-auto mb-3" />
        <p className="text-sm text-white/25">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {[...messages]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: i * 0.06 }}
          className="glass-card p-4 flex flex-col gap-3"
        >
          {/* Sender info */}
          <div className="flex items-center gap-3 pb-3 border-b border-white/8">
            <div className="h-9 w-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-sm font-bold text-orange-400 flex-shrink-0">
              {msg?.name?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/80 truncate">{msg?.name}</p>
              <p className="text-[10px] text-white/35 flex items-center gap-1">
                <LuMail className="text-[9px]" />
                {maskEmail(msg?.email)}
              </p>
            </div>
          </div>

          {/* Message body */}
          <p className="text-xs text-white/60 leading-relaxed flex-1">{msg?.message}</p>

          {/* Timestamp */}
          <div className="flex items-center gap-1 text-[10px] text-white/25">
            <LuClock className="text-[9px]" />
            {msg?.createdAt
              ? `${formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })} · ${format(new Date(msg.createdAt), "d MMM yy")}`
              : "—"}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Messages;
