'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { Send, X, MessageCircle, Loader2, Sparkles } from 'lucide-react'; 
import { api } from '@/utils/api'; 

// Define the expected structure of the AI response data
interface AIResponseData {
  filters: Record<string, unknown>; // We keep this loose as filters can vary, or could import ProjectFilters type
  explanation: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I can help you find your dream property. Try "3 BHK in Sola under 1 Cr".',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend AI endpoint
      // api.post returns Promise<ApiResponse<T>> where ApiResponse has { data: T, ... }
      const response = await api.post<AIResponseData>('/ai/parse-query', { query: userMsg.text });
      
      if (!response.data) {
        throw new Error('Invalid response from AI service');
      }

      const { filters, explanation } = response.data;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: explanation || "I've found some properties for you! Redirecting...",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
             value.forEach((v) => params.append(key, String(v)));
          } else if (value !== undefined && value !== null) {
             params.append(key, String(value));
          }
        });
        
        setTimeout(() => {
             // Navigate to projects/search page
             router.push(`/projects?${params.toString()}`);
             setIsOpen(false);
        }, 1500);
      }

    } catch (error) {
      console.error('AI Search Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center group"
        >
           {/* Icon placeholder: MessageCircle */}
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col items-center overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              {/* Icon: Sparkles */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <h3 className="font-semibold text-sm">AI Property Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition"
            >
              {/* Icon: X */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 w-full p-4 overflow-y-auto bg-gray-50 h-[400px]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-2">
                    {/* Icon: Loader2 */}
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="text-xs text-gray-500">Thinking...</span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="w-full p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full shadow-md transition-all flex-shrink-0"
            >
              {/* Icon: Send */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
