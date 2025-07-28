/**
 * SHA-256 Hash Utility
 * DigiGuard için özel SHA-256 implementasyonu
 * Veri bütünlüğü ve güvenlik için kullanılır
 */

export class SHA256Utils {
  /**
   * Metni SHA-256 ile hashler
   * @param text - Hashlenecek metin
   * @returns Promise<string> - Hex formatında hash
   */
  static async hashText(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Dosyayı SHA-256 ile hashler
   * @param file - Hashlenecek dosya
   * @returns Promise<string> - Hex formatında hash
   */
  static async hashFile(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Parola için salt ile SHA-256 hash oluşturur
   * @param password - Hashlenecek parola
   * @param salt - Güvenlik için salt değeri
   * @returns Promise<string> - Hex formatında hash
   */
  static async hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * HMAC-SHA256 ile mesaj doğrulama kodu oluşturur
   * @param message - İmzalanacak mesaj
   * @param key - HMAC anahtarı
   * @returns Promise<string> - Hex formatında HMAC
   */
  static async createHMAC(message: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const signatureArray = Array.from(new Uint8Array(signature));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return signatureHex;
  }

  /**
   * HMAC-SHA256 doğrulaması yapar
   * @param message - Doğrulanacak mesaj
   * @param signature - Mevcut imza
   * @param key - HMAC anahtarı
   * @returns Promise<boolean> - Doğrulama sonucu
   */
  static async verifyHMAC(message: string, signature: string, key: string): Promise<boolean> {
    const computedSignature = await this.createHMAC(message, key);
    return computedSignature === signature;
  }

  /**
   * Rastgele salt oluşturur
   * @param length - Salt uzunluğu (varsayılan: 32)
   * @returns string - Hex formatında salt
   */
  static generateSalt(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Hash değerlerini karşılaştırır (timing attack koruması ile)
   * @param hash1 - İlk hash değeri
   * @param hash2 - İkinci hash değeri
   * @returns boolean - Eşitlik durumu
   */
  static secureCompare(hash1: string, hash2: string): boolean {
    if (hash1.length !== hash2.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < hash1.length; i++) {
      result |= hash1.charCodeAt(i) ^ hash2.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Merkle Tree hash hesaplar (dosya bütünlüğü için)
   * @param hashes - Hash dizisi
   * @returns Promise<string> - Merkle root hash
   */
  static async calculateMerkleRoot(hashes: string[]): Promise<string> {
    if (hashes.length === 0) {
      return '';
    }

    if (hashes.length === 1) {
      return hashes[0];
    }

    const nextLevel: string[] = [];
    
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = i + 1 < hashes.length ? hashes[i + 1] : left;
      const combined = left + right;
      const hash = await this.hashText(combined);
      nextLevel.push(hash);
    }

    return this.calculateMerkleRoot(nextLevel);
  }

  /**
   * Blockchain benzeri hash zinciri oluşturur
   * @param data - Zincirlenecek veri
   * @param previousHash - Önceki hash değeri
   * @param nonce - Proof of work için nonce
   * @returns Promise<string> - Yeni hash değeri
   */
  static async createBlockHash(data: string, previousHash: string, nonce: number): Promise<string> {
    const blockData = `${data}${previousHash}${nonce}${Date.now()}`;
    return this.hashText(blockData);
  }

  /**
   * Hash değerinin geçerliliğini kontrol eder
   * @param hash - Kontrol edilecek hash
   * @returns boolean - Geçerlilik durumu
   */
  static isValidHash(hash: string): boolean {
    // SHA-256 hash 64 karakter hex string olmalı
    const hashRegex = /^[a-f0-9]{64}$/i;
    return hashRegex.test(hash);
  }

  /**
   * Hash performans testi yapar
   * @param iterations - Test iterasyon sayısı
   * @returns Promise<number> - Milisaniye cinsinden süre
   */
  static async performanceTest(iterations: number = 1000): Promise<number> {
    const testData = 'DigiGuard Performance Test Data';
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      await this.hashText(testData + i);
    }

    const endTime = performance.now();
    return endTime - startTime;
  }
}

/**
 * SHA-256 Hash Sınıfı
 * Daha detaylı hash işlemleri için
 */
export class SHA256Hasher {
  private static readonly BLOCK_SIZE = 64;
  private static readonly HASH_SIZE = 32;

  /**
   * Batch hash işlemi yapar
   * @param items - Hashlenecek öğeler
   * @returns Promise<Map<string, string>> - Öğe-Hash eşleştirmesi
   */
  static async batchHash(items: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    const promises = items.map(async (item) => {
      const hash = await SHA256Utils.hashText(item);
      return { item, hash };
    });

    const hashResults = await Promise.all(promises);
    
    hashResults.forEach(({ item, hash }) => {
      results.set(item, hash);
    });

    return results;
  }

  /**
   * Progressive hash (büyük dosyalar için)
   * @param file - Hashlenecek dosya
   * @param chunkSize - Chunk boyutu (varsayılan: 1MB)
   * @param onProgress - İlerleme callback'i
   * @returns Promise<string> - Final hash
   */
  static async progressiveHash(
    file: File,
    chunkSize: number = 1024 * 1024,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const totalChunks = Math.ceil(file.size / chunkSize);
    let processedChunks = 0;
    let combinedHash = '';

    for (let start = 0; start < file.size; start += chunkSize) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const chunkHash = await SHA256Utils.hashFile(new File([chunk], 'chunk'));
      combinedHash += chunkHash;
      
      processedChunks++;
      if (onProgress) {
        onProgress((processedChunks / totalChunks) * 100);
      }
    }

    return SHA256Utils.hashText(combinedHash);
  }

  /**
   * Hash tabanlı dosya deduplication
   * @param files - Dosya listesi
   * @returns Promise<Map<string, File[]>> - Hash-Dosya grupları
   */
  static async deduplicateFiles(files: File[]): Promise<Map<string, File[]>> {
    const hashGroups = new Map<string, File[]>();

    for (const file of files) {
      const hash = await SHA256Utils.hashFile(file);
      
      if (!hashGroups.has(hash)) {
        hashGroups.set(hash, []);
      }
      
      hashGroups.get(hash)!.push(file);
    }

    return hashGroups;
  }
}

/**
 * Hash tabanlı veri bütünlüğü kontrolü
 */
export class DataIntegrityChecker {
  private checksums: Map<string, string> = new Map();

  /**
   * Veri için checksum oluşturur ve saklar
   * @param key - Veri anahtarı
   * @param data - Veri
   */
  async createChecksum(key: string, data: string): Promise<void> {
    const hash = await SHA256Utils.hashText(data);
    this.checksums.set(key, hash);
  }

  /**
   * Veri bütünlüğünü kontrol eder
   * @param key - Veri anahtarı
   * @param data - Kontrol edilecek veri
   * @returns Promise<boolean> - Bütünlük durumu
   */
  async verifyIntegrity(key: string, data: string): Promise<boolean> {
    const storedHash = this.checksums.get(key);
    if (!storedHash) {
      return false;
    }

    const currentHash = await SHA256Utils.hashText(data);
    return SHA256Utils.secureCompare(storedHash, currentHash);
  }

  /**
   * Tüm checksum'ları temizler
   */
  clearChecksums(): void {
    this.checksums.clear();
  }

  /**
   * Checksum listesini export eder
   * @returns Object - Checksum verileri
   */
  exportChecksums(): Record<string, string> {
    return Object.fromEntries(this.checksums);
  }

  /**
   * Checksum listesini import eder
   * @param checksums - Import edilecek checksum'lar
   */
  importChecksums(checksums: Record<string, string>): void {
    this.checksums = new Map(Object.entries(checksums));
  }
}