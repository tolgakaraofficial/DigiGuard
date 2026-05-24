# DigiGuard - Dijital Kimlik Guvenlik ve Dogrulama Platformu
## Karprime Technology INC.

---

## Proje Ozeti

DigiGuard, bireylerin ve kuruluslarin dijital kimliklerini guvence altina alan, blockchain tabanli biyometrik KYC (Musterinizi Tanıyın) guvenlik sistemidir. Kisi ve kurumlarin kimlik dogrulama sureclerini otomatiklestirir, dijital varliklarini 7/24 izler ve ihlalleri aninda tespit eder.

---

## Temel Ozellikler

### 1. Biyometrik Kimlik Dogrulama
- **Yuz Tanima**: Yuz fotograflari ile canlilik dogrulamasi
- **Ses Tanima**: Ses kaydi ile kimlik dogrulamasi
- **Video Dogrulama**: Gercek zamanli canlilik kontrolu
- **Cok Faktorlu Dogrulama (MFA)**: E-posta + SMS + biyometrik katmanlar

### 2. Blockchain Sertifika Sistemi
- Degistirilemez blockchain kaydi (Ethereum Mainnet)
- AES-256 + SHA-256 + RSA-4096 sifreleme
- PDF formatinda premium sertifika uretimi
- Benzersiz sertifika numarasi (DG-YYYY-MM-KOD)
- Blockchain hash ile dogrulanabilirlik
- Zaman damgasi (UTC+3 Istanbul)

### 3. 7/24 Dijital Izleme ve Ihlal Tespiti
- **15 Platform Tarama**: Google, Bing, Yandex, Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Dark Web, Veri Ihlali Veritabanlari, Gorsel Arama Motorlari, Belge Arsivleri, Kamu Kayitlari
- **Ihlal Turleri**: Yetkisiz gorsel kullanimi, Sahte profil, Kimlik hirsizligi, Sertifika sahteciligi, Deepfake tespiti, Veri ihlali
- **Ciddiyet Seviyeleri**: Dusuk, Orta, Yuksek, Kritik
- **Guven Skoru**: 0-100% arasi tespit hassasiyeti

### 4. Konum Takip Sistemi
- **Kisi Takibi**: GSM baz istasyonu, GPS konum, konum gecmisi
- **Cipli Varlik Takibi**: Hayvan, nesne, arac takibi
- **Gercek Zamanli**: Anlik konum guncelleme
- **Cografya Sinirlama (Geofencing)**: Belirli yaricap icindeki varlik sorgulama
- **Konum Gecmisi**: 100 kayda kadar tarihsel konum verisi

### 5. Merkezi Izleme Paneli (ALBIS AI)
- Yapay zeka destekli 7/24 sistem izleme
- Otomatik tehdit analizi ve mudahale
- Sistem sagligi raporlama
- Gercek zamanli guvenlik metrikleri
- Anormallik tespiti ve otomatik bildirim

### 6. Analitik ve Raporlama
- Kullanici istatistikleri (bireysel, kurumsal, personel)
- Sehir bazli dagilim haritasi (20+ Turkiye sehri)
- Haftalik aktivite grafikleri
- Guvenlik skoru takibi
- Sistem performans gostergeleri

---

## Kullanici Tipleri

| Tip | Aciklama |
|-----|----------|
| **Bireysel** | Kisi bazli kimlik dogrulama ve koruma |
| **Kurumsal** | Sirket bazli kayit, yetkili kisi dogrulama |
| **Personel** | Kurum ici calisan kimlik yonetimi |

---

## Guvenlik Altyapisi

### Veri Guvenligi
- AES-256-GCM sifreleme ile hassas veri saklama
- SHA-256 hashing
- RSA-4096 sertifika imzalama
- Satir Seviyesi Guvenlik (RLS) ile veri izolasyonu
- Kullanici basina sifrelenmis veri kasasi

### Guvenlik Onlemleri
- SQL enjeksiyonu korumasi (uygulama + veritabani seviyesi)
- XSS saldirisi onleme
- CSRF koruma cercevesi
- Endpoint bazli rate limiting (dk basina istek siniri)
- 24 saatlik oturum suresi ile guvenli oturum yonetimi
- IP adresi ve kullanici araci izleme
- Tum islemlerin denetim gunlugu

### Sifre Politikasi
- Minimum 8 karakter
- Buyuk/kucuk harf, rakam, ozel karakter zorunlulugu
- Detayli sifre dogrulama mesajlari

---

## Odeme ve Abonelik Sistemi

### Odeme Yontemleri
| Yontem | Detay |
|--------|-------|
| **MetaMask (Kripto)** | ETH cuzdan baglantisi, bakiye kontrolu, islem imzalama |
| **Kredi Karti** | Visa, Mastercard, Amex, Discover, JCB, UnionPay, Diners |
| **Banka Transferi** | Havale/EFT destegi |

### Abonelik Planlari
| Plan | Hedef Kitle |
|------|-------------|
| **Bireysel** | Kullanicilar icin temel koruma |
| **Profesyonel** | Kucuk/isletme kullanici |
| **Kurumsal** | Buyuk olcekli sirketler |

### Odeme Guvenligi
- Luhn algoritmasi ile kart dogrulama
- PCI uyumlulugu (son 4 hane saklama)
- Dk basina 10 odeme denemesi siniri
- Islem gecmisi ve makbuz takibi

---

## Bildirim Sistemi

