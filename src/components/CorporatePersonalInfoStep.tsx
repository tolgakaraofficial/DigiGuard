import React, { useState } from 'react';
import { ArrowRight, Building2, Calendar, MapPin, User, Phone, Mail, Globe, Award, Users, Briefcase } from 'lucide-react';
import { CorporateInfo } from '../types';

interface CorporatePersonalInfoStepProps {
  data: CorporateInfo;
  onChange: (data: CorporateInfo) => void;
  onNext: () => void;
}

export const CorporatePersonalInfoStep: React.FC<CorporatePersonalInfoStepProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errors, setErrors] = useState<Partial<CorporateInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<CorporateInfo> = {};

    if (!data.companyName.trim() || data.companyName.trim().length < 2) {
      newErrors.companyName = 'Şirket adı en az 2 karakter olmalıdır';
    }

    if (!data.companyType) {
      newErrors.companyType = 'Şirket türü seçimi gereklidir';
    }

    if (!data.taxNumber.trim() || !/^\d{10}$/.test(data.taxNumber)) {
      newErrors.taxNumber = 'Vergi numarası 10 haneli olmalıdır';
    }

    if (!data.companyAddress.trim() || data.companyAddress.trim().length < 10) {
      newErrors.companyAddress = 'Şirket adresi en az 10 karakter olmalıdır';
    }

    if (!data.companyCity.trim()) {
      newErrors.companyCity = 'Şehir gereklidir';
    }

    if (!data.companyPostalCode.trim() || !/^\d{5}$/.test(data.companyPostalCode)) {
      newErrors.companyPostalCode = 'Posta kodu 5 haneli olmalıdır';
    }

    if (!data.authorizedPersonFirstName.trim() || data.authorizedPersonFirstName.trim().length < 2) {
      newErrors.authorizedPersonFirstName = 'Yetkili kişi adı en az 2 karakter olmalıdır';
    }

    if (!data.authorizedPersonLastName.trim() || data.authorizedPersonLastName.trim().length < 2) {
      newErrors.authorizedPersonLastName = 'Yetkili kişi soyadı en az 2 karakter olmalıdır';
    }

    if (!data.authorizedPersonTitle.trim()) {
      newErrors.authorizedPersonTitle = 'Yetkili kişi ünvanı gereklidir';
    }

    if (!data.authorizedPersonIdNumber.trim() || !/^\d{11}$/.test(data.authorizedPersonIdNumber)) {
      newErrors.authorizedPersonIdNumber = 'T.C. Kimlik numarası 11 haneli olmalıdır';
    }

    if (!data.authorizedPersonPhone.trim() || !/^[0-9]{10,11}$/.test(data.authorizedPersonPhone.replace(/\s/g, ''))) {
      newErrors.authorizedPersonPhone = 'Geçerli bir telefon numarası girin';
    }

    if (!data.authorizedPersonEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorizedPersonEmail)) {
      newErrors.authorizedPersonEmail = 'Geçerli bir e-posta adresi girin';
    }

    if (data.companyPhone && !/^[0-9]{10,11}$/.test(data.companyPhone.replace(/\s/g, ''))) {
      newErrors.companyPhone = 'Geçerli bir telefon numarası girin';
    }

    if (data.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.companyEmail)) {
      newErrors.companyEmail = 'Geçerli bir e-posta adresi girin';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  const handleChange = (field: keyof CorporateInfo, value: string) => {
    onChange({ ...data, [field]: value });
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
        <Building2 className="h-6 w-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Kurumsal Kayıt - Şirket Bilgileri</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Şirket ve yetkili kişi bilgilerini eksiksiz ve doğru bir şekilde doldurun.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate-700/30 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Şirket Bilgileri
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Building2 className="inline h-4 w-4 mr-1" />
                  Şirket Ünvanı *
                </label>
                <input
                  type="text"
                  required
                  value={data.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Örn: ABC Teknoloji A.Ş."
                />
                {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Şirket Türü *
                </label>
                <select
                  required
                  value={data.companyType}
                  onChange={(e) => handleChange('companyType', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyType ? 'border-red-500' : 'border-slate-600'
                  }`}
                >
                  <option value="">Seçiniz</option>
                  <option value="limited">Limited Şirket (Ltd. Şti.)</option>
                  <option value="anonim">Anonim Şirket (A.Ş.)</option>
                  <option value="sahis">Şahıs Şirketi</option>
                  <option value="komandit">Komandit Şirket</option>
                  <option value="kolektif">Kolektif Şirket</option>
                  <option value="cooperative">Kooperatif</option>
                  <option value="other">Diğer</option>
                </select>
                {errors.companyType && <p className="text-red-400 text-sm mt-1">{errors.companyType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Award className="inline h-4 w-4 mr-1" />
                  Vergi Numarası *
                </label>
                <input
                  type="text"
                  required
                  value={data.taxNumber}
                  onChange={(e) => handleChange('taxNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.taxNumber ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="10 haneli vergi numarası"
                  maxLength={10}
                />
                {errors.taxNumber && <p className="text-red-400 text-sm mt-1">{errors.taxNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ticaret Sicil Numarası
                </label>
                <input
                  type="text"
                  value={data.tradeRegistryNumber}
                  onChange={(e) => handleChange('tradeRegistryNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="Ticaret sicil numarası"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  MERSİS Numarası
                </label>
                <input
                  type="text"
                  value={data.mersisNumber}
                  onChange={(e) => handleChange('mersisNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="16 haneli MERSİS numarası"
                  maxLength={16}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Kuruluş Tarihi
                </label>
                <input
                  type="date"
                  value={data.foundationDate}
                  onChange={(e) => handleChange('foundationDate', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Çalışan Sayısı
                </label>
                <select
                  value={data.employeeCount}
                  onChange={(e) => handleChange('employeeCount', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                >
                  <option value="">Seçiniz</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501+">501+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Briefcase className="inline h-4 w-4 mr-1" />
                  Sektör
                </label>
                <input
                  type="text"
                  value={data.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="Örn: Teknoloji, Finans, Sağlık"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Web Sitesi
                </label>
                <input
                  type="url"
                  value={data.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="https://www.sirketadi.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Şirket Telefonu
                </label>
                <input
                  type="tel"
                  value={data.companyPhone}
                  onChange={(e) => handleChange('companyPhone', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyPhone ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="2XX XXX XX XX"
                />
                {errors.companyPhone && <p className="text-red-400 text-sm mt-1">{errors.companyPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Şirket E-postası
                </label>
                <input
                  type="email"
                  value={data.companyEmail}
                  onChange={(e) => handleChange('companyEmail', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyEmail ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="info@sirket.com"
                />
                {errors.companyEmail && <p className="text-red-400 text-sm mt-1">{errors.companyEmail}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Şirket Adresi *
              </label>
              <textarea
                required
                value={data.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none ${
                  errors.companyAddress ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Şirket adresini girin"
              />
              {errors.companyAddress && <p className="text-red-400 text-sm mt-1">{errors.companyAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Şehir *
                </label>
                <select
                  required
                  value={data.companyCity}
                  onChange={(e) => handleChange('companyCity', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyCity ? 'border-red-500' : 'border-slate-600'
                  }`}
                >
                  <option value="">Şehir seçiniz</option>
                  {turkishCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.companyCity && <p className="text-red-400 text-sm mt-1">{errors.companyCity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Posta Kodu *
                </label>
                <input
                  type="text"
                  required
                  value={data.companyPostalCode}
                  onChange={(e) => handleChange('companyPostalCode', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyPostalCode ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="34000"
                  maxLength={5}
                />
                {errors.companyPostalCode && <p className="text-red-400 text-sm mt-1">{errors.companyPostalCode}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-6 border border-cyan-500/20">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Yetkili Kişi Bilgileri
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Ad *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonFirstName}
                  onChange={(e) => handleChange('authorizedPersonFirstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonFirstName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Yetkili kişi adı"
                />
                {errors.authorizedPersonFirstName && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonFirstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonLastName}
                  onChange={(e) => handleChange('authorizedPersonLastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonLastName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Yetkili kişi soyadı"
                />
                {errors.authorizedPersonLastName && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonLastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ünvan *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonTitle}
                  onChange={(e) => handleChange('authorizedPersonTitle', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonTitle ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Örn: Genel Müdür, Yönetim Kurulu Başkanı"
                />
                {errors.authorizedPersonTitle && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  T.C. Kimlik No *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonIdNumber}
                  onChange={(e) => handleChange('authorizedPersonIdNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonIdNumber ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="11 haneli T.C. kimlik no"
                  maxLength={11}
                />
                {errors.authorizedPersonIdNumber && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonIdNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={data.authorizedPersonPhone}
                  onChange={(e) => handleChange('authorizedPersonPhone', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonPhone ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="5XX XXX XX XX"
                />
                {errors.authorizedPersonPhone && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  E-posta *
                </label>
                <input
                  type="email"
                  required
                  value={data.authorizedPersonEmail}
                  onChange={(e) => handleChange('authorizedPersonEmail', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonEmail ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="yetkili@sirket.com"
                />
                {errors.authorizedPersonEmail && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonEmail}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-purple-500/30"
          >
            <span>Devam Et</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
