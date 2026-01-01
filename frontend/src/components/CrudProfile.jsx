import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BadgePlus, Target } from "lucide-react";
import { useBookStore } from "../store/bookStore";
import { useNavigate } from "react-router-dom";
const CrudProfile = () => {
  const { book } = useBookStore();
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full md:w-[260px]
        bg-black
        rounded-xl
        shadow-2xl
        flex md:flex-col flex-row
        justify-around md:justify-start
        items-center
        gap-4
        py-4 px-2
      "
    >
      {/* TOTAL BOOKS */}
      <motion.button
       onClick={() => navigate("/profile")}
        className="
          flex flex-col items-center justify-center
          bg-white text-black
          rounded-full
          w-[90px] h-[90px]
          sm:w-[120px] sm:h-[120px]
          md:w-[150px] md:h-[150px]
        "
        
      >
        <h1 className="text-[10px] sm:text-xs md:text-sm font-semibold">
          Total Books
        </h1>
        <p className="text-lg md:text-2xl font-bold">
          {book?.length || 0}
        </p>
      </motion.button>

      {/* ADD BOOK */}
      <motion.button
        onClick={() => navigate("/profile/add-book")}
        className="
          flex flex-col items-center justify-center
          bg-emerald-300
          rounded-full
          w-[90px] h-[90px]
          sm:w-[120px] sm:h-[120px]
          md:w-[150px] md:h-[150px]
          hover:scale-105 transition
        "
      >
        <BadgePlus className="w-6 h-6 md:w-8 md:h-8" />
        <span className="text-[10px] sm:text-xs md:text-sm font-semibold mt-1">
          Add Book
        </span>
      </motion.button>
    </div>
  );
};

export default CrudProfile;