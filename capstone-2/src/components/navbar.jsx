import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="w-full h-[5rem] bg-[#967259] flex items-center justify-between px-4 md:px-10">
        <NavLink to="/">
          <h1
            className="logo-heading text-3xl md:text-4xl cursor-pointer"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            FocusLab
          </h1>
        </NavLink>

        {/* Hamburger Menu Button (visible on small screens) */}
        <button 
          className="md:hidden text-[#FBF0E3] focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul
          className="hidden md:flex gap-8 text-[#FBF0E3] text-lg h-full"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          <NavLink to="/Focus"
            className={({ isActive }) =>
              isActive
                ? "on flex items-center h-full px-8 bg-[#7e604c] text-white text-glow"
                : "flex items-center h-full px-8 rounded-md hover:underline hover:scale-110 text-hover-glow"
            }
          >
            <li className="cursor-pointer">Focus</li>
          </NavLink>

          <NavLink to="/Groups"
            className={({ isActive }) =>
              isActive
                ? "on flex items-center h-full px-8 bg-[#7e604c] text-white text-glow"
                : "flex items-center h-full px-8 rounded-md hover:underline hover:scale-110 text-hover-glow"
            }
          >
            <li className="cursor-pointer">Groups</li>
          </NavLink>

          <NavLink to="/Notes"
            className={({ isActive }) =>
              isActive
                ? "on flex items-center h-full px-8 bg-[#7e604c] text-white text-glow"
                : "flex items-center h-full px-8 rounded-md hover:underline hover:scale-110 text-hover-glow"
            }
          >
            <li className="cursor-pointer">Notes</li>
          </NavLink>
        </ul>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#967259] w-full">
          <ul className="flex flex-col text-[#FBF0E3] text-lg"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <NavLink to="/Focus"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#7e604c] text-white text-glow"
                  : "hover:bg-[#7e604c] hover:bg-opacity-50"
              }
              onClick={toggleMenu}
            >
              <li className="cursor-pointer py-4 px-6">Focus</li>
            </NavLink>

            <NavLink to="/Groups"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#7e604c] text-white text-glow"
                  : "hover:bg-[#7e604c] hover:bg-opacity-50"
              }
              onClick={toggleMenu}
            >
              <li className="cursor-pointer py-4 px-6">Groups</li>
            </NavLink>

            <NavLink to="/Notes"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#7e604c] text-white text-glow"
                  : "hover:bg-[#7e604c] hover:bg-opacity-50"
              }
              onClick={toggleMenu}
            >
              <li className="cursor-pointer py-4 px-6">Notes</li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;