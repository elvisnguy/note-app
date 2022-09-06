import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyableComponent implements OnDestroy {
  protected componentDestroyed$: Subject<any>;

  constructor() {
    this.componentDestroyed$ = new Subject();
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
