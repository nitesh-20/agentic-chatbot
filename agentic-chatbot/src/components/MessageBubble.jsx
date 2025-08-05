import React from 'react';
import '../styles/chatbot.css';

const MessageBubble = ({ message }) => (
  <div className={`message-bubble ${message.sender}`}>
    <span>{message.text}</span>
  </div>
);

export default MessageBubble;
