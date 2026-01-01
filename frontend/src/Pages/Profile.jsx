import React from 'react'
import { motion } from 'framer-motion'
import { userAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import DashboardFooter from './DashboardFooter';
import CustomerProfileDetails from '../components/CustomerProfileDetails';
import AdminProfileDetails from '../components/AdminProfileDetails';

const Profile = () => {
  const {user} = userAuthStore();
  if(!user) return null;
  return (

    <div className=" min-h-screen bg-slate-900 shadow-white bg-opacity-80">
      {user && <Navbar mainheading="Profile" goBack="/"/>}
      
    
     {/* <AdminProfileDetails /> */}
     <DashboardFooter/>
      {user.type =="Customer" && <CustomerProfileDetails /> }
     {(user.type =="Admin" || user.type=="Seller") && <AdminProfileDetails /> } 
    </div>
  )
}

export default Profile