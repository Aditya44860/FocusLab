import React from 'react'
import { useState, useEffect, useRef } from 'react'; 


const Timer = () => {
    
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

  return (
    <div className="w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 text-center">
        <h1 className='text-7xl text-[#4C3A26] font-semibold'>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </h1>

        <div id="buttons" className="flex bg-[#EFD6B1] mt-7 justify-center items-center mx-10 p-1 rounded-full border-2 border-[#C49B59] text-sm overflow-hidden">
            <button className="px-6 py-2 text-[#4C4037] hover:bg-[#dec29d] rounded-full transition-all">
                Pomodoro
            </button>
            <button className="px-6 py-2 border-x-2 border-[#C49B59] text-[#4C4037] hover:bg-[#dec29d] transition-all">
                Short Break
            </button>
            <button className="px-6 py-2 text-[#4C4037] hover:bg-[#dec29d] rounded-full transition-all">
                Long Break
            </button>
        </div>
    </div>
  )
}

export default Timer