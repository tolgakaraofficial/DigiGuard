import React, { useState } from 'react';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';

interface AlbisChatBotProps {
  language?: string;
}

export const AlbisChatBot: React.FC<AlbisChatBotProps> = ({ language = 'tr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: language === 'tr'
        ? 'Merhaba! Ben ALBIS, DigiGuard asistanınız. Size nasıl yardımcı olabilirim?'
        : 'Hello! I am ALBIS, your DigiGuard assistant. How can I help you?',
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = language === 'tr' ? [
    'KYC nedir?',
    'Fiyatlandırma',
    'Güvenlik özellikleri',
    'Destek talebi',
  ] : [
    'What is KYC?',
    'Pricing',
    'Security features',
    'Support request',
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: language === 'tr'
          ? 'Mesajınız alındı! Bir temsilcimiz en kısa sürede size dönüş yapacaktır. Ortalama yanıt süresi: 2-5 dakika.'
          : 'Your message has been received! One of our representatives will get back to you shortly. Average response time: 2-5 minutes.',
        time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage = {
      type: 'user',
      text: reply,
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      let responseText = '';
      if (language === 'tr') {
        if (reply.includes('KYC')) {
          responseText = 'KYC (Know Your Customer), kimlik doğrulama sürecidir. DigiGuard ile biyometrik ve blockchain tabanlı güvenli KYC işlemi yapabilirsiniz.';
        } else if (reply.includes('Fiyat')) {
          responseText = 'Bireysel paket ₺99/ay, Profesyonel paket ₺299/ay ile başlar. Kurumsal çözümler için özel fiyatlandırma yapıyoruz.';
        } else if (reply.includes('Güvenlik')) {
          responseText = 'AES-256 şifreleme, blockchain doğrulama, AI destekli tehdit analizi ve 7/24 güvenlik izleme sunuyoruz.';
        } else {
          responseText = 'Destek talebiniz alındı. Bir uzman en kısa sürede sizinle iletişime geçecektir.';
        }
      } else {
        if (reply.includes('KYC')) {
          responseText = 'KYC (Know Your Customer) is an identity verification process. With DigiGuard, you can perform secure biometric and blockchain-based KYC.';
        } else if (reply.includes('Pricing')) {
          responseText = 'Individual plan starts at ₺99/month, Professional plan at ₺299/month. Custom pricing for enterprise solutions.';
        } else if (reply.includes('Security')) {
          responseText = 'We offer AES-256 encryption, blockchain verification, AI-powered threat analysis, and 24/7 security monitoring.';
        } else {
          responseText = 'Your support request has been received. An expert will contact you shortly.';
        }
      }

      const botResponse = {
        type: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          1
        </span>
        <div className="absolute bottom-full left-0 mb-2 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyan-500/30 shadow-lg">
          ALBIS - {language === 'tr' ? 'Yardım Merkezi' : 'Help Center'}
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 bg-slate-800 rounded-2xl shadow-2xl border border-cyan-500/30 transition-all ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}
    >
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border-2 border-cyan-400 shadow-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-cyan-400"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.45-3.07 8.63-7 9.67-3.93-1.04-7-5.22-7-9.67V7.78l6-2.7v8.92h2V4.18z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-800"></span>
          </div>
          <div>
            <h3 className="text-white font-bold">ALBIS</h3>
            <p className="text-cyan-100 text-xs">
              {language === 'tr' ? 'Çevrimiçi' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-cyan-700 p-1.5 rounded transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-cyan-700 p-1.5 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[420px] overflow-y-auto p-4 space-y-4 bg-slate-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 space-y-3 bg-slate-800">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs rounded-full transition-colors border border-slate-600"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm border border-slate-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-2 rounded-lg transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
