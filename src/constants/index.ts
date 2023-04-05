import newsLogo from 'assets/Drinks.svg';
import servicesLogo from 'assets/Drinks.svg';
import cabinetLogo from 'assets/Drinks.svg';
import settingsLogo from 'assets/Drinks.svg';

export const NAV_MENU = [
  { title: 'Новини', link: 'news', logo: newsLogo },
  { title: 'Послуги', link: 'services', logo: servicesLogo },
  { title: 'Мій кабінет', link: 'cabinet', logo: cabinetLogo },
  { title: 'Налаштування', link: 'settings', logo: settingsLogo },
];

export enum ERouterLink {
  Root = '/',
  News = '/news',
  Servises = '/servises',
  Cabinet = '/cabinet',
  Settings = '/settings',
}

export enum EDateStatus {
  EmptySpace = 'empty_space',
  NonWorking = 'nonworking',
  Free = 'free',
  PartFilled = 'partfilled',
  FulFilled = 'fulfilled',
}

export const uaDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];

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
  'Жовтень',
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
  'Жовтня',
  'Листопада',
  'Грудня',
];

export const durationList = [
  { text: '30 хв', duration: 30 },
  { text: '1 година', duration: 60 },
  { text: '1 година 30 хв', duration: 180 },
  { text: '2 години', duration: 240 },
  { text: '2 години 30 хв', duration: 300 },
  { text: '3 години', duration: 360 },
  { text: '3 години 30 хв', duration: 420 },
  { text: '4 години', duration: 480 },
];
