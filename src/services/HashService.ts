/**
 * Hash Service
 * DigiGuard uygulaması için merkezi hash yönetimi
 */

import { SHA256Utils, SHA256Hasher, DataIntegrityChecker } from '../utils/sha256';
import { MediaFiles, PersonalInfo, IdentityInfo } from '../types';

export interface HashResult {
  hash: string;
  timestamp: number;
  algorithm: 'SHA-256';
  salt?: string;
}

export interface FileHashResult extends HashResult {
  filename: string;
  size: number;
  type: string;
}

export interface UserDataHash {
  personalInfoHash: string;
  identityInfoHash: string;
  mediaFilesHash: string;
  combinedHash: string;
  timestamp: number;
}

/**
 * Hash Service Sınıfı
 * Tüm hash işlemlerini merkezi olarak yönetir
 */
export class HashService {
  private static instance: HashService;
  private integrityChecker: DataIntegrityChecker;

  private constructor() {
    this.integrityChecker = new DataIntegrityChecker();
  }

  /**
   * Singleton pattern implementasyonu
   */
  static getInstance(): HashService {
    if (!HashService.instance) {
      HashService.instance = new HashService();
    }
    return HashService.instance;
  }

  /**
   * Kullanıcı kişisel bilgilerini hashler
   * @param personalInfo - Kişisel bilgiler
   * @returns Promise<HashResult> - Hash sonucu
   */
  async hashPersonalInfo(personalInfo: PersonalInfo): Promise<HashResult> {
    const dataString = JSON.stringify({
      firstName: personalInfo.firstName.toLowerCase().trim(),
      lastName: personalInfo.lastName.toLowerCase().trim(),
      birthDate: personalInfo.birthDate,
      nationality: personalInfo.nationality,
      address: personalInfo.address.toLowerCase().trim(),
      city: personalInfo.city.toLowerCase().trim(),
      postalCode: personalInfo.postalCode
    });

    const salt = SHA256Utils.generateSalt();
    const hash = await SHA256Utils.hashPassword(dataString, salt);

    const result: HashResult = {
      hash,
      timestamp: Date.now(),
      algorithm: 'SHA-256',
      salt
    };

    // Veri bütünlüğü için checksum oluştur
    await this.integrityChecker.createChecksum('personalInfo', dataString);

    return result;
  }

  /**
   * Kimlik bilgilerini hashler
   * @param identityInfo - Kimlik bilgileri
   * @returns Promise<HashResult> - Hash sonucu
   */
  async hashIdentityInfo(identityInfo: IdentityInfo): Promise<HashResult> {
    const dataString = JSON.stringify({
      idNumber: identityInfo.idNumber,
      idType: identityInfo.idType,
      issueDate: identityInfo.issueDate,
      expiryDate: identityInfo.expiryDate,
      issuingAuthority: identityInfo.issuingAuthority.toLowerCase().trim()
    });

    const salt = SHA256Utils.generateSalt();
    const hash = await SHA256Utils.hashPassword(dataString, salt);

    const result: HashResult = {
      hash,
      timestamp: Date.now(),
      algorithm: 'SHA-256',
      salt
    };

    // Veri bütünlüğü için checksum oluştur
    await this.integrityChecker.createChecksum('identityInfo', dataString);

    return result;
  }

  /**
   * Medya dosyalarını hashler
   * @param mediaFiles - Medya dosyaları
   * @returns Promise<FileHashResult[]> - Dosya hash sonuçları
   */
  async hashMediaFiles(mediaFiles: MediaFiles): Promise<FileHashResult[]> {
    const results: FileHashResult[] = [];
    const allFiles = [
      ...mediaFiles.photos,
      ...mediaFiles.videos,
      ...mediaFiles.audioRecordings
    ];

    for (const file of allFiles) {
      const hash = await SHA256Utils.hashFile(file);
      
      const result: FileHashResult = {
        hash,
        filename: file.name,
        size: file.size,
        type: file.type,
        timestamp: Date.now(),
        algorithm: 'SHA-256'
      };

      results.push(result);

      // Dosya bütünlüğü için checksum oluştur
      await this.integrityChecker.createChecksum(`file_${file.name}`, hash);
    }

    return results;
  }

