import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import '../styles/chatbot.css';

const ChatWindow = ({ messages, isTyping }) => {
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);
  return (
    <div className="chat-window" ref={chatRef}>
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatWindow;
