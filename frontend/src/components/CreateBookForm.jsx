
import { motion } from 'framer-motion'
import { PlusCircle, Upload, Loader } from 'lucide-react';
import React, { useState } from 'react'
import { useBookStore } from '../store/bookStore';



const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Other'];
const CreateBookForm = () => {
  const [newBook, setNewBook] =useState({
    name: "",
    price: "",
    description: "",
    inStock:"", genre:"",
    image:"",
    pdf:"",
  })
  const {createBook ,loading} = useBookStore();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("Submitting new book:", newBook);
  try{
    await createBook(newBook);
    setNewBook({name:"",price:"",description:"",inStock:"",genre:"",image:"",pdf:""})
  }catch(error){
    console.log(error);
  }
  }
  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBook({...newBook,image:reader.result});
    }
    reader.readAsDataURL(file); //base64format
     }
    }
  const handlePdfChange = (e) => {
  const file = e.target.files[0];
    console.log("handlePdf",file,"setnewBook",setNewBook);
  // if (!file) return;
    
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("PDF size must be less than 10MB");
    return;
  }
  
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBook({...newBook,pdf:reader.result});
    }
    reader.readAsDataURL(file); //base64format
     }
};

  return (
    <motion.div className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 w-full px-10 mx-auto'
    initial={{opacity:0 , y:20}}
    animate={{opacity:1 , y:0}}
    transition={{duration:0.8}}
    >
      <h2 className='text-3xl font-semibold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent text-center'>Create New Book</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className="block text-sm font-medium text-gray-300">
            Book Name
          </label>
          <input 
          type='text'
          id='name'
          name='name'
          value={newBook.name}
          onChange={(e) => setNewBook({...newBook, name: e.target.value})}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
       " required/> 
       
       </div>
        <div>
          <label htmlFor='description' className="block text-sm font-medium text-gray-300">
          Description
          </label>
          <textarea 
        
          id='description'
          name='description'
          value={newBook.description}
          rows="3"
          onChange={(e) => setNewBook({...newBook, description: e.target.value})}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
       " required/> 
       
       </div>
        <div>
          <label htmlFor='price' className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input 
          type='number'
          id='price'
          name='price'
          value={newBook.price}
          onChange={(e) => setNewBook({...newBook, price: e.target.value})}
          step="0.01"
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
       " required/> 
       
       </div>
        <div>
          <label htmlFor='category' className="block text-sm font-medium text-gray-300">
            Genre
          </label>
          <select 
          id='genre'
          name='genre'
          value={newBook.genre}
          onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border text-white border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
       " required> 
        <option value="">Select a genre</option>
        {genres.map((gen)=>(
          <option key={gen} value={gen}>
            {gen}
          </option>
        ))}
        </select>
       </div>
        
        <div className='mt-1 flex items-center overflow-hidden'>
        <input type='file' id='image' className="sr-only" accept='image/*' onChange={handleImageChange}/>
          <label htmlFor='image' className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-md text-sm leading-4 font-medium text-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 hover:text-emerald-900">
            <Upload className='h-5 w-5 inline-block mr-2' />
            Upload Image
          </label>
          {newBook.image && <span className='ml-3 text-sm text-gray-400'>Image Uploaded</span>}
        </div>
      
        
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
    className="
      cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600
      rounded-md shadow-md text-sm font-medium text-gray-300
      hover:bg-gray-300 hover:text-emerald-900
      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500
    "
  >
    <Upload className="h-5 w-5 inline-block mr-2" />
    Upload Book
  </label>

  {newBook.pdf && (
    <span className="ml-3 text-sm text-gray-400">
      PDF Uploaded
    </span>
  )}
</div>

      
        <button type='submit' 
        className='w-full flex justify-center py-2 px04 border border-transparent rounded-md shadow-sm
        text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus-ring-offset-2 focus:ring-emerald-500 disabled:opacity-50' disabled={loading}>
          {loading ? (
            <>
              <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
              Loading...
            </>
          ):(
            <>
            <PlusCircle className='mr-2 h-5 w-5' />
            Create Book
            </>
          )}
        </button>

      </form>

    </motion.div>
  )
}

export default CreateBookForm