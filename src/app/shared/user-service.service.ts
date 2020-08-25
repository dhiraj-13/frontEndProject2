import { Injectable,EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { user } from '../model/use.model';



const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  mockUrl: string = 'http://localhost:3000/user';
  alluser: user[];
  dataStatus = new EventEmitter();
  constructor(private http: HttpClient)
  {
  }

  statusUpdated = new EventEmitter<string>();



   }

