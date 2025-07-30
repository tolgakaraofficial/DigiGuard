# DigiGuard - Dizin Yapısı ve Uygulama Özeti

## 📁 Proje Dizin Yapısı

```
DigiGuard/
├── 🌐 Web Uygulaması (React + TypeScript)
│   ├── src/
│   │   ├── components/           # UI Bileşenleri
│   │   │   ├── Layout.tsx       # Ana layout wrapper
│   │   │   ├── LoginForm.tsx    # Giriş formu
│   │   │   ├── VerificationForm.tsx  # Doğrulama formu
│   │   │   ├── RegistrationForm.tsx  # Kayıt formu
│   │   │   ├── PersonalInfoStep.tsx  # Kişisel bilgi adımı
│   │   │   ├── IdentityInfoStep.tsx  # Kimlik bilgi adımı
│   │   │   ├── MediaUploadStep.tsx   # Medya yükleme adımı
│   │   │   ├── RegistrationComplete.tsx # Kayıt tamamlama
│   │   │   ├── Dashboard.tsx    # Ana kontrol paneli
│   │   │   └── HashDemo.tsx     # SHA-256 demo bileşeni
│   │   │
│   │   ├── types/               # TypeScript Tip Tanımları
│   │   │   └── index.ts        # Ortak tipler (User, PersonalInfo, vb.)
│   │   │
│   │   ├── utils/              # Yardımcı Fonksiyonlar
│   │   │   └── sha256.ts       # SHA-256 hash utilities
│   │   │
│   │   ├── services/           # İş Mantığı Servisleri
│   │   │   └── HashService.ts  # Hash yönetim servisi
│   │   │
│   │   ├── App.tsx             # Ana uygulama bileşeni
│   │   ├── main.tsx            # Giriş noktası
│   │   └── index.css           # Global stiller (Tailwind)
│   │
│   ├── public/                 # Statik dosyalar
│   ├── package.json           # Web bağımlılıkları
│   ├── tsconfig.json          # TypeScript konfigürasyonu
│   ├── vite.config.ts         # Vite build konfigürasyonu
│   ├── tailwind.config.js     # Tailwind CSS konfigürasyonu
│   ├── postcss.config.js      # PostCSS konfigürasyonu
│   └── index.html             # Ana HTML dosyası
│
├── 📱 Mobil Uygulama (React Native + Expo)
│   ├── DigiGuardApp/
│   │   ├── components/         # Mobil UI Bileşenleri
│   │   │   ├── Layout.tsx     # Mobil layout
│   │   │   ├── LoginForm.tsx  # Mobil giriş formu
│   │   │   ├── VerificationForm.tsx # Mobil doğrulama
│   │   │   ├── RegistrationForm.tsx # Mobil kayıt
│   │   │   ├── PersonalInfoStep.tsx # Mobil kişisel bilgi
│   │   │   ├── IdentityInfoStep.tsx # Mobil kimlik bilgi
│   │   │   ├── MediaUploadStep.tsx  # Mobil medya yükleme
│   │   │   ├── RegistrationComplete.tsx # Mobil kayıt tamamlama
│   │   │   └── Dashboard.tsx  # Mobil kontrol paneli
│   │   │
│   │   ├── types/             # Mobil tip tanımları
│   │   │   └── index.ts      # Mobil ortak tipler
│   │   │
│   │   ├── App.tsx           # Mobil ana uygulama
│   │   ├── app.json          # Expo konfigürasyonu
│   │   ├── package.json      # Mobil bağımlılıkları
│   │   ├── tsconfig.json     # Mobil TypeScript config
│   │   ├── index.ts          # Mobil giriş noktası
│   │   └── README.md         # Mobil uygulama dokümantasyonu
│
├── 📚 Dokümantasyon
│   ├── docs/
│   │   ├── ARCHITECTURE.md          # Sistem mimarisi
│   │   ├── ALGORITHM_FLOW.md        # Algoritma akış diyagramları
│   │   ├── CODE_STRUCTURE.md        # Kod yapısı dokümantasyonu
│   │   ├── INTERACTION_DIAGRAMS.md  # Sistem etkileşim diyagramları
│   │   ├── SECURITY_ARCHITECTURE.md # Güvenlik mimarisi
│   │   ├── SHA256_DOCUMENTATION.md  # SHA-256 dokümantasyonu
│   │   ├── SYSTEM_REQUIREMENTS.md   # Sistem gereksinimleri
│   │   ├── USER_STORIES.md          # Kullanıcı hikayeleri
│   │   └── USE_CASES.md             # Kullanım senaryoları
│
└── README.md                        # Ana proje dokümantasyonu
```

