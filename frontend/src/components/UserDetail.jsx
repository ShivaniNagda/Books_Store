import React from 'react'
import { userAuthStore } from '../store/authStore';
import { motion } from 'framer-motion'

const UserDetail = () => {
    const {user} = userAuthStore();
  return (
   <div className="text-white  mt-2 p-3 justify-center flex text-center text-xl  space-between gap-10 w-full relative">
            
            <motion.div className=" bg-slate-600 ">
              <div className=" p-4 bg-slate-50  shadow-md rounded-lg flex  gap-4">
                {/* <h1 className="text-xl font-bold pl-3 text-left shadow-lg text-gray-800 py-6">
                  User Profile
                </h1> */}
                <div className=" pl-3 text-left rounded-lg flex lg:gap-10 justify-between flex-wrap sm:gap-2 ">
                  <div className="mb-4 flex">
                    {/* <h2 className="text-xl font-semibold text-gray-700">Name : </h2> */}
                    <p className="text-gray-600">{user.username}</p>
                  </div>
                  {/* <div className="mb-4 flex ">
                    <h2 className="text-xl font-semibold text-gray-700">Email : </h2> 
                    <p className="text-gray-600">{user.email}</p>
                  </div> */}
                   {/* <div className="mb-4 flex">
                   <h2 className="text-xl font-semibold text-gray-700">
                      User Role : 
                    </h2> 
                    <p className="text-gray-600">{user.type}</p>
                  </div>*/}
                  <br />
                  <div className="mb-4 flex ">
                    <h2 className="text-xl font-semibold text-gray-700">
                      Joined On : 
                    </h2>
                    <p className="text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
  )
}

export default UserDetail