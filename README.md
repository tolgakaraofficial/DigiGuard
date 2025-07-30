# DigiGuard - Dijital Kimlik Koruma Sistemi

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_Native-0.72.6-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-49.0.0-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 🛡️ Genel Bakış

DigiGuard, yapay zeka tabanlı sahte içeriklere karşı kişilerin dijital kimliklerini koruyan çok platformlu güvenlik uygulamasıdır. Deepfake videolar, sahte ses kayıtları ve manipüle edilmiş fotoğraflar gibi sahte içeriklerin artan tehdidine karşı, kullanıcıların gerçek kimliklerini doğrulayan ve koruyan kapsamlı bir çözüm sunar.

## ✨ Ana Özellikler

### 🔐 Çok Faktörlü Kimlik Doğrulama
- **E-posta ve SMS OTP**: Çift kanallı doğrulama sistemi
- **Biyometrik Doğrulama**: Yüz ve ses tanıma teknolojisi
- **Cihaz Parmak İzi**: Güvenli cihaz tanıma
- **Güvenli Session**: JWT tabanlı oturum yönetimi

### 🤖 AI Tabanlı Sahte İçerik Tespiti
- **Deepfake Video Tespiti**: Gelişmiş neural network modelleri
- **Sahte Ses Analizi**: Ses klonlama ve sentez tespiti
- **Fotoğraf Manipülasyon**: Dijital değişiklik tespiti
- **Metadata Analizi**: Dosya bütünlüğü kontrolü
- **Ensemble Skorlama**: Çoklu model birleştirme

### 🔒 End-to-End Güvenlik
- **AES-256 Şifreleme**: Veri güvenliği
- **RSA-2048 Anahtar Değişimi**: Güvenli iletişim
- **SHA-256 Hash**: Veri bütünlüğü
- **PBKDF2 Parola Türetme**: Güvenli parola saklama
- **HMAC Dijital İmza**: Mesaj doğrulama

### ⛓️ Blockchain Sertifika Sistemi
- **X.509 Dijital Sertifikalar**: Standart sertifika formatı
- **Blockchain Hash Kayıtları**: Değiştirilemez kayıt sistemi
- **QR Kod Doğrulama**: Hızlı sertifika kontrolü
- **Uluslararası Geçerlilik**: Global tanınırlık

## 🏗️ Teknik Mimari

### Frontend Teknolojileri
```
Web Uygulaması:
├── React 18.3.1
├── TypeScript 5.5.3
├── Vite 5.4.2
├── Tailwind CSS 3.4.1
└── Lucide React (İkonlar)

Mobil Uygulama:
├── React Native 0.72.6
├── Expo 49.0.0
├── TypeScript 5.1.3
└── Expo Vector Icons
```

### Güvenlik Katmanları
```
┌─────────────────────────────────────┐
│        KULLANICI KATMANI            │
│  • Multi-Factor Authentication      │
│  • Biometric Verification          │
│  • Device Fingerprinting           │
└─────────────────────────────────────┘
                  │
┌─────────────────────────────────────┐
│       UYGULAMA KATMANI              │
│  • Input Validation                 │
│  • CSRF/XSS Protection             │
│  • Rate Limiting                    │
└─────────────────────────────────────┘
                  │
┌─────────────────────────────────────┐
│        NETWORK KATMANI              │
│  • TLS 1.3 Encryption              │
│  • Certificate Pinning             │
│  • HSTS Headers                     │
└─────────────────────────────────────┘
                  │
┌─────────────────────────────────────┐
│         VERİ KATMANI                │
│  • End-to-End Encryption           │
│  • Database Encryption             │
│  • Secure Key Management           │
└─────────────────────────────────────┘
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Expo CLI (mobil için)
- Modern web tarayıcısı

### Web Uygulaması
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Mobil Uygulama
```bash
# DigiGuardApp dizinine git
cd DigiGuardApp

# Bağımlılıkları yükle
npm install

# Expo geliştirme sunucusunu başlat
npm start

# Android'de çalıştır
npm run android

# iOS'ta çalıştır
npm run ios

