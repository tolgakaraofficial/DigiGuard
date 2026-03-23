# DigiGuard - Dijital Kimlik Koruma Platformu

DigiGuard, deepfake ve dijital kimlik hırsızlığına karşı AI destekli, blockchain tabanlı dijital kimlik doğrulama ve koruma platformudur.

## 🚀 Özellikler

### 1. Gelişmiş Kimlik Doğrulama
- AI destekli yüz tanıma sistemi
- Ses analizi ve davranış tanıma
- Çok faktörlü kimlik doğrulama
- Gerçek zamanlı güvenlik kontrolü

### 2. Dijital Güvenlik Sertifikası
- Blockchain tabanlı sertifika sistemi
- NFT teknolojisi ile benzersiz kimlik kanıtı
- QR kod ile hızlı doğrulama
- İndirilebilir ve paylaşılabilir sertifikalar

### 3. Akıllı Profil Yönetimi
- Kişisel bilgi yönetimi
- Güvenlik ayarları kontrol paneli
- Gizlilik tercihleri özelleştirme
- Çoklu cihaz senkronizasyonu

### 4. Tehdit İzleme ve Koruma
- İnternette sahte içerik taraması
- Deepfake tespit sistemi
- Otomatik tehdit engelleme
- 24/7 aktif koruma

### 5. Güvenlik Raporları
- Detaylı güvenlik analizleri
- Kimlik koruma raporları
- Risk değerlendirme skoru
- Trend analizi ve öneriler

### 6. Acil Durum Koruması
- Kimlik hırsızlığı tespit sistemi
- Anında müdahale protokolleri
- Acil destek hattı
- Yasal süreç desteği

## 📱 Kullanıcı Akışı

### 1. Giriş ve Doğrulama
```
Kullanıcı Girişi → E-posta/Telefon Girişi → OTP Doğrulama
```
- Kullanıcı e-posta ve telefon numarası ile giriş yapar
- Sistem her iki kanala da 6 haneli OTP kodu gönderir
- Kullanıcı her iki kodu da doğru girmesi gerekir
- Başarılı doğrulama sonrası kayıt formuna yönlendirilir

### 2. Kimlik Kaydı (4 Adımlı Süreç)

#### Adım 1: Kişisel Bilgiler
- Ad, Soyad
- Doğum Tarihi
- Uyruk
- Adres Bilgileri (Adres, Şehir, Posta Kodu)

#### Adım 2: Kimlik Bilgileri
- Kimlik Türü (TC Kimlik, Pasaport, Ehliyet)
- Kimlik Numarası
- Geçerlilik Tarihleri (Düzenleme/Son Kullanım)
- Düzenleyen Kurum

#### Adım 3: Medya Dosyaları
- **Fotoğraflar**: Farklı açılardan yüz fotoğrafları (min 3)
- **Videolar**: Canlılık testi için video kayıtları (min 1)
- **Ses Kayıtları**: Ses tanıma için ses örnekleri (min 2)

#### Adım 4: Kayıt Tamamlama
- Tüm bilgilerin özeti
- Veri işleme onayı
- Güvenlik sertifikası oluşturma
- Dashboard'a yönlendirme

### 3. Kontrol Merkezi (Dashboard)

#### Ana İstatistikler
- **Kimlik Durumu**: Doğrulama durumu ve yüzdesi
- **Güvenlik Skoru**: 0-100 arası güvenlik puanı
- **Aktif Koruma**: 24/7 koruma durumu
- **Son Kontrol**: En son sistem kontrolü

#### Güvenlik Bildirimleri
- Tespit edilen tehditler
- Engellenen sahte profiller
- Sistem güncellemeleri
- Önemli uyarılar

#### Son Aktiviteler
- Kimlik doğrulama işlemleri
- Güvenlik taramaları
- Profil güncellemeleri
- Cihaz giriş logları

## 🛠 Teknoloji Stack

### Frontend
- **React 18** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenli geliştirme
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Hızlı build tool
- **Lucide React** - İkon kütüphanesi

