import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Phone, Mail, MessageCircle, FileText, ArrowUpRight } from 'lucide-react';
import { KNOWLEDGE_BASE } from './knowledgeBase';
import type { KnowledgeItem } from './knowledgeBase';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  action?: {
    label: string;
    url: string;
    type: 'link' | 'download' | 'contact';
  };
  showContactFallback?: boolean;
}

const UI_TRANSLATIONS = {
  en: {
    headerTitle: 'FAS LIFT Assistant',
    headerStatus: 'Online • Local Knowledge',
    inputPlaceholder: 'Ask me anything...',
    welcomeMessage: 'Hello! I am your FAS LIFT assistant. I can search the website and help you find specifications, documents, order forms, or contact details. How can I help you today?',
    notFound: "I couldn't find the requested information. Please contact our team directly using any of the channels below:",
    contactForm: 'Contact Form',
    callUs: 'Call Us',
    emailUs: 'Email',
    whatsapp: 'WhatsApp',
    suggestions: [
      'What is FAS LIFT?',
      'Technical specifications',
      'Download catalog',
      'Order form',
      'Contact support'
    ]
  },
  fr: {
    headerTitle: 'Assistant FAS LIFT',
    headerStatus: 'En ligne • Infos locales',
    inputPlaceholder: 'Posez-moi une question...',
    welcomeMessage: 'Bonjour ! Je suis votre assistant FAS LIFT. Je peux chercher dans le site et vous aider à trouver des spécifications, catalogues, formulaires de commande ou contacts. Comment puis-je vous aider ?',
    notFound: "Je n'ai pas trouvé l'information demandée. Veuillez contacter notre équipe directement via l'un des canaux suivants :",
    contactForm: 'Formulaire de Contact',
    callUs: 'Appeler',
    emailUs: 'E-mail',
    whatsapp: 'WhatsApp',
    suggestions: [
      'C\'est quoi FAS LIFT ?',
      'Spécifications techniques',
      'Télécharger catalogue',
      'Bon de commande',
      'Contacter support'
    ]
  },
  tr: {
    headerTitle: 'FAS LIFT Asistanı',
    headerStatus: 'Çevrimiçi • Yerel Bilgi',
    inputPlaceholder: 'Bana bir şey sorun...',
    welcomeMessage: 'Merhaba! Ben FAS LIFT asistanınız. Sitede arama yapabilir; teknik detayları, katalogları, sipariş formlarını veya iletişim bilgilerini bulmanıza yardımcı olabilirim. Size nasıl yardımcı olabilirim?',
    notFound: "Aradığınız bilgiyi bulamadım. Lütfen aşağıdaki kanallardan biriyle ekibimizle doğrudan iletişime geçin:",
    contactForm: 'İletişim Formu',
    callUs: 'Bizi Arayın',
    emailUs: 'E-posta',
    whatsapp: 'WhatsApp',
    suggestions: [
      'FAS LIFT nedir?',
      'Teknik özellikler',
      'Katalog indir',
      'Sipariş formu',
      'İletişim desteği'
    ]
  }
};

