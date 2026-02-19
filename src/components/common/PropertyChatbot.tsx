'use client';

import { env } from '@/config/env';
import { Message, useChat } from '@/context/ChatContext';
import { useProperty } from '@/hooks/useProperty';
import { useUI } from '@/hooks/useUI';
import { apiClient } from '@/lib/api/client';
import { AiSearchResponse, ApiProjectObject } from '@/types/api-project.types';
import { mapChatProjectToProperty } from '@/utils/helpers';
import {
  Close,
  DeleteOutlineRounded,
  SendRounded,
  SmartToyRounded,
} from '@mui/icons-material';
import { IconButton, Input, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function PropertyChatbot() {
  const { messages, addMessage, isLoading, setIsLoading, clearChat, userId } =
    useChat();
  const { closeFilterDrawer } = useUI();
  const { setSearchResultsFromAI } = useProperty(); // Use PropertyContext
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or on mount
  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial chat query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chatQuery = params.get('chat_query');

    if (chatQuery) {
      // Remove the query param to prevent re-triggering on refresh
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);

      // Trigger chat
      const userMsg: Message = {
        id: Date.now().toString(),
        text: chatQuery,
        sender: 'user',
        timestamp: new Date(),
      };
      addMessage(userMsg);
      setIsLoading(true);

      const processInitialQuery = async () => {
        try {
          // Construct history with just this new message for the initial context (or append to existing if persistence is active)
          const history = messages.map(msg => ({
            role: msg.sender === 'ai' ? 'assistant' : 'user',
            content: msg.text,
          }));
          history.push({ role: 'user', content: chatQuery });

          const response = await apiClient.post<AiSearchResponse>(
            '/api/chat/',
            {
              message: chatQuery,
              user_id: userId,
            },
            {
              baseURL: env.NEXT_PUBLIC_CHAT_API,
            }
          );

          if (!response.data) throw new Error('Invalid response');

          // TODO: update response by wrapping in ApiResponse
          const tempResponse: {
            status: 'succcess';
            message: string;
            data: AiSearchResponse;
          } = {
            status: 'succcess',
            message: 'Hellooooo',
            data: response as unknown as AiSearchResponse,
          };

          let reply = "I've found some properties for you!";
          let projects: ApiProjectObject[] = [];

          reply = tempResponse.data.reply || reply;
          projects = tempResponse.data.data || [];

          addMessage({
            id: (Date.now() + 1).toString(),
            text: reply,
            sender: 'ai',
            timestamp: new Date(),
          });

          if (projects && Array.isArray(projects) && projects.length > 0) {
            const properties = projects.map(project => {
              return mapChatProjectToProperty(project);
            });
            setSearchResultsFromAI(properties);
          }
        } catch (error) {
          console.error('Initial Query Error:', error);
          addMessage({
            id: Date.now().toString(),
            text: 'I received your search but encountered an error processing it.',
            sender: 'ai',
            timestamp: new Date(),
          });
        } finally {
          setIsLoading(false);
        }
      };

      processInitialQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

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

      const response = await apiClient.post<AiSearchResponse>(
        '/api/chat/',
        {
          message: userMsg.text,
          user_id: userId,
        },
        {
          baseURL: env.NEXT_PUBLIC_CHAT_API,
        }
      );
      if (!response.data) throw new Error('Invalid response from AI service');

      // TODO: update response by wrapping in ApiResponse
      const tempResponse: {
        status: 'succcess';
        message: string;
        data: AiSearchResponse;
      } = {
        status: 'succcess',
        message: 'Hellooooo',
        data: response as unknown as AiSearchResponse,
      };

      let reply = "I've found some properties for you!";
      let projects: ApiProjectObject[] = [];

      reply = tempResponse.data.reply || reply;
      projects = tempResponse.data.data || [];

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: 'ai',
        timestamp: new Date(),
      };
      addMessage(aiMsg);

      if (projects && Array.isArray(projects) && projects.length > 0) {
        try {
          const properties = projects.map(p => {
            return mapChatProjectToProperty(p);
          });
          setSearchResultsFromAI(properties);
        } catch (err) {
          console.error('Error mapping properties:', err);
        }
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
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white/60 font-sans backdrop-blur-3xl">
      {/* Header - Glassmorphic & Premium */}
      <div className="z-10 flex w-full flex-none items-center justify-between border-b border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20">
            <SmartToyRounded
              className="text-white drop-shadow-md"
              fontSize="small"
            />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-2 ring-white">
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </span>
          </div>
          <div className="my-auto flex flex-col">
            <h3 className="text-[15px] font-bold tracking-tight text-gray-900">
              RealEstate AI
            </h3>
            <p className="m-0 text-[11px] font-medium text-gray-500">
              Premium Concierge
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Tooltip title="Clear History" arrow placement="bottom">
            <IconButton
              onClick={clearChat}
              size="small"
              className="group rounded-xl border border-gray-200/50 bg-white/50 text-gray-400 shadow-sm transition-all hover:bg-red-50 hover:text-red-500 hover:shadow-md"
            >
              <DeleteOutlineRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip className="lg:hidden" title="Close" arrow placement="bottom">
            <IconButton
              onClick={closeFilterDrawer}
              className="bg-gray-50 hover:bg-gray-100"
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Messages Area */}
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200/50 z-10 flex-1 overflow-y-auto overflow-x-hidden p-6">
        <div className="flex min-h-full flex-col justify-end gap-6">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex w-full ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex max-w-[85%] flex-col gap-1.5 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`relative px-6 py-4 text-[14px] leading-relaxed shadow-md transition-all ${
                    msg.sender === 'user'
                      ? 'rounded-[24px] rounded-br-[4px] bg-gradient-to-br from-gray-900 to-gray-800 font-medium text-white shadow-gray-900/20'
                      : 'rounded-[24px] rounded-bl-[4px] border border-white/60 bg-white/80 text-gray-700 shadow-gray-200/50 backdrop-blur-md'
                  }`}
                >
                  {msg.text}

                  {/* Search Results Card Removed */}
                </div>

                {/* Timestamp */}
                <span
                  suppressHydrationWarning
                  className="px-2 text-[10px] font-semibold tracking-wide text-gray-400/80"
                >
                  {msg.sender === 'ai' ? 'RealEstate AI • ' : 'YOU • '}
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Think Mode Indicator - Skeuomorphic */}
          {isLoading && (
            <div className="flex w-full justify-start pl-2">
              <div className="flex items-center gap-3 rounded-[24px] rounded-bl-[4px] border border-white/60 bg-white/80 px-6 py-4 shadow-lg shadow-gray-200/50 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                </div>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-xs font-bold text-transparent">
                  Processing...
                </span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input Area - Floating Island */}
      <div className="z-20 flex-none px-4 py-2">
        <div className="relative flex items-center gap-2 rounded-[24px] border border-white/60 bg-white/80 p-2 pl-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 backdrop-blur-xl transition-all focus-within:border-indigo-500/30 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgb(99,102,241,0.15)]">
          <Input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            disableUnderline
            className="flex-1 py-1 text-[15px] font-medium text-gray-800 placeholder:text-gray-400"
            disabled={isLoading}
            autoFocus={false}
          />
          <IconButton
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`mr-0.5 h-10 w-10 rounded-xl transition-all duration-300 ${
              input.trim() && !isLoading
                ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/40'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <SendRounded className="text-[20px]" />
          </IconButton>
        </div>
        <p className="mt-3 text-center text-[10px] font-medium tracking-wide text-gray-400/80">
          Powered by RealEstate Intelligence
        </p>
      </div>
    </div>
  );
}
