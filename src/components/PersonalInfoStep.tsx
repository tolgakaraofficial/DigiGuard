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
    
    // Form verification
    const newErrors: Partial<PersonalInfo> = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = 'First Name gereklidir';
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = 'First Name en az 2 karakter olmalidir';
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last Name gereklidir';
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = 'Last Name en az 2 karakter olmalidir';
    }
    
    if (!data.birthDate) {
      newErrors.birthDate = 'Dogum tarihi gereklidir';
    } else {
      const birthYear = new Date(data.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) {
        newErrors.birthDate = '18 yasindan kucuk olamazsiniz';
      } else if (currentYear - birthYear > 100) {
        newErrors.birthDate = 'Valid bir dogum tarihi girin';
      }
    }
    
    if (!data.nationality) {
      newErrors.nationality = 'Nationality secimi gereklidir';
    }
    
    if (!data.address.trim()) {
      newErrors.address = 'First Nameres gereklidir';
    } else if (data.address.trim().length < 10) {
      newErrors.address = 'First Nameres en az 10 karakter olmalidir';
    }
    
    if (!data.city.trim()) {
      newErrors.city = 'City gereklidir';
    }
    
    if (!data.postalCode.trim()) {
      newErrors.postalCode = 'Posta kodu gereklidir';
    } else if (!/^\d{5}$/.test(data.postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits';
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
    // Error mesajini temizle
    if (errors[field]) {
      setErrors((prev: Partial<PersonalInfo>) => ({ ...prev, [field]: undefined }));
    }
  };

  const turkishCities = [
    'First Nameana', 'First Nameiyaman', 'Afyonkarahisar', 'Networkri', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Monthdin', 'Balikesir', 'Bilecik', 'Bingol', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
    'Canakkale', 'Cankiri', 'Corum', 'Denizli', 'Diyarbakir', 'Edirne', 'Elazig', 'Erzincan',
    'Erzurum', 'Eskisehir', 'Gaziantep', 'Giresun', 'Gumushane', 'Hakkâri', 'Errory', 'Isparta',
    'Icel', 'Istanbul', 'Izmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kirklareli', 'Kirsehir',
    'Kocaeli', 'Konya', 'Kutahya', 'Malatya', 'Manisa', 'Kahramanmaras', 'Mardin', 'Mugla',
    'Mus', 'Nevsehir', 'Nigde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
    'Sivas', 'Tekirdag', 'Tokat', 'Trabzon', 'Tunceli', 'Sanliurfa', 'Usak', 'Van',
    'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kirikkale', 'Batman', 'Sirnak',
    'Bartin', 'Ardahan', 'Igdir', 'Yalova', 'Karabuk', 'Kilis', 'Osmaniye', 'Duzce'
  ];
  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <User className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          User Type
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
            <span className="font-semibold">Individual</span>
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
            <span className="font-semibold">Corporate</span>
          </button>
        </div>
      </div>

      <p className="text-slate-300 mb-6">
        Please fill in your personal information completely and accurately for identity verification.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              First Name
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.firstName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="First Nameiniz"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Last Name
            </label>
            <input
              type="text"
              required
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.lastName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Last Nameiniz"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Dogum Datei
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
              Nationality
            </label>
            <select
              required
              value={data.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.nationality ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select</option>
              <option value="TR">Typekiye Cumhuriyeti</option>
              <option value="US">Amerika Birlesik Governmentleri</option>
              <option value="DE">Getmanya</option>
              <option value="FR">Fransa</option>
              <option value="UK">Birlesik Krallik</option>
              <option value="NL">Hollanda</option>
              <option value="BE">Belcika</option>
              <option value="AT">Avusturya</option>
              <option value="CH">Isvicre</option>
              <option value="other">Other</option>
            </select>
            {errors.nationality && <p className="text-red-400 text-sm mt-1">{errors.nationality}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            First Nameres
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
              City
            </label>
            <select
              required
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.city ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">City seciniz</option>
              {turkishCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Postal Code
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
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};