  /**
   * Kullanıcının tüm verilerini hashler
   * @param personalInfo - Kişisel bilgiler
   * @param identityInfo - Kimlik bilgileri
   * @param mediaFiles - Medya dosyaları
   * @returns Promise<UserDataHash> - Kullanıcı veri hash'i
   */
  async hashUserData(
    personalInfo: PersonalInfo,
    identityInfo: IdentityInfo,
    mediaFiles: MediaFiles
  ): Promise<UserDataHash> {
    // Her veri türü için ayrı hash oluştur
    const personalHash = await this.hashPersonalInfo(personalInfo);
    const identityHash = await this.hashIdentityInfo(identityInfo);
    const mediaHashResults = await this.hashMediaFiles(mediaFiles);

    // Medya dosyalarının hash'lerini birleştir
    const mediaHashes = mediaHashResults.map(result => result.hash).join('');
    const mediaFilesHash = await SHA256Utils.hashText(mediaHashes);

    // Tüm hash'leri birleştirerek ana hash oluştur
    const combinedData = personalHash.hash + identityHash.hash + mediaFilesHash;
    const combinedHash = await SHA256Utils.hashText(combinedData);

    const userDataHash: UserDataHash = {
      personalInfoHash: personalHash.hash,
      identityInfoHash: identityHash.hash,
      mediaFilesHash,
      combinedHash,
      timestamp: Date.now()
    };

    // Ana hash için checksum oluştur
    await this.integrityChecker.createChecksum('userDataHash', combinedHash);

    return userDataHash;
  }

  /**
   * Dijital imza oluşturur
   * @param data - İmzalanacak veri
   * @param privateKey - Özel anahtar (simülasyon)
   * @returns Promise<string> - Dijital imza
   */
  async createDigitalSignature(data: string, privateKey: string): Promise<string> {
    const dataHash = await SHA256Utils.hashText(data);
    const signature = await SHA256Utils.createHMAC(dataHash, privateKey);
    return signature;
  }

  /**
   * Dijital imzayı doğrular
   * @param data - Orijinal veri
   * @param signature - Dijital imza
   * @param publicKey - Açık anahtar (simülasyon)
   * @returns Promise<boolean> - Doğrulama sonucu
   */
  async verifyDigitalSignature(
    data: string,
    signature: string,
    publicKey: string
  ): Promise<boolean> {
    const dataHash = await SHA256Utils.hashText(data);
    return SHA256Utils.verifyHMAC(dataHash, signature, publicKey);
  }

  /**
   * Blockchain benzeri hash zinciri oluşturur
   * @param transactions - İşlem listesi
   * @returns Promise<string[]> - Hash zinciri
   */
  async createHashChain(transactions: string[]): Promise<string[]> {
    const chain: string[] = [];
    let previousHash = '0'.repeat(64); // Genesis hash

    for (let i = 0; i < transactions.length; i++) {
      const blockHash = await SHA256Utils.createBlockHash(
        transactions[i],
        previousHash,
        i
      );
      chain.push(blockHash);
      previousHash = blockHash;
    }

    return chain;
  }

  /**
   * Hash zincirinin geçerliliğini kontrol eder
   * @param chain - Hash zinciri
   * @param transactions - Orijinal işlemler
   * @returns Promise<boolean> - Geçerlilik durumu
   */
  async validateHashChain(chain: string[], transactions: string[]): Promise<boolean> {
    if (chain.length !== transactions.length) {
      return false;
    }

    let previousHash = '0'.repeat(64);

    for (let i = 0; i < transactions.length; i++) {
      const expectedHash = await SHA256Utils.createBlockHash(
        transactions[i],
        previousHash,
        i
      );

      if (!SHA256Utils.secureCompare(chain[i], expectedHash)) {
        return false;
      }

      previousHash = chain[i];
    }

    return true;
  }

  /**
   * Veri bütünlüğünü kontrol eder
   * @param key - Veri anahtarı
   * @param data - Kontrol edilecek veri
   * @returns Promise<boolean> - Bütünlük durumu
   */
  async verifyDataIntegrity(key: string, data: string): Promise<boolean> {
    return this.integrityChecker.verifyIntegrity(key, data);
  }

  /**
   * Hash performans raporu oluşturur
   * @returns Promise<object> - Performans raporu
   */
  async generatePerformanceReport(): Promise<{
    hashingSpeed: number;
    averageTime: number;
    totalTests: number;
  }> {
    const iterations = 1000;
    const totalTime = await SHA256Utils.performanceTest(iterations);
    
    return {
      hashingSpeed: iterations / (totalTime / 1000), // hash/saniye
      averageTime: totalTime / iterations, // ms/hash
      totalTests: iterations
    };
  }

  /**
   * Hash cache temizler
   */
  clearCache(): void {
    this.integrityChecker.clearChecksums();
  }

  /**
   * Hash verilerini export eder
   * @returns object - Export verileri
   */
  exportHashData(): Record<string, string> {
    return this.integrityChecker.exportChecksums();
  }

  /**
   * Hash verilerini import eder
   * @param data - Import edilecek veriler
   */
  importHashData(data: Record<string, string>): void {
    this.integrityChecker.importChecksums(data);
  }
}

// Singleton instance export
export const hashService = HashService.getInstance();