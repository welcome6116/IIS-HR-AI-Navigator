
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { ChatBubble } from './components/ChatBubble';
import { processQuery } from './services/gemini';

const SUGGESTED_QUESTIONS = [
  { en: "Who handles faculty recruitment?", tw: "誰負責教職員招募？" },
  { en: "Question about salary or bonus", tw: "關於薪資或獎金的問題" },
  { en: "Apply for leave or ID card", tw: "申請請假或識別證" },
  { en: "ARC and work permits", tw: "居留證與工作許可" }
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to the IIS HR AI Navigator. I am here to help you find the right HR contact for your needs. Please tell me what you need assistance with.\n\n歡迎使用 IIS 人事室 AI 導航員。我將協助您根據需求找到正確的人事窗口。請告訴我您需要什麼樣的協助。",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const queryText = text || input;
    if (!queryText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content
    }));

    const result = await processQuery(queryText, history);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: result.response,
      contactCard: result.foundContact,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto bg-white sm:shadow-2xl overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 z-20"></div>

      {/* Header */}
      <header className="glass-effect border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <i className="fas fa-id-badge text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">HR AI Navigator</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em]">I-Shou International School</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:block text-right">
             <p className="text-xs font-semibold text-slate-700">Bilingual Support</p>
             <p className="text-[10px] text-slate-400">雙語支援系統</p>
           </div>
        </div>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"
      >
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-8 animate-pulse">
              <div className="bg-white border border-slate-100 p-5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Suggested Questions */}
      {messages.length === 1 && !isLoading && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 overflow-x-auto">
          <div className="max-w-3xl mx-auto flex gap-3 whitespace-nowrap pb-2 scrollbar-hide">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.en)}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-full text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all flex flex-col items-start"
              >
                <span className="font-bold">{q.tw}</span>
                <span className="opacity-60 text-[10px]">{q.en}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <footer className="bg-white p-4 md:p-6 border-t border-slate-100 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto relative group">
          <div className="relative flex items-end gap-3 bg-slate-50 border-2 border-slate-100 rounded-3xl p-2 pl-4 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about HR tasks... (e.g., 'recruitment' or 'salary')"
              className="flex-1 bg-transparent border-none py-3 focus:outline-none resize-none min-h-[48px] max-h-32 text-slate-800 placeholder:text-slate-400 text-sm md:text-base"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-3.5 rounded-2xl transition-all shadow-lg ${
                !input.trim() || isLoading 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-blue-200'
              }`}
            >
              <i className={`fas ${isLoading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
            </button>
          </div>
          <div className="flex justify-between items-center px-4 mt-3">
            <p className="text-[10px] text-slate-400 font-medium">
              IIS HR Official Database • <span className="text-blue-500">Bilingual Engine</span>
            </p>
            <p className="text-[10px] text-slate-300">
              義大國際高中人事室助理
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
