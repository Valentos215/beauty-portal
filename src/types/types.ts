export interface IDay {
  date: string;
  schedule: string[];
}

export interface IDayWithStatus extends IDay {
  status: string;
}
