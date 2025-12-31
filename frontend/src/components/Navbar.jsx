import React from 'react'
import {motion} from 'framer-motion'
import { userAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut , UserPen } from 'lucide-react';

const Navbar = ({mainheading,goBack}) => {
    //  const { user } = userAuthStore((state) => ({ user: state.user }));
      // const {isCheckingAuth,checkAuth} = userAuthStore();
   const user = userAuthStore((state) => state.user);
   const logout = userAuthStore((state) => state.logout);
   const navigate= useNavigate();

   console.log("Navbar userAuthStore user:",user);
    if (!user || !logout) return null;
        const handleLogout = () => {
            // Implement logout functionality here
            logout();
             navigate("/login");
            }
        const handleProfile = () => {
            // Implement profile navigation here
            console.log("Navigate to profile");
            
            navigate("/profile");
            console.log("Navigate to profile");
        }
  return (
    <div>
          <motion.div 
    initial={{opacity:0, scale:0.9}}
    animate={{opacity:1 , scale:1}}
    exit={{opacity:0, scale:0.9}}
    transition={{duration:0.5}}
    className='gap-10 p-5  items-center align-middle justify-between w-full flex  mx-auto backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl '>
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-slate-50 to-slate-600 text-transparent bg-clip-text ">{mainheading}</h1>
       
       <div className='flex gap-4 items-center'>
         <motion.div 
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.2}}
        className='bg-gray-800 bg-opacity-50 p-2 overflow-hidden rounded-lg border border-gray-
        700'>
            <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={handleLogout}
            className='w-full bg-gradient-to-r p-2 from-slate-500 to-slate-600  text-white font-bold py-
            2 rounded-shadow-lg hover:from-slate-600 hover:to-slate-700 focus:outline-none focus:ring-2 px-4  focus:ring-offset-2 focus:ring-offset-gray-900'><LogOut color="#ffffff" /></motion.button>

        </motion.div>
      
        <motion.div 
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.2}}
        className='bg-gray-800 bg-opacity-50 p-2 overflow-hidden rounded-lg border border-gray-
        700'>
            <Link to={goBack}>
            <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            // onClick={handleProfile}
            className='w-full bg-gradient-to-r p-2 from-slate-500 to-slate-600  text-white font-bold py-
            2 rounded-shadow-lg hover:from-slate-600 hover:to-slate-700 focus:outline-none focus:ring-2 px-4  focus:ring-offset-2 focus:ring-offset-gray-900'><UserPen color="#ffffff" />
            
            </motion.button>
            </Link>

        </motion.div>
          </div>
    </motion.div>
     
    </div>
  )
}

export default Navbar;