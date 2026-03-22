import React from 'react';
import { useState } from 'react';
import { ArrowRight, User, Calendar, MapPin, Globe, Building2 } from 'lucide-react';
import { PersonalInfo } from '../types';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
  userType?: 'individual' | 'corporate';
  onUserTypeChange?: (type: 'individual' | 'corporate') => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  data,
  onChange,
  onNext,
  userType = 'individual',
  onUserTypeChange,
}) => {
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    const newErrors: Partial<PersonalInfo> = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = 'Ad gereklidir';
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = 'Ad en az 2 karakter olmalıdır';
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Soyad gereklidir';
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = 'Soyad en az 2 karakter olmalıdır';
    }
    
    if (!data.birthDate) {
      newErrors.birthDate = 'Doğum tarihi gereklidir';
    } else {
      const birthYear = new Date(data.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) {
        newErrors.birthDate = '18 yaşından küçük olamazsınız';
      } else if (currentYear - birthYear > 100) {
        newErrors.birthDate = 'Geçerli bir doğum tarihi girin';
      }
    }
    
    if (!data.nationality) {
      newErrors.nationality = 'Uyruk seçimi gereklidir';
    }
    
    if (!data.address.trim()) {
      newErrors.address = 'Adres gereklidir';
    } else if (data.address.trim().length < 10) {
      newErrors.address = 'Adres en az 10 karakter olmalıdır';
    }
    
    if (!data.city.trim()) {
      newErrors.city = 'Şehir gereklidir';
    }
    
    if (!data.postalCode.trim()) {
      newErrors.postalCode = 'Posta kodu gereklidir';
    } else if (!/^\d{5}$/.test(data.postalCode)) {
      newErrors.postalCode = 'Posta kodu 5 haneli olmalıdır';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
    // Hata mesajını temizle
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const turkishCities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
    'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
    'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Isparta',
    'İçel', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla',
    'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
    'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van',
    'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
    'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ];
  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <User className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Kişisel Bilgiler</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Kullanıcı Tipi
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onUserTypeChange?.('individual')}
            className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
              userType === 'individual'
                ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-500 text-white shadow-lg'
                : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="font-semibold">Bireysel</span>
          </button>
          <button
            type="button"
            onClick={() => onUserTypeChange?.('corporate')}
            className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-2 ${
              userType === 'corporate'
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg'
                : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span className="font-semibold">Kurumsal</span>
          </button>
        </div>
      </div>

      <p className="text-slate-300 mb-6">
        Kimlik doğrulama için kişisel bilgilerinizi eksiksiz ve doğru bir şekilde doldurun.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Ad
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.firstName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Adınız"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Soyad
            </label>
            <input
              type="text"
              required
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.lastName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Soyadınız"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Doğum Tarihi
            </label>
            <input
              type="date"
              required
              value={data.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.birthDate ? 'border-red-500' : 'border-slate-600'
              }`}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            />
            {errors.birthDate && <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Globe className="inline h-4 w-4 mr-1" />
              Uyruk
            </label>
            <select
              required
              value={data.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.nationality ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Seçiniz</option>
              <option value="TR">Türkiye Cumhuriyeti</option>
              <option value="US">Amerika Birleşik Devletleri</option>
              <option value="DE">Almanya</option>
              <option value="FR">Fransa</option>
              <option value="UK">Birleşik Krallık</option>
              <option value="NL">Hollanda</option>
              <option value="BE">Belçika</option>
              <option value="AT">Avusturya</option>
              <option value="CH">İsviçre</option>
              <option value="other">Diğer</option>
            </select>
            {errors.nationality && <p className="text-red-400 text-sm mt-1">{errors.nationality}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Adres
          </label>
          <textarea
            required
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none ${
              errors.address ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Tam adresinizi girin"
          />
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Şehir
            </label>
            <select
              required
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.city ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Şehir seçiniz</option>
              {turkishCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Posta Kodu
            </label>
            <input
              type="number"
              required
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.postalCode ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Posta kodu"
              min="01000"
              max="81999"
            />
            {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Devam Et</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};