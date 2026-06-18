import React, { useState } from 'react';
import {
  X, User, Building2, Mail, Phone, MapPin, Globe, Briefcase,
  DollarSign, FileText, CheckCircle, ArrowRight, ArrowLeft,
  Users, TrendingUp, Shield, Wallet, Send
} from 'lucide-react';

interface InvestorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InvestorType = 'individual' | 'corporate';
type Step = 'type' | 'form' | 'success';

const INVESTOR_EMAIL = 'kartolga3@gmail.com';

export const InvestorFormModal: React.FC<InvestorFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [investorType, setInvestorType] = useState<InvestorType>('individual');
  const [step, setStep] = useState<Step>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Individual form state
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    investmentRange: '',
    experience: '',
    message: '',
  });

  // Corporate form state
  const [corporateForm, setCorporateForm] = useState({
    companyName: '',
    companyType: '',
    registrationNumber: '',
    website: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    investmentRange: '',
    portfolioSize: '',
    message: '',
  });

  const investmentRanges = [
    { value: '10k-50k', label: '$10.000 - $50.000' },
    { value: '50k-100k', label: '$50.000 - $100.000' },
    { value: '100k-500k', label: '$100.000 - $500.000' },
    { value: '500k-1m', label: '$500.000 - $1.000.000' },
    { value: '1m+', label: '$1.000.000+' },
  ];

  const countries = [
    'Türkiye', 'Amerika Birleşik Devletleri', 'Almanya', 'İngiltere',
    'Fransa', 'Hollanda', 'İsviçre', 'Kanada', 'Avustralya', 'Japonya',
    'Singapur', 'Katar', 'BAE', 'Suudi Arabistan', 'Diğer'
  ];

  const companyTypes = [
    'Venture Capital', 'Private Equity', 'Angel Investor Network',
    'Corporate VC', 'Family Office', 'Hedge Fund', 'Accelerator/Incubator',
    'Sovereign Wealth Fund', 'Other'
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Build email body
    let subject = '';
    let body = '';

    if (investorType === 'individual') {
      subject = `Yatırımcı Başvurusu - Bireysel - ${individualForm.fullName}`;
      body = `
Yatırımcı Başvurusu - Bireysel
==============================

Ad Soyad: ${individualForm.fullName}
E-posta: ${individualForm.email}
Telefon: ${individualForm.phone}
Ülke: ${individualForm.country}
Şehir: ${individualForm.city}
Yatırım Aralığı: ${investmentRanges.find(r => r.value === individualForm.investmentRange)?.label || individualForm.investmentRange}

Yatırım Deneyimi:
${individualForm.experience}

Mesaj:
${individualForm.message}
      `.trim();
    } else {
      subject = `Yatırımcı Başvurusu - Kurumsal - ${corporateForm.companyName}`;
      body = `
Yatırımcı Başvurusu - Kurumsal
==============================

Şirket Adı: ${corporateForm.companyName}
Şirket Tipi: ${corporateForm.companyType}
Kayıt Numarası: ${corporateForm.registrationNumber}
Web Sitesi: ${corporateForm.website}

İletişim Kişisi: ${corporateForm.contactPerson}
E-posta: ${corporateForm.email}
Telefon: ${corporateForm.phone}

Ülke: ${corporateForm.country}
Şehir: ${corporateForm.city}
Yatırım Aralığı: ${investmentRanges.find(r => r.value === corporateForm.investmentRange)?.label || corporateForm.investmentRange}
Portföy Büyüklüğü: ${corporateForm.portfolioSize}

Mesaj:
${corporateForm.message}
      `.trim();
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Open mailto link
    const mailtoLink = `mailto:${INVESTOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('type');
    setIndividualForm({
      fullName: '', email: '', phone: '', country: '', city: '',
      investmentRange: '', experience: '', message: '',
    });
    setCorporateForm({
      companyName: '', companyType: '', registrationNumber: '', website: '',
      contactPerson: '', email: '', phone: '', country: '', city: '',
      investmentRange: '', portfolioSize: '', message: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-600/20 p-6 border-b border-amber-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Yatırımcı Başvuru Formu</h2>
                <p className="text-amber-300 text-sm">DigiGuard'a yatırım fırsatı</p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              step === 'type' ? 'bg-amber-500/30 text-amber-300' :
              step !== 'type' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
            }`}>
              {step !== 'type' && <CheckCircle className="h-3.5 w-3.5" />}
              Tip Seçimi
            </div>
            <div className={`h-px flex-1 ${step !== 'type' ? 'bg-green-500/50' : 'bg-slate-700'}`} />
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              step === 'form' ? 'bg-amber-500/30 text-amber-300' :
              step === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
            }`}>
              {step === 'success' && <CheckCircle className="h-3.5 w-3.5" />}
              Form
            </div>
            <div className={`h-px flex-1 ${step === 'success' ? 'bg-green-500/50' : 'bg-slate-700'}`} />
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              step === 'success' ? 'bg-amber-500/30 text-amber-300' : 'bg-slate-700 text-slate-400'
            }`}>
              Tamamlandı
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {step === 'type' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm mb-6">
                Yatırımcı tipinizi seçin. Bu seçime göre size özel bir form sunulacaktır.
              </p>

              <button
                onClick={() => { setInvestorType('individual'); setStep('form'); }}
                className={`w-full p-5 rounded-xl border-2 transition-all group ${
                  investorType === 'individual'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    investorType === 'individual'
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                      : 'bg-slate-700 group-hover:bg-amber-500/20'
                  }`}>
                    <User className={`h-6 w-6 ${
                      investorType === 'individual' ? 'text-white' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white">Bireysel Yatırımcı</h3>
                    <p className="text-slate-400 text-sm">Angel investor, yüksek net değerli birey</p>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${
                    investorType === 'individual' ? 'text-amber-400' : 'text-slate-500'
                  }`} />
                </div>
              </button>

              <button
                onClick={() => { setInvestorType('corporate'); setStep('form'); }}
                className={`w-full p-5 rounded-xl border-2 transition-all group ${
                  investorType === 'corporate'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    investorType === 'corporate'
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                      : 'bg-slate-700 group-hover:bg-amber-500/20'
                  }`}>
                    <Building2 className={`h-6 w-6 ${
                      investorType === 'corporate' ? 'text-white' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white">Kurumsal Yatırımcı</h3>
                    <p className="text-slate-400 text-sm">VC, PE, Aile Ofisi, Kurumsal VC</p>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${
                    investorType === 'corporate' ? 'text-amber-400' : 'text-slate-500'
                  }`} />
                </div>
              </button>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  Neden DigiGuard?
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Web4 ve Blockchain teknolojisi ile dijital kimlik devrimi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Sof ON, Sub ON, Soph ON teknolojileri ile AI entegrasyonu
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    A Serisi yatırım fırsatı
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 'form' && investorType === 'individual' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('type')}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Geri
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Ad Soyad *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={individualForm.fullName}
                      onChange={(e) => setIndividualForm({...individualForm, fullName: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    E-posta *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={individualForm.email}
                      onChange={(e) => setIndividualForm({...individualForm, email: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Telefon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={individualForm.phone}
                      onChange={(e) => setIndividualForm({...individualForm, phone: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Ülke *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      required
                      value={individualForm.country}
                      onChange={(e) => setIndividualForm({...individualForm, country: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                    >
                      <option value="">Seçin</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={individualForm.city}
                    onChange={(e) => setIndividualForm({...individualForm, city: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="Şehir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Yatırım Aralığı *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      required
                      value={individualForm.investmentRange}
                      onChange={(e) => setIndividualForm({...individualForm, investmentRange: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                    >
                      <option value="">Seçin</option>
                      {investmentRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Yatırım Deneyimi
                  </label>
                  <textarea
                    rows={2}
                    value={individualForm.experience}
                    onChange={(e) => setIndividualForm({...individualForm, experience: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                    placeholder="Önceki yatırım deneyimleriniz..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Mesajınız
                  </label>
                  <textarea
                    rows={3}
                    value={individualForm.message}
                    onChange={(e) => setIndividualForm({...individualForm, message: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                    placeholder="Eklemek istediğiniz notlar..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Başvuruyu Gönder
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'form' && investorType === 'corporate' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('type')}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Geri
              </button>

              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 mb-4">
                <p className="text-amber-300 text-xs flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Kurumsal Yatırımcı Formu
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Şirket Adı *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={corporateForm.companyName}
                      onChange={(e) => setCorporateForm({...corporateForm, companyName: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="Şirket adı"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Şirket Tipi *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      required
                      value={corporateForm.companyType}
                      onChange={(e) => setCorporateForm({...corporateForm, companyType: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                    >
                      <option value="">Seçin</option>
                      {companyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Kayıt Numarası
                  </label>
                  <input
                    type="text"
                    value={corporateForm.registrationNumber}
                    onChange={(e) => setCorporateForm({...corporateForm, registrationNumber: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="VKN / Registration No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Web Sitesi
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="url"
                      value={corporateForm.website}
                      onChange={(e) => setCorporateForm({...corporateForm, website: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    İletişim Kişisi *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={corporateForm.contactPerson}
                      onChange={(e) => setCorporateForm({...corporateForm, contactPerson: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="Ad Soyad"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    E-posta *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={corporateForm.email}
                      onChange={(e) => setCorporateForm({...corporateForm, email: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Telefon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={corporateForm.phone}
                      onChange={(e) => setCorporateForm({...corporateForm, phone: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Ülke *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      required
                      value={corporateForm.country}
                      onChange={(e) => setCorporateForm({...corporateForm, country: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                    >
                      <option value="">Seçin</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Yatırım Aralığı *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <select
                      required
                      value={corporateForm.investmentRange}
                      onChange={(e) => setCorporateForm({...corporateForm, investmentRange: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                    >
                      <option value="">Seçin</option>
                      {investmentRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Portföy Büyüklüğü
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={corporateForm.portfolioSize}
                      onChange={(e) => setCorporateForm({...corporateForm, portfolioSize: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                      placeholder="AUM (Assets Under Management)"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Mesajınız
                  </label>
                  <textarea
                    rows={3}
                    value={corporateForm.message}
                    onChange={(e) => setCorporateForm({...corporateForm, message: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                    placeholder="Ek notlar, yatırım kriterleri..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Başvuruyu Gönder
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Başvurunuz Alındı!</h3>
              <p className="text-slate-400 mb-6">
                Yatırımcı ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
                <p className="text-sm text-slate-300">
                  <span className="text-amber-400 font-semibold">{INVESTOR_EMAIL}</span> adresinden de bize ulaşabilirsiniz.
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
