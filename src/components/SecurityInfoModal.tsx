import React from 'react';
import { Shield, Lock, Key, FileCheck, X } from 'lucide-react';

interface SecurityInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityInfoModal: React.FC<SecurityInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">SHA-256 Güvenlik Sistemi</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-start space-x-3">
              <Lock className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  SHA-256 Şifreleme Nedir?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  SHA-256 (Secure Hash Algorithm 256-bit), verilerinizi matematiksel olarak
                  benzersiz bir 256-bit parmak izine dönüştüren en güvenli şifreleme
                  algoritmalarından biridir. Bu süreç tek yönlüdür ve geri döndürülemez.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Key className="h-5 w-5 text-cyan-400" />
              <span>Güvenlik Özellikleri</span>
            </h3>

            <div className="grid gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">🔐 Tek Yönlü Şifreleme</h4>
                <p className="text-slate-300 text-sm">
                  Şifreleriniz SHA-256 ile hash'lenir ve orijinal hale döndürülemez.
                  Bu sayede veritabanı ihlallerinde bile şifreleriniz güvende kalır.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">⚡ Çarpışma Direnci</h4>
                <p className="text-slate-300 text-sm">
                  İki farklı verinin aynı hash değerini üretmesi matematiksel olarak
                  neredeyse imkansızdır (2<sup>256</sup> olası kombinasyon).
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">🛡️ Sabit Uzunluk</h4>
                <p className="text-slate-300 text-sm">
                  Girdi boyutu ne olursa olsun, çıktı her zaman 256-bit (64 karakter)
                  uzunluğundadır. Bu tutarlılık güvenliği artırır.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">🔒 Deterministic</h4>
                <p className="text-slate-300 text-sm">
                  Aynı girdi her zaman aynı hash değerini üretir, bu sayede kimlik
                  doğrulama tutarlı ve güvenilir şekilde yapılır.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-5">
            <div className="flex items-start space-x-3">
              <FileCheck className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  DigiGuard'da SHA-256 Kullanımı
                </h3>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Tüm şifreler SHA-256 ile hash'lenerek saklanır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Biyometrik veriler şifrelenerek korunur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Kimlik belgesi hash'leri doğrulama için kullanılır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Blockchain entegrasyonunda veri bütünlüğü sağlanır</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Örnek SHA-256 Hash:</h4>
            <code className="block bg-slate-900 text-cyan-400 p-3 rounded text-xs font-mono break-all">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </code>
            <p className="text-slate-400 text-xs mt-2">
              Bu 64 karakterlik hex string, 256-bit güvenlik sağlar.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
