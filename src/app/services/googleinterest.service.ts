import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8099/';
const HTTP_HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class GoogleinterestService {
    constructor(private http: HttpClient) {}
    
    getInterestOverTime(coin: string, since: string, until: string) {
        return this.http.get(baseUrl + 'getInerestOverTimeGT/'+coin+"/"+since+"/"+until,HTTP_HEADERS)
          
      }
      getInterestByRegion(coin: string, since: string, until: string) {
        return this.http.get(baseUrl + 'getInterestByRegion/'+coin+"/"+since+"/"+until,HTTP_HEADERS)
          
      }
      getInterestBySubRegion(coin: string, since: string, until: string,geo: string) {
        return this.http.get(baseUrl + 'getInterestBySubRegion/'+coin+"/"+since+"/"+until+"/"+geo,HTTP_HEADERS)
          
      }
      getRelatedQuery(coin: string, since: string, until: string) {
        return this.http.get(baseUrl + 'getRelatedQueries/'+coin+"/"+since+"/"+until,HTTP_HEADERS)
          
      }

      getInterestOverTimeRegion(coin: string, since: string, until: string,geo: string) {
        return this.http.get(baseUrl + 'getInerestOverTimeGTRegion/'+coin+"/"+since+"/"+until+"/"+geo,HTTP_HEADERS)
          
      }


}