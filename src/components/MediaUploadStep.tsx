import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft, Upload, Camera, Video, Mic, X, Image } from 'lucide-react';
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

  const handleFileUpload = (type: keyof MediaFiles, files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
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

  const canProceed = data.photos.length > 0 && data.videos.length > 0 && data.audioRecordings.length > 0;

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <Upload className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Medya Dosyaları</h2>
      </div>

      <p className="text-slate-300 mb-8">
        Kimlik doğrulama için fotoğraf, video ve ses kayıtlarınızı yükleyin. Bu dosyalar güvenli şekilde şifrelenerek saklanacaktır.
      </p>

      <div className="space-y-8">
        {/* Photos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Fotoğraflar</h3>
              <span className="text-sm text-slate-400">({data.photos.length}/5)</span>
            </div>
            <button
              onClick={() => photoInputRef.current?.click()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Image className="h-4 w-4" />
              <span>Fotoğraf Ekle</span>
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
                  <Image className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Videolar</h3>
              <span className="text-sm text-slate-400">({data.videos.length}/3)</span>
            </div>
            <button
              onClick={() => videoInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Video className="h-4 w-4" />
              <span>Video Ekle</span>
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
                  <Video className="h-8 w-8 text-blue-400" />
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Ses Kayıtları</h3>
              <span className="text-sm text-slate-400">({data.audioRecordings.length}/3)</span>
            </div>
            <button
              onClick={() => audioInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Mic className="h-4 w-4" />
              <span>Ses Ekle</span>
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
                  <Mic className="h-8 w-8 text-purple-400" />
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

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Geri</span>
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>Devam Et</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {!canProceed && (
        <p className="text-amber-400 text-sm mt-4 text-center">
          Devam etmek için en az bir fotoğraf, bir video ve bir ses kaydı yüklemelisiniz.
        </p>
      )}
    </div>
  );
};