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
      text: "Hello! I'm your Customer Support Assistant. I'm here to help with orders, billing, technical issues, and more — how can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [showTimestamps, setShowTimestamps] = useState(true);

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

  // Google Gemini / Vertex AI examples (real API shapes + commented code)
  // NOTE: Do NOT call Vertex/Google AI directly from client with service account credentials.
  // Run these examples from a secure server or proxy; if you must use a client-side key, keep it restricted.
  // --- Types (JSDoc) ---
  /**
   * @typedef {Object} GeminiRequest
   * @property {string} prompt  The user prompt/text to generate from
   * @property {number} [max_tokens] Max number of tokens to generate
   * @property {number} [temperature] Sampling temperature (0-1)
   */
  /**
   * @typedef {Object} GeminiResponse
   * @property {string} text   Generated text from the model
   * @property {Object} raw   Raw provider response (keeps provider-specific fields)
   */

  // Example A: Vertex AI (Google Cloud) - REST predict (server-side)
  // Replace PROJECT_ID, LOCATION, MODEL_ID and obtain a valid OAuth 2.0 token for a service account.
  /*
  async function fetchVertexPredictServerSide(prompt) {
    // Server-side example using application default credentials or service account
    const PROJECT_ID = 'your-project-id';
    const LOCATION = 'us-central1';
    const MODEL_ID = 'text-bison@001'; // or your Gemini model name
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/models/${MODEL_ID}:predict`;

    const body = {
      instances: [ { content: prompt } ],
      parameters: { maxOutputTokens: 512, temperature: 0.2 }
    };

    // Get OAuth bearer token server-side (do not do this in browser)
    const accessToken = await getServerSideAccessToken(); // implement using google-auth-library or metadata server

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    // Vertex/Gen response shapes vary; map to GeminiResponse
    return {
      text: json?.predictions?.[0]?.content || json?.predictions?.[0]?.outputs?.[0]?.data?.text || JSON.stringify(json),
      raw: json,
    };
  }
  */

  // Example B: Vertex AI with API Key (restricted key, still server-side recommended)
  /*
  async function fetchVertexWithApiKey(prompt) {
    const PROJECT_ID = 'your-project-id';
    const LOCATION = 'us-central1';
    const MODEL_ID = 'text-bison@001';
    const API_KEY = process.env.VERTEX_API_KEY; // store on server or in env
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/models/${MODEL_ID}:predict?key=${API_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instances: [{ content: prompt }], parameters: { maxOutputTokens: 512 } }),
    });
    return { text: (await res.json()) };
  }
  */

  // Example C: Lightweight client->server flow (recommended)
  // Client sends prompt to your backend (/api/generate), backend calls Vertex/OpenAI/Gemini, returns safe result.
  /*
  // Client (browser) - simple POST to your server
  async function requestFromBackend(prompt) {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    return res.json(); // { text: '...', raw: {...} }
  }
  */

  // Keep existing local fallback NLU logic unchanged below.
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

  const toggleSettings = () => setShowSettings(s => !s);
  
  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your Customer Support Assistant. I'm here to help with orders, billing, technical issues, and more — how can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
    setShowSettings(false);
  };
  
  const toggleTimestamps = () => setShowTimestamps(s => !s);

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
              <h1 className="text-2xl font-bold text-white">Chatbot for Customer Support</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Search className="text-white" size={20} />
            </button>
            <button onClick={toggleSettings} className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
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
          {/* Settings panel */}
          {showSettings && (
            <div className="settings-panel absolute top-24 right-8 z-30 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 w-64 shadow-xl">
              <h4 className="text-white font-semibold mb-2">Settings</h4>
              <div className="mb-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={showTimestamps} onChange={toggleTimestamps} />
                  <span className="text-sm text-purple-200">Show timestamps</span>
                </label>
              </div>
              <div className="flex space-x-2 mt-3">
                <button onClick={clearChat} className="button-default text-sm">Clear chat</button>
                <button onClick={() => setShowSettings(false)} className="button-default text-sm">Close</button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                products={message.productData}
                showTimestamp={showTimestamps}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-6 flex items-center space-x-4">
            {/* Mic button on the left (separate) */}
            <button
              onClick={toggleVoiceInput}
              className={`p-3 rounded-xl transition-all duration-300 mic-button ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
            >
              <Mic size={20} />
            </button>

            {/* Message input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="chat-input w-full rounded-2xl px-6 py-4 placeholder-gray-400 focus:outline-none transition-all duration-300"
            />

            {/* Send button to the right */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="p-4 send-btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
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
