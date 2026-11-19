import React from 'react';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, CreditCard, Calendar, Building } from 'lucide-react';
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

    const newErrors: Partial<IdentityInfo> = {};

    if (!data.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    } else if (data.idType === 'tc' && !/^\d{11}$/.test(data.idNumber)) {
      newErrors.idNumber = 'National ID number must be 11 digits';
    }

    if (!data.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    }

    if (!data.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (new Date(data.expiryDate) < new Date()) {
      newErrors.expiryDate = 'Identity document has expired';
    }

    if (!data.issuingAuthority.trim()) {
      newErrors.issuingAuthority = 'Issuing authority is required';
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
    if (errors[field as keyof Partial<IdentityInfo>]) {
      setErrors((prev: Partial<IdentityInfo>) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Identity Information</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Please fill in your identity document information completely and accurately.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Identity Type
          </label>
          <select
            required
            value={data.idType}
            onChange={(e) => handleChange('idType', e.target.value as IdentityInfo['idType'])}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            <option value="tc">National ID Card</option>
            <option value="passport">Passport</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {data.idType === 'tc' ? 'National ID Number' : 'ID/Passport Number'}
          </label>
          <input
            type={data.idType === 'tc' ? 'text' : 'text'}
            required
            value={data.idNumber}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
              errors.idNumber ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder={data.idType === 'tc' ? '12345678901' : 'ID number'}
            maxLength={data.idType === 'tc' ? 11 : undefined}
          />
          {errors.idNumber && <p className="text-red-400 text-sm mt-1">{errors.idNumber}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Issue Date
            </label>
            <input
              type="date"
              required
              value={data.issueDate}
              onChange={(e) => handleChange('issueDate', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.issueDate ? 'border-red-500' : 'border-slate-600'
              }`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.issueDate && <p className="text-red-400 text-sm mt-1">{errors.issueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Expiry Date
            </label>
            <input
              type="date"
              required
              value={data.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
                errors.expiryDate ? 'border-red-500' : 'border-slate-600'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Building className="inline h-4 w-4 mr-1" />
            Issuing Authority
          </label>
          <input
            type="text"
            required
            value={data.issuingAuthority}
            onChange={(e) => handleChange('issuingAuthority', e.target.value)}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
              errors.issuingAuthority ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="E.g.: Istanbul Governor's Office"
          />
          {errors.issuingAuthority && <p className="text-red-400 text-sm mt-1">{errors.issuingAuthority}</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

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
