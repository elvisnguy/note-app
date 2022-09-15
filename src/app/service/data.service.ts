import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userNameSource$ = new BehaviorSubject('');

  constructor() {}

  setUser(user: string) {
    this.userNameSource$.next(user);
  }

  getUserSubject() {
    return this.userNameSource$;
  }
}
