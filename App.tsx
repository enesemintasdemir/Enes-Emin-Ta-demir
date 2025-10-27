import React, { useState, useRef, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download } from 'lucide-react';
import InputForm from './components/InputForm';
import ImagePreview from './components/ImagePreview';
import { ListingData } from './types';
import { INITIAL_DATA } from './constants';

const formatGsmForInput = (value: string): string => {
  const cleaned = ('' + value).replace(/\D/g, '');
  if (!cleaned) return '';
  
  const truncated = cleaned.substring(0, 10);
  const parts: string[] = [];
  
  if (truncated.length > 0) {
    parts.push('(' + truncated.substring(0, 3));
  }
  if (truncated.length > 3) {
    parts.push(') ' + truncated.substring(3, 6));
  }
  if (truncated.length > 6) {
    parts.push(' ' + truncated.substring(6, 8));
  }
  if (truncated.length > 8) {
    parts.push(' ' + truncated.substring(8, 10));
  }
  return parts.join('');
};

const formatPriceForInput = (value: string): string => {
  const cleaned = ('' + value).replace(/\D/g, '');
  if (!cleaned) return '';

  const num = parseInt(cleaned, 10);
  if (isNaN(num)) return '';

  return `${num.toLocaleString('tr-TR')} TL`;
};

function App() {
  const [data, setData] = useState<ListingData>(INITIAL_DATA);
  const [consultantPhoto, setConsultantPhoto] = useState<string | null>(null);
  const [portfolioPhoto, setPortfolioPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (field: keyof ListingData, value: string) => {
    if (field === 'gsmNumber') {
      const formattedValue = formatGsmForInput(value);
      setData(prevData => ({ ...prevData, [field]: formattedValue }));
    } else if (field === 'price') {
      const formattedValue = formatPriceForInput(value);
      setData(prevData => ({ ...prevData, [field]: formattedValue }));
    } else {
      setData(prevData => ({ ...prevData, [field]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (aspectRatio < 0.9 || aspectRatio > 1.1) {
          alert('Lütfen kare formatına yakın bir danışman fotoğrafı yükleyin.');
        }
        setConsultantPhoto(URL.createObjectURL(file));
      };
      img.src = URL.createObjectURL(file);
    }
  };
  
  const handlePortfolioPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPortfolioPhoto(URL.createObjectURL(file));
    }
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleDownload = useCallback(() => {
    if (!previewRef.current) {
      return;
    }
    setIsGenerating(true);
    htmlToImage.toJpeg(previewRef.current, { 
      quality: 0.98,
      pixelRatio: 3, // Scale the 360x640 preview to 1080x1920
     })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `resital-plus-story-${new Date().getTime()}.jpeg`;
        link.href = dataUrl;
        link.click();
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
        alert('Görsel oluşturulurken bir hata oluştu!');
        setIsGenerating(false);
      });
  }, [previewRef]);

  return (
    <div className="bg-slate-900 min-h-screen w-full flex flex-col items-center p-4 sm:p-8 font-sans text-slate-200">
      <header className="text-center mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white">Resital Plus</h1>
        <p className="text-lg text-slate-400 mt-2">Instagram Story Oluşturucu</p>
      </header>

      <main className="w-full flex flex-col lg:flex-row justify-center items-start gap-12">
        <InputForm 
          data={data}
          onDataChange={handleDataChange}
          onPhotoChange={handlePhotoChange}
          consultantPhoto={consultantPhoto}
          onPortfolioPhotoChange={handlePortfolioPhotoChange}
          portfolioPhoto={portfolioPhoto}
          onLogoChange={handleLogoChange}
          logo={logo}
        />
        <div className="flex flex-col items-center w-full lg:w-auto sticky top-8">
          <ImagePreview 
            previewRef={previewRef}
            data={data}
            consultantPhoto={consultantPhoto}
            portfolioPhoto={portfolioPhoto}
            logo={logo}
          />
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="mt-8 flex items-center justify-center w-full max-w-xs px-6 py-3 border border-transparent text-base font-bold rounded-full text-brand-violet bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-gold disabled:bg-yellow-800/50 disabled:text-yellow-500/50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Oluşturuluyor...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                JPG Olarak İndir
              </>
            )}
          </button>
        </div>
      </main>
      
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Resital Plus. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;
