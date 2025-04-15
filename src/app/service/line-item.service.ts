import { Injectable } from '@angular/core';
import { LineItem } from '../model/line-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:8080/api/lineitems';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
    constructor(private http: HttpClient) {}
  
    list(): Observable<LineItem[]> {
      return this.http.get<LineItem[]>(`${URL}/`);
    }
  
    getById(id: number): Observable<LineItem> {
      return this.http.get<LineItem>(`${URL}/${id}`);
    }
  
    add(lineItem: LineItem): Observable<LineItem> {
      console.log('lineItem service add - lineItem:', lineItem);
      return this.http.post<LineItem>(`${URL}`, lineItem);
    }
  
    update(lineItem: LineItem): Observable<LineItem> {
      return this.http.put<LineItem>(`${URL}/${lineItem.id}`, lineItem);
    }
  
    delete(id: number): Observable<any> {
      return this.http.delete(`${URL}/${id}`);
    }
    listByRequestId(requestId: number): Observable<LineItem[]> {
      return this.http.get<LineItem[]>(URL + '/lines-for-req/' + requestId);
    }
    
}
