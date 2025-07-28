# SHA-256 Hash Algoritması - DigiGuard Dokümantasyonu

## 📋 İçindekiler
1. [SHA-256 Genel Bakış](#sha-256-genel-bakış)
2. [Implementasyon Detayları](#implementasyon-detayları)
3. [Kullanım Alanları](#kullanım-alanları)
4. [API Referansı](#api-referansı)
5. [Güvenlik Özellikleri](#güvenlik-özellikleri)
6. [Performans Analizi](#performans-analizi)
7. [Kod Örnekleri](#kod-örnekleri)

## 🔐 SHA-256 Genel Bakış

SHA-256 (Secure Hash Algorithm 256-bit), DigiGuard uygulamasında veri bütünlüğü, güvenlik ve kimlik doğrulama için kullanılan kriptografik hash fonksiyonudur.

### Temel Özellikler

```typescript
interface SHA256Properties {
  hashLength: 256; // bit
  outputFormat: 'hexadecimal';
  blockSize: 512; // bit
  rounds: 64;
  security: 'cryptographically-secure';
  collision_resistance: true;
  preimage_resistance: true;
}
```

### Algoritma Özellikleri

- **Hash Uzunluğu**: 256 bit (64 hexadecimal karakter)
- **Blok Boyutu**: 512 bit
- **Güvenlik Seviyesi**: 128 bit
- **Çarpışma Direnci**: 2^128 işlem
- **Ön Görüntü Direnci**: 2^256 işlem

## 🏗️ Implementasyon Detayları

### 1. Temel Hash İşlemi

```typescript
// Basit metin hash'leme
const text = "DigiGuard Güvenli Veri";
const hash = await SHA256Utils.hashText(text);
console.log(hash); // 64 karakter hex string
```

### 2. Dosya Hash'leme

```typescript
// Dosya hash'leme
const file = new File(["content"], "example.txt");
const fileHash = await SHA256Utils.hashFile(file);
console.log(`Dosya Hash: ${fileHash}`);
```

### 3. Salt ile Parola Hash'leme

```typescript
// Güvenli parola hash'leme
const password = "kullanici_parolasi";
const salt = SHA256Utils.generateSalt();
const hashedPassword = await SHA256Utils.hashPassword(password, salt);
```

### 4. HMAC-SHA256 İmzalama

```typescript
// Mesaj doğrulama kodu
const message = "Önemli veri";
const secretKey = "gizli_anahtar";
const hmac = await SHA256Utils.createHMAC(message, secretKey);

// Doğrulama
const isValid = await SHA256Utils.verifyHMAC(message, hmac, secretKey);
```

## 🎯 Kullanım Alanları

### 1. Veri Bütünlüğü Kontrolü

```typescript
class DataIntegrityExample {
  async checkFileIntegrity(file: File, expectedHash: string): Promise<boolean> {
    const currentHash = await SHA256Utils.hashFile(file);
    return SHA256Utils.secureCompare(currentHash, expectedHash);
  }
}
```

### 2. Kullanıcı Verisi Hash'leme

```typescript
// Kişisel bilgileri hash'leme
const personalInfo: PersonalInfo = {
  firstName: "Ahmet",
  lastName: "Yılmaz",
  birthDate: "1990-01-01",
  // ... diğer alanlar
};

const hashResult = await hashService.hashPersonalInfo(personalInfo);
console.log(`Kişisel Veri Hash: ${hashResult.hash}`);
```

### 3. Blockchain Benzeri Hash Zinciri

```typescript
// İşlem zinciri oluşturma
const transactions = [
  "İşlem 1: Kullanıcı kaydı",
  "İşlem 2: Kimlik doğrulama",
  "İşlem 3: Sertifika oluşturma"
];

const hashChain = await hashService.createHashChain(transactions);
console.log("Hash Zinciri:", hashChain);
```

## 📚 API Referansı

### SHA256Utils Sınıfı

#### `hashText(text: string): Promise<string>`
Metni SHA-256 ile hash'ler.

**Parametreler:**
- `text`: Hash'lenecek metin

**Dönüş:** 64 karakter hexadecimal hash

**Örnek:**
```typescript
const hash = await SHA256Utils.hashText("Merhaba Dünya");
// Çıktı: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
```

#### `hashFile(file: File): Promise<string>`
Dosyayı SHA-256 ile hash'ler.

**Parametreler:**
- `file`: Hash'lenecek dosya

**Dönüş:** 64 karakter hexadecimal hash

#### `hashPassword(password: string, salt: string): Promise<string>`
Parolayı salt ile birlikte hash'ler.

**Parametreler:**
- `password`: Hash'lenecek parola
- `salt`: Güvenlik için salt değeri

**Dönüş:** Hash'lenmiş parola

#### `createHMAC(message: string, key: string): Promise<string>`
HMAC-SHA256 imzası oluşturur.

**Parametreler:**
- `message`: İmzalanacak mesaj
- `key`: HMAC anahtarı

**Dönüş:** HMAC imzası

#### `verifyHMAC(message: string, signature: string, key: string): Promise<boolean>`
HMAC imzasını doğrular.

**Parametreler:**
- `message`: Orijinal mesaj
- `signature`: Doğrulanacak imza
- `key`: HMAC anahtarı

**Dönüş:** Doğrulama sonucu

#### `generateSalt(length?: number): string`
Rastgele salt oluşturur.

**Parametreler:**
- `length`: Salt uzunluğu (varsayılan: 32)

**Dönüş:** Hexadecimal salt değeri

#### `secureCompare(hash1: string, hash2: string): boolean`
Hash değerlerini güvenli şekilde karşılaştırır (timing attack koruması).

**Parametreler:**
- `hash1`: İlk hash değeri
- `hash2`: İkinci hash değeri

**Dönüş:** Eşitlik durumu

### HashService Sınıfı

#### `hashPersonalInfo(personalInfo: PersonalInfo): Promise<HashResult>`
Kişisel bilgileri hash'ler.

#### `hashIdentityInfo(identityInfo: IdentityInfo): Promise<HashResult>`
Kimlik bilgilerini hash'ler.

#### `hashMediaFiles(mediaFiles: MediaFiles): Promise<FileHashResult[]>`
Medya dosyalarını hash'ler.

#### `hashUserData(personalInfo, identityInfo, mediaFiles): Promise<UserDataHash>`
Kullanıcının tüm verilerini hash'ler.

## 🔒 Güvenlik Özellikleri

### 1. Çarpışma Direnci
SHA-256, aynı hash değerine sahip iki farklı girdi bulmanın hesaplama açısından imkansız olduğu çarpışma direncine sahiptir.

```typescript
// Çarpışma testi
const text1 = "Metin 1";
const text2 = "Metin 2";

const hash1 = await SHA256Utils.hashText(text1);
const hash2 = await SHA256Utils.hashText(text2);

console.log(hash1 === hash2); // false (çok yüksek olasılıkla)
```

### 2. Ön Görüntü Direnci
Verilen bir hash değerinden orijinal veriyi bulmak hesaplama açısından imkansızdır.

### 3. İkinci Ön Görüntü Direnci
Verilen bir girdi için aynı hash değerine sahip başka bir girdi bulmak imkansızdır.

### 4. Timing Attack Koruması

```typescript
// Güvenli karşılaştırma
const isEqual = SHA256Utils.secureCompare(hash1, hash2);
// Timing attack'lara karşı korumalı
```

### 5. Salt Kullanımı

```typescript
// Rainbow table saldırılarına karşı koruma
const salt = SHA256Utils.generateSalt();
const hashedPassword = await SHA256Utils.hashPassword(password, salt);
```

## 📊 Performans Analizi

### Benchmark Sonuçları

```typescript
// Performans testi
const report = await hashService.generatePerformanceReport();
console.log(`Hash Hızı: ${report.hashingSpeed} hash/saniye`);
console.log(`Ortalama Süre: ${report.averageTime} ms`);
```

### Tipik Performans Değerleri

| İşlem Türü | Ortalama Süre | Hash/Saniye |
|------------|---------------|-------------|
| Metin Hash | 0.1-0.5 ms | 2000-10000 |
| Dosya Hash (1MB) | 10-50 ms | 20-100 |
| HMAC Oluşturma | 0.2-1 ms | 1000-5000 |

### Optimizasyon Teknikleri

1. **Batch Processing**: Çoklu hash işlemleri için
```typescript
const hashMap = await SHA256Hasher.batchHash(textArray);
```

2. **Progressive Hashing**: Büyük dosyalar için
```typescript
const hash = await SHA256Hasher.progressiveHash(
  largeFile, 
  1024 * 1024, // 1MB chunks
  (progress) => console.log(`${progress}% tamamlandı`)
);
```

3. **File Deduplication**: Aynı dosyaları tespit etme
```typescript
const duplicates = await SHA256Hasher.deduplicateFiles(fileArray);
```

## 💡 Kod Örnekleri

### 1. Basit Hash Oluşturma

```typescript
import { SHA256Utils } from '../utils/sha256';

async function basicHashExample() {
  const data = "DigiGuard Test Verisi";
  const hash = await SHA256Utils.hashText(data);
  
  console.log(`Orijinal: ${data}`);
  console.log(`Hash: ${hash}`);
  console.log(`Uzunluk: ${hash.length} karakter`);
}
```

### 2. Dosya Bütünlüğü Kontrolü

```typescript
async function fileIntegrityCheck(file: File, expectedHash: string) {
  const currentHash = await SHA256Utils.hashFile(file);
  const isIntact = SHA256Utils.secureCompare(currentHash, expectedHash);
  
  if (isIntact) {
    console.log("✅ Dosya bütünlüğü korunmuş");
  } else {
    console.log("❌ Dosya değiştirilmiş veya bozulmuş");
  }
  
  return isIntact;
}
```

### 3. Güvenli Parola Saklama

```typescript
async function securePasswordStorage(password: string) {
  // Salt oluştur
  const salt = SHA256Utils.generateSalt();
  
  // Parolayı hash'le
  const hashedPassword = await SHA256Utils.hashPassword(password, salt);
  
  // Veritabanında sakla
  const userRecord = {
    passwordHash: hashedPassword,
    salt: salt,
    algorithm: 'SHA-256'
  };
  
  return userRecord;
}
```

### 4. Dijital İmza Oluşturma

```typescript
async function createDigitalSignature(document: string, privateKey: string) {
  // Dokümanı hash'le
  const documentHash = await SHA256Utils.hashText(document);
  
  // HMAC ile imzala
  const signature = await SHA256Utils.createHMAC(documentHash, privateKey);
  
  return {
    document,
    signature,
    timestamp: Date.now(),
    algorithm: 'HMAC-SHA256'
  };
}
```

### 5. Merkle Tree Implementasyonu

```typescript
async function createMerkleTree(files: File[]) {
  // Her dosyayı hash'le
  const fileHashes = await Promise.all(
    files.map(file => SHA256Utils.hashFile(file))
  );
  
  // Merkle root hesapla
  const merkleRoot = await SHA256Utils.calculateMerkleRoot(fileHashes);
  
  return {
    files: files.map(f => f.name),
    fileHashes,
    merkleRoot,
    timestamp: Date.now()
  };
}
```

### 6. Hash Zinciri Doğrulama

```typescript
async function validateTransactionChain(transactions: string[]) {
  // Hash zinciri oluştur
  const chain = await hashService.createHashChain(transactions);
  
  // Zinciri doğrula
  const isValid = await hashService.validateHashChain(chain, transactions);
  
  if (isValid) {
    console.log("✅ İşlem zinciri geçerli");
  } else {
    console.log("❌ İşlem zinciri bozulmuş");
  }
  
  return { chain, isValid };
}
```

## 🚀 Gelişmiş Kullanım

### 1. Custom Hash Algoritması

```typescript
class CustomHasher extends SHA256Utils {
  static async hashWithMetadata(data: string, metadata: object) {
    const combinedData = data + JSON.stringify(metadata);
    const hash = await this.hashText(combinedData);
    
    return {
      hash,
      metadata,
      timestamp: Date.now(),
      version: '1.0'
    };
  }
}
```

### 2. Hash Tabanlı Proof of Work

```typescript
async function proofOfWork(data: string, difficulty: number): Promise<{
  hash: string;
  nonce: number;
  attempts: number;
}> {
  let nonce = 0;
  let attempts = 0;
  const target = '0'.repeat(difficulty);
  
  while (true) {
    const hash = await SHA256Utils.createBlockHash(data, '0', nonce);
    attempts++;
    
    if (hash.startsWith(target)) {
      return { hash, nonce, attempts };
    }
    
    nonce++;
  }
}
```

### 3. Hash Tabanlı Bloom Filter

```typescript
class HashBloomFilter {
  private bitArray: boolean[];
  private size: number;
  private hashCount: number;
  
  constructor(size: number, hashCount: number) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Array(size).fill(false);
  }
  
  async add(item: string): Promise<void> {
    for (let i = 0; i < this.hashCount; i++) {
      const hash = await SHA256Utils.hashText(item + i);
      const index = parseInt(hash.substring(0, 8), 16) % this.size;
      this.bitArray[index] = true;
    }
  }
  
  async mightContain(item: string): Promise<boolean> {
    for (let i = 0; i < this.hashCount; i++) {
      const hash = await SHA256Utils.hashText(item + i);
      const index = parseInt(hash.substring(0, 8), 16) % this.size;
      if (!this.bitArray[index]) {
        return false;
      }
    }
    return true;
  }
}
```

## 🔧 Hata Ayıklama ve Test

### 1. Hash Doğrulama Testi

```typescript
describe('SHA-256 Hash Tests', () => {
  test('Aynı girdi aynı hash üretmeli', async () => {
    const input = "test data";
    const hash1 = await SHA256Utils.hashText(input);
    const hash2 = await SHA256Utils.hashText(input);
    
    expect(hash1).toBe(hash2);
  });
  
  test('Farklı girdiler farklı hash üretmeli', async () => {
    const hash1 = await SHA256Utils.hashText("data1");
    const hash2 = await SHA256Utils.hashText("data2");
    
    expect(hash1).not.toBe(hash2);
  });
  
  test('Hash uzunluğu 64 karakter olmalı', async () => {
    const hash = await SHA256Utils.hashText("test");
    expect(hash.length).toBe(64);
  });
});
```

### 2. Performans Testi

```typescript
async function performanceTest() {
  const testData = "Performance test data";
  const iterations = 10000;
  
  console.time('SHA-256 Performance');
  
  for (let i = 0; i < iterations; i++) {
    await SHA256Utils.hashText(testData + i);
  }
  
  console.timeEnd('SHA-256 Performance');
}
```

Bu dokümantasyon, DigiGuard uygulamasında SHA-256 hash algoritmasının nasıl kullanıldığını ve implementasyon detaylarını kapsamlı bir şekilde açıklamaktadır.