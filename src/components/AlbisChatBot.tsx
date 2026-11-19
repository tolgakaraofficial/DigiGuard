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
        ? 'Hello! Ben ALBIS, DigiGuard merkezi yapay zeka asistaninizim. Tum sistemleri yonetiyorum ve size help olmak icin buradayim. Tracking sistemi, sertifikalar, security panelleri hakkinda sorularinizi yanitlayabilirim.'
        : 'Hello! I am ALBIS, your DigiGuard central AI assistant. I manage all systems and I am here to help you. I can answer questions about tracking, certificates, and security panels.',
      time: new Date().toLocaleTimeString(language === 'tr' ? 'en-US' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = language === 'tr' ? [
    'Nasil baslayabilirim?',
    'Individual kullanim',
    'Corporate cozumler',
    'Securek ve gizlilik',
    'Pricelandirma',
    'Teknik destek',
  ] : [
    'How to get started?',
    'Individual use',
    'Enterprise solutions',
    'Security & privacy',
    'Pricing',
    'Technical support',
  ];

  const containsProfanity = (text: string): boolean => {
    const profanityWords = ['aptal', 'salak', 'gerizekali', 'ahmak', 'mal', 'sersem', 'budala'];
    return profanityWords.some(word => text.toLowerCase().includes(word));
  };

  const getAIResponse = (message: string): string => {
    const msgLower = message.toLowerCase();

    if (containsProfanity(msgLower)) {
      return language === 'tr'
        ? '⚠️ Please saygili bir dil kullanin. Size profesyonel bir sekilde help olmak icin buradayim.'
        : '⚠️ Please use respectful language. I am here to help you professionally.';
    }

    if (language === 'tr') {
      if (msgLower.includes('takip') || msgLower.includes('konum') || msgLower.includes('yer tespiti')) {
        return '📍 Tracking Systemleri:\n\n• Person Takibi: GSM ve baz istasyonu ile\n• Cipli Varlik Takibi: Hayvan, esya, arac\n• Gercek zamanli konum guncellemesi\n• Blockchain verificationli kayitlar\n• Gecmis konum verileri\n\nTracking paneline Dashboard menusunden ulasabilirsiniz.';
      } else if (msgLower.includes('cip') || msgLower.includes('hayvan') || msgLower.includes('esya')) {
        return '🔖 Cipli Varlik Systemi:\n\n• Her varlik icin benzersiz cip kodu\n• Certificate ile entegre kayit\n• Location takip sistemi\n• Kayip/calinti bildirimi\n• Sahiplik verification\n\nNew cipli varlik eklemek icin Tracking Panelini kullanin.';
      } else if (msgLower.includes('sertifika') || msgLower.includes('blockchain')) {
        return '📜 Blockchain Certificatesi:\n\n• Personsel bilgilerinizle otomatik olusturulur\n• Gettin cerceveli profesyonel tasarim\n• Blockchain zaman damgasi\n• A4 boyutunda baskiya hazir\n• Aninda PDF indirme\n\nDashboard ust panelindeki butona tiklayarak indirebilirsiniz.';
      } else if (msgLower.includes('howsin') || msgLower.includes('how gidiyor') || msgLower.includes('ne haber')) {
        return '😊 Tum sistemleri izliyorum ve her sey mukemmel calisiyor! Size help olmak icin buradayim. Tracking sistemleri, sertifikalar veya security hakkinda bilgi ister misiniz?';
      } else if (msgLower.includes('adin ne') || msgLower.includes('kimsin')) {
        return '🤖 Ben ALBIS, DigiGuard merkezi yapay zeka asistaniyim. Tum sistemleri yonetiyorum: kimlik verification, takip sistemleri, sertifikalar, security panelleri. Dijital kimlik guvenligi ve KYC verification konularinda size help oluyorum.';
      } else if (msgLower.includes('tesekkur') || msgLower.includes('sagol')) {
        return '🙏 Rica ederim! Baska bir konuda yardima ihtiyaciniz olursa buradayim. Systemlerinizi 7/24 izliyorum.';
      } else if (msgLower.includes('basla') || msgLower.includes('kayit')) {
        return '🚀 DigiGuard ile baslamak cok kolay!\n\n1. Registration formunu doldurun\n2. Identity belgelerinizi yukleyin\n3. Biyometrik verification yapin\n4. KYC sertifikanizi alin\n\nHemen simdi baslamak ister misiniz?';
      } else if (msgLower.includes('birey') || msgLower.includes('kisisel')) {
        return '👤 Individual Usage Featureleri:\n\n• Biyometrik kimlik verification\n• Blockchain KYC sertifikasi\n• 5 cihaz destegi\n• Mobil uygulama erisimi\n• 7/24 teknik destek\n• Temel AI security analizi\n\nMonthda sadece ₺99! Ilk 14 gun ucretsiz deneyin.';
      } else if (msgLower.includes('institution') || msgLower.includes('isletme') || msgLower.includes('sirket')) {
        return '🏢 Corporate Cozumler:\n\n• Sinirsiz user ve cihaz\n• Private AI modelleri\n• API entegrasyonu\n• Dedicated sunucu\n• SLA garantisi %99.99\n• 24/7 ozel destek ekibi\n• On-premise kurulum\n• White-label secenekleri\n\nPrivate fiyatlandirma icin satis ekibimizle gorusun.';
      } else if (msgLower.includes('security') || msgLower.includes('gizlilik') || msgLower.includes('koruma')) {
        return '🔒 Securek ve Privacy:\n\n• AES-256 bit sifreleme\n• Blockchain based verification\n• Zero-knowledge proof teknolojisi\n• GDPR ve KVKK uyumlu\n• ISO 27001 sertifikali\n• Cok faktorlu kimlik verification\n• Biyometrik veri sifreleme\n\nDataleriniz hicbir zaman ucuncu taraflarla paylasilmaz.';
      } else if (msgLower.includes('fiyat') || msgLower.includes('ucret') || msgLower.includes('paket')) {
        return '💰 Pricelandirma:\n\n📦 Individual: ₺99/ay\n• 5 cihaz, temel ozellikler\n\n⚡ Professional: ₺299/ay\n• 20 cihaz, API erisimi, gelismis AI\n\n🚀 Corporate: Private fiyat\n• Sinirsiz kaynak, ozel cozumler\n\nTum paketlerde 14 gun ucretsiz deneme!';
      } else if (msgLower.includes('destek') || msgLower.includes('yardim') || msgLower.includes('sorun')) {
        return '🆘 Teknik Support:\n\n• 7/24 canli destek hatti\n• Average yanit suresi: 2-5 dk\n• Email: support@digiguard.com\n• Phone: +90 850 XXX XX XX\n• Uzaktan baglanti destegi\n• Video egitim kutuphanesi\n\nHow can I help you?';
      } else if (msgLower.includes('kyc') || msgLower.includes('kimlik')) {
        return '🎫 KYC Nedir?\n\nKYC (Know Your Customer), finansal kuruluslarin musterilerinin kimligini verification surecidir.\n\n✅ DigiGuard Farki:\n• Blockchain uzerinde guvenli saklama\n• Tek seferlik verification\n• Tum platformlarda gecerli\n• Aninda onay sureci\n• GDPR/KVKK uyumlu\n\nDaha fazla bilgi ister misiniz?';
      } else if (msgLower.includes('entegrasyon') || msgLower.includes('api')) {
        return '🔌 Integrationlar:\n\n• RESTful API\n• GraphQL destegi\n• Webhook bildirimleri\n• SDK: JavaScript, Python, Go\n• OAuth 2.0 kimlik verification\n• Dokumantasyon ve ornekler\n\nDeveloper dokumanlarini gormek ister misiniz?';
      } else if (msgLower.includes('merhaba') || msgLower.includes('selam')) {
        return '👋 Hello! Ben ALBIS, DigiGuard yapay zeka asistaninizim.\n\nSize help olabilecegim konular:\n\n• Platform kullanimi\n• Featureler ve fiyatlandirma\n• Securek bilgileri\n• Corporate cozumler\n• Teknik destek\n\nNe ogrenmek istersiniz?';
      } else {
        return '🤖 Size help olabilmem icin daha spesifik bir soru sorabilir misiniz?\n\nPopuler konular:\n• Nasil baslarim?\n• Pricelandirma\n• Securek\n• Corporate cozumler\n\nYa da asagidaki fast yanit butonlarini kullanabilirsiniz.';
      }
    } else {
      if (msgLower.includes('how are you') || msgLower.includes('how is it going')) {
        return '😊 I am doing well, thank you! I am here to help you. Would you like to learn about DigiGuard?';
      } else if (msgLower.includes('start') || msgLower.includes('begin') || msgLower.includes('register')) {
        return '🚀 Getting started with DigiGuard is easy!\n\n1. Fill out the registration form\n2. Upload your identity documents\n3. Complete biometric verification\n4. Receive your KYC certificate\n\nWould you like to start now?';
      } else if (msgLower.includes('individual') || msgLower.includes('personal')) {
        return '👤 Individual Plan Features:\n\n• Biometric identity verification\n• Blockchain KYC certificate\n• 5 device support\n• Mobile app access\n• 24/7 technical support\n• Basic AI security analysis\n\nOnly ₺99/month! Free 14-day trial.';
      } else if (msgLower.includes('enterprise') || msgLower.includes('business') || msgLower.includes('company')) {
        return '🏢 Enterprise Solutions:\n\n• Unlimited users & devices\n• Custom AI models\n• API integration\n• Dedicated server\n• 99.99% SLA guarantee\n• 24/7 dedicated support\n• On-premise deployment\n• White-label options\n\nContact sales for custom pricing.';
      } else if (msgLower.includes('security') || msgLower.includes('privacy') || msgLower.includes('protection')) {
        return '🔒 Security & Privacy:\n\n• AES-256 bit encryption\n• Blockchain-based verification\n• Zero-knowledge proof technology\n• GDPR compliant\n• ISO 27001 certified\n• Multi-factor authentication\n• Biometric data encryption\n\nYour data is never shared with third parties.';
      } else if (msgLower.includes('price') || msgLower.includes('pricing') || msgLower.includes('cost')) {
        return '💰 Pricing:\n\n📦 Individual: ₺99/mo\n• 5 devices, basic features\n\n⚡ Professional: ₺299/mo\n• 20 devices, API access, advanced AI\n\n🚀 Enterprise: Custom\n• Unlimited resources, custom solutions\n\nGetl plans include 14-day free trial!';
      } else if (msgLower.includes('support') || msgLower.includes('help') || msgLower.includes('issue')) {
        return '🆘 Technical Support:\n\n• 24/7 live support\n• Average response time: 2-5 min\n• Email: support@digiguard.com\n• Phone: +90 850 XXX XX XX\n• Remote connection support\n• Video training library\n\nHow can I help you?';
      } else if (msgLower.includes('kyc') || msgLower.includes('identity')) {
        return '🎫 What is KYC?\n\nKYC (Know Your Customer) is the process of verifying customer identity by financial institutions.\n\n✅ DigiGuard First Namevantage:\n• Secure blockchain storage\n• One-time verification\n• Valid across all platforms\n• Instant approval process\n• GDPR compliant\n\nWould you like more information?';
      } else if (msgLower.includes('integration') || msgLower.includes('api')) {
        return '🔌 Integrations:\n\n• RESTful API\n• GraphQL support\n• Webhook notifications\n• SDK: JavaScript, Python, Go\n• OAuth 2.0 authentication\n• Documentation and examples\n\nWould you like to see developer docs?';
      } else if (msgLower.includes('hello') || msgLower.includes('hi')) {
        return '👋 Hello! I am ALBIS, your DigiGuard AI assistant.\n\nI can help you with:\n\n• Platform usage\n• Features and pricing\n• Security information\n• Enterprise solutions\n• Technical support\n\nWhat would you like to know?';
      } else if (msgLower.includes('thank')) {
        return '🙏 You are welcome! If you need any other assistance, I am here.';
      } else {
        return '🤖 Could you please ask a more specific question so I can help you better?\n\nPopular topics:\n• How to get started?\n• Pricing\n• Security\n• Enterprise solutions\n\nOr use the quick reply buttons below.';
      }
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString(language === 'tr' ? 'en-US' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getAIResponse(currentInput),
        time: new Date().toLocaleTimeString(language === 'tr' ? 'en-US' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage = {
      type: 'user',
      text: reply,
      time: new Date().toLocaleTimeString(language === 'tr' ? 'en-US' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getAIResponse(reply),
        time: new Date().toLocaleTimeString(language === 'tr' ? 'en-US' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 hover:from-cyan-700 hover:via-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 group animate-pulse-slow"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce font-bold">
          ?
        </span>
        <div className="absolute bottom-full right-0 mb-3 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-cyan-500/50 shadow-2xl backdrop-blur-sm">
          <div className="font-bold text-cyan-300 mb-1">ALBIS Asistan</div>
          <div className="text-xs text-slate-300">
            {language === 'tr' ? 'How can I help you?' : 'How can I help you?'}
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-cyan-500/50"></div>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16 w-80' : 'h-[600px] w-96'} flex flex-col`}>
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-white/20 p-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-blue-700"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">ALBIS</h3>
            <p className="text-xs text-cyan-100">{language === 'tr' ? 'DigiGuard Asistan' : 'DigiGuard Assistant'}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50 backdrop-blur-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'bg-slate-700/80 text-slate-100'} rounded-2xl px-4 py-3 shadow-lg`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-slate-700/50 hover:bg-cyan-600/80 text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-all border border-slate-600 hover:border-cyan-500"
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
                placeholder={language === 'tr' ? 'Messageinizi yazin...' : 'Type your message...'}
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-2.5 rounded-xl transition-all hover:scale-105 shadow-lg"
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
