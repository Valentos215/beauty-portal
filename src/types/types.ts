export interface IDay {
  date: string;
  schedule: string[];
}

export interface IDayWithStatus {
  date: string;
  status: string;
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
  categoryTitle: string;
  clientPhone: string;
  date: string;
  startTime: string;
  duration: number;
}
export interface IArtistCabinetData {
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
