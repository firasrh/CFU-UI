import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/users';
const baseUrl2 = 'http://localhost:8080/api/auth';
const HTTP_HEADERS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }),
};
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get<any>(`${baseUrl}/all-users`, HTTP_HEADERS);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
  createUser(data: any): Observable<any> {
    return this.http.post(`${baseUrl2}/signup`, data, httpOptions);
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }
  getUser(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/userById/${id}`, HTTP_HEADERS);
  }
}
