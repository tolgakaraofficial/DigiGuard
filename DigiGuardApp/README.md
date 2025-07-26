# DigiGuard - Dijital Kimlik Koruma Uygulaması

DigiGuard, yapay zeka tabanlı sahte içeriklere karşı kişilerin dijital kimliklerini koruyan mobil uygulamadır.

## Özellikler

- 📱 **Güvenli Giriş**: E-posta ve telefon doğrulaması
- 👤 **Kişisel Bilgiler**: Detaylı profil oluşturma
- 🆔 **Kimlik Doğrulama**: T.C. Kimlik, Pasaport desteği
- 📸 **Medya Yükleme**: Fotoğraf, video ve ses kayıtları
- 🔒 **End-to-End Şifreleme**: Güvenli veri saklama
- 📊 **Kontrol Paneli**: Kimlik durumu takibi

## Kurulum

### Gereksinimler
- Node.js 16+
- Expo CLI
- Android Studio (Android için)
- Xcode (iOS için)

### Geliştirme Ortamı
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start

# Android'de çalıştır
npm run android

# iOS'ta çalıştır
npm run ios
```

### APK Oluşturma
```bash
# EAS Build ile APK oluştur
npm run build:android
```

## Teknolojiler

- **React Native**: Mobil uygulama framework'ü
- **Expo**: Geliştirme ve dağıtım platformu
- **TypeScript**: Tip güvenliği
- **Expo Image Picker**: Medya seçimi
- **Expo AV**: Ses/video işleme
- **React Native Safe Area**: Güvenli alan yönetimi

## Güvenlik

- Tüm veriler end-to-end şifreleme ile korunur
- Medya dosyaları güvenli şekilde saklanır
- Kişisel bilgiler üçüncü taraflarla paylaşılmaz
- KVKK ve GDPR uyumlu veri işleme

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.