const Chatbot: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en') as 'en' | 'fr' | 'tr';
  const tUi = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Cache indexed content for performance
  const indexCache = useRef<Record<string, KnowledgeItem[]>>({});

  useEffect(() => {
    // Populate cache
    if (!indexCache.current[lang]) {
      indexCache.current[lang] = KNOWLEDGE_BASE[lang] || KNOWLEDGE_BASE.en;
    }

    // Set initial welcome message
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: tUi.welcomeMessage,
        timestamp: new Date()
      }
    ]);
  }, [lang, tUi.welcomeMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const searchKnowledge = (query: string): { found: boolean; item?: KnowledgeItem } => {
    const cleanQuery = query.toLowerCase().trim();
    const sourceList = indexCache.current[lang] || KNOWLEDGE_BASE[lang] || KNOWLEDGE_BASE.en;

    let bestMatch: KnowledgeItem | null = null;
    let maxMatchCount = 0;

    for (const item of sourceList) {
      let matches = 0;
      for (const keyword of item.keywords) {
        if (cleanQuery.includes(keyword) || keyword.includes(cleanQuery)) {
          matches++;
        }
      }
      
      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestMatch = item;
      }
    }

    if (maxMatchCount > 0 && bestMatch) {
      return { found: true, item: bestMatch };
    }

    return { found: false };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Simulate bot thinking
    setTimeout(() => {
      const searchResult = searchKnowledge(text);
      let botMsg: Message;

      if (searchResult.found && searchResult.item) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: searchResult.item.answer,
          timestamp: new Date(),
          action: searchResult.item.action
        };
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: tUi.notFound,
          timestamp: new Date(),
          showContactFallback: true
        };
      }

      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  const handleActionClick = (action: NonNullable<Message['action']>) => {
    if (action.type === 'download') {
      const link = document.createElement('a');
      link.href = action.url;
      link.setAttribute('download', action.url.split('/').pop() || '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === 'link') {
      window.location.href = action.url;
    } else if (action.type === 'contact') {
      window.location.href = action.url;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-[92px] right-6 left-6 sm:left-auto w-auto sm:w-[360px] md:w-[380px] h-[480px] max-h-[calc(100vh-120px)] rounded-3xl bg-white border border-[#0d2b5e]/10 shadow-[0_15px_45px_rgba(11,61,120,0.18)] overflow-hidden flex flex-col z-[99999]"
          >
            {/* Header */}
            <div className="bg-[#0B3D78] px-5 py-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src="/images/chatbot_icon.jpg"
                  alt="Chatbot Avatar"
                  className="w-10 h-10 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <h3 className="font-bold text-[15px] leading-none m-0">{tUi.headerTitle}</h3>
                  <span className="text-[11px] text-white/70 block mt-1">{tUi.headerStatus}</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto px-4 py-5 bg-[#F5F7FA] space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-[14px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0B3D78] text-white rounded-br-none'
                        : 'bg-white text-[#374151] rounded-bl-none border border-[#0d2b5e]/5'
                    }`}
                  >
                    <p className="m-0 whitespace-pre-line font-normal">{msg.text}</p>
                    
                    {/* Bot Action Buttons */}
                    {msg.action && (
                      <button
                        onClick={() => handleActionClick(msg.action!)}
                        className="mt-3 flex items-center gap-1.5 px-4 py-2 bg-[#0B3D78]/10 text-[#0B3D78] hover:bg-[#0B3D78]/15 rounded-xl font-semibold text-[13px] border-none outline-none cursor-pointer transition-colors"
                      >
                        {msg.action.label}
                        <ArrowUpRight size={14} />
                      </button>
                    )}

                    {/* Contact Fallback Options */}
                    {msg.showContactFallback && (
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                        <a
                          href="https://wa.me/212653660399"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#25D366] text-white hover:bg-[#20ba5a] rounded-xl text-[12px] font-bold transition-colors cursor-pointer text-center no-underline shadow-sm"
                        >
                          <MessageCircle size={14} />
                          {tUi.whatsapp}
                        </a>
                        <a
                          href="mailto:faslift@outlook.com"
                          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#0d2b5e] text-white hover:bg-[#1a4a8a] rounded-xl text-[12px] font-bold transition-colors cursor-pointer text-center no-underline shadow-sm"
                        >
                          <Mail size={14} />
                          {tUi.emailUs}
                        </a>
                        <a
                          href="tel:+212653660399"
                          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] rounded-xl text-[12px] font-bold transition-colors cursor-pointer text-center no-underline shadow-sm"
                        >
                          <Phone size={14} />
                          {tUi.callUs}
                        </a>
                        <a
                          href="/corporate/contact"
                          className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#0B3D78]/10 text-[#0B3D78] hover:bg-[#0B3D78]/25 rounded-xl text-[12px] font-bold transition-colors cursor-pointer text-center no-underline shadow-sm"
                        >
                          <FileText size={14} />
                          {tUi.contactForm}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="bg-[#F5F7FA] px-4 pb-4 overflow-x-auto flex gap-2 no-scrollbar flex-shrink-0">
              {tUi.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="flex-shrink-0 px-3.5 py-1.5 bg-white text-[#4a5568] hover:text-[#0B3D78] hover:border-[#0B3D78]/40 border border-[#0d2b5e]/10 rounded-full text-[12px] font-medium cursor-pointer transition-all shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="bg-white px-4 py-3.5 border-t border-gray-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={tUi.inputPlaceholder}
                className="flex-1 bg-[#F1F5F9] border-none outline-none rounded-full px-5 py-3 text-[14px] text-gray-800 focus:bg-gray-100 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className={`w-[42px] h-[42px] rounded-full flex items-center justify-center border-none outline-none text-white transition-all shadow-md cursor-pointer ${
                  inputVal.trim()
                    ? 'bg-[#0B3D78] hover:bg-[#1a4a8a] hover:scale-105 active:scale-95'
                    : 'bg-gray-300 cursor-not-allowed shadow-none'
                }`}
              >
                <Send size={16} className="ml-[2px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#0B3D78] flex items-center justify-center shadow-[0_6px_20px_rgba(11,61,120,0.3)] hover:shadow-[0_8px_25px_rgba(11,61,120,0.4)] cursor-pointer outline-none border-none overflow-hidden relative"
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label="Open Chatbot"
      >
        <img
          src="/images/chatbot_icon.jpg"
          alt="Chatbot icon"
          className="w-full h-full object-cover"
        />
        {/* Glow indicator if closed */}
        {!isOpen && (
          <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0B3D78] rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
