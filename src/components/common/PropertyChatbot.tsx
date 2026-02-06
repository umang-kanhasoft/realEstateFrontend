'use client';

import { Message, useChat } from '@/context/ChatContext';
import { api } from '@/utils/api';
import {
  AutoAwesomeRounded,
  DeleteOutlineRounded,
  SendRounded,
  SmartToyRounded,
} from '@mui/icons-material';
import { CircularProgress, IconButton, Input, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Define the expected structure of the AI response data
interface AIResponseData {
  action: 'chat' | 'search';
  reply_text: string;
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'featured';
  filters?: Record<string, unknown>; // Simplified for brevity as per original file structure logic
}

export default function PropertyChatbot() {
  const { messages, addMessage, isLoading, setIsLoading, clearChat } =
    useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

        setTimeout(() => {
          router.push(`/projects?${params.toString()}`);
        }, 1500);
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
    <div className="fixed z-50 flex flex-col items-end gap-2 font-sans">
      {/* Chat Window - Lightened Background for Professional Look */}
      <div className="flex w-60 flex-col items-stretch overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:w-96">
        {/* Header - Changed to Light/Neutral */}
        <div className="z-10 flex w-full items-center justify-between border-b border-gray-100 bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary-50 p-2">
              <SmartToyRounded fontSize="small" className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-900">
                AI Assistant
              </h3>
              <p className="m-0 text-[10px] font-medium text-gray-500">
                Real Estate Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip title="Clear Chat" arrow placement="top">
              <IconButton
                onClick={clearChat}
                size="small"
                className="rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Messages Area - Light Background */}
        <div
          ref={scrollRef}
          style={{
            height: '600px',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginTop: 'auto' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-4 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                    <AutoAwesomeRounded className="text-[14px] text-primary-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? // User Message - Blue Theme Color
                        'rounded-br-none bg-primary-600 text-white'
                      : // AI Message - White and clean
                        'rounded-bl-none border border-gray-100 bg-white text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                  <AutoAwesomeRounded className="text-[14px] text-primary-600" />
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-none border border-gray-100 bg-white px-4 py-2 shadow-sm">
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
        </div>

        {/* Input Area - Lightened */}
        <div className="flex w-full items-center gap-2 border-t border-gray-100 bg-white p-2">
          <Input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            disableUnderline
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[13px] font-medium text-gray-900 focus-within:border-gray-300 focus-within:bg-white"
            disabled={isLoading}
          />
          <IconButton
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            // Send Button - Theme Color
            className="rounded-full bg-primary-600 p-2.5 text-white hover:bg-primary-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendRounded className="text-[20px]" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
