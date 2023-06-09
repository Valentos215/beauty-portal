export interface IDay {
  date: string;
  schedule: string[];
}

export interface IDayWithStatus {
  date: string;
  status: string;
}
export interface ICategory {
  categoryId: string;
  categoryTitle: string;
}

export interface IClientProcedure {
  categoryTitle: string;
  artistId: string;
  artistPhone: string;
  date: string;
  startTime: string;
  duration: number;
}
export interface IArtistProcedure {
  procedureId: string;
  categoryTitle: string;
  clientName: string;
  clientPhone: string;
  date: string;
  startTime: string;
  duration: number;
  description: string;
}
export interface IArtistCabinetData {
  categories: ICategory[];
  weekend: number[];
  recordAhead: number;
  workingHours: string[];
  breakHours: string[];
  dateNow: string;
  proceduresList: IArtistProcedure[];
}
export interface IClientCabinetData {
  proceduresList: IClientProcedure[];
  dateNow: string;
}

export interface ITimeLine {
  startTime: string;
  endTime: string;
  title: string;
  timeStatus: string;
  clientName?: string;
  clientPhone?: string;
  description?: string;
}
