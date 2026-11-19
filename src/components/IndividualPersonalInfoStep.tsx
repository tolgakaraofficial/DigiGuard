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
      newErrors.firstName = 'First name is required';
    } else if (data.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (data.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!data.birthDate) {
      newErrors.birthDate = 'Date of birth is required';
    } else {
      const birthYear = new Date(data.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) {
        newErrors.birthDate = 'You must be at least 18 years old';
      } else if (currentYear - birthYear > 100) {
        newErrors.birthDate = 'Please enter a valid date of birth';
      }
    }

    if (!data.nationality) {
      newErrors.nationality = 'Nationality selection is required';
    }

    if (!data.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (data.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    if (!data.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!data.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{5}$/.test(data.postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits';
    }

    if (data.phone && !/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
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
        <User className="h-6 w-6 text-cyber-400" />
        <h2 className="text-2xl font-bold text-white">Individual Registration - Personal Information</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Please fill in your personal information completely and accurately for identity verification.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              First Name *
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.firstName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Your first name"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Last Name *
            </label>
            <input
              type="text"
              required
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.lastName ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Your last name"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date of Birth *
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
              Nationality *
            </label>
            <select
              required
              value={data.nationality}
              onChange={(e) => handleChange('nationality', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.nationality ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select</option>
              <option value="TR">Republic of Turkey</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="UK">United Kingdom</option>
              <option value="NL">Netherlands</option>
              <option value="BE">Belgium</option>
              <option value="AT">Austria</option>
              <option value="CH">Switzerland</option>
              <option value="other">Other</option>
            </select>
            {errors.nationality && <p className="text-red-400 text-sm mt-1">{errors.nationality}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Phone
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
              Email
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Address *
          </label>
          <textarea
            required
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white resize-none ${
              errors.address ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Enter your full address"
          />
          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              City *
            </label>
            <select
              required
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white ${
                errors.city ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select city</option>
              {turkishCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Postal Code *
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
            Social Media Links (Optional)
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
                placeholder='@username'
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
                placeholder='linkedin.com/in/username'
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
                placeholder='@username'
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
                placeholder='facebook.com/username'
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
                placeholder='youtube.com/@channel'
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
                placeholder='@username'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-xs text-slate-400 mb-1.5 flex items-center gap-1'>
                <Link className='h-3 w-3' /> Website
              </label>
              <input
                type='text'
                value={data.socialLinks?.website || ''}
                onChange={(e) => handleSocialChange('website', e.target.value)}
                className='w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm'
                placeholder='https://www.yoursite.com'
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white font-medium py-3 px-8 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-cyber-500/30"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
