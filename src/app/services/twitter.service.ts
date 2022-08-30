import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HTTP_HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
    
  constructor(private http: HttpClient) {
    
    
  }
  

  getTweets(coin:string) { 
  return this.http.get('http://localhost:8000/twitter/'+coin,HTTP_HEADERS)
      
  }
  getCandles(coin:string) { 
    return this.http.get('http://localhost:8000/candles/'+coin,HTTP_HEADERS)
        
    }

}

    