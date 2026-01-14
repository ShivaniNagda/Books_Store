import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import Navbar from "./Navbar";
import {  Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"

const Maintanance = () => {
  const { id } = useParams();
  const { singleBook, getBookById } = useBookStore();

  useEffect(() => {
    getBookById(id);
  }, [id, getBookById]);

  if (!singleBook) {
    return <p className="text-white text-center mt-10"><Loader/> </p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col">
      <Navbar />

      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        {singleBook.name}
      </h1>

      {/* Maintenance Message */}
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-xl shadow-lg max-w-md">
          <Wrench className="mx-auto mb-4 text-yellow-400 size-10" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Maintenance Work in Progress
          </h2>
          <p className="text-gray-400">
            The book reader is temporarily unavailable.
            <br />
            Please check back later.
          </p>
          <div className="my-10">
          <Link to="/" className="text-yellow-300 rounded-lg border-yellow-400 p-3 border mt-6 text-xl font-semibold underline mt-3">Go Back</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Maintanance;
