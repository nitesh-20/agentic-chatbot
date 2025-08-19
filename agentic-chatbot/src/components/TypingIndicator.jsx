import React from 'react';
import { Bot } from 'lucide-react';
import '../styles/chatbot.css';

const TypingIndicator = () => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
        <Bot className="text-white" size={20} />
      </div>

      <div className="max-w-xs lg:max-w-md">
        <div className="px-6 py-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Processing your request…</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
