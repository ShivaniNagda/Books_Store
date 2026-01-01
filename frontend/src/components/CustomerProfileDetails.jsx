import React from 'react'
import { userAuthStore } from '../store/authStore';
import { motion } from 'framer-motion'

const CustomerProfileDetails = () => {
  const { user } = userAuthStore();

  return (
    <div className='p-3 min-h-screen'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='p-6 bg-slate-50 min-h-screen rounded-xl'
      >
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className='text-4xl font-bold text-transparent bg-clip-text  bg-gradient-to-br from-yellow-200 to-yellow-900'>
            Welcome, {user.username} 👋
          </h1>
          <p className='text-gray-600 mt-2 max-w-xl mx-auto'>
            Welcome to your profile dashboard. Here you can view your personal
            information, manage your account, and explore available features.
          </p>
        </div>

        {/* Profile Card */}
        <div className='max-w-3xl mx-auto bg-gradient-to-r from-yellow-50 to-yellow-400 shadow-md rounded-lg p-6'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Profile Details
          </h2>

          <div className='mb-4'>
            <h3 className='text-lg font-medium text-gray-700'>Name</h3>
            <p className='text-gray-600'>{user.username}</p>
          </div>

          <div className='mb-4'>
            <h3 className='text-lg font-medium text-gray-700'>Email</h3>
            <p className='text-gray-600'>{user.email}</p>
          </div>

          <div className='mb-4'>
            <h3 className='text-lg font-medium text-gray-700'>User Role</h3>
            <p className='text-gray-600 capitalize'>{user.type}</p>
          </div>

          <div className='mb-4'>
            <h3 className='text-lg font-medium text-gray-700'>Member Since</h3>
            <p className='text-gray-600'>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Extra Info / Message */}
        <div className="max-w-3xl mx-auto mt-6 text-center text-gray-600">
          <p>
            🚀 Keep exploring the platform to discover new features and updates.
            If you need any help, feel free to reach out to our support team.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default CustomerProfileDetails
