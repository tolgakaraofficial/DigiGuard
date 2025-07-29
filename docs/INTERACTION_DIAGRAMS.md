# DigiGuard - Sistem Etkileşim Diyagramları

## 🔄 Etkileşim Diyagramları Koleksiyonu

### 1. Kullanıcı Kayıt Süreci - Sequence Diagram

```mermaid
sequenceDiagram
    participant U as Kullanıcı
    participant UI as Web/Mobile UI
    participant API as Backend API
    participant DB as Veritabanı
    participant EMAIL as E-posta Servisi
    participant SMS as SMS Servisi
    participant AI as AI Analiz Motoru
    participant BC as Blockchain
    participant CRYPTO as Şifreleme Servisi
    
    Note over U,CRYPTO: Kullanıcı Kayıt Süreci
    
    U->>UI: Kayıt formunu doldur
    UI->>API: POST /api/auth/register
    API->>DB: Kullanıcı varlık kontrolü
    DB-->>API: Kullanıcı mevcut değil
    
    API->>EMAIL: OTP kodu gönder
    API->>SMS: OTP kodu gönder
    EMAIL-->>U: E-posta OTP
    SMS-->>U: SMS OTP
    
    U->>UI: OTP kodlarını gir
    UI->>API: POST /api/auth/verify-otp
    API->>DB: OTP kodlarını doğrula
    DB-->>API: Doğrulama başarılı
    
    U->>UI: Kişisel bilgileri gir
    UI->>API: POST /api/user/personal-info
    API->>CRYPTO: Verileri şifrele
    CRYPTO-->>API: Şifrelenmiş veri
    API->>DB: Kişisel bilgileri kaydet
    
    U->>UI: Kimlik bilgilerini gir
    UI->>API: POST /api/user/identity-info
    API->>CRYPTO: Kimlik verilerini şifrele
    API->>DB: Kimlik bilgilerini kaydet
    
    U->>UI: Medya dosyalarını yükle
    UI->>API: POST /api/media/upload
    API->>AI: Sahte içerik analizi başlat
    
    par Paralel AI Analizi
        AI->>AI: Yüz tanıma analizi
        AI->>AI: Ses analizi
        AI->>AI: Metadata analizi
        AI->>AI: Deepfake tespiti
    end
    
    AI-->>API: Analiz sonuçları
    
    alt Analiz Başarılı
        API->>CRYPTO: Medya dosyalarını şifrele
        API->>DB: Şifrelenmiş medyayı kaydet
        API->>BC: Hash değerlerini kaydet
        BC-->>API: Blockchain kaydı başarılı
        API->>API: Güvenlik sertifikası oluştur
        API-->>UI: Kayıt başarılı
        UI-->>U: Hoşgeldin mesajı
    else Analiz Başarısız
        API-->>UI: Sahte içerik tespit edildi
        UI-->>U: Kayıt reddedildi
    end
```

### 2. Çok Faktörlü Giriş Süreci - Activity Diagram

```mermaid
graph TD
    A[Giriş Sayfası] --> B[E-posta/Telefon Gir]
    B --> C{Format Kontrolü}
    C -->|Geçersiz| D[Hata Mesajı Göster]
    D --> B
    C -->|Geçerli| E[Veritabanı Kontrolü]
    E --> F{Kullanıcı Var?}
    F -->|Hayır| G[Kullanıcı Bulunamadı]
    G --> B
    F -->|Evet| H[1. Faktör: Bilgi Doğrulama]
    H --> I{Bilgiler Doğru?}
    I -->|Hayır| J{Deneme Sayısı < 3?}
    J -->|Evet| B
    J -->|Hayır| K[Hesap Geçici Bloke]
    I -->|Evet| L[2. Faktör: OTP Gönder]
    L --> M[E-posta OTP]
    L --> N[SMS OTP]
    M --> O[Kullanıcı OTP Girer]
    N --> O
    O --> P{OTP Doğru?}
    P -->|Hayır| Q{OTP Deneme < 3?}
    Q -->|Evet| O
    Q -->|Hayır| R[OTP Bloke]
    P -->|Evet| S[3. Faktör: Biyometrik]
    S --> T{Biyometrik Mevcut?}
    T -->|Hayır| U[Alternatif Doğrulama]
    T -->|Evet| V[Yüz/Ses Tanıma]
    V --> W{Biyometrik Doğru?}
    W -->|Hayır| U
    W -->|Evet| X[JWT Token Oluştur]
    U --> X
    X --> Y[Session Başlat]
    Y --> Z[Dashboard'a Yönlendir]
    K --> AA[Bloke Bildirimi]
    R --> AA
```

### 3. AI Sahte İçerik Tespit Süreci - Collaboration Diagram

