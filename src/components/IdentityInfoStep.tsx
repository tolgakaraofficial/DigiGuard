import React from 'react';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard, Calendar, Building, AlertTriangle, CheckCircle } from 'lucide-react';
import { IdentityInfo } from '../types';

interface IdentityInfoStepProps {
  data: IdentityInfo;
  onChange: (data: IdentityInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IdentityInfoStep: React.FC<IdentityInfoStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Partial<IdentityInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    const newErrors: Partial<IdentityInfo> = {};
    
    if (!data.idNumber.trim()) {
      newErrors.idNumber = 'Kimlik numarası gereklidir';
    } else if (data.idType === 'tc') {
      if (!/^\d{11}$/.test(data.idNumber)) {
        newErrors.idNumber = 'T.C. Kimlik numarası 11 haneli olmalıdır';
      } else if (!validateTCKN(data.idNumber)) {
        newErrors.idNumber = 'Geçersiz T.C. Kimlik numarası';
      }
    } else if (data.idType === 'passport') {
      if (data.idNumber.length < 6 || data.idNumber.length > 12) {
        newErrors.idNumber = 'Pasaport numarası 6-12 karakter arasında olmalıdır';
      }
    }
    
    if (!data.issueDate) {
      newErrors.issueDate = 'Veriliş tarihi gereklidir';
    } else {
      const issueDate = new Date(data.issueDate);
      const today = new Date();
      if (issueDate > today) {
        newErrors.issueDate = 'Veriliş tarihi bugünden sonra olamaz';
      }
    }
    
    if (!data.expiryDate) {
      newErrors.expiryDate = 'Son geçerlilik tarihi gereklidir';
    } else {
      const expiryDate = new Date(data.expiryDate);
      const issueDate = new Date(data.issueDate);
      const today = new Date();
      
      if (expiryDate <= today) {
        newErrors.expiryDate = 'Kimlik belgenizin süresi dolmuş';
      } else if (data.issueDate && expiryDate <= issueDate) {
        newErrors.expiryDate = 'Son geçerlilik tarihi veriliş tarihinden sonra olmalıdır';
      }
    }
    
    if (!data.issuingAuthority.trim()) {
      newErrors.issuingAuthority = 'Veren makam gereklidir';
    } else if (data.issuingAuthority.trim().length < 3) {
      newErrors.issuingAuthority = 'Veren makam en az 3 karakter olmalıdır';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onNext();
  };

  const handleChange = (field: keyof IdentityInfo, value: string | IdentityInfo['idType']) => {
    onChange({ ...data, [field]: value });
    // Hata mesajını temizle
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // T.C. Kimlik Numarası doğrulama algoritması
  const validateTCKN = (tckn: string): boolean => {
    if (tckn.length !== 11) return false;
    if (tckn[0] === '0') return false;
    
    const digits = tckn.split('').map(Number);
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    
    const check1 = (oddSum * 7 - evenSum) % 10;
    const check2 = (oddSum + evenSum + digits[9]) % 10;
    
    return check1 === digits[9] && check2 === digits[10];
  };
  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Kimlik Bilgileri</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Kimlik doğrulama için resmi kimlik belgenizin bilgilerini eksiksiz olarak girin.
      </p>

      {data.idType === 'tc' && (
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-blue-300 text-sm font-medium">T.C. Kimlik Kartı Bilgisi</p>
            <p className="text-blue-200 text-xs mt-1">
              T.C. Kimlik numaranız otomatik olarak doğrulanacaktır. Lütfen kimlik kartınızda yazan numarayı eksiksiz girin.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Kimlik Türü
          </label>
          <select
            required
            value={data.idType}
            onChange={(e) => handleChange('idType', e.target.value as IdentityInfo['idType'])}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            <option value="tc">T.C. Kimlik Kartı</option>
            <option value="passport">Pasaport</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {data.idType === 'tc' ? 'T.C. Kimlik Numarası' : 'Kimlik/Pasaport Numarası'}
          </label>
          <input
            type="text"
            required
            value={data.idNumber}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              let value = e.target.value;
              if (data.idType === 'tc') {
                value = value.replace(/\D/g, '').slice(0, 11);
              }
              handleChange('idNumber', value);
            placeholder={data.idType === 'tc' ? '12345678901' : 'Kimlik numarası'}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
              errors.idNumber ? 'border-red-500' : 'border-slate-600'
            }`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Veriliş Tarihi
            </label>
            <input
              type="date"
              required
              value={data.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Son Geçerlilik Tarihi
            </label>
            <input
              type="date"
              required
              value={data.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Veren Makam
          </label>
          <input
            type="text"
            required
            value={data.issuingAuthority}
            onChange={(e) => handleChange('issuingAuthority', e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            placeholder="Örn: İstanbul Valiliği"
            maxLength={data.idType === 'tc' ? 11 : data.idType === 'passport' ? 12 : undefined}
          />
          {errors.idNumber && <p className="text-red-400 text-sm mt-1">{errors.idNumber}</p>}
          {data.idType === 'tc' && data.idNumber.length === 11 && validateTCKN(data.idNumber) && (
            <p className="text-emerald-400 text-sm mt-1 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              T.C. Kimlik numarası geçerli
            </p>
          )}
            <Building className="inline h-4 w-4 mr-1" />
        </div>

          <select
            type="button"
              <Calendar className="inline h-4 w-4 mr-1" />
            onClick={onBack}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
              errors.issuingAuthority ? 'border-red-500' : 'border-slate-600'
            }`}
          >
            <option value="">Veren makamı seçiniz</option>
            {data.idType === 'tc' ? (
              <>
                <option value="Adana Valiliği">Adana Valiliği</option>
                <option value="Ankara Valiliği">Ankara Valiliği</option>
                <option value="Antalya Valiliği">Antalya Valiliği</option>
                <option value="Bursa Valiliği">Bursa Valiliği</option>
                <option value="İstanbul Valiliği">İstanbul Valiliği</option>
                <option value="İzmir Valiliği">İzmir Valiliği</option>
                <option value="Gaziantep Valiliği">Gaziantep Valiliği</option>
                <option value="Konya Valiliği">Konya Valiliği</option>
                <option value="Diğer Valilik">Diğer Valilik</option>
              </>
            ) : data.idType === 'passport' ? (
              <>
                <option value="T.C. Dışişleri Bakanlığı">T.C. Dışişleri Bakanlığı</option>
                <option value="Ankara Emniyet Müdürlüğü">Ankara Emniyet Müdürlüğü</option>
                <option value="İstanbul Emniyet Müdürlüğü">İstanbul Emniyet Müdürlüğü</option>
                <option value="İzmir Emniyet Müdürlüğü">İzmir Emniyet Müdürlüğü</option>
                <option value="Diğer Emniyet Müdürlüğü">Diğer Emniyet Müdürlüğü</option>
              </>
            ) : (
              <option value="Diğer Resmi Kurum">Diğer Resmi Kurum</option>
            )}
          </select>
          {errors.issuingAuthority && <p className="text-red-400 text-sm mt-1">{errors.issuingAuthority}</p>}
                errors.issueDate ? 'border-red-500' : 'border-slate-600'
              }`}
              max={new Date().toISOString().split('T')[0]}
            <span>Geri</span>
              <Calendar className="inline h-4 w-4 mr-1" />
            {errors.issueDate && <p className="text-red-400 text-sm mt-1">{errors.issueDate}</p>}
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.expiryDate ? 'border-red-500' : 'border-slate-600'
              }`}
              min={data.issueDate || new Date().toISOString().split('T')[0]}
            <ArrowRight className="h-5 w-5" />
            {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
          </button>
        </div>
      </form>
    </div>
  );
};