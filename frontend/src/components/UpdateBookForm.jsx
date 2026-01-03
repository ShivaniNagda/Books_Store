import { motion } from 'framer-motion'
import { PlusCircle, Upload, Loader } from 'lucide-react'
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

  // const [preview, setPreview] = useState({
  //   image: "",
  //   pdf: "",
  // })

  useEffect(() => {
    if (existingBook) {
      setFormData({
        id: existingBook._id,
        name: existingBook.name,
        price: existingBook.price,
        genre: existingBook.genre,
        description: existingBook.description,
        inStock: existingBook.inStock,
        image:  existingBook.image,
        pdf: existingBook.pdf,
      })

      // setPreview({
      //   image: existingBook.image,
      //   pdf: existingBook.pdf,
      // })
    }
  }, [existingBook])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ LOGIC FIX ONLY
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file);
    if (!file) return
    setFormData((prev) => ({ ...prev, image: file }))
    // setPreview((prev) => ({ ...prev, image: URL.createObjectURL(file) }))
  }

  // ✅ LOGIC FIX ONLY
  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("PDF size must be less than 10MB")
      return
    }
    console.log(file);
    setFormData((prev) => ({ ...prev, pdf: file }))
    // setPreview((prev) => ({ ...prev, pdf: file.name }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("updated before", formData)
    await updateBook(formData)
    navigate("/profile")
  }

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

        <input
          name="inStock"
          value={formData.inStock}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* IMAGE – CSS SAME */}
        <div className='mt-1 flex items-center overflow-hidden'>
          <input
            type='file'
            id='image'
            className="sr-only"
            accept='image/*'
            onChange={handleImageChange}
          />
          <label
            htmlFor='image'
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-md text-sm leading-4 font-medium text-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 hover:text-emerald-900"
          >
            <Upload className='h-5 w-5 inline-block mr-2' />
            Upload Image
          </label>
          {formData.image && (
            <span className='ml-3 text-sm text-gray-400'>Image Selected</span>
          )}
        </div>

        {/* PDF – CSS SAME */}
        <div className="mt-1 flex items-center overflow-hidden">
          <input
            type="file"
            id="pdf"
            className="sr-only"
            accept="application/pdf"
            onChange={handlePdfChange}
          />
          <label
            htmlFor="pdf"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-md text-sm font-medium text-gray-300 hover:bg-gray-300 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Book
          </label>
          {formData.pdf && (
            <span className="ml-3 text-sm text-gray-400">PDF Selected</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-200 to-yellow-600 py-3 rounded font-semibold hover:bg-emerald-500"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" /> Loading
            </>
          ) : (
            <>
              <PlusCircle className='mr-2 h-5 w-5 inline-block' />
              Update Book
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default UpdateBookForm
