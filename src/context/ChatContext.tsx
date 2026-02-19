'use client';

import { Property } from '@/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// Define types (matching Chatbot.tsx for now, can be moved to shared types later)
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  searchResult?: {
    count: number;
    filters: Record<string, unknown>;
    properties: Property[];
  };
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateLastMessage: (updates: Partial<Message>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clearChat: () => void;
  userId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'realestate_chat_history';
const CHAT_EXPIRY_KEY = 'realestate_chat_expiry';
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I can help you find your dream property. Try "3 BHK in Sola under 1 Cr".',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      const storedExpiry = localStorage.getItem(CHAT_EXPIRY_KEY);
      const storedUserId = localStorage.getItem('chat_user_id');

      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        const newUserId = crypto.randomUUID();
        localStorage.setItem('chat_user_id', newUserId);
        setUserId(newUserId);
      }

      const now = Date.now();

      if (storedMessages && storedExpiry) {
        if (now < parseInt(storedExpiry, 10)) {
          const parsedMessages = JSON.parse(storedMessages).map(
            (msg: Message & { timestamp: string }) => ({
              ...msg,
              timestamp: new Date(msg.timestamp), // Rehydrate Date objects
            })
          );
          setMessages(parsedMessages);
        } else {
          // Expired, clear storage
          localStorage.removeItem(CHAT_STORAGE_KEY);
          localStorage.removeItem(CHAT_EXPIRY_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      // Fallback for UUID if crypto not available (unlikely in modern browsers but good practice)
      if (!userId) {
        const newUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('chat_user_id', newUserId);
        setUserId(newUserId);
      }
    } finally {
      setIsInitialized(true);
    }
  }, [userId]);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (!isInitialized) return;

    if (messages.length > 1) {
      // Don't save if only initial message
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      localStorage.setItem(
        CHAT_EXPIRY_KEY,
        (Date.now() + EXPIRY_TIME).toString()
      );
    }
  }, [messages, isInitialized]);

  const addMessage = (message: Message) => {
    setMessages(prev => {
      const newMessages = [...prev, message];
      return newMessages;
    });
  };

  const updateLastMessage = (updates: Partial<Message>) => {
    setMessages(prev => {
      if (prev.length === 0) return prev;
      const newMessages = [...prev];
      const lastIndex = newMessages.length - 1;
      newMessages[lastIndex] = { ...newMessages[lastIndex], ...updates };
      return newMessages;
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: 'Hi! I can help you find your dream property. Try "3 BHK in Sola under 1 Cr".',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(CHAT_EXPIRY_KEY);

    // Generate new userId to reset backend context
    try {
      const newUserId = crypto.randomUUID();
      localStorage.setItem('chat_user_id', newUserId);
      setUserId(newUserId);
    } catch {
      const newUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_user_id', newUserId);
      setUserId(newUserId);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        updateLastMessage,
        isLoading,
        setIsLoading,
        isOpen,
        setIsOpen,
        clearChat,
        userId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
