import React from 'react';
import Timer from '../components/Timer';
import TodoList from '../components/TodoList';
import ProgressBar from '../components/progress';
import Notes from '../components/QuickNotes';

const Focus = () => {
    return (
      <div>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center my-24">
            <h1 className="text-6xl font-light text-[#4C4037]">Let's Get Into It</h1>
            <p className="text-[#7B5B44]">Time to Learn, Grow, Repeat</p>
            <button className="mt-4 border border-[#3d2e25] px-4 py-1 rounded-full text-sm">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}
            </button>
          </div>
  
          {/* Grid of Components */}
          <div className="grid grid-cols-1 [@media(min-width:965px)]:grid-cols-2 gap-6">
            <Timer />
            <TodoList />
            <ProgressBar />
            <Notes />
          </div>
        </main>
      </div>
    );
  };  

export default Focus