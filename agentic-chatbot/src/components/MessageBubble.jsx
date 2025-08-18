import React from 'react';
import { Bot, User, ExternalLink, ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';
import '../styles/chatbot.css';

const MessageBubble = ({ message, products }) => {
  const isUser = message.sender === 'user';
  const formatTime = (date) => {
    const d = date ? new Date(date) : new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="text-white" size={20} />
        </div>
      )}

      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'order-1' : ''}`}>
        <div
          className={`px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
            isUser
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-500/20'
              : 'bg-black/40 text-white border-white/10'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>

          {/* Escalation UI */}
          {message.type === 'escalation' && (
            <div className="mt-4 p-4 bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30">
              <div className="flex items-center space-x-2 mb-2">
                <ExternalLink className="text-yellow-400" size={16} />
                <span className="text-yellow-400 font-medium text-sm">Transferring to Human Agent</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-xl transition-colors">
                  Continue Transfer
                </button>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-xl transition-colors">
                  Stay with AI
                </button>
              </div>
            </div>
          )}

          {/* Product Cards */}
          {message.type === 'product' && products && (
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              <button className="w-full mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <ShoppingCart size={16} />
                <span>View All Products</span>
              </button>
            </div>
          )}
        </div>

        <div className={`mt-1 text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>

      {isUser && (
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <User className="text-white" size={20} />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