```mermaid
graph TB
    subgraph "Kullanıcı Katmanı"
        U[Kullanıcı]
        UI[Web/Mobile Interface]
    end
    
    subgraph "Uygulama Katmanı"
        API[Backend API]
        QUEUE[İşlem Kuyruğu]
        CACHE[Redis Cache]
    end
    
    subgraph "AI Analiz Katmanı"
        PREPROCESS[Ön İşleme Modülü]
        FACE[Yüz Tanıma AI]
        VOICE[Ses Analiz AI]
        META[Metadata Analiz]
        DEEP[Deepfake Tespit AI]
        ENSEMBLE[Ensemble Skorlama]
    end
    
    subgraph "Veri Katmanı"
        DB[(Veritabanı)]
        STORAGE[(Dosya Depolama)]
        BC[(Blockchain)]
    end
    
    U -->|1: Medya Yükle| UI
    UI -->|2: Upload Request| API
    API -->|3: Dosya Kaydet| STORAGE
    API -->|4: İşlem Kuyruğa Ekle| QUEUE
    QUEUE -->|5: Analiz Başlat| PREPROCESS
    
    PREPROCESS -->|6a: Yüz Çıkar| FACE
    PREPROCESS -->|6b: Ses Çıkar| VOICE
    PREPROCESS -->|6c: Meta Çıkar| META
    PREPROCESS -->|6d: Frame Çıkar| DEEP
    
    FACE -->|7a: Yüz Skoru| ENSEMBLE
    VOICE -->|7b: Ses Skoru| ENSEMBLE
    META -->|7c: Meta Skoru| ENSEMBLE
    DEEP -->|7d: Deepfake Skoru| ENSEMBLE
    
    ENSEMBLE -->|8: Final Skor| API
    API -->|9: Sonuç Kaydet| DB
    API -->|10: Hash Kaydet| BC
    API -->|11: Cache Güncelle| CACHE
    API -->|12: Sonuç Döndür| UI
    UI -->|13: Sonuç Göster| U
```

### 4. Blockchain Sertifika Oluşturma - State Diagram

```mermaid
stateDiagram-v2
    [*] --> Başlatıldı
    Başlatıldı --> VeriToplama: Sertifika İsteği
    VeriToplama --> VeriDoğrulama: Veriler Toplandı
    VeriDoğrulama --> VeriHazırlama: Doğrulama Başarılı
    VeriDoğrulama --> Hata: Doğrulama Başarısız
    VeriHazırlama --> SertifikaOluşturma: Veriler Hazır
    SertifikaOluşturma --> Dijitalİmza: Sertifika Oluşturuldu
    Dijitalİmza --> BlockchainKayıt: İmza Eklendi
    BlockchainKayıt --> QRKodOluşturma: Blockchain'e Kaydedildi
    QRKodOluşturma --> Tamamlandı: QR Kod Oluşturuldu
    Tamamlandı --> [*]
    
    Hata --> [*]: Hata Mesajı
    
    note right of VeriToplama
        - Kullanıcı bilgileri
        - Doğrulama durumu
        - Güvenlik seviyesi
    end note
    
    note right of BlockchainKayıt
        - Hash hesaplama
        - Transaction oluşturma
        - Network'e gönderme
    end note
```

### 5. Güvenlik Monitoring Sistemi - Component Diagram

```mermaid
graph TB
    subgraph "Monitoring Sistemi"
        subgraph "Veri Toplama"
            LOG[Log Collector]
            METRIC[Metrics Collector]
            EVENT[Event Listener]
        end
        
        subgraph "Analiz Motoru"
            ANOMALY[Anomaly Detector]
            PATTERN[Pattern Analyzer]
            RISK[Risk Calculator]
            ML[ML Predictor]
        end
        
        subgraph "Uyarı Sistemi"
            ALERT[Alert Manager]
            NOTIFY[Notification Service]
            ESCALATE[Escalation Engine]
        end
        
        subgraph "Dashboard"
            REALTIME[Real-time Monitor]
            REPORT[Report Generator]
            VISUAL[Visualization]
        end
    end
    
    subgraph "Veri Kaynakları"
        APP[Uygulama Logları]
        DB[Veritabanı Logları]
        NET[Network Trafiği]
        USER[Kullanıcı Aktiviteleri]
    end
    
    subgraph "Harici Sistemler"
        EMAIL[E-posta Servisi]
        SMS[SMS Servisi]
        SLACK[Slack Integration]
        SIEM[SIEM Sistemi]
    end
    
    APP --> LOG
    DB --> LOG
    NET --> METRIC
    USER --> EVENT
    
    LOG --> ANOMALY
    METRIC --> PATTERN
    EVENT --> RISK
    
    ANOMALY --> ML
    PATTERN --> ML
    RISK --> ML
    
    ML --> ALERT
    ALERT --> NOTIFY
    ALERT --> ESCALATE
    
    NOTIFY --> EMAIL
    NOTIFY --> SMS
    NOTIFY --> SLACK
    ESCALATE --> SIEM
    
    ANOMALY --> REALTIME
    PATTERN --> REPORT
    RISK --> VISUAL
```

