import React, { useRef } from 'react';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, Camera, Video, Mic, X, Image, FileText, AlertCircle, CheckCircle, Fingerprint, Scan } from 'lucide-react';
import { MediaFiles } from '../types';

interface MediaUploadStepProps {
  data: MediaFiles;
  onChange: (data: MediaFiles) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MediaUploadStep: React.FC<MediaUploadStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = (type: keyof MediaFiles, files: FileList | null) => {
    if (!files) return;
    
    const newErrors: string[] = [];
    const fileArray = Array.from(files);
    
    // Dosya boyutu ve türü kontrolü
    fileArray.forEach((file, index) => {
      if (type === 'photos') {
        if (!file.type.startsWith('image/')) {
          newErrors.push(`${file.name} geçerli bir resim dosyası değil`);
          return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
          newErrors.push(`${file.name} çok büyük (maksimum 5MB)`);
          return;
        }
      } else if (type === 'videos') {
        if (!file.type.startsWith('video/')) {
          newErrors.push(`${file.name} geçerli bir video dosyası değil`);
          return;
        }
        if (file.size > 50 * 1024 * 1024) { // 50MB
          newErrors.push(`${file.name} çok büyük (maksimum 50MB)`);
          return;
        }
      } else if (type === 'audioRecordings') {
        if (!file.type.startsWith('audio/')) {
          newErrors.push(`${file.name} geçerli bir ses dosyası değil`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB
          newErrors.push(`${file.name} çok büyük (maksimum 10MB)`);
          return;
        }
      }
    });
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors([]);
    
    // Yükleme simülasyonu
    fileArray.forEach((file, index) => {
      const progressKey = `${type}-${Date.now()}-${index}`;
      setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[progressKey] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [progressKey]: currentProgress + 10 };
        });
      }, 100);
    });
    
    onChange({
      ...data,
      [type]: [...data[type], ...fileArray],
    });
  };

  const removeFile = (type: keyof MediaFiles, index: number) => {
    const updatedFiles = data[type].filter((_, i) => i !== index);
    onChange({
      ...data,
      [type]: updatedFiles,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-8 w-8 text-matrix-400" />;
    if (file.type.startsWith('video/')) return <Video className="h-8 w-8 text-cyber-400" />;
    if (file.type.startsWith('audio/')) return <Mic className="h-8 w-8 text-secure-400" />;
    return <FileText className="h-8 w-8 text-slate-400" />;
  };
  const canProceed = data.photos.length > 0 && data.videos.length > 0 && data.audioRecordings.length > 0;

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-cyber-500/30 relative overflow-hidden">
      {/* Cyber background effect */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-matrix-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="relative">
          <Fingerprint className="h-6 w-6 text-cyber-400 animate-fingerprint-pulse" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent">
          Biyometrik Veri Yükleme
        </h2>
      </div>

      <p className="text-slate-300 mb-6 relative z-10 flex items-center gap-2">
        <Scan className="h-4 w-4 text-cyber-400" />
        KYC kimlik doğrulama için biyometrik verilerinizi yükleyin. Tüm dosyalar AES-256 ile şifrelenerek blockchain üzerinde saklanacaktır.
      </p>

      {errors.length > 0 && (
        <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
            <div>
              <p className="text-red-300 font-medium mb-2">Dosya yükleme hataları:</p>
              <ul className="text-red-200 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-cyber-600/20 border border-cyber-500/30 rounded-lg p-4 mb-8 relative z-10">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-cyber-400 mt-0.5" />
          <div>
            <p className="text-cyber-300 font-medium mb-2">Biyometrik Veri Gereksinimleri:</p>
            <ul className="text-cyber-200 text-sm space-y-2">
              <li>• <strong>Yüz Fotoğrafları:</strong> Net, iyi ışıklandırılmış, farklı açılardan (JPG/PNG, max 5MB)</li>
              <li>• <strong>Canlılık Videoları:</strong> Yüz hareketleri içeren 5-10 saniyelik kayıt (MP4, max 50MB)</li>
              <li>• <strong>Ses Kayıtları:</strong> Belirli metinleri okuyarak kayıt (MP3/WAV, max 10MB)</li>
            </ul>
            <div className="mt-3 flex items-center gap-2 text-xs text-matrix-400">
              <CheckCircle className="h-3 w-3" />
              AI analizi ile otomatik kalite kontrolü yapılacaktır
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {/* Photos */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-matrix-400" />
              <h3 className="text-lg font-semibold text-white">Yüz Fotoğrafları</h3>
              <span className="text-sm text-slate-400">({data.photos.length}/5)</span>
              {data.photos.length > 0 && (
                <CheckCircle className="h-4 w-4 text-matrix-400" />
              )}
            </div>
            <button
              onClick={() => photoInputRef.current?.click()}
              disabled={data.photos.length >= 5}
              className={`text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center space-x-2 shadow-lg ${
                data.photos.length >= 5
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-matrix-600 to-matrix-700 hover:from-matrix-700 hover:to-matrix-800 shadow-matrix-500/30'
              }`}
            >
              <Image className="h-4 w-4" />
              <span>{data.photos.length >= 5 ? 'Limit Doldu' : 'Fotoğraf Ekle'}</span>
            </button>
          </div>
          
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload('photos', e.target.files)}
            className="hidden"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.photos.map((file, index) => (
              <div key={index} className="relative bg-slate-700 rounded-lg p-4">
                <button
                  onClick={() => removeFile('photos', index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="text-center">
                  {getFileTypeIcon(file)}
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-cyber-400" />
              <h3 className="text-lg font-semibold text-white">Canlılık Videoları</h3>
              <span className="text-sm text-slate-400">({data.videos.length}/3)</span>
              {data.videos.length > 0 && (
                <CheckCircle className="h-4 w-4 text-cyber-400" />
              )}
            </div>
            <button
              onClick={() => videoInputRef.current?.click()}
              disabled={data.videos.length >= 3}
              className={`text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center space-x-2 shadow-lg ${
                data.videos.length >= 3
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyber-600 to-cyber-700 hover:from-cyber-700 hover:to-cyber-800 shadow-cyber-500/30'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>{data.videos.length >= 3 ? 'Limit Doldu' : 'Video Ekle'}</span>
            </button>
          </div>
          
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => handleFileUpload('videos', e.target.files)}
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.videos.map((file, index) => (
              <div key={index} className="relative bg-slate-700 rounded-lg p-4">
                <button
                  onClick={() => removeFile('videos', index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-3">
                  {getFileTypeIcon(file)}
                  <div className="flex-1">
                    <p className="text-sm text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-secure-400" />
              <h3 className="text-lg font-semibold text-white">Ses Biyometrisi</h3>
              <span className="text-sm text-slate-400">({data.audioRecordings.length}/3)</span>
              {data.audioRecordings.length > 0 && (
                <CheckCircle className="h-4 w-4 text-secure-400" />
              )}
            </div>
            <button
              onClick={() => audioInputRef.current?.click()}
              disabled={data.audioRecordings.length >= 3}
              className={`text-white text-sm font-medium py-2 px-4 rounded-lg transition-all flex items-center space-x-2 shadow-lg ${
                data.audioRecordings.length >= 3
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-secure-600 to-secure-700 hover:from-secure-700 hover:to-secure-800 shadow-secure-500/30'
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>{data.audioRecordings.length >= 3 ? 'Limit Doldu' : 'Ses Ekle'}</span>
            </button>
          </div>
          
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => handleFileUpload('audioRecordings', e.target.files)}
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.audioRecordings.map((file, index) => (
              <div key={index} className="relative bg-slate-700 rounded-lg p-4">
                <button
                  onClick={() => removeFile('audioRecordings', index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-3">
                  {getFileTypeIcon(file)}
                  <div className="flex-1">
                    <p className="text-sm text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 relative z-10">
        <button
          onClick={onBack}
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Geri</span>
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-gradient-to-r from-cyber-600 to-cyber-700 hover:from-cyber-700 hover:to-cyber-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-cyber-500/30"
        >
          <span>Biyometrik Analiz</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {!canProceed && (
        <div className="bg-amber-600/20 border border-amber-500/30 rounded-lg p-4 mt-4 relative z-10">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-400" />
            <p className="text-amber-300 text-sm">
              Devam etmek için en az bir yüz fotoğrafı, bir canlılık videosu ve bir ses kaydı yüklemelisiniz.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};