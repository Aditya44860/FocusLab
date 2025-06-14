import React from 'react'

const ProgressBar = () => {

const days = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 6 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4 },
  { name: "Fri", hours: 2 },
  { name: "Sat", hours: 0.25 },
  { name: "Sun", hours: 3.5 }
];

const MAX_HOURS = Math.max(...days.map(day => day.hours));

  return (
    <div className="w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 text-center">
      Weekly Progress 
      <div className="flex items-end justify-between gap-4 h-64 mt-8 p-4 bg-[#FFF7EA] rounded-lg shadow border">
      {days.map((day, index) => {
        const barHeight = `${(day.hours / MAX_HOURS) * 100}%`;

        return (
          <div key={index} className="flex flex-col items-center justify-end h-full">
            {/* Hours worked */}
            <div className="text-xs text-gray-700 mb-1">
              {day.hours==null?"":`${day.hours}h`}
            </div>

            {/* Bar */}
            <div
              className="w-6 bg-[#cf9540b2] rounded-t-md transition-all"
              style={{ height: barHeight }}
              title={`${day.hours} hrs`}
            ></div>

            {/* Day label */}
            <span className="mt-3 text-xs font-semibold text-[#5B4636]">{day.name}</span>
          </div>
        );
      })}
    </div>
    </div>
    
  )
}

export default ProgressBar