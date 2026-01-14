import { useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import Maintainance from "../components/Maintainance"

const BookReader = () => {
  const { id } = useParams();
  const { book } = useBookStore();

  const selectedBook = book.find((b) => b._id === id);

  if (!selectedBook) {
    return <p className="text-white">Book not found</p>;
  }

  return (
    // <div className="min-h-screen bg-gray-900 p-3 sm:p-6 flex flex-col">
      
    //   {/* Title */}
    //   <h1 className="text-lg sm:text-xl font-semibold text-white mb-3">
    //     {book.name}
    //   </h1>

    //   {/* Reader Container */}
    //   <div className="flex-1 bg-black rounded-lg overflow-hidden">
    //     <iframe
    //       src={book.pdf}
    //       title="Book Reader"
    //       className="w-full h-full border-none"
    //     />
    //   </div>

    // </div>
    <Maintainance />
  );
};

export default BookReader;
