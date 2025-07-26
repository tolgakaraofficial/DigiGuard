import React from 'react';
import { ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (field: keyof IdentityInfo, value: string | IdentityInfo['idType']) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Kimlik Bilgileri</h2>
      </div>

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
            placeholder={data.idType === 'tc' ? '12345678901' : 'Kimlik numarası'}
          />
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
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Geri</span>
          </button>

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