import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Summary } from '../common/summary';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  private baseUrl: String = "https://api.covid19api.com/";

  constructor(private httpClient: HttpClient) { }

  getSummary(){
    const summaryUrl = this.baseUrl+"summary";
    return this.httpClient.get<Summary>(summaryUrl);
  }

}
