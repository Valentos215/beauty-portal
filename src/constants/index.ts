import newsLogo from 'assets/Drinks.svg';
import servicesLogo from 'assets/Drinks.svg';
import profileLogo from 'assets/Drinks.svg';
import settingsLogo from 'assets/Drinks.svg';

export const NAV_MENU = [
  { title: 'Новини', link: 'news', logo: newsLogo },
  { title: 'Послуги', link: 'services', logo: servicesLogo },
  { title: 'Мій кабінет', link: 'profile', logo: profileLogo },
  { title: 'Налаштування', link: 'settings', logo: settingsLogo },
];

export enum ERouterLink {
  Root = '/',
  News = '/news',
  Servises = '/servises',
  Profile = '/profile',
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
  { text: '30 хв', duration: 1 },
  { text: '1 година', duration: 2 },
  { text: '1 година 30 хв', duration: 3 },
  { text: '2 години', duration: 4 },
  { text: '2 години 30 хв', duration: 5 },
  { text: '3 години', duration: 6 },
  { text: '3 години 30 хв', duration: 7 },
  { text: '4 години', duration: 8 },
];
