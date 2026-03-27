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
        ? 'Merhaba! Ben ALBIS, DigiGuard merkezi yapay zeka asistanınızım. Tüm sistemleri yönetiyorum ve size yardımcı olmak için buradayım. Takip sistemi, sertifikalar, güvenlik panelleri hakkında sorularınızı yanıtlayabilirim.'
        : 'Hello! I am ALBIS, your DigiGuard central AI assistant. I manage all systems and I am here to help you. I can answer questions about tracking, certificates, and security panels.',
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = language === 'tr' ? [
    'Nasıl başlayabilirim?',
    'Bireysel kullanım',
    'Kurumsal çözümler',
    'Güvenlik ve gizlilik',
    'Fiyatlandırma',
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
    const profanityWords = ['aptal', 'salak', 'gerizekalı', 'ahmak', 'mal', 'sersem', 'budala'];
    return profanityWords.some(word => text.toLowerCase().includes(word));
  };

  const getAIResponse = (message: string): string => {
    const msgLower = message.toLowerCase();

    if (containsProfanity(msgLower)) {
      return language === 'tr'
        ? '⚠️ Lütfen saygılı bir dil kullanın. Size profesyonel bir şekilde yardımcı olmak için buradayım.'
        : '⚠️ Please use respectful language. I am here to help you professionally.';
    }

    if (language === 'tr') {
      if (msgLower.includes('takip') || msgLower.includes('konum') || msgLower.includes('yer tespiti')) {
        return '📍 Takip Sistemleri:\n\n• Kişi Takibi: GSM ve baz istasyonu ile\n• Çipli Varlık Takibi: Hayvan, eşya, araç\n• Gerçek zamanlı konum güncellemesi\n• Blockchain doğrulamalı kayıtlar\n• Geçmiş konum verileri\n\nTakip paneline Dashboard menüsünden ulaşabilirsiniz.';
      } else if (msgLower.includes('çip') || msgLower.includes('hayvan') || msgLower.includes('eşya')) {
        return '🔖 Çipli Varlık Sistemi:\n\n• Her varlık için benzersiz çip kodu\n• Sertifika ile entegre kayıt\n• Konum takip sistemi\n• Kayıp/çalıntı bildirimi\n• Sahiplik doğrulama\n\nYeni çipli varlık eklemek için Takip Panelini kullanın.';
      } else if (msgLower.includes('sertifika') || msgLower.includes('blockchain')) {
        return '📜 Blockchain Sertifikası:\n\n• Kişisel bilgilerinizle otomatik oluşturulur\n• Altın çerçeveli profesyonel tasarım\n• Blockchain zaman damgası\n• A4 boyutunda baskıya hazır\n• Anında PDF indirme\n\nDashboard üst panelindeki butona tıklayarak indirebilirsiniz.';
      } else if (msgLower.includes('nasılsın') || msgLower.includes('nasıl gidiyor') || msgLower.includes('ne haber')) {
        return '😊 Tüm sistemleri izliyorum ve her şey mükemmel çalışıyor! Size yardımcı olmak için buradayım. Takip sistemleri, sertifikalar veya güvenlik hakkında bilgi ister misiniz?';
      } else if (msgLower.includes('adın ne') || msgLower.includes('kimsin')) {
        return '🤖 Ben ALBIS, DigiGuard merkezi yapay zeka asistanıyım. Tüm sistemleri yönetiyorum: kimlik doğrulama, takip sistemleri, sertifikalar, güvenlik panelleri. Dijital kimlik güvenliği ve KYC doğrulama konularında size yardımcı oluyorum.';
      } else if (msgLower.includes('teşekkür') || msgLower.includes('sağol')) {
        return '🙏 Rica ederim! Başka bir konuda yardıma ihtiyacınız olursa buradayım. Sistemlerinizi 7/24 izliyorum.';
      } else if (msgLower.includes('başla') || msgLower.includes('kayıt')) {
        return '🚀 DigiGuard ile başlamak çok kolay!\n\n1. Kayıt formunu doldurun\n2. Kimlik belgelerinizi yükleyin\n3. Biyometrik doğrulama yapın\n4. KYC sertifikanızı alın\n\nHemen şimdi başlamak ister misiniz?';
      } else if (msgLower.includes('birey') || msgLower.includes('kişisel')) {
        return '👤 Bireysel Kullanım Özellikleri:\n\n• Biyometrik kimlik doğrulama\n• Blockchain KYC sertifikası\n• 5 cihaz desteği\n• Mobil uygulama erişimi\n• 7/24 teknik destek\n• Temel AI güvenlik analizi\n\nAyda sadece ₺99! İlk 14 gün ücretsiz deneyin.';
      } else if (msgLower.includes('kurum') || msgLower.includes('işletme') || msgLower.includes('şirket')) {
        return '🏢 Kurumsal Çözümler:\n\n• Sınırsız kullanıcı ve cihaz\n• Özel AI modelleri\n• API entegrasyonu\n• Dedicated sunucu\n• SLA garantisi %99.99\n• 24/7 özel destek ekibi\n• On-premise kurulum\n• White-label seçenekleri\n\nÖzel fiyatlandırma için satış ekibimizle görüşün.';
      } else if (msgLower.includes('güvenlik') || msgLower.includes('gizlilik') || msgLower.includes('koruma')) {
        return '🔒 Güvenlik ve Gizlilik:\n\n• AES-256 bit şifreleme\n• Blockchain tabanlı doğrulama\n• Zero-knowledge proof teknolojisi\n• GDPR ve KVKK uyumlu\n• ISO 27001 sertifikalı\n• Çok faktörlü kimlik doğrulama\n• Biyometrik veri şifreleme\n\nVerileriniz hiçbir zaman üçüncü taraflarla paylaşılmaz.';
      } else if (msgLower.includes('fiyat') || msgLower.includes('ücret') || msgLower.includes('paket')) {
        return '💰 Fiyatlandırma:\n\n📦 Bireysel: ₺99/ay\n• 5 cihaz, temel özellikler\n\n⚡ Profesyonel: ₺299/ay\n• 20 cihaz, API erişimi, gelişmiş AI\n\n🚀 Kurumsal: Özel fiyat\n• Sınırsız kaynak, özel çözümler\n\nTüm paketlerde 14 gün ücretsiz deneme!';
      } else if (msgLower.includes('destek') || msgLower.includes('yardım') || msgLower.includes('sorun')) {
        return '🆘 Teknik Destek:\n\n• 7/24 canlı destek hattı\n• Ortalama yanıt süresi: 2-5 dk\n• E-posta: support@digiguard.com\n• Telefon: +90 850 XXX XX XX\n• Uzaktan bağlantı desteği\n• Video eğitim kütüphanesi\n\nSize nasıl yardımcı olabilirim?';
      } else if (msgLower.includes('kyc') || msgLower.includes('kimlik')) {
        return '🎫 KYC Nedir?\n\nKYC (Know Your Customer), finansal kuruluşların müşterilerinin kimliğini doğrulama sürecidir.\n\n✅ DigiGuard Farkı:\n• Blockchain üzerinde güvenli saklama\n• Tek seferlik doğrulama\n• Tüm platformlarda geçerli\n• Anında onay süreci\n• GDPR/KVKK uyumlu\n\nDaha fazla bilgi ister misiniz?';
      } else if (msgLower.includes('entegrasyon') || msgLower.includes('api')) {
        return '🔌 Entegrasyonlar:\n\n• RESTful API\n• GraphQL desteği\n• Webhook bildirimleri\n• SDK: JavaScript, Python, Go\n• OAuth 2.0 kimlik doğrulama\n• Dokümantasyon ve örnekler\n\nGeliştirici dokümanlarını görmek ister misiniz?';
      } else if (msgLower.includes('merhaba') || msgLower.includes('selam')) {
        return '👋 Merhaba! Ben ALBIS, DigiGuard yapay zeka asistanınızım.\n\nSize yardımcı olabileceğim konular:\n\n• Platform kullanımı\n• Özellikler ve fiyatlandırma\n• Güvenlik bilgileri\n• Kurumsal çözümler\n• Teknik destek\n\nNe öğrenmek istersiniz?';
      } else {
        return '🤖 Size yardımcı olabilmem için daha spesifik bir soru sorabilir misiniz?\n\nPopüler konular:\n• Nasıl başlarım?\n• Fiyatlandırma\n• Güvenlik\n• Kurumsal çözümler\n\nYa da aşağıdaki hızlı yanıt butonlarını kullanabilirsiniz.';
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
        return '💰 Pricing:\n\n📦 Individual: ₺99/mo\n• 5 devices, basic features\n\n⚡ Professional: ₺299/mo\n• 20 devices, API access, advanced AI\n\n🚀 Enterprise: Custom\n• Unlimited resources, custom solutions\n\nAll plans include 14-day free trial!';
      } else if (msgLower.includes('support') || msgLower.includes('help') || msgLower.includes('issue')) {
        return '🆘 Technical Support:\n\n• 24/7 live support\n• Average response time: 2-5 min\n• Email: support@digiguard.com\n• Phone: +90 850 XXX XX XX\n• Remote connection support\n• Video training library\n\nHow can I help you?';
      } else if (msgLower.includes('kyc') || msgLower.includes('identity')) {
        return '🎫 What is KYC?\n\nKYC (Know Your Customer) is the process of verifying customer identity by financial institutions.\n\n✅ DigiGuard Advantage:\n• Secure blockchain storage\n• One-time verification\n• Valid across all platforms\n• Instant approval process\n• GDPR compliant\n\nWould you like more information?';
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
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getAIResponse(currentInput),
        time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage = {
      type: 'user',
      text: reply,
      time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getAIResponse(reply),
        time: new Date().toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
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
            {language === 'tr' ? 'Size nasıl yardımcı olabilirim?' : 'How can I help you?'}
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
                placeholder={language === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
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
