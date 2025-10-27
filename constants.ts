import { ListingData } from './types';

export const LISTING_TYPE_OPTIONS = [
  "Satılık", 
  "Kiralık", 
  "Devren Satılık", 
  "Kat Karşılığı"
];

export const PORTFOLIO_TYPE_OPTIONS = [
  "Konut", 
  "Lüks Konut", 
  "Mağaza", 
  "Ofis", 
  "Atölye", 
  "Fabrika", 
  "Tarla", 
  "Arsa"
];

export const INITIAL_DATA: ListingData = {
  consultantName: '',
  gsmNumber: '',
  listingType: '',
  portfolioType: '',
  price: '',
  location: 'İl, İlçe, Mahalle',
  headline: '30 Karakterlik İlan Başlığı'
};