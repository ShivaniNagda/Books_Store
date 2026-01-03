import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book ,loading}) => {
  
  console.log("Rendering BookItem for book:", book);
  return (
    <div className='relative overflow-hidden h-96 w-full group rounded-lg shadow-lg'>
     {loading ? (
            <>
              <Loader className="animate-spin mr-2" /> Loading
            </>
          ) : (  
            <>
          <Link to={`/book/${book?._id}`}>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10' />
        <img
          src={book?.image}
          alt={book?.name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out'
          loading='lazy'
        />
        <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
          <h2 className='text-2xl font-bold text-white'>{book?.name}</h2>
          <p className='text-gray-300 text-sm mt-1'>
               {book?.description}.
          </p>
        </div>
      </Link>
      </>)}
    </div>
  );
};

export default BookItem;