## 🎯 Uygulama Özeti

### DigiGuard - Dijital Kimlik Koruma Sistemi

DigiGuard, yapay zeka tabanlı sahte içeriklere karşı kişilerin dijital kimliklerini koruyan çok platformlu bir güvenlik uygulamasıdır.

### 🌟 Ana Özellikler

#### 1. **Çok Faktörlü Kimlik Doğrulama**
- E-posta ve SMS OTP doğrulama
- Biyometrik doğrulama (yüz ve ses tanıma)
- Cihaz parmak izi kontrolü
- Güvenli session yönetimi

#### 2. **AI Tabanlı Sahte İçerik Tespiti**
- Deepfake video tespiti
- Sahte ses kayıtları analizi
- Manipüle edilmiş fotoğraf tespiti
- Metadata analizi
- Ensemble skorlama sistemi

#### 3. **End-to-End Güvenlik**
- AES-256 veri şifreleme
- RSA-2048 anahtar değişimi
- SHA-256 hash algoritması
- PBKDF2 parola türetme
- HMAC dijital imzalama

#### 4. **Blockchain Sertifika Sistemi**
- X.509 standart dijital sertifikalar
- Blockchain hash kayıtları
- QR kod ile doğrulama
- Uluslararası geçerlilik

### 🏗️ Teknik Mimari

#### **Frontend Teknolojileri**
- **Web**: React 18 + TypeScript + Vite + Tailwind CSS
- **Mobil**: React Native + Expo + TypeScript
- **UI Kütüphanesi**: Lucide React (iconlar)
- **Styling**: Tailwind CSS (responsive tasarım)

#### **Güvenlik Katmanları**
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

### 📊 Dosya İstatistikleri

#### **Web Uygulaması**
- **Toplam Bileşen**: 9 React bileşeni
- **Utility Dosyaları**: 2 (SHA-256, Hash Service)
- **Tip Tanımları**: 1 (ortak tipler)
- **Konfigürasyon**: 6 dosya

#### **Mobil Uygulama**
- **Toplam Bileşen**: 9 React Native bileşeni
- **Platform**: Expo managed workflow
- **Desteklenen Platformlar**: iOS 13+, Android 8+

#### **Dokümantasyon**
- **Teknik Dokümantasyon**: 9 detaylı MD dosyası
- **Toplam Sayfa**: ~50+ sayfa dokümantasyon
- **Diyagram**: 15+ sistem diyagramı

### 🔐 Güvenlik Özellikleri

#### **Şifreleme Algoritmaları**
- **Simetrik**: AES-256-GCM
- **Asimetrik**: RSA-2048-OAEP
- **Hash**: SHA-256, HMAC-SHA256
- **Anahtar Türetme**: PBKDF2 (100,000 iterasyon)

#### **AI Güvenlik Modelleri**
- **Yüz Tanıma**: FaceNet, ArcFace
- **Ses Analizi**: i-vector, x-vector
- **Deepfake Tespiti**: EfficientNet-B4, Xception
- **Ensemble Skorlama**: Ağırlıklı oylama sistemi

### 🚀 Kullanıcı Akışı

```
Giriş → OTP Doğrulama → Biyometrik → Kayıt → Medya Yükleme → AI Analiz → Sertifika → Dashboard
```

### 📱 Platform Desteği

#### **Web Uygulaması**
- Modern tarayıcılar (Chrome, Firefox, Safari, Edge)
- Responsive tasarım (mobil, tablet, desktop)
- PWA desteği

#### **Mobil Uygulama**
- iOS 13+ (iPhone, iPad)
- Android 8+ (API level 26+)
- Expo Go ile test desteği

### 🔧 Geliştirme Araçları

- **Build Tool**: Vite (web), Expo (mobil)
- **Linting**: ESLint + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, Expo Vector Icons
- **State Management**: React Hooks (useState, useEffect)

### 📈 Performans Hedefleri

- **Sayfa Yükleme**: < 3 saniye
- **API Yanıt**: < 500ms
- **AI Analiz**: < 2 dakika
- **Hash İşlemi**: < 1ms
- **Uptime**: > %99.9

Bu yapı, DigiGuard'ın güvenli, ölçeklenebilir ve kullanıcı dostu bir dijital kimlik koruma sistemi olarak tasarlandığını göstermektedir.