'use client';

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
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clearChat: () => void;
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

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      const storedExpiry = localStorage.getItem(CHAT_EXPIRY_KEY);
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
    } finally {
      setIsInitialized(true);
    }
  }, []);

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
    setMessages(prev => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: 'Chat history cleared. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(CHAT_EXPIRY_KEY);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isLoading,
        setIsLoading,
        isOpen,
        setIsOpen,
        clearChat,
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
