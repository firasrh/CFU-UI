import { Portfolio } from './../models/Portfolio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8081/api/portfolio';
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
export class PortfolioService {
  constructor(private http: HttpClient) {}
  getUserPortfolios(id: any): Observable<Portfolio> {
    return this.http.get(`${baseUrl}/UserPortfolios/${id}`);
  }
  getPortfolioCoins(id: any): Observable<Portfolio> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  addCoinToPortfolio(id: any, coinID: any): Observable<any> {
    return this.http.put(
      `${baseUrl}/addCoinToPortfolio/${id}/${coinID}`,
      HTTP_HEADERS
    );
  }
  deleteCoinFromPortfolio(id: string, coinID: string): Observable<any> {
    return this.http.delete(
      `${baseUrl}/deleteCoinFromPortfolio/${id}/${coinID}`
    );
  }
  createPortfolio(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }
  deletePortfolio(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
  updatePortfolio(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }
}
