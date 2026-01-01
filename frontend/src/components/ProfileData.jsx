import React, { useEffect } from 'react';
import { useBookStore } from '../store/bookStore';
import { motion } from 'framer-motion';
import { Trash, FilePenLine,Eye  } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfileData = () => {
  const { book: Book, deleteBook, getBooks,updateBook } = useBookStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleDelete = async(bookId) => {
    const val =await deleteBook(bookId);
    console.log("Deleted book with ID:", bookId);
    toast.success(val.message);
    await getBooks();
    return;
  };

  const handleUpdate = async(bookId) => {
    // Implement update logic here
    // const val =await updateBook(bookId);
    // toast.success(val.message);
    // await getBooks();
     navigate(`/profile/update-book/${bookId}`);
    console.log("Update book with ID:" );
    return;
  };

  return (
    <motion.div
      className="
        bg-gray-800 shadow-lg rounded-lg overflow-x-auto
        py-4 sm:py-5 md:py-6
        px-3 sm:px-4 md:px-6
        mt-2 w-full md:w-full
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr >
            <th className="px-4 sm:px-6 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-300">
              Book
            </th>
            <th className="px-4 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase text-gray-300">
              Price
            </th>
            <th className="px-4 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase text-gray-300">
              Genre
            </th>
            <th className="px-4 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase text-gray-300">
              Delete
            </th>
            <th className="px-4 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase text-gray-300">
              Edit
            </th>
            {/* <th className="px-4 py-2 text-left text-[10px] sm:text-xs font-semibold uppercase text-gray-300">
              View
            </th> */}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700">
          {Book && Book?.map((book) => (
            <tr
              key={book._id}
              className="hover:bg-gray-700 transition-colors"
            >
              {/* Book Info */}
              <td className="px-4 sm:px-6 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={book.image}
                    alt="book"
                    className="
                      h-8 w-8 sm:h-10 sm:w-10
                      rounded-full object-cover
                    "
                  />
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {book.name}
                  </span>
                </div>
              </td>

              {/* Price */}
              <td className="px-4 py-3 text-xs sm:text-sm text-gray-300">
                ₹{book.price.toFixed(2)}
              </td>

              {/* Genre */}
              <td className="px-4 py-3 text-xs sm:text-sm text-gray-300">
                {book.genre}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </td>
              {/* Update */}
              <td className="px-4 py-3">
                <button
                  onClick={() => handleUpdate(book._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <FilePenLine  className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </td>
              {/* <td className="px-4 py-3">
                <a href={book.pdf} target="_blank" rel="noreferrer"
                  // onClick={() => handleUpdate(book._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Eye   className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProfileData;
