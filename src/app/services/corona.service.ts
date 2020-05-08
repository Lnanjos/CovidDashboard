import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Summary } from '../common/summary';
import { Observable, BehaviorSubject } from 'rxjs';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  private baseUrl: String = "https://api.covid19api.com/";

  private sum: Observable<Summary>;
  
  private summary: Summary;
  
  sumBS = new BehaviorSubject<Summary>(this.summary);
  
  constructor(private httpClient: HttpClient) {
    console.log("ngOnInit coronaservice");
    this.getSummary().subscribe(data => {
      this.summary = data;
      this.sumBS.next(this.summary);
    });
  }

  getSummary():Observable<Summary>{
    const summaryUrl = this.baseUrl+"summary";
    if(this.sum == undefined){
      this.sum = this.httpClient.get<Summary>(summaryUrl);
    }
    return this.sum;
  }
  
  getDayOneAll(countrySlug:string):Observable<Country[]>{
    const getAllURL = this.baseUrl+"/total/dayone/country/"+countrySlug;
    return this.httpClient.get<Country[]>(getAllURL);
  }

}
