import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="w-full h-[5rem] bg-[#967259] flex items-center justify-between px-10">
        <NavLink to="/">
          <h1
            className="logo-heading text-4xl cursor-pointer"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            FocusLab
          </h1>
        </NavLink>

        <ul
          className="flex gap-8 text-[#FBF0E3] text-lg h-full"
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
    </div>
  );
};

export default Nav;
