import React from "react";
import { motion } from "framer-motion";
import { userAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import ChatBot from "../components/ChatBot";

const DashboardFooter = () => {
  const user = userAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        w-full
        bg-gray-800 bg-opacity-50
        border border-gray-700
        rounded-lg
        p-4
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:justify-between
        sm:items-center
      "
    >
      {/* USER NAME */}
      <h2 className="text-yellow-100 text-sm sm:text-lg font-semibold">
        User:
        <span className="ml-2 text-yellow-100">
          {user.username}
        </span>
      </h2>

      {/* JOIN DATE */}
      <p className="text-gray-300 text-xs sm:text-sm">
        <span className="font-semibold">Joined:</span>{" "}
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* LAST LOGIN */}
      <p className="text-gray-300 text-xs sm:text-sm">
        <span className="font-semibold">Last Login:</span>{" "}
        {user.lastLogin
          ? formatDate(user.lastLogin)
          : "You just signed up!"}
      </p>
      <ChatBot />
    </motion.div>
  );
};

export default DashboardFooter;