### Backend (Planlanan)
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - İlişkisel veritabanı
- **Edge Functions** - Serverless fonksiyonlar
- **Row Level Security** - Veri güvenliği

### AI & Blockchain (Planlanan)
- **TensorFlow.js** - Yüz ve ses tanıma
- **OpenCV** - Görüntü işleme
- **Ethereum/Polygon** - Blockchain altyapısı
- **IPFS** - Dağıtık dosya depolama

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build'i önizle
npm run preview
```

## 🌐 Deployment

### Netlify Drop (En Kolay)
1. Projeyi build et: `npm run build`
2. https://app.netlify.com/drop adresine git
3. `dist` klasörünü sürükle bırak

### Netlify CLI
```bash
# Netlify'a giriş yap
npx netlify-cli login

# Deploy et
npx netlify-cli deploy --prod --dir=dist
```

### GitHub Integration
1. Kodu GitHub'a push et: https://github.com/digiguard/digiguard-platform
2. https://app.netlify.com/start adresine git
3. Repository'yi seçip otomatik deploy başlat

### Live Demo
- **Production**: https://digiguard.app
- **Netlify**: https://digiguard.netlify.app
- **GitHub**: https://github.com/digiguard/digiguard-platform

## 📋 Proje Yapısı

```
DigiGuardApp/
├── src/
│   ├── components/
│   │   ├── Layout.tsx              # Ana layout bileşeni
│   │   ├── BetaBanner.tsx          # Beta uyarı banner'ı
│   │   ├── LoginForm.tsx           # Giriş formu
│   │   ├── VerificationForm.tsx    # OTP doğrulama
│   │   ├── RegistrationForm.tsx    # Ana kayıt formu
│   │   ├── PersonalInfoStep.tsx    # Kişisel bilgiler adımı
│   │   ├── IdentityInfoStep.tsx    # Kimlik bilgileri adımı
│   │   ├── MediaUploadStep.tsx     # Medya yükleme adımı
│   │   ├── RegistrationComplete.tsx # Kayıt tamamlama
│   │   └── Dashboard.tsx           # Kontrol merkezi
│   ├── types/
│   │   └── index.ts                # TypeScript tip tanımları
│   ├── App.tsx                     # Ana uygulama
│   ├── main.tsx                    # Giriş noktası
│   └── index.css                   # Global stiller
├── public/                         # Statik dosyalar
└── package.json                    # Proje bağımlılıkları
```

## 🔐 Güvenlik Özellikleri

### Veri Güvenliği
- End-to-end şifreleme
- Güvenli veri saklama
- GDPR uyumlu
- Regular security audits

### Kimlik Doğrulama
- Çok faktörlü doğrulama (MFA)
- Biyometrik kimlik doğrulama
- Davranış analizi
- Canlılık testi

### Blockchain Güvenliği
- Değiştirilemez kayıtlar
- Merkeziyetsiz doğrulama
- Şeffaf işlem geçmişi
- Smart contract koruması

## 🎯 Gelecek Özellikler

- [ ] Mobil uygulama (React Native)
- [ ] API entegrasyonu
- [ ] Blockchain sertifika sistemi
- [ ] AI model eğitimi
- [ ] Çoklu dil desteği
- [ ] Premium üyelik sistemi
- [ ] İşletme çözümleri
- [ ] Developer API

## 📄 Lisans

Bu proje DigiGuard tarafından geliştirilmiştir. Tüm hakları saklıdır.

## 🤝 Destek

Sorularınız için:
- E-posta: support@digiguard.app
- Web: https://digiguard.app
- LinkedIn: https://www.linkedin.com/company/digiguard-official
- GitHub: https://github.com/digiguard/digiguard-platform

## ⚠️ Beta Sürümü

Bu uygulama şu anda beta aşamasındadır. Gerçek kimlik doğrulama ve blockchain entegrasyonu geliştirme aşamasındadır.
