import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User,Lock, Loader } from "lucide-react";
import Input from "../components/input";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LogInPage = () => {
 
  const [email ,setEmail ] = useState('');
  const [password ,setPassword ] = useState('');
  const {login,isLoading,error} = userAuthStore();
  const navigate = useNavigate();

    const handleLogin = async(e) =>{
        e.preventDefault();
       const message= await login(email,password);
       console.log("Login message :",message);
       if(error){
        toast.error(error);
        return;
       }
        navigate("/");
        toast.success("Logged in successfully");
    }
  return (
    <div className="flex items-center
        justify-center min-h-screen bg-slate-900">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 bachdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden" >
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text" >Welcome Back</h2>
            <form onSubmit={handleLogin}>
                
                <Input  icon={Mail} type='email' placeholder="Email Address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <Input  icon={Lock} type='password' placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />

                <div className="flex items-center mb-6">
                <Link to={"/forgot-password"} className="text-slate-50 hover:underline" > Forgot Password</Link>
                </div>

                {error && <p className="text-red-500 text-sm  foont-semibold mb-2">{error}</p>} 

              <motion.button className="mt-5 w-full py-3 px-0 bg-gradient-to-t from-yellow-500 to-yellow-600 text-white font-bold
              rounder-lg shadow-lg hover:from-yellow-300 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 "
              whileHover={{scale:1.02}} whileTap={{scale:0.98}} type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" />: "Login"}
                </motion.button>          
            </form>
        </div>
       
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center ">
                  <p className="text-sm text-gray-400">
                   Don't have an account?{" "}
                    <Link to={"/signup"} className="text-slate-50 hover:underline" >Sign up</Link>
                  </p>
                </div>
        
    </motion.div>
    </div>
  );
};

export default LogInPage;
