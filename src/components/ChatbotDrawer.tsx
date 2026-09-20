import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Brain, Zap, Bot, User, Trash2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { ChatMessage, DeliveryLocation } from '../types';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: DeliveryLocation;
  onSearchQuery?: (q: string) => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSearchQuery,
}) => {
  const [modelChoice, setModelChoice] = useState<'gemini-3.1-flash-lite' | 'gemini-3.5-flash' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');
  const [enableThinking, setEnableThinking] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: `Hello! I am your **ER Smart Delivery Concierge**.\n\nI monitor live pricing, inventory, surge fees, and delivery speeds across **Blinkit**, **Zepto**, **Swiggy Instamart**, **BigBasket**, and **JioMart** in real-time.\n\nAsk me anything! For example: *"Where can I buy a PS5 controller cheapest?"* or *"Plan a quick game night snack basket under ₹500 delivered under 15 mins."*`,
      timestamp: 'Just now',
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // When user selects pro preview, automatically suggest or enable thinking for complex inquiries
  const handleModelChange = (model: 'gemini-3.1-flash-lite' | 'gemini-3.5-flash' | 'gemini-3.1-pro-preview') => {
    setModelChoice(model);
    if (model === 'gemini-3.1-pro-preview') {
      setEnableThinking(true);
    } else {
      setEnableThinking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ sender: m.sender, content: m.content })),
          modelChoice,
          enableThinking: modelChoice === 'gemini-3.1-pro-preview' ? enableThinking : false,
          userLocation: currentLocation,
        }),
      });

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        content: data.text || data.fallbackText || 'I could not retrieve an answer at this moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || modelChoice,
        thoughtProcess: data.thoughtProcess,
      };

      setMessages([...newHistory, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: 'Our multi-app aggregator feed is actively comparing items on the home screen. You can browse live quotes directly!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelChoice,
      };
      setMessages([...newHistory, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        content: 'Conversation history cleared. How can I assist your delivery search today?',
        timestamp: 'Just now',
        modelUsed: modelChoice,
      },
    ]);
  };

  const promptChips = [
    'Compare PS5 Controller prices',
    'Fastest delivery for Milk & Coke Zero',
    'Best deal on board games',
    'Split order advice to save money',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight font-['Cabinet_Grotesk']">
                  ER Shopping Concierge
                </h3>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 font-mono px-1.5 py-0.5 rounded border border-indigo-400/30">
                  Gemini Multi-Turn
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Aggregated live delivery intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="Clear Conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selection Toolbar */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">Model:</span>
            
            <button
              onClick={() => handleModelChange('gemini-3.1-flash-lite')}
              className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 ${
                modelChoice === 'gemini-3.1-flash-lite'
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Fast Lite</span>
            </button>

            <button
              onClick={() => handleModelChange('gemini-3.5-flash')}
              className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 ${
                modelChoice === 'gemini-3.5-flash'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>General 3.5</span>
            </button>

            <button
              onClick={() => handleModelChange('gemini-3.1-pro-preview')}
              className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 ${
                modelChoice === 'gemini-3.1-pro-preview'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Brain className="w-3 h-3" />
              <span>Pro (Think)</span>
            </button>
          </div>

          {/* Thinking Mode Toggle for 3.1 Pro */}
          {modelChoice === 'gemini-3.1-pro-preview' && (
            <label className="flex items-center gap-1.5 cursor-pointer bg-purple-50 text-purple-900 px-2 py-1 rounded-md border border-purple-200 text-[11px] font-bold">
              <input
                type="checkbox"
                checked={enableThinking}
                onChange={(e) => setEnableThinking(e.target.checked)}
                className="w-3.5 h-3.5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span>High Thinking</span>
            </label>
          )}
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isThoughtsExpanded = !!expandedThoughts[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    ER
                  </div>
                )}

                <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Model Tag & Timestamp */}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <span className="font-mono bg-slate-200 text-slate-700 px-1 rounded">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    {/* Expandable Thinking Output if present */}
                    {msg.thoughtProcess && (
                      <div className="mb-2 p-2 bg-slate-100 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-mono">
                        <button
                          onClick={() => setExpandedThoughts(prev => ({ ...prev, [msg.id]: !isThoughtsExpanded }))}
                          className="flex items-center justify-between w-full text-indigo-700 font-bold"
                        >
                          <span className="flex items-center gap-1">
                            <Brain className="w-3 h-3" />
                            Model Reasoning (ThinkingLevel.HIGH)
                          </span>
                          {isThoughtsExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                        {isThoughtsExpanded && (
                          <p className="mt-1 text-slate-500 whitespace-pre-wrap max-h-48 overflow-y-auto pt-1 border-t border-slate-200">
                            {msg.thoughtProcess}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-line font-sans">
                      {msg.content}
                    </div>
                  </div>

                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-500 pl-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
                <span>{modelChoice === 'gemini-3.1-pro-preview' && enableThinking ? 'Reasoning with High Thinking...' : 'Searching aggregated feeds...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {promptChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(chip)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold whitespace-nowrap transition border border-slate-200/60 shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            id="chat-input"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about prices, delivery times, or split carts..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
