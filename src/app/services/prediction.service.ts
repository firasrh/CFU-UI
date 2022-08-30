import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PredictModel } from '../models/PredictModel';
import { map } from 'rxjs/operators';

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
export class PredictionService {
    
  constructor(private http: HttpClient) {
    
    
  }
  

  predict(predict_values:PredictModel) { 
  return this.http.get('http://localhost:8000/predict/'+predict_values.likes
  +'/'+predict_values.comments+'/'+predict_values.retweets+'/'+predict_values.posts
  +'/'+predict_values.interest+'/'+predict_values.open+'/'+predict_values.low
  +'/'+predict_values.volume
  
  
  ,HTTP_HEADERS)   
  }
  

}

    