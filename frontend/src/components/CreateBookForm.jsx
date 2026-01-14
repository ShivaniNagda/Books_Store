import { motion } from "framer-motion"
import { PlusCircle, Upload,Loader } from "lucide-react"
// import Loader from "./Loader"
import React, { useState } from "react"
import { useBookStore } from "../store/bookStore"
import toast from "react-hot-toast"

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Mystery",
  "Fantasy",
  "Other",
]

const CreateBookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    price: "",
    description: "",
    inStock: "",
    genre: "",
    image: null,
    pdf: null,
  })

  const { createBook, loading } = useBookStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createBook(newBook)
      toast.success("Book added successfully")
      setNewBook({
        name: "",
        price: "",
        description: "",
        inStock: "",
        genre: "",
        image: null,
        pdf: null,
      })
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
        Create New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Name */}
        <input
          type="text"
          placeholder="Book Name"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          required
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:ring-2 focus:ring-yellow-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          required
          rows={4}
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:ring-2 focus:ring-yellow-500"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          required
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:ring-2 focus:ring-yellow-500"
        />

        {/* Quantity */}
        <input
          type="number"
          placeholder="Quantity"
          value={newBook.inStock}
          onChange={(e) =>
            setNewBook({ ...newBook, inStock: e.target.value })
          }
          required
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:ring-2 focus:ring-yellow-500"
        />

        {/* Genre */}
        <select
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          required
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={(e) =>
              setNewBook({ ...newBook, image: e.target.files[0] })
            }
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center gap-2 w-full bg-gray-700 py-3 rounded-md text-gray-300 hover:bg-gray-600 cursor-pointer"
          >
            <Upload className="h-5 w-5" />
            Upload Image
          </label>
          {newBook.image && (
            <span className="text-xs text-gray-400">Image selected</span>
          )}
        </div>

        {/* PDF Upload */}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id="pdf"
            className="sr-only"
            accept="application/pdf"
            onChange={(e) => setNewBook({ ...newBook, pdf: e.target.files[0] })}
          />
          <label
            htmlFor="pdf"
            className="flex items-center justify-center gap-2 w-full bg-gray-700 py-3 rounded-md text-gray-300 hover:bg-gray-600 cursor-pointer"
          >
            <Upload className="h-5 w-5" />
            Upload Book PDF
          </label>
          {newBook.pdf && (
            <span className="text-xs text-gray-400">PDF selected</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center text-sm sm:text-base active:scale-95 transition"
        >
          {loading ? (
            <>
            <Loader className="animate-spin" />
            uploading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Book
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default CreateBookForm
