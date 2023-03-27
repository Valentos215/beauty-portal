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
  Current = 'current',
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
