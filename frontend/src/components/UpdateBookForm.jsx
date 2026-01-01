import { motion } from 'framer-motion'
import { PlusCircle, Upload, Loader } from 'lucide-react';

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookStore } from "../store/bookStore";


const UpdateBookForm = () => {
  const { id } = useParams();
  console.log("Updating book with ID:", id);
  const navigate = useNavigate();
  const { book, updateBook } = useBookStore();

  const existingBook = book?.find((b) => b._id === id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    genre: "",
    description: "",
  });

  useEffect(() => {
    if (existingBook) {
      setFormData({
        name: existingBook.name,
        price: existingBook.price,
        genre: existingBook.genre,
        description: existingBook.description,
      });
    }
  }, [existingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(id, formData);
    navigate("/profile"); // go back to total books
  };

  return (
    <motion.div
      className="w-full  bg-gray-800 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold  mb-4  bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent text-center">
        Update Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 px-10 py-5">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Book Name"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-200 to-yellow-600 py-3 rounded font-semibold hover:bg-emerald-500"
        >
          Update Book
        </button>
      </form>
    </motion.div>
  );
};




export default UpdateBookForm