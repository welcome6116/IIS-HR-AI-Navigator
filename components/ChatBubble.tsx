
import React from 'react';
import { Message, HRContact } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ContactCard: React.FC<{ contact: HRContact }> = ({ contact }) => {
  return (
    <div className="mt-4 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden border-l-4 border-l-blue-600">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <i className="fas fa-user-tie text-xl"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">{contact.name}</h4>
              <p className="text-[11px] text-blue-600 uppercase font-bold tracking-wider">{contact.position}</p>
            </div>
          </div>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">
            Contact
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 mt-5">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-50 group hover:border-blue-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <i className="fas fa-phone-alt text-slate-400 group-hover:text-blue-500 text-xs"></i>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Extension / 分機</p>
              <p className="text-sm font-semibold text-slate-700">{contact.extension}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-50 group hover:border-blue-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <i className="fas fa-envelope text-slate-400 group-hover:text-blue-500 text-xs"></i>
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Email / 信箱</p>
              <p className="text-sm font-semibold text-slate-700 truncate">{contact.email}</p>
            </div>
          </div>
        </div>

        <a 
          href={`mailto:${contact.email}`}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all text-sm font-bold"
        >
          <i className="fas fa-paper-plane text-xs"></i>
          Send Email Now / 立即發送郵件
        </a>
      </div>
    </div>
  );
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
          isUser 
            ? 'bg-gradient-to-br from-slate-700 to-slate-900' 
            : 'bg-white border border-slate-100 text-blue-600'
        }`}>
          <i className={`fas ${isUser ? 'fa-user' : 'fa-robot'} text-sm ${isUser ? 'text-white' : ''}`}></i>
        </div>
        <div className="flex flex-col">
          <div 
            className={`p-5 rounded-3xl shadow-sm ${
              isUser 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 ring-4 ring-slate-50'
            }`}
          >
            <p className="text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
              {message.content}
            </p>
            {message.contactCard && <ContactCard contact={message.contactCard} />}
          </div>
          <div className={`flex items-center gap-2 mt-2 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isUser && <i className="fas fa-check-double text-[10px] text-blue-500"></i>}
          </div>
        </div>
      </div>
    </div>
  );
};
