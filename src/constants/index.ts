import newsLogo from 'assets/Drinks.svg';
import servicesLogo from 'assets/Drinks.svg';
import officeLogo from 'assets/Drinks.svg';
import settingsLogo from 'assets/Drinks.svg';

export const NAV_MENU = [
  { title: 'Новини', link: 'news', logo: newsLogo },
  { title: 'Послуги', link: 'services', logo: servicesLogo },
  { title: 'Мій кабінет', link: 'office', logo: officeLogo },
  { title: 'Налаштування', link: 'settings', logo: settingsLogo },
];

export enum ERouterLink {
  Root = '/',
  News = '/news',
  Servises = '/servises',
  Office = '/office',
  Settings = '/settings',
}

export enum EDateStatus {
  NonWorking = 'nonworking',
  Current = 'current',
  Free = 'free',
  PartFilled = 'partfilled',
  FulFilled = 'fulfilled',
}

export const uaMonths = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Листопад',
  'Грудень',
];

export const uaMonthsVidminok = [
  'Січня',
  'Лютого',
  'Березня',
  'Квітня',
  'Травня',
  'Червня',
  'Липня',
  'Серпня',
  'Вересня',
  'Листопада',
  'Грудня',
];
