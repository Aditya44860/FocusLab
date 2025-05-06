import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { NavLink } from "react-router-dom";

const Home = () => {

  document.title = "FocusLab"

  // background floats
  const floatStyle = {
    animation: "float 6s ease-in-out infinite",
  };
  const floatSlow = {
    animation: "floatSlow 9s ease-in-out infinite",
  };
  const floatFast = {
    animation: "floatFast 4s ease-in-out infinite",
  };

  // Animation presets
  const fadeUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const slideLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const slideRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const jumping = (delay = 0) => ({
    initial: { y: 0 },
    animate: {
      y: [10, -10, 10],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay,
      },
    },
  });

  return (
    <div className="bg-[#E9CA9F] text-[#4C4037] overflow-x-hidden">
      <div className="relative w-full" style={{ height: "calc(100vh - 5rem)" }}>
        <img
          src="src/assets/pen.png"
          alt="Pen"
          className="absolute left-[-7rem] bottom-10 w-100 mix-blend-darken opacity-20"
          style={floatFast}
        />
        <img
          src="src/assets/coffee.png"
          alt="Coffee"
          className="absolute right-[-5rem] top-32 w-100 mix-blend-darken opacity-20 rotate-[-15deg]"
          style={floatFast}
        />

        <div className="pt-40">
          <h1 className="text-8xl text-center">Study Smarter Together</h1>
          <h2 className="text-6xl text-center mt-28 min-h-[4.5rem]">
            <Typewriter
              words={["Stay organized.", "Stay accountable.", "Study better."]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1500}
            />
          </h2>

          <div className="flex justify-center text-2xl mt-9">

           <NavLink to="/Focus">
              <button className="bg-[#4C4037] text-[#FBF0E3] px-10 py-5 rounded-[0.5rem] mt-16 mr-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4C4037]">
                Self Study
              </button>
            </NavLink>

            <NavLink to="/Groups">
              <button className="bg-[#B77A42] text-[#FBF0E3] px-10 py-5 rounded-[0.5rem] mt-16 ml-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#624325]">
                Join a group
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Personalized Learning */}
      <section className="relative py-28 px-10 border-t border-[#d3ac77]">
        <img
          src="src/assets/clock.png"
          alt="Clock Doodle"
          className="absolute right-[-5rem] top-35 w-88 mix-blend-darken opacity-20 rotate-[-14deg]"
          style={floatFast}
        />
        <img
          src="src/assets/ink.png"
          alt="Ink Doodle"
          className="absolute left-[-5rem] top-1/2 w-80 mix-blend-darken opacity-20 rotate-12"
          style={floatFast}
        />
        <img
          src="src/assets/graph1.png"
          alt="Graph Doodle"
          className="absolute left-[45rem] top-115 w-35 mix-blend-darken opacity-20"
          style={floatStyle}
        />
        <img
          src="src/assets/graph2.png"
          alt="Graph Doodle"
          className="absolute left-[59rem] top-110 w-38 mix-blend-darken opacity-20"
          style={floatStyle}
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-5xl font-semibold text-center mb-12"
          viewport={{ once: true }}
        >
          Personalised Learning
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-92 mix-blend-darken"
            src="src/assets/capstone_pl.png"
            alt="Personalised Learning"
            viewport={{ once: true }}
          />

          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-lg"
            viewport={{ once: true }}
          >
            Stay focused and organized with our all-in-one personalized learning
            toolkit. Whether you're building habits, tackling your to-do list,
            or using the timer to boost productivity, our app adapts to your
            study style. Take control of your learning journey—one goal, one
            task, one habit at a time.
          </motion.p>
        </div>
      </section>

      {/* Notes Sharing */}
      <section className="relative py-28 px-10 border-t border-[#d3ac77]">
        <img
          src="src/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-30 w-54 mix-blend-darken opacity-20 -scale-x-100 rotate-15"
          style={floatFast}
        />
        <img
          src="src/assets/book.png"
          alt="Notebook Doodle"
          className="absolute right-0 top-64 w-60 mix-blend-darken opacity-20 -scale-x-100"
          style={floatFast}
        />
        <img
          src="src/assets/notes.png"
          alt="Notes Doodle"
          className="absolute left-230 top-22 w-34 mix-blend-darken opacity-20"
          style={floatStyle}
        />
        <img
          src="src/assets/pen.png"
          alt="Pen Doodle"
          className="absolute left-253 top-33 w-19 mix-blend-darken opacity-20 rotate-[-15deg]"
          style={floatStyle}
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-5xl font-semibold text-center mb-12"
          viewport={{ once: true }}
        >
          Notes <span className="text">Sharing</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-92 mix-blend-darken"
            src="src/assets/capstone_notes.png"
            alt="Notes Sharing"
            viewport={{ once: true }}
          />
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-lg"
            viewport={{ once: true }}
          >
            Keep your personal notes organized while tapping into the power of
            community. With dedicated spaces for both private and shared notes,
            our platform makes collaboration effortless. Whether you're
            reviewing for exams or building a shared resource hub with friends,
            your ideas stay safe—and accessible to everyone who needs them.
          </motion.p>
        </div>
      </section>

      {/* Study in Groups */}
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

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-5xl font-semibold text-center mb-12"
          viewport={{ once: true }}
        >
          Study in Groups
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-72 mix-blend-darken"
            src="src/assets/capstone_gs.png"
            alt="Personalised Learning"
            viewport={{ once: true }}
          />

          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-lg"
            viewport={{ once: true }}
          >
            Team up with friends or classmates—create groups, join discussions,
            and share notes and resources with ease. Whether it’s late-night
            cramming or daily check-ins, everything you need to stay connected
            is right here. Because learning is better when it’s shared.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-10 text-center border-t border-[#d3ac77]">
        <img
          src="src/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-10 w-54 mix-blend-darken opacity-20 -scale-x-100 rotate-12"
          style={floatFast}
        />
        <img
          src="src/assets/pen.png"
          alt="Pen Doodle"
          className="absolute right-30 top-25 w-34 mix-blend-darken opacity-20 rotate-[-12deg]"
          style={floatFast}
        />

        <h2 className="text-3xl font-semibold mb-10">
          Everything you need. Nothing you don’t.
        </h2>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            variants={jumping(0)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-4"
          >
            Calender
          </motion.div>

          <motion.div
            variants={jumping(0.2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-4"
          >
            To-Do
          </motion.div>

          <motion.div
            variants={jumping(0.4)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-4"
          >
            Timer
          </motion.div>

          <motion.div
            variants={jumping(0.6)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-4"
          >
            Clock
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;
