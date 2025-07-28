/**
 * SHA-256 Hash Demo Bileşeni
 * Hash işlemlerini test etmek ve göstermek için
 */

import React, { useState, useEffect } from 'react';
import { Hash, Shield, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';
import { SHA256Utils, SHA256Hasher } from '../utils/sha256';
import { hashService } from '../services/HashService';

export const HashDemo: React.FC = () => {
  const [inputText, setInputText] = useState('DigiGuard Test Verisi');
  const [hashResult, setHashResult] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [originalHash, setOriginalHash] = useState('');

  // Performans testi
  useEffect(() => {
    const runPerformanceTest = async () => {
      const report = await hashService.generatePerformanceReport();
      setPerformanceData(report);
    };
    runPerformanceTest();
  }, []);

  const handleHash = async () => {
    if (!inputText.trim()) return;

    setIsHashing(true);
    try {
      const hash = await SHA256Utils.hashText(inputText);
      setHashResult(hash);
      setOriginalHash(hash);
      setVerificationResult(null);
    } catch (error) {
      console.error('Hash işlemi başarısız:', error);
    } finally {
      setIsHashing(false);
    }
  };

  const handleVerify = async () => {
    if (!inputText.trim() || !originalHash) return;

    const currentHash = await SHA256Utils.hashText(inputText);
    const isValid = SHA256Utils.secureCompare(currentHash, originalHash);
    setVerificationResult(isValid);
  };

  const handleFileHash = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsHashing(true);
    try {
      const hash = await SHA256Utils.hashFile(file);
      setHashResult(hash);
      setOriginalHash(hash);
      setInputText(`Dosya: ${file.name} (${file.size} bytes)`);
    } catch (error) {
      console.error('Dosya hash işlemi başarısız:', error);
    } finally {
      setIsHashing(false);
    }
  };

  const generateSalt = () => {
    const salt = SHA256Utils.generateSalt();
    setInputText(inputText + ' | Salt: ' + salt.substring(0, 16) + '...');
  };

  const testHMAC = async () => {
    const message = inputText;
    const key = 'DigiGuard-Secret-Key';
    
    setIsHashing(true);
    try {
      const hmac = await SHA256Utils.createHMAC(message, key);
      setHashResult(`HMAC-SHA256: ${hmac}`);
    } catch (error) {
      console.error('HMAC işlemi başarısız:', error);
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <div className="flex items-center space-x-3 mb-8">
          <Hash className="h-8 w-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">SHA-256 Hash Demo</h2>
        </div>

        {/* Performans Bilgileri */}
        {performanceData && (
          <div className="bg-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-emerald-400" />
              <span>Performans Metrikleri</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">
                  {performanceData.hashingSpeed.toFixed(0)}
                </p>
                <p className="text-sm text-slate-300">Hash/Saniye</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {performanceData.averageTime.toFixed(2)}ms
                </p>
                <p className="text-sm text-slate-300">Ortalama Süre</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">
                  {performanceData.totalTests}
                </p>
                <p className="text-sm text-slate-300">Test Sayısı</p>
              </div>
            </div>
          </div>
        )}

        {/* Giriş Alanı */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Hash Edilecek Metin
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
              rows={3}
              placeholder="Hashlenecek metni girin..."
            />
          </div>

          {/* Dosya Yükleme */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Dosya Hash
            </label>
            <input
              type="file"
              onChange={handleFileHash}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
            />
          </div>

          {/* Butonlar */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleHash}
              disabled={isHashing || !inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isHashing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Hash className="h-5 w-5" />
              )}
              <span>SHA-256 Hash</span>
            </button>

            <button
              onClick={generateSalt}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Shield className="h-5 w-5" />
              <span>Salt Ekle</span>
            </button>

            <button
              onClick={testHMAC}
              disabled={isHashing || !inputText.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>HMAC Test</span>
            </button>

            {originalHash && (
              <button
                onClick={handleVerify}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Doğrula</span>
              </button>
            )}
          </div>

          {/* Hash Sonucu */}
          {hashResult && (
            <div className="bg-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Hash Sonucu:</h3>
              <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-emerald-400 break-all">
                {hashResult}
              </div>
              <div className="mt-3 text-sm text-slate-400">
                <p>Uzunluk: {hashResult.length} karakter</p>
                <p>Algoritma: SHA-256</p>
                <p>Format: Hexadecimal</p>
              </div>
            </div>
          )}

          {/* Doğrulama Sonucu */}
          {verificationResult !== null && (
            <div className={`rounded-xl p-6 ${verificationResult ? 'bg-emerald-600/20 border border-emerald-500/30' : 'bg-red-600/20 border border-red-500/30'}`}>
              <div className="flex items-center space-x-3">
                {verificationResult ? (
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-400" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {verificationResult ? 'Doğrulama Başarılı' : 'Doğrulama Başarısız'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {verificationResult 
                      ? 'Veri bütünlüğü korunmuş, hash değerleri eşleşiyor.'
                      : 'Veri değiştirilmiş, hash değerleri eşleşmiyor.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hash Özellikleri */}
          <div className="bg-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">SHA-256 Özellikleri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Güvenlik</h4>
                <ul className="space-y-1 text-slate-300">
                  <li>• 256-bit hash uzunluğu</li>
                  <li>• Kriptografik güvenlik</li>
                  <li>• Çarpışma direnci</li>
                  <li>• Tek yönlü fonksiyon</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-emerald-400 mb-2">Kullanım Alanları</h4>
                <ul className="space-y-1 text-slate-300">
                  <li>• Veri bütünlüğü kontrolü</li>
                  <li>• Dijital imzalar</li>
                  <li>• Parola hash'leme</li>
                  <li>• Blockchain teknolojisi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};