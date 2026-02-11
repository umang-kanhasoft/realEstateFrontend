'use client';

import { Message, useChat } from '@/context/ChatContext';
import { api } from '@/utils/api';
import {
  AutoAwesomeRounded,
  ChatBubbleRounded,
  CloseRounded,
  DeleteOutlineRounded,
  SendRounded,
  SmartToyRounded,
} from '@mui/icons-material';
import { CircularProgress, IconButton, Input, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

// Define the expected structure of the AI response data
interface AIResponseData {
  action: 'chat' | 'search';
  reply_text: string;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'featured';
  filters?: Record<string, unknown>; // Simplified for brevity as per original file structure logic
}

export default function Chatbot() {
  const {
    messages,
    addMessage,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen,
    clearChat,
  } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
    setShowNotification(false);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text,
      }));
      history.push({ role: 'user', content: userMsg.text });

      const response = await api.post<AIResponseData>('/ai/parse-query', {
        messages: history,
      });

      if (!response.data) {
        throw new Error('Invalid response from AI service');
      }

      const { filters, reply_text, action } = response.data;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text:
          reply_text || "I've found some properties for you! Redirecting...",
        sender: 'ai',
        timestamp: new Date(),
      };
      addMessage(aiMsg);

      if (action === 'search' && filters && Object.keys(filters).length > 0) {
        const params = new URLSearchParams();

        const buildParams = (obj: Record<string, unknown>, prefix = '') => {
          Object.entries(obj).forEach(([key, value]) => {
            const paramKey = prefix ? `${prefix}.${key}` : key;
            if (value !== undefined && value !== null) {
              if (Array.isArray(value)) {
                value.forEach(v => params.append(paramKey, String(v)));
              } else if (typeof value === 'object') {
                buildParams(value as Record<string, unknown>, paramKey);
              } else {
                params.append(paramKey, String(value));
              }
            }
          });
        };

        buildParams(filters);
      }
    } catch (error) {
      console.error('AI Search Error:', error);
      addMessage({
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
      {/* Proactive Notification Bubble */}
      {!isOpen && showNotification && (
        <div className="animate-fade-in-up relative my-2 max-w-[200px] rounded-2xl border border-white/50 bg-white/90 p-3 pt-4 shadow-xl backdrop-blur-md">
          <IconButton
            onClick={e => {
              e.stopPropagation();
              setShowNotification(false);
            }}
            aria-label="Close notification"
            className="absolute right-1 top-1 rounded-full p-0.5 text-gray-700 hover:bg-black/5"
          >
            <CloseRounded className="text-[14px]" />
          </IconButton>
          <p className="text-xs font-medium leading-tight text-gray-700">
            👋 Need help finding the best property deal?
          </p>
          <div className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 border-b border-r border-white/50 bg-white/90 backdrop-blur-md"></div>
        </div>
      )}

      {/* Launcher Button */}
      {!isOpen && (
        <IconButton
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false);
          }}
          aria-label="Open chat assistant"
          className="group relative flex items-center justify-center rounded-full border-white/50 bg-white p-4 text-primary-600 shadow-2xl transition-all hover:scale-105"
        >
          <ChatBubbleRounded
            fontSize="medium"
            className="animate-pulse-slow text-primary-600"
          />
        </IconButton>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex w-80 flex-col items-center overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out sm:w-96">
          {/* Header */}
          <div className="z-10 flex w-full items-center justify-between bg-primary-900 p-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-1.5 backdrop-blur-sm">
                <SmartToyRounded fontSize="small" className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">
                  AI Assistant
                </h3>
                <p className="m-0 text-[10px] font-medium text-primary-100 opacity-90">
                  Real Estate Intelligence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Clear Chat Button */}
              <Tooltip title="Clear Chat" arrow placement="top">
                <IconButton
                  onClick={clearChat}
                  size="small"
                  aria-label="Clear chat"
                  className="rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <DeleteOutlineRounded fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Close" arrow placement="top">
                <IconButton
                  onClick={() => setIsOpen(false)}
                  size="small"
                  aria-label="Close chat"
                  className="rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <CloseRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="h-[400px] max-h-[500px] w-full flex-1 overflow-y-auto bg-white/80 p-4"
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-4 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary-100 bg-primary-50">
                    <AutoAwesomeRounded className="text-[14px] text-primary-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'rounded-tr-none bg-primary-600 text-white'
                      : 'rounded-tl-none border border-solid border-gray-100 bg-white text-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary-100 bg-primary-50">
                  <AutoAwesomeRounded className="text-[14px] text-primary-600" />
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-none border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <CircularProgress
                    size={14}
                    thickness={5}
                    className="text-primary-600"
                  />
                  <span className="text-xs font-medium tracking-wide text-gray-500">
                    Analysing...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex w-full items-center gap-2 border-t border-gray-100 bg-white/90 p-3 backdrop-blur">
            <Input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              disableUnderline
              className="flex-1 rounded-xl border border-transparent bg-gray-50 px-4 py-2.5 text-[13px] font-medium text-gray-800 transition-all focus-within:border-primary-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100"
              disabled={isLoading}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="rounded-xl bg-primary-600 p-2.5 text-white shadow-lg hover:bg-primary-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendRounded className="text-[20px]" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
