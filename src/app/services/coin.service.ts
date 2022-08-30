import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from '../models/Coin';
const baseUrl = 'http://localhost:8081/api/coin';
const HTTP_HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private http: HttpClient) {}
  getCurrency(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`,
      HTTP_HEADERS
    );
  }
  getTrendingCurrency(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
      HTTP_HEADERS
    );
  }
  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,
      HTTP_HEADERS
    );
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      HTTP_HEADERS
    );
  }
  createCoin(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data, HTTP_HEADERS);
  }
  getUserCoins(id: any): Observable<Coin> {
    return this.http.get(`${baseUrl}/UserCoins/${id}`, HTTP_HEADERS);
  }

  deleteCoin(id: any, userID: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}/${userID}`, HTTP_HEADERS);
  }
  getExchangeByCoinId(coinId: string, currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`
    );
  }
  addTransaction(transaction: any): Observable<any> {
    return this.http.post(
      `http://localhost:8083/api/transaction/create`,
      transaction,
      { responseType: 'text' }
    );
  }
  getTransactions(portfolioId: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8083/api/transaction/getTransactions/${portfolioId}`
    );
  }
  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(
      `http://localhost:8083/api/transaction/delete/${id}`
    );
  }
  putTransaction(transaction: any): Observable<any> {
    return this.http.put(
      `http://localhost:8083/api/transaction/update`,
      transaction,
      { responseType: 'text' }
    );
  }
  getCoinMarkets(coinId: string): Observable<any> {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
  }
  getCatgeories(): Observable<any> {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/categories/list`,
      HTTP_HEADERS
    );
  }
  get24hChange(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
      HTTP_HEADERS
    );
  }
}
