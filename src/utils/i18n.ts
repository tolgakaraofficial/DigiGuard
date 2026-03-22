export const translations = {
  tr: {
    welcome: 'DigiGuard Biyometrik Kontrol Merkezi',
    subtitle: 'KYC kimliğiniz aktif olarak korunuyor',
    live: 'CANLI',
    logout: 'Güvenli Çıkış',
    biometricStatus: 'Biyometrik Durum',
    verified: 'Doğrulandı',
    securityScore: 'Güvenlik Skoru',
    activeProtection: 'Aktif Koruma',
    kycControl: 'KYC Kontrol',
    current: 'Güncel',
  },
  en: {
    welcome: 'DigiGuard Biometric Control Center',
    subtitle: 'Your KYC identity is actively protected',
    live: 'LIVE',
    logout: 'Secure Logout',
    biometricStatus: 'Biometric Status',
    verified: 'Verified',
    securityScore: 'Security Score',
    activeProtection: 'Active Protection',
    kycControl: 'KYC Control',
    current: 'Current',
  },
  de: {
    welcome: 'DigiGuard Biometrisches Kontrollzentrum',
    subtitle: 'Ihre KYC-Identität wird aktiv geschützt',
    live: 'LIVE',
    logout: 'Sicherer Ausgang',
    biometricStatus: 'Biometrischer Status',
    verified: 'Verifiziert',
    securityScore: 'Sicherheitsbewertung',
    activeProtection: 'Aktiver Schutz',
    kycControl: 'KYC-Kontrolle',
    current: 'Aktuell',
  },
  fr: {
    welcome: 'Centre de Contrôle Biométrique DigiGuard',
    subtitle: 'Votre identité KYC est activement protégée',
    live: 'EN DIRECT',
    logout: 'Déconnexion Sécurisée',
    biometricStatus: 'Statut Biométrique',
    verified: 'Vérifié',
    securityScore: 'Score de Sécurité',
    activeProtection: 'Protection Active',
    kycControl: 'Contrôle KYC',
    current: 'Actuel',
  },
  es: {
    welcome: 'Centro de Control Biométrico DigiGuard',
    subtitle: 'Su identidad KYC está activamente protegida',
    live: 'EN VIVO',
    logout: 'Salida Segura',
    biometricStatus: 'Estado Biométrico',
    verified: 'Verificado',
    securityScore: 'Puntuación de Seguridad',
    activeProtection: 'Protección Activa',
    kycControl: 'Control KYC',
    current: 'Actual',
  },
  ar: {
    welcome: 'مركز التحكم البيومتري DigiGuard',
    subtitle: 'هويتك KYC محمية بنشاط',
    live: 'مباشر',
    logout: 'خروج آمن',
    biometricStatus: 'الحالة البيومترية',
    verified: 'تم التحقق',
    securityScore: 'درجة الأمان',
    activeProtection: 'الحماية النشطة',
    kycControl: 'تحكم KYC',
    current: 'حالي',
  },
  zh: {
    welcome: 'DigiGuard 生物识别控制中心',
    subtitle: '您的 KYC 身份受到主动保护',
    live: '直播',
    logout: '安全退出',
    biometricStatus: '生物识别状态',
    verified: '已验证',
    securityScore: '安全评分',
    activeProtection: '主动保护',
    kycControl: 'KYC 控制',
    current: '当前',
  },
  ja: {
    welcome: 'DigiGuard バイオメトリック制御センター',
    subtitle: 'あなたのKYCアイデンティティは積極的に保護されています',
    live: 'ライブ',
    logout: '安全なログアウト',
    biometricStatus: 'バイオメトリックステータス',
    verified: '検証済み',
    securityScore: 'セキュリティスコア',
    activeProtection: 'アクティブ保護',
    kycControl: 'KYCコントロール',
    current: '現在',
  },
  ru: {
    welcome: 'Центр биометрического контроля DigiGuard',
    subtitle: 'Ваша идентичность KYC активно защищена',
    live: 'В ПРЯМОМ ЭФИРЕ',
    logout: 'Безопасный выход',
    biometricStatus: 'Биометрический статус',
    verified: 'Проверено',
    securityScore: 'Оценка безопасности',
    activeProtection: 'Активная защита',
    kycControl: 'Контроль KYC',
    current: 'Текущий',
  },
};

export type Language = keyof typeof translations;

export const detectLanguage = (): Language => {
  const userLang = navigator.language.toLowerCase();

  if (userLang.startsWith('tr')) return 'tr';
  if (userLang.startsWith('en')) return 'en';
  if (userLang.startsWith('de')) return 'de';
  if (userLang.startsWith('fr')) return 'fr';
  if (userLang.startsWith('es')) return 'es';
  if (userLang.startsWith('ar')) return 'ar';
  if (userLang.startsWith('zh')) return 'zh';
  if (userLang.startsWith('ja')) return 'ja';
  if (userLang.startsWith('ru')) return 'ru';

  return 'en';
};

export const getCountryFromLanguage = (lang: Language): string => {
  const countryMap: Record<Language, string> = {
    tr: 'Türkiye',
    en: 'United States',
    de: 'Deutschland',
    fr: 'France',
    es: 'España',
    ar: 'العربية',
    zh: '中国',
    ja: '日本',
    ru: 'Россия',
  };

  return countryMap[lang] || 'Global';
};
