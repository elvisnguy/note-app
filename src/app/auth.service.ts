import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  user$ = new BehaviorSubject({
    name: 'thanh',
    role: 'editor',
    // role: 'read',
  });
}
