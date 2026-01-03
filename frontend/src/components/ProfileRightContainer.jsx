import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgePlus, Target } from "lucide-react";
import UserDetail from "./UserDetail";
import CrudProfile from "./CrudProfile";

const ProfileRightContainer = () => {
  return (
    <div
      className="
        flex flex-col md:flex-row
        gap-4
        w-full
        min-h-dvh
        p-2
      "
    >
      <Outlet />

      <CrudProfile />
    </div>
  );
};
export default ProfileRightContainer;
