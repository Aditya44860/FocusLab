import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiPlus, FiUsers, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/navbar';
import { useAuth } from '../Firebase/AuthContext';
import LoginRequired from '../components/LoginRequired';

const initialChats = {
  Python: [
    { sender: 'Alice', text: 'How do I install Python packages?', time: '10:30 AM', isMe: false },
    { sender: 'You', text: 'Use pip! For example: pip install numpy.', time: '10:32 AM', isMe: true },
    { sender: 'Bob', text: 'What\'s the difference between list and tuple?', time: '10:35 AM', isMe: false },
    { sender: 'You', text: 'Lists are mutable, tuples are immutable.', time: '10:36 AM', isMe: true },
  ],
  JavaScript: [
    { sender: 'Charlie', text: 'What is closure in JS?', time: '9:15 AM', isMe: false },
    { sender: 'You', text: 'A closure is a function that remembers its lexical scope.', time: '9:17 AM', isMe: true },
    { sender: 'Diana', text: 'How do I declare a variable?', time: '9:20 AM', isMe: false },
    { sender: 'You', text: 'Use var, let, or const.', time: '9:21 AM', isMe: true },
  ],
  React: [
    { sender: 'Eve', text: 'How do I use useState?', time: '2:45 PM', isMe: false },
    { sender: 'You', text: 'Import useState and use it to hold component state.', time: '2:47 PM', isMe: true },
    { sender: 'Frank', text: 'What is JSX?', time: '2:50 PM', isMe: false },
    { sender: 'You', text: 'JSX is a syntax extension that lets you write HTML in JavaScript.', time: '2:52 PM', isMe: true },
  ],
};