| Kategori | Kanal | Icerik |
|----------|-------|--------|
| Kayit | E-posta + SMS | Hosgeldin mesaji, hesap onayi |
| Giris | E-posta + SMS | Giris zamani, IP adresi, guvenlik uyarisi |
| Odeme | E-posta + SMS | Odeme onayi, makbuz, fatura |
| Guvenlik | E-posta + SMS | Supheli aktivite, yetkisiz erisim |
| Sistem | E-posta + SMS | Genel sistem bildirimleri |

---

## Teknoloji Yigini

| Katman | Teknoloji |
|--------|-----------|
| **Web On Yuz** | React 18.3 + TypeScript + Vite |
| **Mobil Uygulama** | React Native + Expo (iOS/Android) |
| **Veritabani** | Supabase (PostgreSQL) |
| **Stil** | Tailwind CSS (Ozel tema) |
| **PDF Uretimi** | jsPDF |
| **Blokzincir** | Ethereum Mainnet (Simulasyon) |
| **Kripto Odeme** | MetaMask Entegrasyonu |
| **Guvenlik** | AES-256 + SHA-256 + RSA-4096 |
| **Ikil Dil** | Turkce / Ingilizce |

---

## Veritabani Semasi

### Cekirdek Tablolar
- **Kullanicilar**: E-posta, telefon, ad, cuzdan adresi
- **Kullanici Profilleri**: Kullanici tipi, rol
- **Bireysel Kayitlar**: Kisisel bilgi, kimlik belgesi, medya URL
- **Kurumsal Kayitlar**: Sirket bilgisi, yetkili kisi, belgeler

### Guvenlik Tablolari
- **Denetim Gunlugu**: Tum islem kayitlari (IP, kullanici araci)
- **Guvenlik Olaylari**: 9 olay tipi, 4 ciddiyet seviyesi
- **Rate Limiting**: Endpoint bazli istek sinirlama
- **Oturum Tokenlari**: Guvenli oturum yonetimi
- **Sifrelenmis Veri**: Hassas veri sifreleme kasasi

### Izleme Tablolari
- **Kimlik Taramalari**: Tarama oturumlari, kaynak takibi
- **Kimlik Ihlalleri**: Tespit edilen ihlaller, kanitlar
- **Tarama Raporlari**: Toplu tarama sonuclari

### Takip Tablolari
- **Kisi Takibi**: Konum verisi, baz istasyonu
- **Cipli Varliklar**: Cip kodu, esya bilgisi, son gorulme
- **Konum Gecmisi**: Tarihsel konum kayitlari

### Finansal Tablolar
- **Abonelikler**: Plan, durum, faturalama donemi
- **Odemeler**: Islem gecmisi, yontem, durum
- **Faturalar**: Fatura uretimi, PDF, odeme takibi
- **Cuzdan Baglantisi**: MetaMask cuzdan izleme

---

## Kullanim Senaryolari

### Bireysel Kullanicilar
- Dijital kimlik hirsizligina karsi koruma
- Sosyal medya sahte profil tespiti
- Kisisel veri ihlali uyarilari
- Blockchain sertifikasi ile kimlik kanitlama

### Kurumsal Musteriler
- Calisan kimlik dogrulama
- Musteri KYC uyumlulugu
- Sirket varliklarinin dijital izleme
- Duzenleyici uyumluluk raporlama

### Kamu Kurumlari
- Vatandas kimlik dogrulama
- Belge sahteciligi tespiti
- Guvenlik ihlali izleme
- Sehir bazli istatistik ve raporlama

---

## Proje Kapsamindaki Moduller

1. **Giris ve Dogrulama**: E-posta/telefon ile guvenli giris, OTP dogrulama
2. **Kayit Sistemi**: Cok adimli kayit (kisisel bilgi, kimlik, medya, tamamlama)
3. **Kontrol Paneli**: Merkezi yonetim, istatistikler, hizli erisim
4. **Izleme Paneli**: 15 platform tarama, ihlal tespiti, raporlama
5. **Takip Paneli**: Kisi ve cipli varlik konum takibi
6. **Guvenlik Paneli**: Denetim gunlugu, guvenlik olaylari, sifre yonetimi
7. **Bildirim Merkezi**: Cok kanalli bildirim sistemi
8. **Odeme Sistemi**: Kripto + kart + banka odeme, abonelik yonetimi
9. **Sertifika Sistemi**: PDF sertifika uretimi, blockchain dogrulama
10. **Analitik Panel**: Grafikler, istatistikler, sehir dagilimi
11. **Mobil Uygulama**: iOS/Android uyumlu mobil deneyim

---

## Rekabet Avantajlari

- **Blockchain Tabanli**: Degistirilemez kimlik kaydi
- **Biyometrik KYC**: Yuz, ses, video cok katmanli dogrulama
- **7/24 AI Izleme**: ALBIS yapay zeka ile surekli koruma
- **15 Platform Tarama**: En genis dijital ayak izi izleme
- **Cip Takibi**: Fiziksel varliklar icin IoT entegrasyonu
- **Kripto Odeme**: Web3 ekosistem uyumlulugu
- **Cok Dilli**: Turkce/Ingilizce destegi
- **Mobil + Web**: Tum cihazlarda kesintisiz deneyim

---

## Iletisim

**Karprime Technology INC.**
- Web: digiguard.app
- E-posta: info@karprime.com
- Sosyal Medya: YouTube, LinkedIn, Twitter/X, Instagram, Facebook

---

*DigiGuard - Dijital kimliginiz, guvenliginiz.*
