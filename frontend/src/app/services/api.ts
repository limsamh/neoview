import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SavedQuery {
  id?: number;
  name: string;
  query: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  runQuery(query: string, endpoint?: string, useLocal?: boolean): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/query`, { query, endpoint, use_local: useLocal });
  }

  saveQuery(query: SavedQuery): Observable<SavedQuery> {
    return this.http.post<SavedQuery>(`${this.baseUrl}/queries/`, query);
  }

  getSavedQueries(): Observable<SavedQuery[]> {
    return this.http.get<SavedQuery[]>(`${this.baseUrl}/queries/`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }
}
