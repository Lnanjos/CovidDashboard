export class Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Latitude: number = 0;
  Longitude: number = 0;
  //to linechart in dataview
  Confirmed: number;
  Deaths: number;
  Recovered: number;
}
