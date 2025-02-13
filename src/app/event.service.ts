
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressCountDTO } from './models/address-count-dto.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8089/parisEventProject/events/address-price'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  getAddressCounts(): Observable<AddressCountDTO[]> {
    return this.http.get<AddressCountDTO[]>(this.apiUrl);
  }
}
