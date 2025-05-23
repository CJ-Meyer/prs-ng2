import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
import { RequestCreateDto } from '../model/request-create-dto';

const URL = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  list(): Observable<Request[]> {
    return this.http.get<Request[]>(`${URL}/`);
  }

  getById(id: number): Observable<Request> {
    return this.http.get<Request>(`${URL}/${id}`);
  }

  add(requestDto: RequestCreateDto): Observable<Request> {
    console.log('request service add - request:', requestDto);
    return this.http.post<Request>(`${URL}`, requestDto);
  }

  update(request: Request): Observable<Request> {
    return this.http.put<Request>(`${URL}/${request.id}`, request);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  submitForReview(id: number): Observable<Request> {
    console.log('request service submitForReview - id:', id);
    console.log(`${URL}/submit-review/${id}`);
    return this.http.get(`${URL}/submit-review/${id}`) as Observable<Request>;
  }
  getAllForReview(id: number): Observable<Request[]> {
    console.log(`${URL}/list-review/${id}`);
    return this.http.get<Request[]>(`${URL}/list-review/${id}`);
  }

  approve(id: number): Observable<Request> {
    return this.http.put<Request>(`${URL}/approve/${id}`, {});
  }

  reject(id: number, reason: string): Observable<Request> {
    return this.http.put<Request>(`${URL}/reject/${id}`, {
      reasonForRejection: reason
    });
  }
}
