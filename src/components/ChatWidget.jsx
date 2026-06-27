import { useState, useEffect, useRef } from "react";
import { FaComments, FaPaperPlane, FaTrash, FaTimes, FaSpinner } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

const PRESET_PROMPTS = [
  "Suggest a wildlife safari",
  "What pilgrim tours do you offer?",
  "Help me plan a 3-day Nashik trip",
];

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot",
  text: "Hello! ☕ Welcome to BhramanTea Tours. I am your AI travel companion. Ask me anything about our wildlife safaris, pilgrim packages, international tours, or custom itineraries! How can I help you plan your next journey today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

function ChatWidget() {
  const { showToast, showPopup } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("bhramantea_chat_history");
    return saved ? JSON.parse(saved) : [WELCOME_MESSAGE];
  });
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Sync message history to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("bhramantea_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new messages or open
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages with user's input
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4010/api";
      
      // We pass the conversation history (excluding the very first welcome message)
      const chatHistory = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.role,
          text: msg.text
        }));

      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: data.message || "I apologize, but I encountered an error. Please try sending your message again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("AI Chat Network Error:", error);
      const networkErrorMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: "I am having trouble reaching the server. Please check your internet connection or try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, networkErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handlePresetClick = (presetText) => {
    handleSendMessage(presetText);
  };

  const handleClearChat = () => {
    showPopup({
      title: "Clear Chat History",
      message: "Are you sure you want to clear your chat history? This cannot be undone.",
      type: "warning",
      onConfirm: () => {
        setMessages([WELCOME_MESSAGE]);
        sessionStorage.removeItem("bhramantea_chat_history");
        showToast("Chat history cleared successfully!", "success");
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl w-[90vw] sm:w-[380px] h-[500px] flex flex-col mb-4 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#1F4027] text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-bold text-amber-300">
                BT
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">BhramanTea Assistant</h4>
                <p className="text-[10px] text-emerald-200">Online | Travel Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleClearChat} 
                title="Clear Chat History"
                className="p-1.5 hover:bg-emerald-800 rounded-full transition text-emerald-100"
              >
                <FaTrash size={12} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 hover:bg-emerald-800 rounded-full transition text-emerald-100"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1F4027] text-white rounded-tr-none shadow-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-gray-200 text-gray-800 px-3.5 py-2 rounded-2xl rounded-tl-none text-sm shadow-sm flex items-center space-x-1.5">
                  <FaSpinner className="animate-spin text-[#1F4027]" size={12} />
                  <span className="text-xs text-gray-500 font-light">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Prompts Section */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 bg-white border-t border-gray-100 flex flex-col space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 text-left px-1">
                Frequently Asked
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(prompt)}
                    className="text-left text-xs bg-emerald-50 hover:bg-emerald-100 text-[#1F4027] px-2.5 py-1.5 rounded-full border border-emerald-100 transition duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about tour packages..."
              required
              disabled={isLoading}
              className="flex-grow px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1F4027] focus:border-[#1F4027] disabled:opacity-50 disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-[#1F4027] hover:bg-[#152e1c] text-white p-2.5 rounded-xl transition shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 bg-[#1F4027] hover:bg-[#152e1c] text-white px-5 py-3.5 rounded-full shadow-2xl transition duration-300 hover:scale-105 group"
      >
        <FaComments size={20} className="group-hover:rotate-6 transition duration-300" />
        <span className="font-bold text-sm tracking-wide">Let's Chat</span>
      </button>
    </div>
  );
}

export default ChatWidget;
