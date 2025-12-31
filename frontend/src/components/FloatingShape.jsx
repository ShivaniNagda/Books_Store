import React from 'react'
import { motion } from "framer-motion";
export const FloatingShape = ({color,size,top,left,delay}) => {
  return (
    <motion.div className={`absolute rounded-3xl border-x-yellow-300  ${color} ${size} opacity-20 blur-xl `} style={{top, left}}
    animate={{
        y:["10%","100%","10%"],
        x:["10%","100%","50%"],
        rotate:[0,360],
    }}
      transition = {{duration:20 , ease:"linear" , repeat:Infinity,delay}} aria-hidden='true' />
    
  )
}

export default FloatingShape;
