import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private _bufferValue: BehaviorSubject<number>;
  private _mode: BehaviorSubject<string>;
  private _value: BehaviorSubject<number>;
  private _visible: BehaviorSubject<boolean>;

  constructor(private _router: Router, private store: Store<AppState>) {
    this._init();
  }

  get bufferValue(): Observable<any> {
    return this._bufferValue.asObservable();
  }

  get mode(): Observable<any> {
    return this._mode.asObservable();
  }

  get value(): Observable<any> {
    return this._value.asObservable();
  }

  get visible(): Observable<any> {
    return this._visible.asObservable();
  }

  private _init(): void {
    this._bufferValue = new BehaviorSubject(0);
    this._mode = new BehaviorSubject('indeterminate');
    this._value = new BehaviorSubject(0);
    this._visible = new BehaviorSubject(false);

    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.show();
      });

    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel
        )
      )
      .subscribe(() => {
        setTimeout(() => {
          this.hide();
        }, 3000);
      });
  }
  private show(): void {
    this._visible.next(true);
  }

  private hide(): void {
    this._visible.next(false);
  }
}
