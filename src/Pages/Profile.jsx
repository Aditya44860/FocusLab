import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiClock, FiEdit2, FiLogOut, FiCheck, FiX, FiFileText } from 'react-icons/fi';
import Navbar from '../components/navbar';
import { useAuth } from '../Firebase/AuthContext';
import { getUserData } from '../Firebase/userDataService';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, firestore } from '../Firebase/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LoginRequired from '../components/LoginRequired';

const Profile = () => {
  const { user, userLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [notesCount, setNotesCount] = useState(0);

  document.title = "FocusLab - Profile";

  useEffect(() => {
    if (userLoggedIn && user) {
      getUserData(user.uid).then(data => {
        setUserData(data);
        // Use totalFocusTime if available, otherwise calculate from timerData
        const totalMinutes = data.totalFocusTime || 
          Object.values(data.timerData || {}).reduce((sum, minutes) => sum + minutes, 0);
        setTotalHours(Math.round(totalMinutes / 60 * 10) / 10);
      });
      
      // Get notes count
      const notesQuery = query(
        collection(firestore, 'notes'),
        where('userId', '==', user.uid)
      );
      getDocs(notesQuery).then(snapshot => {
        setNotesCount(snapshot.size);
      });
    }
  }, [userLoggedIn, user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditName = () => {
    setNewDisplayName(user?.displayName || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    try {
      await updateProfile(user, { displayName: newDisplayName });
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating display name:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewDisplayName('');
  };

  if (!userLoggedIn) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen">
        <Navbar />
        <LoginRequired />
      </div>
    );
  }

  return (
    <div className="bg-[#E9CA9F] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-2xl shadow-amber-900/50 p-8 border border-gray-100">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#B6825E] rounded-full flex items-center justify-center">
                <FiUser className="text-white text-3xl" />
              </div>
              <div>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className="text-3xl font-bold text-[#4C4037] bg-transparent border-b-2 border-[#B6825E] focus:outline-none"
                      autoFocus
                    />
                    <button onClick={handleSaveName} className="text-green-600 hover:text-green-700">
                      <FiCheck className="text-xl" />
                    </button>
                    <button onClick={handleCancelEdit} className="text-red-600 hover:text-red-700">
                      <FiX className="text-xl" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-[#4C4037]">
                      {user?.displayName || 'User'}
                    </h1>
                    <button onClick={handleEditName} className="text-[#B6825E] hover:text-[#967259]">
                      <FiEdit2 className="text-lg" />
                    </button>
                  </div>
                )}
                <p className="text-[#7B5B44] flex items-center gap-2 mt-1">
                  <FiMail className="text-sm" />
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#F7E5C5] p-6 rounded-lg border border-[#C49B59]">
              <div className="flex items-center gap-3 mb-2">
                <FiClock className="text-[#B6825E] text-xl" />
                <h3 className="font-semibold text-[#4C4037]">Total Focus Time</h3>
              </div>
              <p className="text-2xl font-bold text-[#B6825E]">{totalHours}h</p>
            </div>

            <div className="bg-[#F7E5C5] p-6 rounded-lg border border-[#C49B59]">
              <div className="flex items-center gap-3 mb-2">
                <FiFileText className="text-[#B6825E] text-xl" />
                <h3 className="font-semibold text-[#4C4037]">My Notes</h3>
              </div>
              <p className="text-2xl font-bold text-[#B6825E]">
                {notesCount}
              </p>
              <p className="text-sm text-[#7B5B44]">notes</p>
            </div>

            <div className="bg-[#F7E5C5] p-6 rounded-lg border border-[#C49B59]">
              <div className="flex items-center gap-3 mb-2">
                <FiCalendar className="text-[#B6825E] text-xl" />
                <h3 className="font-semibold text-[#4C4037]">Member Since</h3>
              </div>
              <p className="text-lg font-bold text-[#B6825E]">
                {user?.metadata?.creationTime ? 
                  new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  }) : 'Recently'
                }
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-[#F7E5C5] p-6 rounded-lg border border-[#C49B59]">
            <h3 className="text-xl font-semibold text-[#4C4037] mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#C49B59]/30">
                <span className="text-[#7B5B44]">Display Name</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#4C4037]">
                    {user?.displayName || 'Not set'}
                  </span>
                  <button onClick={handleEditName} className="text-[#B6825E] hover:text-[#967259]">
                    <FiEdit2 className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#C49B59]/30">
                <span className="text-[#7B5B44]">Email</span>
                <span className="font-medium text-[#4C4037]">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#C49B59]/30">
                <span className="text-[#7B5B44]">Email Verified</span>
                <span className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {user?.emailVerified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#7B5B44]">Account Created</span>
                <span className="font-medium text-[#4C4037]">
                  {user?.metadata?.creationTime ? 
                    new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;