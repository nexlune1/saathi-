import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Calendar,
  Compass,
  FileCheck,
  Calculator,
  Search,
  BookOpen
} from 'lucide-react';
import { ChatMessage, ChatAction, ChatSource } from '../types/travel';
import {
  MIA_IDENTITY,
  INITIAL_ASSISTANT_MESSAGES,
  PROBLEM_CATEGORIES,
  SUGGESTED_PROMPTS,
  askMia
} from '../services/aiAssistant';

interface TravelChatbotProps {
  onActionTrigger?: (actionType: string, payload?: string, url?: string) => void;
  isOpenControlled?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

export const TravelChatbot: React.FC<TravelChatbotProps> = ({ onActionTrigger, isOpenControlled, onToggleOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled !== undefined ? isOpenControlled : internalOpen;
  const setIsOpen = (val: boolean) => {
    setInternalOpen(val);
    if (onToggleOpen) onToggleOpen(val);
  };
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('saathi_travel_chat');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_ASSISTANT_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save session chat history
  useEffect(() => {
    try {
      sessionStorage.setItem('saathi_travel_chat', JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await askMia(query, messages);
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Error generating response:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages(INITIAL_ASSISTANT_MESSAGES);
    try {
      sessionStorage.removeItem('travelmate_mia_chat');
    } catch (e) {}
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === 'link' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action.actionType === 'quick_question' && action.payload) {
      handleSendMessage(action.payload);
      return;
    }
    if (onActionTrigger) {
      onActionTrigger(action.actionType, action.payload, action.url);
      setIsOpen(false);
    }
  };

  // Structured parser for Mia's answers
  const renderMessageContent = (text: string) => {
    const paragraphs = text.split('\n\n');

    return (
      <div className="space-y-3">
        {paragraphs.map((para, pIdx) => {
          // Check for H3 heading like "### What this means" or "### Possible reasons"
          if (para.startsWith('### ')) {
            const headingText = para.replace('### ', '').trim();
            const isWarning = headingText.toLowerCase().includes('possible reasons') || headingText.toLowerCase().includes('scam');
            const isSuccess = headingText.toLowerCase().includes('what you should do') || headingText.toLowerCase().includes('entitled');
            const isDoc = headingText.toLowerCase().includes('document');

            return (
              <div key={pIdx} className="pt-2 border-t border-gray-100 first:border-none first:pt-0">
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 ${
                  isWarning ? 'text-amber-700' : isSuccess ? 'text-emerald-700' : isDoc ? 'text-indigo-700' : 'text-[#247BA0]'
                }`}>
                  {isWarning ? <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> :
                   isSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> :
                   isDoc ? <FileCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> :
                   <Info className="w-3.5 h-3.5 text-[#247BA0] shrink-0" />}
                  <span>{headingText}</span>
                </div>
              </div>
            );
          }

          // Bullet lists or regular lines
          const lines = para.split('\n');
          return (
            <div key={pIdx} className="space-y-1.5 text-xs sm:text-sm text-[#102A43] leading-relaxed">
              {lines.map((line, lIdx) => {
                if (!line.trim()) return null;

                // Format bold **text**
                const parts = line.split(/(\*\*.*?\*\*)/g);
                const parsedLine = parts.map((part, partIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={partIdx} className="font-bold text-[#102A43]">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });

                if (line.trim().startsWith('• ') || line.trim().startsWith('* ')) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066] mt-2 shrink-0" />
                      <span>{parsedLine}</span>
                    </div>
                  );
                }

                if (/^\d+\.\s/.test(line.trim())) {
                  return (
                    <div key={lIdx} className="pl-1 font-medium">
                      {parsedLine}
                    </div>
                  );
                }

                return <p key={lIdx}>{parsedLine}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Circular Coral Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#FF8066] hover:bg-[#E7684F] text-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-[#FF8066]/30"
          aria-label="Open SAATHI – AI Travel Assistant"
        >
          {/* Subtle pulse ripple */}
          <span className="absolute -inset-1 rounded-full bg-[#FF8066]/30 animate-ping group-hover:opacity-75" />
          <MessageCircle className="w-7 h-7 relative z-10" />
          {/* Small online indicator dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-20" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-2 sm:right-6 z-50 w-[96vw] sm:w-[460px] h-[640px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#E2DDD2] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#102A43] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF8066] to-[#247BA0] flex items-center justify-center text-white shadow-md relative">
                <Sparkles className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#102A43] rounded-full" />
              </div>
              <div>
                <div className="font-display font-bold text-base text-white flex items-center gap-2">
                  <span>{MIA_IDENTITY.name}</span>
                </div>
                <div className="text-[11px] text-[#DCE8DF] truncate max-w-[240px]">
                  {MIA_IDENTITY.tagline}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-white/80">
              <button
                onClick={handleNewChat}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Start a new chat session"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">New</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Shortcuts Bar */}
          <div className="bg-[#FAF8F3] px-3 py-2 border-b border-[#E2DDD2] overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {PROBLEM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSendMessage(cat.query)}
                className="px-2.5 py-1 bg-white hover:bg-[#E2DDD2] text-[#102A43] text-[11px] font-semibold rounded-lg border border-[#E2DDD2] whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF8F3]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[92%]">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-[#102A43] text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4 text-[#FF8066]" />
                      </div>
                    )}

                    <div className="w-full">
                      <div
                        className={`p-4 rounded-2xl shadow-sm ${
                          isUser
                            ? 'bg-[#FF8066] text-white rounded-br-none text-sm'
                            : 'bg-white text-[#102A43] border border-[#E2DDD2] rounded-bl-none'
                        }`}
                      >
                        {/* Verification Tag */}
                        {!isUser && msg.verifiedDate && (
                          <div className="mb-2.5 pb-2 border-b border-gray-100 flex items-center justify-between text-[11px] text-[#247BA0]">
                            <div className="flex items-center gap-1.5 font-medium">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{msg.verifiedDate}</span>
                            </div>
                          </div>
                        )}

                        {/* Message Content */}
                        {isUser ? (
                          <p className="leading-relaxed font-medium">{msg.text}</p>
                        ) : (
                          renderMessageContent(msg.text)
                        )}

                        {/* Clickable Source Links */}
                        {!isUser && msg.sources && msg.sources.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-[#247BA0]" />
                              <span>Official Verification Sources:</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {msg.sources.map((src, sIdx) => (
                                <a
                                  key={sIdx}
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#247BA0] hover:text-[#102A43] hover:underline flex items-center justify-between p-2 rounded-lg bg-[#FAF8F3] border border-[#E2DDD2] transition-colors"
                                >
                                  <span className="truncate max-w-[280px] font-medium">{src.title}</span>
                                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-1.5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contextual Action Buttons */}
                        {!isUser && msg.actions && msg.actions.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                              Recommended Actions:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.actions.map((act, aIdx) => (
                                <button
                                  key={aIdx}
                                  onClick={() => handleActionClick(act)}
                                  className="px-3 py-1.5 bg-[#102A43] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                                >
                                  <span>{act.label}</span>
                                  {act.actionType === 'link' ? (
                                    <ExternalLink className="w-3 h-3 text-gray-300" />
                                  ) : (
                                    <ArrowRight className="w-3 h-3 text-[#FF8066]" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`text-[10px] text-gray-400 mt-1 px-1 ${
                          isUser ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2.5 text-xs text-gray-500 p-3 bg-white rounded-2xl border border-[#E2DDD2] max-w-[80%]">
                <div className="w-6 h-6 rounded-full bg-[#102A43] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#FF8066]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-[#102A43]">SAATHI is analyzing official travel guidelines...</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8066] animate-ping" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="p-2.5 bg-white border-t border-gray-100 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 bg-[#FAF8F3] hover:bg-[#E2DDD2] text-[#102A43] text-[11px] font-medium rounded-full border border-[#E2DDD2] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Search-style Input Bar */}
          <div className="p-3 bg-white border-t border-[#E2DDD2] flex items-center gap-2 shrink-0">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Describe your travel problem or ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#FAF8F3] border border-[#CBD5E1] rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-[#102A43] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#247BA0]"
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-[#FF8066] hover:bg-[#E7684F] text-white rounded-xl disabled:opacity-50 transition-colors cursor-pointer shrink-0"
              aria-label="Send message to SAATHI"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
