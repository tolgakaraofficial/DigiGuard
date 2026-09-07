import React, { useState } from 'react';
import { ArrowRight, User, Calendar, MapPin, Globe, Phone, Mail, Link, Twitter, Linkedin, Instagram, Facebook, Youtube, Send, Share2 } from 'lucide-react';
import { PersonalInfo } from '../types';

interface IndividualPersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export const IndividualPersonalInfoStep: React.FC<IndividualPersonalInfoStepProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    if (data.phone && !/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
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
    if (errors[field]) {
      setErrors((prev: Partial<PersonalInfo>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialChange = (field: string, value: string) => {
    onChange({ ...data, socialLinks: { ...data.socialLinks, [field]: value } });
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
        <User className="h-6 w-6 text-cyber-400" />
        <h2 className="text-2xl font-bold text-white">Bireysel Kayıt - Kişisel Bilgiler</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Kimlik doğrulama için kişisel bilgilerinizi eksiksiz ve doğru bir şekilde doldurun.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Ad *
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.firstName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Adınız"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Soyad *
            </label>
            <input
              type="text"
              required
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.lastName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Soyadınız"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Doğum Tarihi *
            </label>
            <input
              type="date"
              required
              value={data.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.birthDate ? 'border-red-500' : 'border-slate-600'
              }`}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            />
            {errors.birthDate && <p className="text-red-400 text-sm mt-1">{errors.birthDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Globe className="inline h-4 w-4 mr-1" />
              Uyruk *
            </label>
            <select
              required
              value={data.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Telefon
            </label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.phone ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="5XX XXX XX XX"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              E-posta
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="ornek@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Adres *
          </label>
          <textarea
            required
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white resize-none ${
              errors.address ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Tam adresinizi girin"
          />
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Şehir *
            </label>
            <select
              required
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
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
              Posta Kodu *
            </label>
            <input
              type="text"
              required
              value={data.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.postalCode ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="34000"
              maxLength={5}
            />
            {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-slate-700 pt-6">
          <label className="block text-sm font-medium text-slate-300 mb-4 flex items-center">
            <Share2 className="inline h-4 w-4 mr-1 text-cyber-400" />
            Sosyal Medya Linkleri (Opsiyonel)
          </label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Twitter className='h-3 w-3' /> Twitter/X
              </label>
              <input
                type='text'
                value={data.socialLinks?.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='@kullanici'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Linkedin className='h-3 w-3' /> LinkedIn
              </label>
              <input
                type='text'
                value={data.socialLinks?.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='linkedin.com/in/kullanici'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Instagram className='h-3 w-3' /> Instagram
              </label>
              <input
                type='text'
                value={data.socialLinks?.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='@kullanici'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Facebook className='h-3 w-3' /> Facebook
              </label>
              <input
                type='text'
                value={data.socialLinks?.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='facebook.com/kullanici'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Youtube className='h-3 w-3' /> YouTube
              </label>
              <input
                type='text'
                value={data.socialLinks?.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='youtube.com/@kanal'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Send className='h-3 w-3' /> Telegram
              </label>
              <input
                type='text'
                value={data.socialLinks?.telegram || ''}
                onChange={(e) => handleSocialChange('telegram', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='@kullanici'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Link className='h-3 w-3' /> Web Sitesi
              </label>
              <input
                type='text'
                value={data.socialLinks?.website || ''}
                onChange={(e) => handleSocialChange('website', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='https://www.siteadi.com'
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-cyber-500/30"
          >
            <span>Devam Et</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