### 6. Medya İşleme Pipeline - Data Flow Diagram

```mermaid
graph LR
    subgraph "Giriş Katmanı"
        INPUT[Medya Dosyası]
        VALIDATE[Format Doğrulama]
        SCAN[Virüs Tarama]
    end
    
    subgraph "İşleme Katmanı"
        EXTRACT[Özellik Çıkarımı]
        COMPRESS[Sıkıştırma]
        ENCRYPT[Şifreleme]
    end
    
    subgraph "Analiz Katmanı"
        AI_FACE[Yüz Analizi]
        AI_VOICE[Ses Analizi]
        AI_META[Metadata Analizi]
        AI_DEEP[Deepfake Analizi]
    end
    
    subgraph "Depolama Katmanı"
        STORAGE[Güvenli Depolama]
        BACKUP[Yedekleme]
        INDEX[İndeksleme]
    end
    
    subgraph "Çıkış Katmanı"
        RESULT[Analiz Sonucu]
        CERT[Sertifika]
        HASH[Blockchain Hash]
    end
    
    INPUT --> VALIDATE
    VALIDATE --> SCAN
    SCAN --> EXTRACT
    
    EXTRACT --> COMPRESS
    COMPRESS --> ENCRYPT
    
    EXTRACT --> AI_FACE
    EXTRACT --> AI_VOICE
    EXTRACT --> AI_META
    EXTRACT --> AI_DEEP
    
    ENCRYPT --> STORAGE
    STORAGE --> BACKUP
    STORAGE --> INDEX
    
    AI_FACE --> RESULT
    AI_VOICE --> RESULT
    AI_META --> RESULT
    AI_DEEP --> RESULT
    
    RESULT --> CERT
    CERT --> HASH
```

### 7. Kullanıcı Session Yönetimi - Timing Diagram

```mermaid
sequenceDiagram
    participant U as Kullanıcı
    participant C as Client App
    participant A as Auth Service
    participant S as Session Store
    participant R as Resource Server
    
    Note over U,R: Session Başlatma
    U->>C: Giriş yap
    C->>A: Login request
    A->>A: Kimlik doğrula
    A->>S: Session oluştur
    S-->>A: Session ID
    A-->>C: JWT Token + Session ID
    C-->>U: Giriş başarılı
    
    Note over U,R: Kaynak Erişimi
    U->>C: Korumalı kaynak iste
    C->>R: Request + JWT Token
    R->>A: Token doğrula
    A->>S: Session kontrol et
    S-->>A: Session geçerli
    A-->>R: Token geçerli
    R-->>C: Kaynak verisi
    C-->>U: Veri göster
    
    Note over U,R: Token Yenileme
    loop Her 15 dakikada
        C->>A: Token yenile
        A->>S: Session kontrol et
        S-->>A: Session aktif
        A-->>C: Yeni JWT Token
    end
    
    Note over U,R: Session Sonlandırma
    U->>C: Çıkış yap
    C->>A: Logout request
    A->>S: Session sil
    S-->>A: Session silindi
    A-->>C: Çıkış başarılı
    C-->>U: Çıkış tamamlandı
```

### 8. Hata Yönetimi ve Recovery - Exception Flow

```mermaid
graph TD
    A[İşlem Başlat] --> B{Hata Oluştu?}
    B -->|Hayır| C[İşlem Devam Et]
    B -->|Evet| D[Hata Türü Belirle]
    
    D --> E{Hata Türü}
    E -->|Network| F[Network Retry]
    E -->|Database| G[DB Failover]
    E -->|AI Service| H[Fallback Model]
    E -->|Validation| I[User Feedback]
    E -->|System| J[System Recovery]
    
    F --> K{Retry Başarılı?}
    K -->|Evet| C
    K -->|Hayır| L[Offline Mode]
    
    G --> M{Failover Başarılı?}
    M -->|Evet| C
    M -->|Hayır| N[Data Backup]
    
    H --> O{Fallback Başarılı?}
    O -->|Evet| C
    O -->|Hayır| P[Manual Review]
    
    I --> Q[Kullanıcı Düzeltmesi]
    Q --> A
    
    J --> R{Recovery Başarılı?}
    R -->|Evet| C
    R -->|Hayır| S[Emergency Mode]
    
    C --> T[İşlem Tamamla]
    L --> U[Sync When Online]
    N --> V[Restore From Backup]
    P --> W[Queue for Review]
    S --> X[Admin Notification]
    
    T --> Y[Başarılı Sonuç]
    U --> Y
    V --> Y
    W --> Y
    X --> Z[Sistem Bakım]
```

Bu etkileşim diyagramları, DigiGuard sisteminin tüm bileşenlerinin nasıl çalıştığını ve birbirleriyle nasıl etkileşim kurduğunu detaylı bir şekilde gösterir.