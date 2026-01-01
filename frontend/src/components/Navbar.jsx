import React from "react";
import { motion } from "framer-motion";
import { userAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserPen, FilePenLine,CircleUser  } from "lucide-react";

const Navbar = ({ mainheading, goBack }) => {
  const { user, logout } = userAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="
        w-full
        flex
        flex-col
        sm:flex-row
        justify-between
        items-center
        gap-4
        p-4
        backdrop-blur-lg
        rounded-xl
        shadow-2xl
      "
    >
      {/* HEADING */}
      <h1 className="
        text-xl
        sm:text-2xl
        md:text-3xl
        font-bold
        text-center
        bg-gradient-to-r
        from-slate-50
        to-slate-600
        text-transparent
        bg-clip-text
        bg-gradient-to-r from-yellow-200 to-yellow-600
      ">
        {user.type} {mainheading}
      </h1>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 ">
       

        {/* PROFILE / BACK */}
        <Link to={goBack}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center justify-center
             bg-gradient-to-r from-yellow-200 to-yellow-600
              hover:from-slate-600 hover:to-slate-700
              text-white
              p-2
              rounded-lg
              border border-gray-700
            "
          >
            <CircleUser   size={20} />
          </motion.button>
        </Link>
         {/* LOGOUT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="
            flex items-center justify-center
           
            hover:from-slate-600 hover:to-slate-700
            bg-gradient-to-r from-yellow-200 to-yellow-600
            text-white
            p-2
            rounded-lg
            border border-gray-700
          "
        >
          <LogOut size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
