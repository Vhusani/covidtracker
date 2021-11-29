import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('https://corona.lmao.ninja/v2/countries');
  }

  getCountry(country:any){
    return this.http.get('https://corona.lmao.ninja/v2/countries/'+ country)
  }

}
