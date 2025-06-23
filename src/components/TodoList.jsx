import React, { useState } from "react";
import { HiX, HiPlus } from "react-icons/hi"

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 pb-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#5B4636] flex-1 text-center">
          Today's Tasks
        </h2>
      </div>

      <div className="w-full p-4 mb-4 rounded-xl border border-[#C49B59] text-[#5B4636] bg-[#FFF7EA] shadow-inner max-h-69 overflow-scroll">
        {/* Task input and add button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-[#C49B59] rounded-lg mr-2 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-[#C49B59] text-white p-2 rounded-lg hover:bg-[#A37B39]"
          >
            <HiPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-2 ">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center p-2 rounded-lg bg-white border border-[#C49B59]">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-4 w-4 mr-2 accent-[#C49B59]"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-[#C49B59] hover:text-red-700"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 py-2">No tasks yet. Add one above!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;