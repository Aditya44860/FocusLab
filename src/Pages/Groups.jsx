import { useState, useEffect } from 'react';
import { FiPlus, FiUsers } from 'react-icons/fi';
import Navbar from '../components/navbar';
import InsideGroup from '../components/InsideGroup';
import { useAuth } from '../Firebase/AuthContext';
import LoginRequired from '../components/LoginRequired';
import { db } from '../Firebase/Firebase';
import { ref, onValue, push, serverTimestamp, set } from 'firebase/database';

const Groups = () => {
  const { userLoggedIn, user } = useAuth();
  const [joinCode, setJoinCode] = useState('');
  const [userGroup, setUserGroup] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isGroupOwner, setIsGroupOwner] = useState(false);

  document.title = "FocusLab - Groups";

  const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  useEffect(() => {
    if (!userLoggedIn || !user) return; //if not logged in

    // Check if user has a group or is member of one
    const userGroupRef = ref(db, `userGroups/${user.uid}`);
    const unsubscribe = onValue(userGroupRef, (snapshot) => {
      const groupId = snapshot.val();
      if (groupId) {
        // Check if group still exists
        const groupRef = ref(db, `groups/${groupId}`);
        onValue(groupRef, (groupSnapshot) => {
          const group = groupSnapshot.val();
          if (group) {
            setUserGroup(groupId);
          } else {
            // Group doesn't exist, clean up
            set(ref(db, `userGroups/${user.uid}`), null);
            setUserGroup(null);
          }
        });
      } else {
        setUserGroup(null);
      }
    });

    return () => unsubscribe();
  }, [userLoggedIn, user]);

  const createGroup = async () => {
    if (!groupName.trim()) return;
    
    const code = generateCode();
    const groupId = `group_${code}`;
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    try {
      // Create group with expiration
      await set(ref(db, `groups/${groupId}`), {
        name: groupName,
        code: code,
        owner: user.uid,
        ownerName: user.displayName || user.email,
        createdAt: Date.now(),
        expiresAt: expiresAt,
        members: {
          [user.uid]: {
            name: user.displayName || user.email,
            joinedAt: Date.now()
          }
        }
      });
      
      // Link user to group
      await set(ref(db, `userGroups/${user.uid}`), groupId);
      
      setShowCreateGroup(false);
      setGroupName('');
    } catch (error) {
      console.error('Error creating group:', error);
      alert(`Error creating group: ${error.message}`);
    }
  };

  const leaveGroup = async () => {
    if (!userGroup) return;
    
    try {
      if (isGroupOwner) {
        // If creator leaves, delete the entire group
        await set(ref(db, `groups/${userGroup}`), null);
      } else {
        // Add system message before leaving
        const messagesRef = ref(db, `groups/${userGroup}/messages`);
        await push(messagesRef, {
          text: `${user.displayName || user.email} left the chat`,
          sender: 'System',
          uid: 'system',
          time: serverTimestamp(),
          isSystem: true
        });
        
        // Remove user from group members
        await set(ref(db, `groups/${userGroup}/members/${user.uid}`), null);
      }
      
      // Remove user's group link and reset state
      await set(ref(db, `userGroups/${user.uid}`), null);
      setUserGroup(null);
      setIsGroupOwner(false);
      
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  const joinGroup = async () => {
    if (!joinCode.trim()) return;
    
    const groupId = `group_${joinCode.toUpperCase()}`;
    const groupRef = ref(db, `groups/${groupId}`);
    
    onValue(groupRef, async (snapshot) => {
      const group = snapshot.val();
      if (group) {
        try {
          // Add user to group members
          await set(ref(db, `groups/${groupId}/members/${user.uid}`), {
            name: user.displayName || user.email,
            joinedAt: serverTimestamp()
          });
          
          // Link user to group
          await set(ref(db, `userGroups/${user.uid}`), groupId);
          
          // Add system message
          const messagesRef = ref(db, `groups/${groupId}/messages`);
          await push(messagesRef, {
            text: `${user.displayName || user.email} joined the chat`,
            sender: 'System',
            uid: 'system',
            time: serverTimestamp(),
            isSystem: true
          });
          
          setShowJoinGroup(false);
          setJoinCode('');
        } catch (error) {
          console.error('Error joining group:', error);
          alert('Error joining group. Please try again.');
        }
      } else {
        alert('Invalid group code!');
      }
    }, { onlyOnce: true });
  };

  if (!userLoggedIn) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen overflow-hidden">
        <Navbar />
        <LoginRequired />
      </div>
    );
  }

  // group owner check
  useEffect(() => {
    if (userGroup && user) {
      const groupRef = ref(db, `groups/${userGroup}`);
      const unsubscribe = onValue(groupRef, (snapshot) => {
        const group = snapshot.val();
        if (group && group.owner === user.uid) {
          setIsGroupOwner(true);
        } else {
          setIsGroupOwner(false);
        }
      });
      return () => unsubscribe();
    } else {
      setIsGroupOwner(false);
    }
  }, [userGroup, user]);

  // No group - show create/join options
  if (!userGroup) {
    return (
      <div className="bg-[#E9CA9F] min-h-screen overflow-hidden">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-[#B6825E] mb-6 text-center">Study Groups</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowCreateGroup(true)}
                className="w-full bg-[#B6825E] text-white py-3 px-4 rounded-lg hover:bg-[#a36e4b] flex items-center justify-center gap-2"
              >
                <FiPlus /> Create Group
              </button>
              
              <button
                onClick={() => setShowJoinGroup(true)}
                className="w-full border-2 border-[#B6825E] text-[#B6825E] py-3 px-4 rounded-lg hover:bg-[#B6825E] hover:text-white flex items-center justify-center gap-2"
              >
                <FiUsers /> Join Group
              </button>
            </div>

            {/* Create Group Modal */}
            {showCreateGroup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Create Group</h3>
                  <form onSubmit={(e) => { e.preventDefault(); createGroup(); }}>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="Group name"
                      className="w-full p-3 border rounded-lg mb-4"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#B6825E] text-white py-2 rounded-lg"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateGroup(false)}
                        className="flex-1 border border-gray-300 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Join Group */}
            {showJoinGroup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
                  <h3 className="text-lg font-bold mb-4">Join Group</h3>
                  <form onSubmit={(e) => { e.preventDefault(); joinGroup(); }}>
                    <input
                      type="text"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      placeholder="Enter group code"
                      className="w-full p-3 border rounded-lg mb-4"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#B6825E] text-white py-2 rounded-lg"
                      >
                        Join
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowJoinGroup(false)}
                        className="flex-1 border border-gray-300 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Has group - show chat
  return (
    <>
      <Navbar />
      <InsideGroup 
        userGroup={userGroup}
        isGroupOwner={isGroupOwner}
        onJoinGroup={() => setShowJoinGroup(true)}
        onLeaveGroup={leaveGroup}
      />
      
      {/* Join Group Modal */}
      {showJoinGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Join Group</h3>
            <form onSubmit={(e) => { e.preventDefault(); joinGroup(); }}>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter group code"
                className="w-full p-3 border rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#B6825E] text-white py-2 rounded-lg"
                >
                  Join
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinGroup(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Groups;