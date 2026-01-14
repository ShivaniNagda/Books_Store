import { motion } from "framer-motion"
import { PlusCircle, Upload, Loader } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useBookStore } from "../store/bookStore"

const UpdateBookForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { book, updateBook, loading } = useBookStore()

  const existingBook = book?.find((b) => b._id === id)

  const [formData, setFormData] = useState({
    id,
    name: "",
    price: "",
    genre: "",
    description: "",
    inStock: "",
    image: null,
    pdf: null,
  })

  useEffect(() => {
    if (existingBook) {
      setFormData({
        id: existingBook._id,
        name: existingBook.name,
        price: existingBook.price,
        genre: existingBook.genre,
        description: existingBook.description,
        inStock: existingBook.inStock,
        image: existingBook.image,
        pdf: existingBook.pdf,
      })
    }
  }, [existingBook])

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setFormData((prev) => ({ ...prev, image: file }))
  }

  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Only PDF files allowed")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("PDF must be under 10MB")
      return
    }

    setFormData((prev) => ({ ...prev, pdf: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateBook(formData)
    navigate("/profile")
  }

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent text-center">
        Update Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", placeholder: "Book Name" },
          { name: "price", placeholder: "Price" },
          { name: "genre", placeholder: "Genre" },
          { name: "inStock", placeholder: "Quantity" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        ))}

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full p-3 rounded bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="flex items-center justify-center gap-2 w-full bg-gray-700 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600"
          >
            <Upload className="h-5 w-5" />
            Upload Image
          </label>
          {formData.image && (
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
            onChange={handlePdfChange}
          />
          <label
            htmlFor="pdf"
            className="flex items-center justify-center gap-2 w-full bg-gray-700 py-3 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600"
          >
            <Upload className="h-5 w-5" />
            Upload Book PDF
          </label>
          {formData.pdf && (
            <span className="text-xs text-gray-400">PDF selected</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center text-sm sm:text-base active:scale-95 transition"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" />
              Updating...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Update Book
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default UpdateBookForm
