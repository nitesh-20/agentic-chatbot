

import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import './styles/chatbot.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await fetch('http://localhost:5050/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleConnectAgent = () => {
    setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Connecting you to a human support agent. Please wait...' }]);
  };

  return (
    <div className="chat-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="project-header" style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ color: '#fff', fontWeight: 700, fontSize: '2.2rem', margin: 0, letterSpacing: '0.01em' }}>Chatbot for Customer Support</h1>
        <div style={{ color: '#aaa', fontSize: '1.08rem', marginTop: 8 }}>How can I help you today?</div>
      </div>
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', width: '100%', maxWidth: 900, justifyContent: 'center', position: 'relative' }}>
        <div className="chat-container" style={{ minWidth: 350, maxWidth: 420, flex: 1 }}>
          <ChatWindow messages={messages} isTyping={isTyping} />
          <form className="chat-input-area" onSubmit={sendMessage} style={{ position: 'relative' }}>
            <label htmlFor="image-upload" style={{ cursor: 'pointer', marginRight: 8, display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="18" height="14" rx="3" fill="#181c24" stroke="#00eaff" strokeWidth="1.5"/>
                <circle cx="7.5" cy="9.5" r="1.5" fill="#00eaff" />
                <path d="M2 16L7.5 10.5L13 16L16 13L20 17" stroke="#00eaff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={() => alert('Image upload is a demo feature.')} />
            </label>
            <input
              className="chat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              style={{ background: '#181c24', color: '#fff' }}
            />
            <button className="send-btn" type="submit">Send</button>
          </form>
        </div>
        {/* End main flex row */}
      </div>
      {/* Floating bot/human agent button at bottom right */}
      <button
        onClick={handleConnectAgent}
        className="floating-agent-btn"
        style={{
          position: 'fixed',
          right: 36,
          bottom: 36,
          background: '#181c24',
          border: '2.5px solid #00eaff',
          borderRadius: '50%',
          width: 70,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px 0 rgba(0,238,255,0.18)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'box-shadow 0.2s, border 0.2s',
        }}
        title="Connect to Human Agent"
      >
        {/* Modern bot logo */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#00eaff" strokeWidth="2.5" fill="#181c24" />
          <ellipse cx="20" cy="18" rx="9" ry="7" fill="#00eaff" fillOpacity="0.9" />
          <rect x="13" y="27" width="14" height="4" rx="2" fill="#00eaff" fillOpacity="0.9" />
          <circle cx="16.5" cy="18" r="1.5" fill="#181c24" />
          <circle cx="23.5" cy="18" r="1.5" fill="#181c24" />
          <rect x="18" y="22" width="4" height="1.5" rx="0.75" fill="#181c24" />
        </svg>
      </button>
    </div>
  );
}

export default App;
