import { useState, useEffect, useRef } from 'react';
import { FiSend, FiPlus, FiUsers, FiCopy, FiArrowLeft, FiLogOut, FiClock } from 'react-icons/fi';
import { useAuth } from '../Firebase/AuthContext';
import { db } from '../Firebase/Firebase';
import { ref, onValue, push, serverTimestamp, set } from 'firebase/database';

const InsideGroup = ({ userGroup, isGroupOwner, onBack, onJoinGroup, onLeaveGroup }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showGroupsMenu, setShowGroupsMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userGroup) {
      setMessages([]);
      return;
    }

    const messagesRef = ref(db, `groups/${userGroup}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data).sort((a, b) => {
          const timeA = a.time || 0;
          const timeB = b.time || 0;
          return timeA - timeB;
        });
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [userGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userGroup) return;

    const groupRef = ref(db, `groups/${userGroup}`);
    const unsubscribe = onValue(groupRef, (snapshot) => {
      const group = snapshot.val();
      if (group && group.expiresAt) {
        const updateTimer = async () => {
          const now = Date.now();
          const timeRemaining = group.expiresAt - now;
          
          if (timeRemaining <= 0) {
            setTimeLeft('Expired');
            // Delete the expired group
            await set(ref(db, `groups/${userGroup}`), null);
          } else {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${hours}h ${minutes}m left`);
          }
        };
        
        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        
        return () => clearInterval(interval);
      }
    });

    return () => unsubscribe();
  }, [userGroup]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !userGroup || !user) return;

    try {
      const messagesRef = ref(db, `groups/${userGroup}/messages`);
      await push(messagesRef, {
        text: input,
        sender: user.displayName || user.email,
        uid: user.uid,
        time: serverTimestamp(),
      });
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (error) {
      console.error('Error copying code:', error);
      alert('Failed to copy code');
    }
  };

  return (
    <div className="bg-[#E9CA9F] min-h-screen overflow-hidden flex flex-col">
      {/* Group Header */}
      <div className="bg-[#B6825E] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGroupsMenu(true)}
            className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30"
          >
            <FiArrowLeft size={16} />
            Back
          </button>
          <div>
            <h2 className="font-bold">{isGroupOwner ? 'Your Group' : 'Group Chat'}</h2>
            <p className="text-sm opacity-75">Code: {userGroup?.split('_')[1]}</p>
            <p className="text-xs opacity-60 flex items-center gap-1"><FiClock size={12} /> {timeLeft || 'Loading...'}</p>
          </div>
        </div>
        <button
          onClick={() => copyCode(userGroup?.split('_')[1])}
          className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30"
        >
          <FiCopy size={16} />
          {isGroupOwner ? 'Share Code' : 'Copy Code'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="bg-white rounded-lg p-4 shadow-md max-w-3xl mx-auto h-[75vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isSystem ? 'text-center text-gray-500 italic text-sm' : ''}`}>
              {msg.isSystem ? (
                <span>{msg.text}</span>
              ) : (
                <>
                  <strong className="text-[#B6825E]">{msg.sender}:</strong>{" "}
                  <span>{msg.text}</span>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="flex justify-center px-4 pb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full max-w-3xl rounded-l-lg p-3 border border-[#B6825E] focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#B6825E] text-white p-3 rounded-r-lg hover:bg-[#a36e4b] flex items-center"
        >
          <FiSend />
        </button>
      </form>

      {/* Groups Menu Modal */}
      {showGroupsMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#B6825E] mb-4">Your Groups</h3>
            
            <div className="space-y-3 mb-4">
              <button
                onClick={() => setShowGroupsMenu(false)}
                className="w-full bg-[#B6825E] text-white py-3 px-4 rounded-lg hover:bg-[#a36e4b] flex items-center justify-center gap-2"
              >
                <FiUsers /> Re-enter Current Group
              </button>
              
              <button
                onClick={() => {
                  setShowGroupsMenu(false);
                  onJoinGroup();
                }}
                className="w-full border-2 border-[#B6825E] text-[#B6825E] py-3 px-4 rounded-lg hover:bg-[#B6825E] hover:text-white flex items-center justify-center gap-2"
              >
                <FiPlus /> Join Another Group
              </button>
              
              <button
                onClick={() => {
                  setShowGroupsMenu(false);
                  onLeaveGroup();
                }}
                className="w-full border-2 border-red-500 text-red-500 py-3 px-4 rounded-lg hover:bg-red-500 hover:text-white flex items-center justify-center gap-2"
              >
                <FiLogOut /> Leave Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsideGroup;