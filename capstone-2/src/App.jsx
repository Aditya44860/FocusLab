import React from 'react';

const App = () => {
  const floatStyle = {
    animation: 'float 6s ease-in-out infinite',
  };
  const floatSlow = {
    animation: 'floatSlow 9s ease-in-out infinite',
  };
  const floatFast = {
    animation: 'floatFast 4s ease-in-out infinite',
  };

  return (
    <div className="bg-[#E9CA9F] text-[#4C4037] overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full h-[5rem] bg-[#967259] flex items-center justify-between px-10">
        <h1 className="text-[#FBF0E3] text-4xl">FocusLab</h1>
        <ul className="flex gap-8 text-[#FBF0E3] text-lg">
          <li className="hover:underline cursor-pointer">Focus</li>
          <li className="hover:underline cursor-pointer">Groups</li>
          <li className="hover:underline cursor-pointer">Notes</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full" style={{ height: "calc(100vh - 5rem)" }}>
        {/* Doodle images */}
        <img
          src="src/assets/pen.png"
          alt="Pen"
          className="absolute left-[-7rem] bottom-10 w-100 mix-blend-darken opacity-20"
          style={floatSlow}
        />
        <img
          src="src/assets/coffee.png"
          alt="Coffee"
          className="absolute right-[-5rem] top-32 w-100 mix-blend-darken opacity-20 rotate-[-15deg]"
          style={floatFast}
        />

        {/* Main text */}
        <div className="pt-40">
          <h1 className="text-8xl text-center">Study Smarter Together</h1>
          <h2 className="text-4xl text-center mt-24">
            Stay organized. Stay accountable.
            <br /> Study better.
          </h2>

          <div className="flex justify-center text-2xl mt-12">
            <button className="bg-[#4C4037] text-[#FBF0E3] px-10 py-5 rounded-[0.5rem] mt-16 mr-3">
              Self Study
            </button>
            <button className="bg-[#B77A42] text-[#FBF0E3] px-10 py-5 rounded-[0.5rem] mt-16 ml-4">
              Join a group
            </button>
          </div>
        </div>
      </div>

      {/* Section: Personalized Learning */}
      <section className="relative py-28 px-10 border-t border-[#d3ac77]">
        <img
          src="src/assets/clock.png"
          alt="Clock Doodle"
          className="absolute right-[-5rem] top-35 w-88 mix-blend-darken opacity-20 rotate-[-14deg]"
          style={floatStyle}
        />
        <img
          src="src/assets/ink.png"
          alt="Ink Doodle"
          className="absolute left-[-5rem] top-1/2 w-80 mix-blend-darken opacity-20 rotate-12"
          style={floatSlow}
        />
        <img
          src="src/assets/graph1.png"
          alt="Graph Doodle"
          className="absolute left-[45rem] top-115 w-35 mix-blend-darken opacity-20"
          style={floatFast}
        />
        <img
          src="src/assets/graph2.png"
          alt="Graph Doodle"
          className="absolute left-[59rem] top-110 w-38 mix-blend-darken opacity-20"
          style={floatStyle}
        />

        <h2 className="text-5xl font-semibold text-center mb-12">Personalised Learning</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <img src="src/assets/capstone_pl.png" alt="Personalised Learning" className="w-92 mix-blend-darken" />
          <p className="max-w-xl text-lg">
            Stay focused and organized with our all-in-one personalized learning toolkit. Whether you're building habits, tackling your to-do list, or using the timer to boost productivity, our app adapts to your study style. Take control of your learning journey—one goal, one task, one habit at a time.
          </p>
        </div>
      </section>

      {/* Section: Notes Sharing */}
      <section className="relative py-28 px-10 border-t border-[#d3ac77]">
        <img
          src="src/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-30 w-54 mix-blend-darken opacity-20 -scale-x-100 rotate-15"
          style={floatSlow}
        />
        <img
          src="src/assets/book.png"
          alt="Notebook Doodle"
          className="absolute right-0 top-64 w-60 mix-blend-darken opacity-20 -scale-x-100"
          style={floatStyle}
        />
        <img
          src="src/assets/notes.png"
          alt="Notes Doodle"
          className="absolute left-230 top-22 w-34 mix-blend-darken opacity-20"
          style={floatFast}
        />
        <img
          src="src/assets/pen.png"
          alt="Pen Doodle"
          className="absolute left-253 top-33 w-19 mix-blend-darken opacity-20 rotate-[-15deg]"
          style={floatStyle}
        />
        <h2 className="text-4xl font-semibold text-center mb-12">Notes Sharing</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <img src="src/assets/capstone_notes.png" alt="Notes Sharing" className="w-92 mix-blend-darken" />
          <p className="max-w-xl text-lg">
            Keep your personal notes organized while tapping into the power of community. With dedicated spaces for both private and shared notes, our platform makes collaboration effortless. Whether you're reviewing for exams or building a shared resource hub with friends, your ideas stay safe—and accessible to everyone who needs them.
          </p>
        </div>
      </section>

      {/* Section: Study in Groups */}
      <section className="relative py-28 px-10 border-t border-[#d3ac77]">
        <img
          src="src/assets/book.png"
          alt="Book Doodle"
          className="absolute left-0 bottom-60 w-60 mix-blend-darken opacity-20"
          style={floatFast}
        />
        <img
          src="src/assets/chat.png"
          alt="Chat Doodle"
          className="absolute right-100 bottom-94 w-44 mix-blend-darken opacity-20 rotate-[-11deg]"
          style={floatStyle}
        />
        <img
          src="src/assets/notes.png"
          alt="Notes Doodle"
          className="absolute left-135 bottom-10 w-34 mix-blend-darken opacity-20 rotate-[11deg]"
          style={floatSlow}
        />
        <img
          src="src/assets/ink.png"
          alt="Ink Doodle"
          className="absolute bottom-3 w-74 mix-blend-darken opacity-20 rotate-[-11deg] right-[-3rem]"
          style={floatFast}
        />
        
        <h2 className="text-4xl font-semibold text-center mb-12">Study in Groups</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <img src="src/assets/capstone_gs.png" alt="Study in Groups" className="w-72 mix-blend-darken" />
          <p className="max-w-xl text-lg">
            Team up with friends or classmates—create groups, join discussions, and share notes and resources with ease. Whether it’s late-night cramming or daily check-ins, everything you need to stay connected is right here. Because learning is better when it’s shared.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-10 text-center border-t border-[#d3ac77]">
        <img
          src="src/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-10 w-54 mix-blend-darken opacity-20 -scale-x-100 rotate-12"
          style={floatSlow}
        />
        <img
          src="src/assets/pen.png"
          alt="Pen Doodle"
          className="absolute right-30 top-25 w-34 mix-blend-darken opacity-20 rotate-[-12deg]"
          style={floatFast}
        />
        
        <h2 className="text-3xl font-semibold mb-10">Everything you need. Nothing you don’t.</h2>
        <div className="flex justify-center gap-10 text-4xl">
          <span>⏱️</span>
          <span>📝</span>
          <span>📈</span>
          <span>📂</span>
          <span>💬</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
