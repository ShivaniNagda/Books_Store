import { motion } from "framer-motion";
import { PlusCircle, Upload } from "lucide-react";
import Loader from "./Loader";
import React, { useState } from "react";
import { useBookStore } from "../store/bookStore";
import toast from "react-hot-toast";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Mystery",
  "Fantasy",
  "Other",
];

const CreateBookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    price: "",
    description: "",
    inStock: "",
    genre: "",
    image: null, 
    pdf: null,   
  });

  const { createBook, loading } = useBookStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBook(newBook);
      toast.success("Book added successfully");

      setNewBook({
        name: "",
        price: "",
        description: "",
        inStock: "",
        genre: "",
        image: null,
        pdf: null,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook({ ...newBook, image: file });
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF must be less than 10MB");
      return;
    }

    setNewBook({ ...newBook, pdf: file });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 w-full px-10 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">
        Create New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Book Name"
          value={newBook.name}
          onChange={(e) =>
            setNewBook({ ...newBook, name: e.target.value })
          }
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) =>
            setNewBook({ ...newBook, price: e.target.value })
          }
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Quantity"
          value={newBook.inStock}
          onChange={(e) =>
            setNewBook({ ...newBook, inStock: e.target.value })
          }
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Genre */}
        <select
          value={newBook.genre}
          onChange={(e) =>
            setNewBook({ ...newBook, genre: e.target.value })
          }
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newBook.image && <p className="text-sm text-gray-400">Image selected</p>}

        {/* PDF */}
        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
        {newBook.pdf && <p className="text-sm text-gray-400">PDF selected</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white p-2 rounded flex justify-center"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" /> 
            </>
          ) : (
            <>
              <PlusCircle className="mr-2" /> Create Book
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateBookForm;
