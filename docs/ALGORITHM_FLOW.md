# DigiGuard - Algoritma Akış Diagramları

## 🔄 Ana Algoritma Akışları

### 1. Kullanıcı Kayıt Algoritması

```mermaid
graph TD
    A[Başlangıç] --> B[Email & Telefon Girişi]
    B --> C{Geçerli Format?}
    C -->|Hayır| B
    C -->|Evet| D[OTP Kodları Gönder]
    D --> E[Kullanıcı OTP Girişi]
    E --> F{Kodlar Doğru?}
    F -->|Hayır| G{Deneme < 3?}
    G -->|Evet| E
    G -->|Hayır| H[Hesap Bloke]
    F -->|Evet| I[Kişisel Bilgi Formu]
    I --> J[Kimlik Bilgileri]
    J --> K[Medya Dosyası Yükleme]
    K --> L[AI Analiz Başlat]
    L --> M{Sahte İçerik?}
    M -->|Evet| N[Kayıt Reddi]
    M -->|Hayır| O[Sertifika Oluştur]
    O --> P[Profil Aktif]
    P --> Q[Son]
    H --> Q
    N --> Q
```

### 2. AI Sahte İçerik Tespit Algoritması

```mermaid
graph TD
    A[Medya Dosyası] --> B[Ön İşleme]
    B --> C[Özellik Çıkarımı]
    C --> D[Yüz Tanıma Modeli]
    C --> E[Ses Analiz Modeli]
    C --> F[Metadata Analizi]
    C --> G[Deepfake Detector]
    
    D --> H[Skor 1]
    E --> I[Skor 2]
    F --> J[Skor 3]
    G --> K[Skor 4]
    
    H --> L[Ağırlıklı Skorlama]
    I --> L
    J --> L
    K --> L
    
    L --> M{Skor > Eşik?}
    M -->|Evet| N[Otantik]
    M -->|Hayır| O[Sahte Şüphesi]
    
    N --> P[Güvenlik Sertifikası]
    O --> Q[Risk Raporu]
```

### 3. Güvenlik Doğrulama Akışı

```mermaid
graph TD
    A[Giriş Talebi] --> B[Email Doğrulama]
    B --> C[SMS Doğrulama]
    C --> D[Biyometrik Doğrulama]
    D --> E{Tüm Doğrulamalar OK?}
    E -->|Hayır| F[Erişim Reddi]
    E -->|Evet| G[JWT Token Oluştur]
    G --> H[Session Başlat]
    H --> I[Güvenlik Logları]
    I --> J[Dashboard Erişimi]
    F --> K[Güvenlik Uyarısı]
```

## 🔐 Şifreleme Algoritması Akışı

### Veri Şifreleme Süreci

```mermaid
graph LR
    A[Ham Veri] --> B[AES-256 Anahtar Üret]
    B --> C[Veri Şifreleme]
    C --> D[RSA ile Anahtar Şifreleme]
    D --> E[HMAC İmza]
    E --> F[Güvenli Depolama]
    
    G[Veri Okuma] --> H[RSA ile Anahtar Çözme]
    H --> I[AES ile Veri Çözme]
    I --> J[HMAC Doğrulama]
    J --> K{İmza Geçerli?}
    K -->|Evet| L[Veri Döndür]
    K -->|Hayır| M[Güvenlik Uyarısı]
```

## 📊 Performans Optimizasyon Algoritması

### Önbellek Yönetimi

```mermaid
graph TD
    A[Veri İsteği] --> B{Önbellekte Var?}
    B -->|Evet| C{Güncel mi?}
    C -->|Evet| D[Önbellekten Döndür]
    C -->|Hayır| E[Veritabanından Getir]
    B -->|Hayır| E
    E --> F[Önbelleğe Kaydet]
    F --> G[TTL Ayarla]
    G --> H[Veri Döndür]
    D --> I[Hit Count Artır]
    H --> J[Miss Count Artır]
```

## 🚨 Güvenlik Monitoring Algoritması

### Tehdit Tespiti

```mermaid
graph TD
    A[Kullanıcı Aktivitesi] --> B[Davranış Analizi]
    B --> C{Anormal Davranış?}
    C -->|Hayır| D[Normal İşlem]
    C -->|Evet| E[Risk Skoru Hesapla]
    E --> F{Risk > Eşik?}
    F -->|Hayır| G[Uyarı Logla]
    F -->|Evet| H[Hesap Geçici Bloke]
    H --> I[Admin Bildirimi]
    I --> J[Manuel İnceleme]
    J --> K{Meşru Aktivite?}
    K -->|Evet| L[Hesap Aktif Et]
    K -->|Hayır| M[Kalıcı Bloke]
```

## 🔄 Sistem Sağlık Kontrolü

### Health Check Algoritması

```mermaid
graph TD
    A[Sistem Başlat] --> B[Veritabanı Kontrolü]
    B --> C{DB Bağlantısı OK?}
    C -->|Hayır| D[Hata Logla]
    C -->|Evet| E[API Endpoint Kontrolü]
    E --> F{API Yanıt Veriyor?}
    F -->|Hayır| G[Servis Restart]
    F -->|Evet| H[Bellek Kullanımı]
    H --> I{Bellek < %80?}
    I -->|Hayır| J[Garbage Collection]
    I -->|Evet| K[Disk Alanı Kontrolü]
    K --> L{Disk < %90?}
    L -->|Hayır| M[Temizlik İşlemi]
    L -->|Evet| N[Sistem Sağlıklı]
    
    D --> O[Admin Uyarısı]
    G --> O
    J --> P[Performans Optimizasyonu]
    M --> P
```

## 📈 Analitik ve Raporlama

### Kullanım İstatistikleri

```mermaid
graph TD
    A[Kullanıcı Etkileşimi] --> B[Event Tracking]
    B --> C[Veri Toplama]
    C --> D[Veri Temizleme]
    D --> E[Analiz Motoru]
    E --> F[Trend Analizi]
    F --> G[Rapor Oluşturma]
    G --> H[Dashboard Güncelleme]
    H --> I[Otomatik Uyarılar]
    I --> J{Anormal Trend?}
    J -->|Evet| K[Admin Bildirimi]
    J -->|Hayır| L[Rutin Rapor]
```

Bu algoritma akışları, DigiGuard sisteminin her bir bileşeninin nasıl çalıştığını ve birbirleriyle nasıl etkileşim kurduğunu göstermektedir.