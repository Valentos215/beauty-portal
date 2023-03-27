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
  startTime: string;
  duration: number;
}
export interface IArtistProfileData {
  schedule: IDay[];
  proceduresList: IArtistProcedure[];
}
export interface IClientProfileData {
  proceduresList: IClientProcedure[];
  dateNow: string;
}
