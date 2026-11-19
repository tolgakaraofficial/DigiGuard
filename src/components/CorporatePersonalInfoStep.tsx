import React, { useState } from 'react';
import { ArrowRight, Building2, Calendar, MapPin, User, Phone, Mail, Globe, Award, Users, Briefcase, Link, Share2, Twitter, Linkedin, Instagram, Facebook, Youtube, Send } from 'lucide-react';
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
  const [socialLinks, setSocialLinks] = useState(data.socialLinks || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<CorporateInfo> = {};

    if (!data.companyName.trim() || data.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    if (!data.companyType) {
      newErrors.companyType = 'Company type selection is required';
    }

    if (!data.taxNumber.trim() || !/^\d{10}$/.test(data.taxNumber)) {
      newErrors.taxNumber = 'Tax number must be 10 digits';
    }

    if (!data.companyAddress.trim() || data.companyAddress.trim().length < 10) {
      newErrors.companyAddress = 'Company address must be at least 10 characters';
    }

    if (!data.companyCity.trim()) {
      newErrors.companyCity = 'City is required';
    }

    if (!data.companyPostalCode.trim() || !/^\d{5}$/.test(data.companyPostalCode)) {
      newErrors.companyPostalCode = 'Postal code must be 5 digits';
    }

    if (!data.authorizedPersonFirstName.trim() || data.authorizedPersonFirstName.trim().length < 2) {
      newErrors.authorizedPersonFirstName = 'Authorized person first name must be at least 2 characters';
    }

    if (!data.authorizedPersonLastName.trim() || data.authorizedPersonLastName.trim().length < 2) {
      newErrors.authorizedPersonLastName = 'Authorized person last name must be at least 2 characters';
    }

    if (!data.authorizedPersonTitle.trim()) {
      newErrors.authorizedPersonTitle = 'Authorized person title is required';
    }

    if (!data.authorizedPersonIdNumber.trim() || !/^\d{11}$/.test(data.authorizedPersonIdNumber)) {
      newErrors.authorizedPersonIdNumber = 'ID number must be 11 digits';
    }

    if (!data.authorizedPersonPhone.trim() || !/^[0-9]{10,11}$/.test(data.authorizedPersonPhone.replace(/\s/g, ''))) {
      newErrors.authorizedPersonPhone = 'Please enter a valid phone number';
    }

    if (!data.authorizedPersonEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.authorizedPersonEmail)) {
      newErrors.authorizedPersonEmail = 'Please enter a valid email address';
    }

    if (data.companyPhone && !/^[0-9]{10,11}$/.test(data.companyPhone.replace(/\s/g, ''))) {
      newErrors.companyPhone = 'Please enter a valid phone number';
    }

    if (data.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
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
      setErrors((prev: Partial<CorporateInfo>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialChange = (field: string, value: string) => {
    const updatedLinks = { ...socialLinks, [field]: value };
    setSocialLinks(updatedLinks);
    onChange({ ...data, socialLinks: updatedLinks });
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
        <Building2 className="h-6 w-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Corporate Registration - Company Information</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Please fill in company and authorized person information completely and accurately.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate-700/30 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Company Information
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Building2 className="inline h-4 w-4 mr-1" />
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={data.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="e.g. ABC Technology Inc."
                />
                {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Type *
                </label>
                <select
                  required
                  value={data.companyType}
                  onChange={(e) => handleChange('companyType', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyType ? 'border-red-500' : 'border-slate-600'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="limited">Limited Liability Company (LLC)</option>
                  <option value="anonim">Joint Stock Company (JSC)</option>
                  <option value="sahis">Sole Proprietorship</option>
                  <option value="komandit">Limited Partnership</option>
                  <option value="kolektif">General Partnership</option>
                  <option value="cooperative">Cooperative</option>
                  <option value="other">Other</option>
                </select>
                {errors.companyType && <p className="text-red-400 text-sm mt-1">{errors.companyType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Award className="inline h-4 w-4 mr-1" />
                  Tax Number *
                </label>
                <input
                  type="text"
                  required
                  value={data.taxNumber}
                  onChange={(e) => handleChange('taxNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.taxNumber ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="10-digit tax number"
                  maxLength={10}
                />
                {errors.taxNumber && <p className="text-red-400 text-sm mt-1">{errors.taxNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Trade Registry Number
                </label>
                <input
                  type="text"
                  value={data.tradeRegistryNumber}
                  onChange={(e) => handleChange('tradeRegistryNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="Trade registry number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  MERSIS Number
                </label>
                <input
                  type="text"
                  value={data.mersisNumber}
                  onChange={(e) => handleChange('mersisNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="16-digit MERSIS number"
                  maxLength={16}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Foundation Date
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
                  Employee Count
                </label>
                <select
                  value={data.employeeCount}
                  onChange={(e) => handleChange('employeeCount', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                >
                  <option value="">Select</option>
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
                  Selecttor
                </label>
                <input
                  type="text"
                  value={data.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="e.g. Technology, Finance, Healthcare"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  value={data.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="https://www.company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Company Phone
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
                  Company Email
                </label>
                <input
                  type="email"
                  value={data.companyEmail}
                  onChange={(e) => handleChange('companyEmail', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyEmail ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="info@company.com"
                />
                {errors.companyEmail && <p className="text-red-400 text-sm mt-1">{errors.companyEmail}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Company Address *
              </label>
              <textarea
                required
                value={data.companyAddress}
                onChange={(e) => handleChange('companyAddress', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none ${
                  errors.companyAddress ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Enter company address"
              />
              {errors.companyAddress && <p className="text-red-400 text-sm mt-1">{errors.companyAddress}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  City *
                </label>
                <select
                  required
                  value={data.companyCity}
                  onChange={(e) => handleChange('companyCity', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white ${
                    errors.companyCity ? 'border-red-500' : 'border-slate-600'
                  }`}
                >
                  <option value="">Select city</option>
                  {turkishCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.companyCity && <p className="text-red-400 text-sm mt-1">{errors.companyCity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Postal Code *
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
            Authorized Person Information
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonFirstName}
                  onChange={(e) => handleChange('authorizedPersonFirstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonFirstName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Authorized person first name"
                />
                {errors.authorizedPersonFirstName && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonFirstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonLastName}
                  onChange={(e) => handleChange('authorizedPersonLastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonLastName ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Authorized person last name"
                />
                {errors.authorizedPersonLastName && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonLastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonTitle}
                  onChange={(e) => handleChange('authorizedPersonTitle', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonTitle ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="e.g. CEO, Board Chairman"
                />
                {errors.authorizedPersonTitle && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ID Number *
                </label>
                <input
                  type="text"
                  required
                  value={data.authorizedPersonIdNumber}
                  onChange={(e) => handleChange('authorizedPersonIdNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonIdNumber ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="11-digit ID number"
                  maxLength={11}
                />
                {errors.authorizedPersonIdNumber && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonIdNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone *
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
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={data.authorizedPersonEmail}
                  onChange={(e) => handleChange('authorizedPersonEmail', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white ${
                    errors.authorizedPersonEmail ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="authorized@company.com"
                />
                {errors.authorizedPersonEmail && <p className="text-red-400 text-sm mt-1">{errors.authorizedPersonEmail}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-slate-700/30 rounded-lg p-6 border border-pink-500/20">
          <h3 className="text-lg font-semibold text-pink-400 mb-4 flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Social Media Links (Optional)
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Twitter className='h-3 w-3' /> Twitter/X
              </label>
              <input
                type='text'
                value={socialLinks.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='@username'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Linkedin className='h-3 w-3' /> LinkedIn
              </label>
              <input
                type='text'
                value={socialLinks.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='linkedin.com/in/username'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Instagram className='h-3 w-3' /> Instagram
              </label>
              <input
                type='text'
                value={socialLinks.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='@username'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Facebook className='h-3 w-3' /> Facebook
              </label>
              <input
                type='text'
                value={socialLinks.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='facebook.com/username'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Youtube className='h-3 w-3' /> YouTube
              </label>
              <input
                type='text'
                value={socialLinks.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='youtube.com/@channel'
              />
            </div>
            <div>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Send className='h-3 w-3' /> Telegram
              </label>
              <input
                type='text'
                value={socialLinks.telegram || ''}
                onChange={(e) => handleSocialChange('telegram', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='@username'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Link className='h-3 w-3' /> Website
              </label>
              <input
                type='text'
                value={socialLinks.website || ''}
                onChange={(e) => handleSocialChange('website', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm'
                placeholder='https://www.company.com'
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-sm text-pink-400 hover:text-pink-300 flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            First Named More
          </button>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-purple-500/30"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
