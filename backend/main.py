
# --- FastAPI Customer Support Chatbot Backend ---
# Features:
# 1. Answer customer queries (greetings, pricing, features, etc.)
# 2. Provide product information
# 3. Route complex issues to human support agents
#
# API Endpoint: POST /api/chat
# Request: { "message": "..." }
# Response: { "reply": "..." }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Firebase Admin SDK imports
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin with correct path
cred = credentials.Certificate("supportbot-firebase-88fc4-firebase-adminsdk-fbsvc-5d781f5633.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

# Allow CORS for all origins (for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatRequest(BaseModel):
    message: str


# --- Mock AI Response for Development ---
import random

def get_mock_reply(message: str) -> str:
    # Enhanced rule-based mock for customer support chatbot
    lower = message.lower()
    if any(word in lower for word in ["hi", "hello", "hey"]):
        return random.choice([
            "Hello! How can I help you today?",
            "Hi there! What can I do for you?",
            "Hey! Need any assistance?"
        ])
    elif "price" in lower or "cost" in lower:
        return "Our product pricing starts at $49/month. Would you like more details or a custom quote?"
    elif "feature" in lower or "what can you do" in lower or "capabilities" in lower:
        return "I can answer your questions, provide product information, help with troubleshooting, and connect you to a human support agent if needed."
    elif "refund" in lower or "cancel" in lower or "return" in lower:
        return "I see you have a complex issue regarding refunds or cancellations. Let me connect you to a human support agent for further assistance."
    elif "problem" in lower or "issue" in lower or "not working" in lower or "error" in lower:
        return "I'm sorry you're experiencing issues. Can you please describe your problem in detail? I will do my best to help or escalate if needed."
    elif "human" in lower or "agent" in lower or "real person" in lower or "representative" in lower:
        return "Connecting you to a human support agent. Please wait..."
    elif "hours" in lower or "open" in lower or "timing" in lower:
        return "Our customer support is available 24/7. You can reach us anytime!"
    elif "contact" in lower or "phone" in lower or "email" in lower:
        return "You can contact us at support@example.com or call 1-800-123-4567."
    elif "order" in lower or "status" in lower:
        return "To check your order status, please provide your order number."
    elif "product" in lower and ("info" in lower or "information" in lower or "details" in lower):
        return "Please specify which product you'd like information about, and I'll be happy to help!"
    elif "thanks" in lower or "thank you" in lower:
        return random.choice([
            "You're welcome! If you have any more questions, feel free to ask.",
            "Happy to help! Let me know if you need anything else."
        ])
    else:
        return random.choice([
            "I'm not sure about that. Would you like to talk to a human support agent?",
            "Sorry, I don't have that information. Can I connect you to a human?",
            "Could you please clarify your question?"
        ])


# --- API Endpoint ---
@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    reply = get_mock_reply(req.message)
    chat_doc = {
        "user_message": req.message,
        "bot_reply": reply,
        "timestamp": firestore.SERVER_TIMESTAMP
    }
    db.collection("chats").add(chat_doc)
    return {"reply": reply}

# --- Run the server ---

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050)
