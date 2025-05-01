export interface FixtureType {
  _id: string;
  fixture_mid: string;
  season: number;
  competition_name: string;
  fixture_datetime: string | Date;
  fixture_round: number;
  home_team: string;
  away_team: string;
  createdAt: string;
  updatedAt: string;
}

export enum Status {
  Idle = 'idle',
  Uploading = 'uploading',
  Success = 'success',
  Error = 'error',
}
