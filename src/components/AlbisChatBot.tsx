import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Minimize2, CheckCircle, Shield, Lock, AlertCircle, Activity } from 'lucide-react';

interface AlbisChatBotProps {
  language?: string;
}

interface LiveUpdate {
  id: string;
  type: 'info' | 'alert' | 'success' | 'task';
  title: string;
  message: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
}

export const AlbisChatBot: React.FC<AlbisChatBotProps> = ({ language = 'tr' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'live'>('chat');
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
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [unreadLive, setUnreadLive] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialUpdates: LiveUpdate[] = [
      {
        id: '1',
        type: 'success',
        title: 'Sertifika İşlemleri',
        message: 'Son 24 saatte 1.234 yeni sertifika blockchain\'e kaydedildi',
        timestamp: new Date(),
        icon: <CheckCircle className="w-4 h-4" />,
        color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      },
      {
        id: '2',
        type: 'info',
        title: 'Güvenlik Denetimi',
        message: 'Tüm sertifikalar günlük güvenlik protokolleri ile doğrulanmaktadır',
        timestamp: new Date(Date.now() - 30000),
        icon: <Shield className="w-4 h-4" />,
        color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
      },
      {
        id: '3',
        type: 'task',
        title: 'Blockchain Doğrulama',
        message: 'Kullanıcı sertifikaları Ethereum blockchain üzerinde korunmaktadır',
        timestamp: new Date(Date.now() - 60000),
        icon: <AlertCircle className="w-4 h-4" />,
        color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
      },
      {
        id: '4',
        type: 'info',
        title: 'Şifreleme Standartları',
        message: 'AES-256 military grade şifreleme tüm verileri korumaktadır',
        timestamp: new Date(Date.now() - 120000),
        icon: <Lock className="w-4 h-4" />,
        color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      },
    ];

    setUpdates(initialUpdates);

    const interval = setInterval(() => {
      const messages = [
        'Yeni sertifika başarıyla oluşturuldu ve blockchain\'e kaydedildi',
        'Biyometrik doğrulama tamamlandı - sistem onay verdi',
        'KYC kontrolleri başarıyla geçildi',
        'Sertifika doğrulama işlemi tamamlandı',
        'Güvenlik protokolleri kontrol edildi ve onaylandı',
        'Yeni kurumsal kullanıcı kaydı tamamlandı',
        'Şehir bazlı sertifika istatistikleri güncellendi',
      ];

      const titles = [
        'Sertifika İşlemi',
        'Biyometrik Onay',
        'KYC Doğrulama',
        'Güvenlik Güncelleme',
        'Kurumsal Kayıt',
      ];

      const types: Array<'success' | 'info' | 'task'> = ['success', 'info', 'task'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      const colorMap = {
        success: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
        info: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
        task: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
      };

      const iconMap = {
        success: <CheckCircle className="w-4 h-4" />,
        info: <Shield className="w-4 h-4" />,
        task: <AlertCircle className="w-4 h-4" />,
      };

      const newUpdate: LiveUpdate = {
        id: Date.now().toString(),
        type: randomType,
        title: titles[Math.floor(Math.random() * titles.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        icon: iconMap[randomType],
        color: colorMap[randomType],
      };

      setUpdates((prev) => [newUpdate, ...prev].slice(0, 20));
      if (activeTab !== 'live') {
        setUnreadLive((prev) => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString('tr-TR');
  };

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
        ? 'Lütfen saygılı bir dil kullanın. Size profesyonel bir şekilde yardımcı olmak için buradayım.'
        : 'Please use respectful language. I am here to help you professionally.';
    }

    if (language === 'tr') {
      if (msgLower.includes('takip') || msgLower.includes('konum') || msgLower.includes('yer tespiti')) {
        return 'Takip Sistemleri:\n\n- Kişi Takibi: GSM ve baz istasyonu ile\n- Cipli Varlik Takibi: Hayvan, esya, arac\n- Gercek zamanli konum guncellemesi\n- Blockchain dogrulamali kayitlar\n- Gecmis konum verileri\n\nTakip paneline Dashboard menusunden ulasabilirsiniz.';
      } else if (msgLower.includes('cip') || msgLower.includes('hayvan') || msgLower.includes('esya')) {
        return 'Cipli Varlik Sistemi:\n\n- Her varlik icin benzersiz cip kodu\n- Sertifika ile entegre kayit\n- Konum takip sistemi\n- Kayip/calinti bildirimi\n- Sahiplik dogrulama\n\nYeni cipli varlik eklemek icin Takip Panelini kullanin.';
      } else if (msgLower.includes('sertifika') || msgLower.includes('blockchain')) {
        return 'Blockchain Sertifikasi:\n\n- Kisisel bilgilerinizle otomatik olusturulur\n- Altin cerceveli profesyonel tasarim\n- Blockchain zaman damgasi\n- A4 boyutunda baskiya hazir\n- Aninda PDF indirme\n\nDashboard ust panelindeki butona tiklayarak indirebilirsiniz.';
      } else if (msgLower.includes('nasil') || msgLower.includes('nasil gidiyor') || msgLower.includes('ne haber')) {
        return 'Tum sistemleri izliyorum ve her sey mukemmel calisiyor! Size yardimci olmak icin buradayim. Takip sistemleri, sertifikalar veya guvenlik hakkinda bilgi ister misiniz?';
      } else if (msgLower.includes('ad') || msgLower.includes('kimsin')) {
        return 'Ben ALBIS, DigiGuard merkezi yapay zeka asistaniyim. Tum sistemleri yonetiyorum: kimlik dogrulama, takip sistemleri, sertifikalar, guvenlik panelleri. Dijital kimlik guvenligi ve KYC dogrulama konularinda size yardimci oluyorum.';
      } else if (msgLower.includes('tesekkur') || msgLower.includes('sagol')) {
        return 'Rica ederim! Baska bir konuda yardima ihtiyaciniz olursa buradayim. Sistemlerinizi 7/24 izliyorum.';
      } else if (msgLower.includes('basla') || msgLower.includes('kayit')) {
        return 'DigiGuard ile baslamak cok kolay!\n\n1. Kayit formunu doldurun\n2. Kimlik belgelerinizi yukleyin\n3. Biyometrik dogrulama yapin\n4. KYC sertifikanizi alin\n\nHemen simdi baslamak ister misiniz?';
      } else if (msgLower.includes('birey') || msgLower.includes('kisisel')) {
        return 'Bireysel Kullanim Ozellikleri:\n\n- Biyometrik kimlik dogrulama\n- Blockchain KYC sertifikasi\n- 5 cihaz destegi\n- Mobil uygulama erisimi\n- 7/24 teknik destek\n- Temel AI guvenlik analizi\n\nAyda sadece 99 TL! Ilk 14 gun ucretsiz deneyin.';
      } else if (msgLower.includes('kurum') || msgLower.includes('isletme') || msgLower.includes('sirket')) {
        return 'Kurumsal Cozumler:\n\n- Sinirsiz kullanici ve cihaz\n- Ozel AI modelleri\n- API entegrasyonu\n- Dedicated sunucu\n- SLA garantisinde %99.99\n- 24/7 ozel destek ekibi\n- On-premise kurulum\n- White-label secenekleri\n\nOzel fiyatlandirma icin satis ekibimizle goruseun.';
      } else if (msgLower.includes('guvenlik') || msgLower.includes('gizlilik') || msgLower.includes('koruma')) {
        return 'Guvenlik ve Gizlilik:\n\n- AES-256 bit sifreleme\n- Blockchain tabanli dogrulama\n- Zero-knowledge proof teknolojisi\n- GDPR ve KVKK uyumlu\n- ISO 27001 sertifikali\n- Cok faktorlu kimlik dogrulama\n- Biyometrik veri sifreleme\n\nVerileriniz hicbir zaman ucuncu taraflarla paylasilmaz.';
      } else if (msgLower.includes('fiyat') || msgLower.includes('ucret') || msgLower.includes('paket')) {
        return 'Fiyatlandirma:\n\nBireysel: 99 TL/ay\n- 5 cihaz, temel ozellikler\n\nProfesyonel: 299 TL/ay\n- 20 cihaz, API erisimi, gelismis AI\n\nKurumsal: Ozel fiyat\n- Sinirsiz kaynak, ozel cozumler\n\nTum paketlerde 14 gun ucretsiz deneme!';
      } else if (msgLower.includes('destek') || msgLower.includes('yardim') || msgLower.includes('sorun')) {
        return 'Teknik Destek:\n\n- 7/24 canli destek hatti\n- Ortalama yanit suresi: 2-5 dk\n- E-posta: support@digiguard.com\n- Telefon: +90 850 XXX XX XX\n- Uzaktan baglanti destegi\n- Video egitim kutuphanesi\n\nSize nasil yardimci olabilirim?';
      } else if (msgLower.includes('kyc') || msgLower.includes('kimlik')) {
        return 'KYC Nedir?\n\nKYC (Know Your Customer), finansal kuruluslarin musterilerinin kimligini dogrulama surecidir.\n\nDigiGuard Farki:\n- Blockchain uzerinde guvenli saklama\n- Tek seferlik dogrulama\n- Tum platformlarda gecerli\n- Aninda onay sureci\n- GDPR/KVKK uyumlu\n\nDaha fazla bilgi ister misiniz?';
      } else if (msgLower.includes('entegrasyon') || msgLower.includes('api')) {
        return 'Entegrasyonlar:\n\n- RESTful API\n- GraphQL destegi\n- Webhook bildirimleri\n- SDK: JavaScript, Python, Go\n- OAuth 2.0 kimlik dogrulama\n- Dokumantasyon ve ornekler\n\nGelistirici dokumanlarini gormek ister misiniz?';
      } else if (msgLower.includes('merhaba') || msgLower.includes('selam')) {
        return 'Merhaba! Ben ALBIS, DigiGuard yapay zeka asistaninizim.\n\nSize yardimci olabilecegim konular:\n\n- Platform kullanimi\n- Ozellikler ve fiyatlandirma\n- Guvenlik bilgileri\n- Kurumsal cozumler\n- Teknik destek\n\nNe ogrenmek istersiniz?';
      } else {
        return 'Size yardimci olabilmem icin daha spesifik bir soru sorabilir misiniz?\n\nPopuler konular:\n- Nasil baslarim?\n- Fiyatlandirma\n- Guvenlik\n- Kurumsal cozumler\n\nYa da asagidaki hizli yanit butonlarini kullanabilirsiniz.';
      }
    } else {
      if (msgLower.includes('how are you') || msgLower.includes('how is it going')) {
        return 'I am doing well, thank you! I am here to help you. Would you like to learn about DigiGuard?';
      } else if (msgLower.includes('start') || msgLower.includes('begin') || msgLower.includes('register')) {
        return 'Getting started with DigiGuard is easy!\n\n1. Fill out the registration form\n2. Upload your identity documents\n3. Complete biometric verification\n4. Receive your KYC certificate\n\nWould you like to start now?';
      } else if (msgLower.includes('individual') || msgLower.includes('personal')) {
        return 'Individual Plan Features:\n\n- Biometric identity verification\n- Blockchain KYC certificate\n- 5 device support\n- Mobile app access\n- 24/7 technical support\n- Basic AI security analysis\n\nOnly 99 TL/month! Free 14-day trial.';
      } else if (msgLower.includes('enterprise') || msgLower.includes('business') || msgLower.includes('company')) {
        return 'Enterprise Solutions:\n\n- Unlimited users & devices\n- Custom AI models\n- API integration\n- Dedicated server\n- 99.99% SLA guarantee\n- 24/7 dedicated support\n- On-premise deployment\n- White-label options\n\nContact sales for custom pricing.';
      } else if (msgLower.includes('security') || msgLower.includes('privacy') || msgLower.includes('protection')) {
        return 'Security & Privacy:\n\n- AES-256 bit encryption\n- Blockchain-based verification\n- Zero-knowledge proof technology\n- GDPR compliant\n- ISO 27001 certified\n- Multi-factor authentication\n- Biometric data encryption\n\nYour data is never shared with third parties.';
      } else if (msgLower.includes('price') || msgLower.includes('pricing') || msgLower.includes('cost')) {
        return 'Pricing:\n\nIndividual: 99 TL/mo\n- 5 devices, basic features\n\nProfessional: 299 TL/mo\n- 20 devices, API access, advanced AI\n\nEnterprise: Custom\n- Unlimited resources, custom solutions\n\nAll plans include 14-day free trial!';
      } else if (msgLower.includes('support') || msgLower.includes('help') || msgLower.includes('issue')) {
        return 'Technical Support:\n\n- 24/7 live support\n- Average response time: 2-5 min\n- Email: support@digiguard.com\n- Phone: +90 850 XXX XX XX\n- Remote connection support\n- Video training library\n\nHow can I help you?';
      } else if (msgLower.includes('kyc') || msgLower.includes('identity')) {
        return 'What is KYC?\n\nKYC (Know Your Customer) is the process of verifying customer identity by financial institutions.\n\nDigiGuard Advantage:\n- Secure blockchain storage\n- One-time verification\n- Valid across all platforms\n- Instant approval process\n- GDPR compliant\n\nWould you like more information?';
      } else if (msgLower.includes('integration') || msgLower.includes('api')) {
        return 'Integrations:\n\n- RESTful API\n- GraphQL support\n- Webhook notifications\n- SDK: JavaScript, Python, Go\n- OAuth 2.0 authentication\n- Documentation and examples\n\nWould you like to see developer docs?';
      } else if (msgLower.includes('hello') || msgLower.includes('hi')) {
        return 'Hello! I am ALBIS, your DigiGuard AI assistant.\n\nI can help you with:\n\n- Platform usage\n- Features and pricing\n- Security information\n- Enterprise solutions\n- Technical support\n\nWhat would you like to know?';
      } else if (msgLower.includes('thank')) {
        return 'You are welcome! If you need any other assistance, I am here.';
      } else {
        return 'Could you please ask a more specific question so I can help you better?\n\nPopular topics:\n- How to get started?\n- Pricing\n- Security\n- Enterprise solutions\n\nOr use the quick reply buttons below.';
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
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700 hover:from-cyan-700 hover:via-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        {unreadLive > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce font-bold">
            {unreadLive}
          </span>
        )}
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
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
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
          {/* Tab Navigation */}
          <div className="flex bg-slate-800/80 border-b border-slate-700 flex-shrink-0">
            <button
              onClick={() => { setActiveTab('chat'); }}
              className={`flex-1 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'chat'
                  ? 'text-cyan-400 bg-slate-700/50 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              {language === 'tr' ? 'Sohbet' : 'Chat'}
            </button>
            <button
              onClick={() => { setActiveTab('live'); setUnreadLive(0); }}
              className={`flex-1 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 relative ${
                activeTab === 'live'
                  ? 'text-cyan-400 bg-slate-700/50 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              {language === 'tr' ? 'Canlı Akış' : 'Live Stream'}
              {unreadLive > 0 && (
                <span className="absolute top-1 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {unreadLive}
                </span>
              )}
            </button>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
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
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 flex-shrink-0">
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

          {/* Live Stream Tab */}
          {activeTab === 'live' && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-800/50 backdrop-blur-sm">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className={`bg-gradient-to-r ${update.color} rounded-lg p-3 border transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 mt-0.5">
                        {update.type === 'success' && <span className="text-green-400">{update.icon}</span>}
                        {update.type === 'info' && <span className="text-cyan-400">{update.icon}</span>}
                        {update.type === 'task' && <span className="text-orange-400">{update.icon}</span>}
                        {update.type === 'alert' && <span className="text-red-400">{update.icon}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white truncate">{update.title}</h4>
                          <span className="text-[10px] text-slate-400 flex-shrink-0">{formatTime(update.timestamp)}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{update.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{language === 'tr' ? 'Canlı - 10s güncelleme' : 'Live - 10s refresh'}</span>
                  </div>
                  <span className="text-xs text-slate-500">{updates.length} {language === 'tr' ? 'kayıt' : 'entries'}</span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
