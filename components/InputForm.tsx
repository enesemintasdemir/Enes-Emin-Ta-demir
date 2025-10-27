import React from 'react';
import { ListingData } from '../types';
import { LISTING_TYPE_OPTIONS, PORTFOLIO_TYPE_OPTIONS } from '../constants';

interface InputFormProps {
  data: ListingData;
  onDataChange: (field: keyof ListingData, value: string) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPortfolioPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  consultantPhoto: string | null;
  portfolioPhoto: string | null;
  logo: string | null;
}

const InputField: React.FC<{
  label: string;
  id: keyof ListingData;
  value: string;
  onChange: (id: keyof ListingData, value: string) => void;
  placeholder?: string;
  maxLength?: number;
}> = ({ label, id, value, onChange, placeholder, maxLength }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-300">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm"
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  id: keyof ListingData;
  value: string;
  onChange: (id: keyof ListingData, value: string) => void;
  options: string[];
}> = ({ label, id, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-300">{label}</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className={`mt-1 block w-full pl-3 pr-10 py-2 bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent sm:text-sm rounded-md text-white ${!value ? 'text-slate-400' : 'text-white'}`}
    >
      <option value="" disabled>Seçiniz</option>
      {options.map(option => <option key={option} value={option} className="bg-slate-800 text-white">{option}</option>)}
    </select>
  </div>
);


const InputForm: React.FC<InputFormProps> = ({ data, onDataChange, onPhotoChange, consultantPhoto, onPortfolioPhotoChange, portfolioPhoto, onLogoChange, logo }) => {
  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-center text-white">Story Detayları</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">Resital Plus Logo</label>
           <div className="mt-2 flex items-center space-x-4">
            {logo && <img src={logo} alt="Logo Preview" className="h-10 bg-white/10 p-1 rounded-md object-contain" />}
            <input 
              type="file" 
              accept="image/*"
              onChange={onLogoChange}
              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-violet hover:file:bg-yellow-400 transition-colors cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">Portföy Fotoğrafı (16:9)</label>
          <div className="mt-2 flex items-center space-x-4">
            {portfolioPhoto && <img src={portfolioPhoto} alt="Portföy" className="w-28 h-16 rounded-md object-cover ring-2 ring-brand-gold/50" />}
            <input 
              type="file" 
              accept="image/*"
              onChange={onPortfolioPhotoChange}
              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-violet hover:file:bg-yellow-400 transition-colors cursor-pointer"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300">Danışman Fotoğrafı (Kare)</label>
          <div className="mt-2 flex items-center space-x-4">
            {consultantPhoto && <img src={consultantPhoto} alt="Danışman" className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-gold/50" />}
            <input 
              type="file" 
              accept="image/*"
              onChange={onPhotoChange}
              className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-violet hover:file:bg-yellow-400 transition-colors cursor-pointer"
            />
          </div>
        </div>

        <InputField label="Danışman Adı Soyadı" id="consultantName" value={data.consultantName} onChange={onDataChange} placeholder="Ad Soyad" />
        <InputField label="GSM Numarası" id="gsmNumber" value={data.gsmNumber} onChange={onDataChange} placeholder="(5xx) xxx xx xx" maxLength={15} />
        <SelectField label="Pazarlama Cinsi" id="listingType" value={data.listingType} onChange={onDataChange} options={LISTING_TYPE_OPTIONS} />
        <SelectField label="Portföy Cinsi" id="portfolioType" value={data.portfolioType} onChange={onDataChange} options={PORTFOLIO_TYPE_OPTIONS} />
        <InputField label="Fiyat" id="price" value={data.price} onChange={onDataChange} placeholder="x.xxx.xxx TL" />
        <InputField label="Lokasyon" id="location" value={data.location} onChange={onDataChange} placeholder="İl, İlçe, Mahalle" />
        <InputField label="İlan Başlığı" id="headline" value={data.headline} onChange={onDataChange} placeholder="Öne Çıkan Başlık" maxLength={30} />
      </div>
    </div>
  );
};

export default InputForm;