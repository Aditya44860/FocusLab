import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useAuth } from "../Firebase/AuthContext";
import { doSignInWithGoogle } from "../Firebase/auth";

const Home = () => {
  const { userLoggedIn } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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
      <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        {/* Background images - hidden on small screens */}
        <img
          src="/assets/pen.png"
          alt="Pen"
          className="absolute left-[-1rem] sm:left-[-2rem] md:left-[-3rem] md:bottom-[2rem] md:rotate-10 lg:left-[-7rem] bottom-[15%] w-34 sm:w-50 md:w-80 lg:w-100 mix-blend-darken opacity-30"
          style={floatFast}
        />
        <img
          src="/assets/coffee.png"
          alt="Coffee"
          className="absolute right-[-1rem] sm:right-[-2rem] md:right-[-3rem] md:top-[2rem] lg:right-[-5rem] top-[20%] w-34 sm:w-52 md:w-60 lg:w-100 mix-blend-darken opacity-30 rotate-[-15deg]"
          style={floatFast}
        />

        <div className="px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center font-bold bg-gradient-to-r from-[#4C4037] via-[#967259] to-[#B77A42] bg-clip-text text-transparent leading-tight pb-2"
          >
            Study Smarter Together
          </motion.h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl text-center mt-8 sm:mt-12 md:mt-20 lg:mt-28 min-h-[4.5rem]">
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

          {!userLoggedIn && (
            <div className="flex justify-center mt-8 lg:hidden">
              <button 
                onClick={handleGoogleLogin}
                className="bg-[#563f2e] text-[#FBF0E3] px-8 py-4 rounded-full font-semibold hover:bg-[#855c3d] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Personalized Learning */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 border-t border-[#d3ac77]">
        {/* Background images - hidden on small screens */}
        <img
          src="/assets/clock.png"
          alt="Clock Doodle"
          className="absolute right-[-2rem] sm:right-[-3rem] md:right-[-5rem] top-35 w-16 sm:w-24 md:w-40 lg:w-88 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[-14deg]"
          style={floatFast}
        />
        <img
          src="/assets/ink.png"
          alt="Ink Doodle"
          className="absolute left-[-2rem] sm:left-[-3rem] md:left-[-5rem] top-1/2 w-16 sm:w-24 md:w-40 lg:w-80 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-12"
          style={floatFast}
        />
        <img
          src="/assets/graph1.png"
          alt="Graph Doodle"
          className="absolute left-[70%] sm:left-[75%] md:left-[80%] lg:left-[45rem] top-115 w-12 sm:w-16 md:w-24 lg:w-35 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20"
          style={floatStyle}
        />
        <img
          src="/assets/graph2.png"
          alt="Graph Doodle"
          className="absolute left-[80%] sm:left-[85%] md:left-[90%] lg:left-[59rem] top-110 w-12 sm:w-16 md:w-24 lg:w-38 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20"
          style={floatStyle}
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          viewport={{ once: true }}
        >
          Personalised Learning
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-full max-w-sm md:max-w-md lg:w-92 mix-blend-darken"
            src="/assets/capstone_pl.png"
            alt="Personalised Learning"
            viewport={{ once: true }}
          />

          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-base sm:text-lg mt-6 md:mt-0"
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
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 border-t border-[#d3ac77]">
        {/* Background images - hidden on small screens */}
        <img
          src="/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-30 w-16 sm:w-24 md:w-40 lg:w-54 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 -scale-x-100 rotate-15"
          style={floatFast}
        />
        <img
          src="/assets/book.png"
          alt="Notebook Doodle"
          className="absolute right-0 top-64 w-16 sm:w-24 md:w-40 lg:w-60 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 -scale-x-100"
          style={floatFast}
        />
        <img
          src="/assets/Notes.png"
          alt="Notes Doodle"
          className="absolute left-[70%] sm:left-[75%] md:left-[80%] lg:left-230 top-22 w-10 sm:w-16 md:w-24 lg:w-34 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20"
          style={floatStyle}
        />
        <img
          src="/assets/pen.png"
          alt="Pen Doodle"
          className="absolute left-[80%] sm:left-[85%] md:left-[90%] lg:left-253 top-33 w-8 sm:w-12 md:w-16 lg:w-19 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[-15deg]"
          style={floatStyle}
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          viewport={{ once: true }}
        >
          Notes <span className="text">Sharing</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-full max-w-sm md:max-w-md lg:w-92 mix-blend-darken"
            src="/assets/capstone_notes.png"
            alt="Notes Sharing"
            viewport={{ once: true }}
          />
          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-base sm:text-lg mt-6 md:mt-0"
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
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 border-t border-[#d3ac77]">
        {/* Background images - hidden on small screens */}
        <img
          src="/assets/book.png"
          alt="Book Doodle"
          className="absolute left-0 bottom-60 w-16 sm:w-24 md:w-40 lg:w-60 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20"
          style={floatFast}
        />
        <img
          src="/assets/chat.png"
          alt="Chat Doodle"
          className="absolute right-[20%] sm:right-[30%] md:right-[40%] lg:right-100 bottom-94 w-12 sm:w-20 md:w-32 lg:w-44 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[-11deg]"
          style={floatStyle}
        />
        <img
          src="/assets/Notes.png"
          alt="Notes Doodle"
          className="absolute left-[30%] sm:left-[40%] md:left-[50%] lg:left-135 bottom-10 w-10 sm:w-16 md:w-24 lg:w-34 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[11deg]"
          style={floatSlow}
        />
        <img
          src="/assets/ink.png"
          alt="Ink Doodle"
          className="absolute bottom-3 w-16 sm:w-24 md:w-40 lg:w-74 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[-11deg] right-[-1rem] sm:right-[-2rem] md:right-[-3rem]"
          style={floatFast}
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
          viewport={{ once: true }}
        >
          Study in Groups
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
          <motion.img
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            className="w-full max-w-sm md:max-w-md lg:w-72 mix-blend-darken"
            src="/assets/capstone_gs.png"
            alt="Personalised Learning"
            viewport={{ once: true }}
          />

          <motion.p
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            className="max-w-xl text-base sm:text-lg mt-6 md:mt-0"
            viewport={{ once: true }}
          >
            Team up with friends or classmates—create groups, join discussions,
            and share notes and resources with ease. Whether it's late-night
            cramming or daily check-ins, everything you need to stay connected
            is right here. Because learning is better when it's shared.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 text-center border-t border-[#d3ac77]">
        {/* Background images - hidden on small screens */}
        <img
          src="/assets/coffee.png"
          alt="Coffee Doodle"
          className="absolute left-0 top-10 w-16 sm:w-24 md:w-40 lg:w-54 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 -scale-x-100 rotate-12"
          style={floatFast}
        />
        <img
          src="/assets/pen.png"
          alt="Pen Doodle"
          className="absolute right-[10%] sm:right-[20%] md:right-30 top-25 w-10 sm:w-16 md:w-24 lg:w-34 mix-blend-darken opacity-10 sm:opacity-15 md:opacity-20 rotate-[-12deg]"
          style={floatFast}
        />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10">
          Everything you need. Nothing you don't.
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
            className="rounded-2xl border-2 border-[#d3ac77] p-3 sm:p-4"
          >
            Calender
          </motion.div>

          <motion.div
            variants={jumping(0.2)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-3 sm:p-4"
          >
            To-Do
          </motion.div>

          <motion.div
            variants={jumping(0.4)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-3 sm:p-4"
          >
            Timer
          </motion.div>

          <motion.div
            variants={jumping(0.6)}
            initial="initial"
            animate="animate"
            className="rounded-2xl border-2 border-[#d3ac77] p-3 sm:p-4"
          >
            Clock
          </motion.div>
        </motion.div>
      </footer>


    </div>
  );
};

export default Home;