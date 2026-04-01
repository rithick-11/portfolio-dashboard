import React from "react";
import { LuNetwork, LuMapPin, LuMonitor, LuGlobe } from "react-icons/lu";
import useStore from "../store/useStore";
import { apiStatus } from "../store/api";
import { formatDistanceToNow, format } from "date-fns";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94];

const getTimeAgo   = (d) => formatDistanceToNow(new Date(d), { addSuffix: true });
const getFormatted = (d) => format(new Date(d), "h:mm a · d MMM yy");

const RecentVisti = () => {
  const { getInitalDataStatus, recentVist } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.2 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <LuNetwork className="text-orange-500 text-base" />
          <h2 className="text-sm font-semibold text-white">Recent Visits</h2>
        </div>
        {getInitalDataStatus === apiStatus.success && (
          <span className="text-[10px] text-white/30 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
            {recentVist?.length ?? 0} entries
          </span>
        )}
      </div>

      {/* States */}
      {getInitalDataStatus === apiStatus.loading && (
        <div className="p-8 text-center text-sm text-white/30 animate-pulse">Loading visits…</div>
      )}
      {getInitalDataStatus === apiStatus.error && (
        <div className="p-8 text-center text-sm text-red-400/60">Failed to load visit data.</div>
      )}

      {/* Table */}
      {getInitalDataStatus === apiStatus.success && (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="dash-table">
            <thead className="sticky top-0 bg-[#0f0f12]">
              <tr>
                <th><span className="flex items-center gap-1.5">Time</span></th>
                <th><span className="flex items-center gap-1.5"><LuMapPin className="text-[10px]" />City</span></th>
                <th><span className="flex items-center gap-1.5"><LuMonitor className="text-[10px]" />Device</span></th>
                <th><span className="flex items-center gap-1.5"><LuGlobe className="text-[10px]" />Browser</span></th>
              </tr>
            </thead>
            <tbody>
              {recentVist?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-white/25">No visits recorded yet</td>
                </tr>
              )}
              {[...(recentVist ?? [])]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, i) => (
                <tr key={i}>
                  <td>
                    <span className="text-white/80">{getTimeAgo(item.date)}</span>
                    <br />
                    <span className="text-white/30 text-[10px]">{getFormatted(item.date)}</span>
                  </td>
                  <td>{item?.record?.location || <span className="text-white/25">—</span>}</td>
                  <td>
                    <span className="inline-block max-w-[140px] truncate">
                      {item?.record?.platform || <span className="text-white/25">—</span>}
                    </span>
                  </td>
                  <td>
                    <span className="inline-block max-w-[180px] truncate text-white/50">
                      {item?.record?.browser || <span className="text-white/25">—</span>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default RecentVisti;
