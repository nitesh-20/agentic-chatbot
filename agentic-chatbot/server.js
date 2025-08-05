// Simple Express backend for chatbot integration
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Gemini AI logic (replace with real API call later)
function getGeminiReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('cost')) {
    return 'Our product pricing starts at $49/month. Would you like more details?';
  } else if (lower.includes('feature') || lower.includes('what can you do')) {
    return 'I can help you with product information, troubleshooting, and connecting you to a human agent if needed.';
  } else if (lower.includes('refund') || lower.includes('cancel')) {
    return 'I see you have a complex issue. Connecting you to a human support agent...';
  } else if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (lower.includes('problem') || lower.includes('issue')) {
    return 'Can you please describe your issue in detail? I will do my best to help or escalate if needed.';
  } else if (lower.includes('connect') || lower.includes('human')) {
    return 'Connecting you to a human support agent. Please wait...';
  } else if (lower.includes('product')) {
    return 'Our main product is SupportBot Pro, an AI-powered customer support solution for businesses.';
  } else {
    return 'I am not sure about that. Would you like to talk to a human support agent?';
  }
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  // Simulate Gemini API call delay
  setTimeout(() => {
    const reply = getGeminiReply(message);
    res.json({ reply });
  }, 1200);
});

app.listen(PORT, () => {
  console.log(`SupportBot backend running on port ${PORT}`);
});