# Web'de çalıştır
npm run web
```

## 📱 Platform Desteği

### Web Uygulaması
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Responsive tasarım (mobil, tablet, desktop)
- ✅ PWA desteği

### Mobil Uygulama
- ✅ iOS 13+ (iPhone, iPad)
- ✅ Android 8+ (API level 26+)
- ✅ Expo Go ile test desteği
- ✅ Native build desteği

## 🔧 Geliştirme

### Proje Yapısı
```
DigiGuard/
├── src/                    # Web uygulaması kaynak kodu
│   ├── components/         # React bileşenleri
│   ├── types/             # TypeScript tip tanımları
│   ├── utils/             # Yardımcı fonksiyonlar
│   └── services/          # İş mantığı servisleri
├── DigiGuardApp/          # Mobil uygulama
│   ├── components/        # React Native bileşenleri
│   └── types/            # Mobil tip tanımları
└── docs/                 # Dokümantasyon
```

### Kod Kalitesi
```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 🔐 Güvenlik Özellikleri

### Şifreleme Algoritmaları
- **Simetrik Şifreleme**: AES-256-GCM
- **Asimetrik Şifreleme**: RSA-2048-OAEP
- **Hash Fonksiyonları**: SHA-256, HMAC-SHA256
- **Anahtar Türetme**: PBKDF2 (100,000 iterasyon)
- **Rastgele Sayı Üretimi**: Kriptografik güvenli PRNG

### AI Güvenlik Modelleri
- **Yüz Tanıma**: FaceNet, ArcFace
- **Ses Analizi**: i-vector, x-vector
- **Deepfake Tespiti**: EfficientNet-B4, Xception, ResNet-50
- **Ensemble Yöntemi**: Ağırlıklı oylama sistemi

### Güvenlik Metrikleri
- **False Positive Rate**: < %5
- **False Negative Rate**: < %1
- **Analiz Süresi**: < 2 dakika (video için)
- **Güven Skoru**: 0-100 arası

## 📊 Performans

### Hedef Performans Değerleri
- **Sayfa Yükleme**: < 3 saniye
- **API Yanıt Süresi**: < 500ms
- **AI Analiz Süresi**: < 2 dakika
- **Hash İşlemi**: < 1ms
- **Sistem Uptime**: > %99.9

### Optimizasyon Teknikleri
- Lazy loading bileşenleri
- Code splitting
- Image optimization
- Caching strategies
- Progressive loading

## 🛡️ Güvenlik ve Gizlilik

### Veri Koruması
- **GDPR Uyumlu**: Avrupa veri koruma standartları
- **KVKK Uyumlu**: Türkiye kişisel verileri koruma
- **ISO 27001**: Bilgi güvenliği yönetim sistemi
- **SOC 2 Type II**: Güvenlik ve kullanılabilirlik

### Gizlilik İlkeleri
- Veri minimizasyonu
- Açık rıza yönetimi
- Unutulma hakkı
- Veri taşınabilirliği
- Tasarım gereği gizlilik

## 📚 Dokümantasyon

Detaylı dokümantasyon için `docs/` klasörüne bakın:

- [Sistem Mimarisi](docs/ARCHITECTURE.md)
- [Algoritma Akışları](docs/ALGORITHM_FLOW.md)
- [Kod Yapısı](docs/CODE_STRUCTURE.md)
- [Güvenlik Mimarisi](docs/SECURITY_ARCHITECTURE.md)
- [SHA-256 Dokümantasyonu](docs/SHA256_DOCUMENTATION.md)
- [Sistem Gereksinimleri](docs/SYSTEM_REQUIREMENTS.md)
- [Kullanıcı Hikayeleri](docs/USER_STORIES.md)
- [Kullanım Senaryoları](docs/USE_CASES.md)
- [Etkileşim Diyagramları](docs/INTERACTION_DIAGRAMS.md)

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Proje Sahibi**: DigiGuard Team
- **E-posta**: info@digiguard.com
- **Website**: https://digiguard.com
- **Destek**: support@digiguard.com

## 🙏 Teşekkürler

Bu projeyi mümkün kılan açık kaynak topluluğuna ve aşağıdaki teknolojilere teşekkürler:

- React ve React Native ekipleri
- TypeScript geliştirici topluluğu
- Expo platformu
- Tailwind CSS
- Vite build tool
- Lucide Icons

---

<div align="center">
  <p><strong>DigiGuard ile dijital kimliğinizi koruyun! 🛡️</strong></p>
  <p>Sahte içeriklere karşı güvenli kalın.</p>
</div>
