import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Firebase/AuthContext";
import { doSignInWithGoogle, doSignOut } from "../Firebase/auth";
import { FaUserCircle } from "react-icons/fa";
import ProfilePopup from "./ProfilePopup";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { userLoggedIn, user } = useAuth();

  const handleGoogleLogin = () => doSignInWithGoogle().catch(console.error);

  const handleSignOut = () => {
    doSignOut().catch(console.error);
    setShowProfilePopup(false);
  };

  const toggleProfilePopup = () => setShowProfilePopup(!showProfilePopup);
  const toggleMenu = () => setIsOpen(!isOpen);

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

        {/* Mobile Menu Controls */}
        <div className="lg:hidden flex items-center gap-3">
          {userLoggedIn && (
            <div className="relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full cursor-pointer mr-5 border-2 border-white shadow-lg"
                  onClick={toggleProfilePopup}
                  title="Click for profile menu"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <FaUserCircle 
                className={`w-8 h-8 text-[#FBF0E3] cursor-pointer hover:text-white border-2 border-white rounded-full shadow-lg ${user?.photoURL ? 'hidden' : 'block'}`}
                onClick={toggleProfilePopup}
                title="Click for profile menu"
              />
              <ProfilePopup 
                user={user}
                onLogout={handleSignOut}
                onClose={() => setShowProfilePopup(false)}
                isVisible={showProfilePopup}
              />
            </div>
          )}
          <button 
            className="text-[#FBF0E3] focus:outline-none" 
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
        </div>

        {/* Desktop Menu */}
        <ul
          className="hidden lg:flex gap-8 text-[#FBF0E3] text-lg h-full"
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
          
          {!userLoggedIn ? (
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center h-full px-8 text-[#FBF0E3] font-bold text-xl hover:underline hover:scale-110 text-hover-glow "
            >
              Login
            </button>
          ) : (
            <div className="flex items-center h-full px-4 relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-lg hover:shadow-white/50"
                  onClick={toggleProfilePopup}
                  title="Click for profile menu"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <FaUserCircle 
                className={`w-10 h-10 text-[#FBF0E3] cursor-pointer hover:text-white border-2 border-white rounded-full shadow-lg hover:shadow-white/50 ${user?.photoURL ? 'hidden' : 'block'}`}
                onClick={toggleProfilePopup}
                title="Click for profile menu"
              />
              <ProfilePopup 
                user={user}
                onLogout={handleSignOut}
                onClose={() => setShowProfilePopup(false)}
                isVisible={showProfilePopup}
              />
            </div>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#967259] w-full">
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