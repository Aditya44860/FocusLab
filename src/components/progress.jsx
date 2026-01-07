import React, { useState, useEffect } from 'react'
import { useAuth } from '../Firebase/AuthContext'
import { getUserData } from '../Firebase/userDataService'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ProgressBar = () => {
  const { user, userLoggedIn } = useAuth()
  const [weekData, setWeekData] = useState([])
  const [weekOffset, setWeekOffset] = useState(0)

  const loadWeekData = () => {
    if (userLoggedIn && user) {
      getUserData(user.uid).then(data => {
        const timerData = data.timerData || {}
        const baseDate = new Date()
        baseDate.setDate(baseDate.getDate() - (weekOffset * 7))

        const currentDay = baseDate.getDay()
        const weekDays = []
        
        for (let i = 1; i <= 7; i++) {
          const dayOffset = i - currentDay - 1
          const date = new Date(baseDate)
          date.setDate(baseDate.getDate() + dayOffset)
          const dateStr = date.toDateString()
          const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          const minutes = timerData[dateStr] || 0
          weekDays.push({ name: dayName, hours: minutes / 60, date: new Date(date) })
        }
        console.log('Week data loaded:', weekDays)
        setWeekData(weekDays)
      }).catch(error => {
        console.error('Error loading week data:', error)
        setWeekData([
          { name: "Mon", hours: 0 },
          { name: "Tue", hours: 0 },
          { name: "Wed", hours: 0 },
          { name: "Thu", hours: 0 },
          { name: "Fri", hours: 0 },
          { name: "Sat", hours: 0 },
          { name: "Sun", hours: 0 }
        ])
      })
    } else {
      setWeekData([
        { name: "Mon", hours: 0 },
        { name: "Tue", hours: 0 },
        { name: "Wed", hours: 0 },
        { name: "Thu", hours: 0 },
        { name: "Fri", hours: 0 },
        { name: "Sat", hours: 0 },
        { name: "Sun", hours: 0 }
      ])
    }
  }

  useEffect(() => {
    loadWeekData()
    const handleTimerUpdate = () => {
      console.log('Timer update event received, reloading week data')
      loadWeekData()
    }
    window.addEventListener('timerUpdate', handleTimerUpdate)
    return () => window.removeEventListener('timerUpdate', handleTimerUpdate)
  }, [userLoggedIn, user, weekOffset])

  const MAX_HOURS = Math.max(...weekData.map(day => day.hours || 0), 1)

  return (
    <div className="w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 text-center">
      <div className="flex items-center justify-between mb-2">
        {weekOffset === 0 ? (
          <FiChevronLeft 
            className="text-[#5B4636] text-xl cursor-pointer hover:scale-110" 
            onClick={() => setWeekOffset(1)}
          />
        ) : (
          <div className="w-5" />
        )}
        <h2 className="text-xl font-semibold text-[#5B4636] flex-1 text-center">
          {weekOffset === 0 ? 'Weekly Progress' : 'Last Week'}
        </h2>
        {weekOffset === 1 ? (
          <FiChevronRight 
            className="text-[#5B4636] text-xl cursor-pointer hover:scale-110" 
            onClick={() => setWeekOffset(0)}
          />
        ) : (
          <div className="w-5" />
        )}
      </div>

      <div className="flex items-end justify-between gap-4 h-64 mt-4 p-4 bg-[#FFF7EA] rounded-lg shadow border border-[#C49B59]">
        {weekData.map((day, index) => (
          <div key={index} className="flex flex-col items-center justify-end h-full">
            <div className="text-xs text-gray-700 mb-1">
              {day.hours ? (day.hours >= 1 ? `${day.hours.toFixed(1)}h` : `${Math.round(day.hours * 60)}m`) : (day.date && day.date > new Date()) ? "" : "0m"}
            </div>
            <div
              className="w-6 bg-[#cf9540b2] rounded-t-md transition-all min-h-[4px]"
              style={{ height: day.hours > 0 ? `${Math.max((day.hours / MAX_HOURS) * 100, 10)}%` : '4px' }}
              title={day.hours > 0 ? `${day.hours.toFixed(1)} hrs` : 'No data'}
            />
            <span className="mt-3 text-xs font-semibold text-[#5B4636]">{day.name}</span>
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default ProgressBar