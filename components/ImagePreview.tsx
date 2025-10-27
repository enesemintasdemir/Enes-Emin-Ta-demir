import React from 'react';
import { ListingData } from '../types';
import { Phone, MapPin } from 'lucide-react';

interface ImagePreviewProps {
  previewRef: React.RefObject<HTMLDivElement>;
  data: ListingData;
  consultantPhoto: string | null;
  portfolioPhoto: string | null;
  logo: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ previewRef, data, consultantPhoto, portfolioPhoto, logo }) => {
  const formatPhoneNumber = (gsm: string) => {
    const cleaned = ('' + gsm).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if(cleaned.length > 10 && cleaned.startsWith('5')) {
      match = cleaned.substring(cleaned.length - 10).match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    }
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }
    return gsm;
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price.replace(/\D/g, ''), 10);
    if (isNaN(num)) return "Belirtilmemiş";
    return `${num.toLocaleString('tr-TR')} TL`;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center text-white mb-4">Canlı Önizleme</h2>
      <div 
        ref={previewRef}
        className="w-[360px] h-[640px] bg-slate-700 shadow-2xl rounded-xl overflow-hidden font-sans flex flex-col relative"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {/* Background Photo */}
        {portfolioPhoto ? (
          <img src={portfolioPhoto} alt="Portföy" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <p>Portföy Görseli Yüklenecek</p>
          </div>
        )}
        
        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-violet/90 via-brand-violet/50 to-brand-violet/70"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between text-white">
          {/* Top Section */}
          <div className="w-full flex flex-col items-center justify-start pt-8 px-6">
             {logo ? (
                <img src={logo} alt="Resital Plus Logo" className="w-60" />
            ) : (
                <div className="h-10 w-60 bg-white/20 rounded-md flex items-center justify-center text-sm text-white/60">Logo Alanı</div>
            )}
            <h1 className="text-white text-3xl font-bold mt-4 text-center leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
              {data.headline || "İlan Başlığı"}
            </h1>
          </div>
          
          {/* Bottom Section */}
          <div className="w-full flex flex-col items-center justify-end pb-12 px-6 pt-[72px]">
            <h2 className="text-white text-2xl font-bold text-center">
              {data.consultantName || "Ad Soyad"}
            </h2>
            <div className="flex items-center text-slate-200 mt-1">
              <Phone size={16} className="mr-2" />
              <p className="text-md">{formatPhoneNumber(data.gsmNumber) || "(5xx) xxx xx xx"}</p>
            </div>
            
            <div className="w-full border-t border-white/20 my-4"></div>

            <div className="grid grid-cols-2 gap-x-4 text-center w-full">
              <p className="font-bold text-lg">{data.listingType}</p>
              <p className="font-bold text-lg">{data.portfolioType}</p>
            </div>
            
             <div className="flex items-center text-slate-200 mt-3">
              <MapPin size={16} className="mr-2" />
              <p className="text-md text-center">{data.location}</p>
            </div>

            <p className="text-brand-gold text-4xl font-extrabold mt-4">
              {formatPrice(data.price)}
            </p>
          </div>
          
          {/* Consultant Photo - Overlapping */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36">
            <div className="w-full h-full rounded-full bg-gray-200 border-8 border-white shadow-lg overflow-hidden flex items-center justify-center">
               {consultantPhoto ? (
                  <img src={consultantPhoto} alt="Danışman" className="w-full h-full object-cover" />
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;