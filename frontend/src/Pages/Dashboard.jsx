import React, { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import Navbar from "../components/Navbar";
import BookItem from "../components/BookItem";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { book, loading, getBooks } = useBookStore();
  // console.log("Dashboard rendering, isLoading:", loading, "books count:", book);
  useEffect(() => {
    getBooks();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-opacity-90 ">
      <Navbar mainheading="Dashboard" goBack="/profile" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* LOADING STATE */}
        {loading && (
          <p className="text-center text-gray-400 text-lg">
            <Loader />
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && book?.length === 0 && (
          <p className="text-center text-gray-400 text-lg">
            No books found.
          </p>
        )}

        {/* BOOK GRID */}
        {!loading && book?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {book.map((item,index) => (
              <BookItem key={item._id} book={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
