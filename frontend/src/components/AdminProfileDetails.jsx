import React from 'react'
import { userAuthStore } from '../store/authStore';
import { motion } from 'framer-motion'
import ProfileRightContainer from './ProfileRightContainer';
import { useBookStore } from '../store/bookStore';
import BookItem from './BookItem';
import ProfileData from './ProfileData';

const AdminProfileDetails = () => {

    const { user } = userAuthStore();
    const {book} = useBookStore();
  return (
    <div className='pl-2 bg-gradient-to-br flex sm:flex-col md:flex-row from-slate-400 to-slate-800  min-h-screen  gap-3'> 

   
    {/* <ProfileData/> */}
     <ProfileRightContainer book={book} user={user} />
    
    </div>
  )
}

export default AdminProfileDetails