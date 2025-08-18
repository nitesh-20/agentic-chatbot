// Bolt.ai Nova AI Support UI
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Settings, User, Bot, ArrowUp, Phone, MessageCircle, Search, Zap } from 'lucide-react';
import MessageBubble from './components/MessageBubble';
import ProductCard from './components/ProductCard';
import QuickActions from './components/QuickActions';
import TypingIndicator from './components/TypingIndicator';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm Nova, your AI-powered support assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockProducts = [
    {
      id: 1,
      name: "NeuralSync Pro X1",
      price: "$2,499",
      image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Advanced AI-powered neural interface device",
      features: ["Neural processing", "Real-time sync", "Cloud integration"]
    },
    {
      id: 2,
      name: "QuantumCore Desktop",
      price: "$4,999",
      image: "https://images.pexels.com/photos/2148217/pexels-photo-2148217.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Next-generation quantum computing workstation",
      features: ["Quantum processing", "Unlimited parallel tasks", "Zero latency"]
    }
  ];

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('product') || lowerMessage.includes('buy') || lowerMessage.includes('price')) {
      return {
        id: Date.now().toString(),
        text: "I found some products that might interest you:",
        sender: 'bot',
        timestamp: new Date(),
        type: 'product',
        productData: mockProducts
      };
    }
    if (lowerMessage.includes('human') || lowerMessage.includes('agent') || lowerMessage.includes('help') || lowerMessage.includes('complex')) {
      return {
        id: Date.now().toString(),
        text: "I understand you need specialized assistance. Let me connect you with one of our expert human agents. Please hold while I transfer your conversation.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'escalation'
      };
    }
    if (lowerMessage.includes('bug') || lowerMessage.includes('error') || lowerMessage.includes('problem')) {
      return {
        id: Date.now().toString(),
        text: "I'm sorry to hear you're experiencing technical issues. I can help troubleshoot common problems or connect you with our technical support team. What specific issue are you facing?",
        sender: 'bot',
        timestamp: new Date(),
      };
    }
    const responses = [
      "I understand your query. Let me help you find the best solution.",
      "That's a great question! Based on our knowledge base, I can provide you with detailed information.",
      "I'm here to assist you with any questions or concerns you may have.",
      "Let me process that information and provide you with the most accurate response.",
      "Thank you for reaching out. I'll make sure to address your inquiry comprehensively."
    ];
    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (action) => {
    setInputText(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Nova AI Support</h1>
              <p className="text-purple-300">Powered by Advanced Neural Networks</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Search className="text-white" size={20} />
            </button>
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Settings className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onActionClick={handleQuickAction} />

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                products={message.productData}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              <button
                onClick={toggleVoiceInput}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Mic size={20} />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
            <div className="text-gray-400 text-sm">Response time: &lt;30s</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors">
              <Phone size={16} />
              <span className="text-sm">Call Support</span>
            </button>
            <button className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