const Groups = () => {
  const { userLoggedIn } = useAuth();
  const [selectedGroup, setSelectedGroup] = useState('Python');
  const [chats, setChats] = useState(initialChats);
  const [inputText, setInputText] = useState('');
  const [groupCount, setGroupCount] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  document.title = "FocusLab - Groups";



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, selectedGroup]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setChats(prev => ({
      ...prev,
      [selectedGroup]: [...prev[selectedGroup], {
        sender: 'You',
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }]
    }));
    setInputText('');
  };

  const addGroup = () => {
    const groupName = `Study Group ${groupCount}`;
    setGroupCount(prev => prev + 1);
    setChats(prev => ({ ...prev, [groupName]: [{ sender: 'System', text: 'Welcome to the group!', time: 'now', isMe: false }] }));
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
    setShowChat(true);
  };

  const goBackToList = () => {
    setShowChat(false);
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSend();

  return (
    <div className="bg-[#E9CA9F] min-h-screen overflow-hidden">
      <Navbar></Navbar>
      {/* Chat Container */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 pb-4 md:pb-8 mt-16 md:mt-20">
        <div className="bg-[#F7E5C5] rounded-xl md:rounded-2xl shadow-lg overflow-hidden h-[80vh] md:h-[75vh] flex flex-col border-2 md:border-[4px] border-[#C49B59]">
          
          {/* Mobile: Show either chat list or individual chat */}
          <div className="md:hidden h-full flex flex-col">
  {!showChat ? (
    // Mobile Chat List View
    <>
      <div className="bg-[#B6825E] h-16 flex items-center justify-between px-4 text-white">
        <h1 className="font-semibold text-lg">Groups</h1>
        <button onClick={addGroup} className="p-2 rounded-full hover:bg-[#967259]">
          <FiPlus size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#F7E5C5]">
        {Object.keys(chats).map((group) => (
          <div
            key={group}
            onClick={() => selectGroup(group)}
            className="flex items-center gap-4 p-4 border-b border-[#C49B59] cursor-pointer hover:bg-[#EFD6B1]"
          >
            <div className="w-12 h-12 bg-[#B77A42] rounded-full flex items-center justify-center text-white">
              <FiUsers size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-[#4C4037] font-semibold">{group}</h3>
              <p className="text-sm text-[#7B5B44] truncate">
                {chats[group][chats[group].length - 1]?.text || 'No messages'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    // Mobile Individual Chat View
    <>
      <div className="bg-[#8d6345e1] border-[#C49B59] h-16 flex items-center border-b-3 px-4 text-white">
        <button onClick={goBackToList} className="mr-3">
          <FiArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 bg-[#B77A42] rounded-full flex items-center justify-center mr-3">
          <FiUsers size={16} />
        </div>
        <h2 className="font-semibold">{selectedGroup}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-[#f7dfb5] space-y-3">
        {chats[selectedGroup]?.map((message, index) => (
          <div key={index} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] text-sm px-4 py-2 rounded-xl shadow ${
                message.isMe
                  ? 'bg-[#B6825E] text-white rounded-br-none'
                  : 'bg-white text-[#4C4037] rounded-bl-none'
              }`}
            >
              {!message.isMe && (
                <p className="text-xs font-semibold mb-1 opacity-70">{message.sender}</p>
              )}
              <p>{message.text}</p>
              <p className={`text-[10px] mt-1 text-right ${message.isMe ? 'text-white/70' : 'text-[#7B5B44]'}`}>{message.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-[#f7dfb5] border-t border-[#C49B59]">
        <div className="flex items-center bg-white rounded-full px-3 py-2 border-2 border-[#C49B59]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 outline-none bg-transparent text-sm px-2 placeholder-[#7B5B44]"
          />
          <button onClick={handleSend} className="text-[#7B5B44] hover:text-[#a66e2f] rotate-45">
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </>
  )}
</div>



          {/* Desktop: Original layout */}
          <div className="hidden md:flex md:flex-col h-full">
            <div className="bg-[#B6825E] h-20 flex items-center border-b-[4px] border-[#C49B59]">
              <div className="w-80 px-4 flex items-center">
                <button onClick={addGroup} className="bg-[#47351D]/50 text-[#B6825E] py-3 px-3 ml-3 rounded-full hover:bg-[#caa680] hover:text-[#3d2e1d] transition-colors flex items-center justify-center">
                  <FiPlus size={22} />
                </button>
              </div>
              <div className="flex-1 px-6 flex items-center justify-end">
                <button className="bg-[#47351D]/50 text-[#B6825E] py-3 px-3 mr-3 rounded-full hover:bg-[#caa680] hover:text-[#3d2e1d] transition-colors flex items-center justify-center">
                  <FiUsers size={22} /> <span className='ml-4'>Join Room</span>
                </button>
              </div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div className="w-80 bg-[#F7E5C5] border-r-[4px] border-[#C49B59] flex flex-col">
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  {Object.keys(chats).map((group) => (
                    <div key={group} onClick={() => setSelectedGroup(group)} className={`p-4 cursor-pointer border-b-[4px] border-[#C49B59] hover:bg-[#EFD6B1] transition-colors ${selectedGroup === group ? 'bg-[#B6825E]/45 ' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#B77A42] rounded-full flex items-center justify-center flex-shrink-0">
                          <FiUsers className="text-white" size={18} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#4C4037] text-sm">{group}</h3>
                          <p className="text-xs text-[#7B5B44] truncate">{chats[group][chats[group].length - 1]?.text || 'No messages'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-[#f7dfb5] overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chats[selectedGroup]?.map((message, index) => (
                    <div key={index} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${message.isMe ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-3 rounded-2xl ${message.isMe ? 'bg-[#B6825E] text-white rounded-br-md' : 'bg-[#B6825E] text-white rounded-bl-md'}`}>
                          {!message.isMe && <p className="text-xs font-semibold mb-1 opacity-70">{message.sender}</p>}
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className={`text-xs text-[#7B5B44] mt-1 ${message.isMe ? 'text-right' : 'text-left'}`}>{message.time}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-6 bg-[#f7dfb5] flex-shrink-0">
                  <div className="relative">
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type your message..." className="w-full px-4 py-3 pr-12 rounded-full border-[3px] border-[#C49B59] focus:outline-none bg-transparent placeholder-[#7B5B44]" />
                    <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#7B5B44] text-[130%] cursor-pointer hover:text-[#a66e2f] rotate-45" onClick={handleSend}><FiSend /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!userLoggedIn && <LoginRequired />}
    </div>
  );
};

export default Groups;
