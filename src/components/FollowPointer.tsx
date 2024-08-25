import React from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import stringToColor from '@/lib/stringtoColor'

function FollowPointer({
    x, y, info
}: {
    x: number,
    y: number,
    info: {
        name: string,
        email: string,
        avatar: string
    }
}) {

    const color =stringToColor(info.email||"1")
    return (
        <motion.div className='h-4 w-4 rounded-full absolute z-50'
        style={{
            top:y,
            left:x,
            pointerEvents:"none"
        }}
        initial={{
            scale:1,
            opacity:1,
        }}
        animate={{
            scale:1,
            opacity:1,
        }}
        exit={{
            scale:0,
            opacity:0
        }}
        >
            
            
        </motion.div>
    )
}

export default FollowPointer
