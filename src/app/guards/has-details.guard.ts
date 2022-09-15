import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  filter,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AppState } from '../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectNoteDetailsById } from '../store/note/note.selector';
import { getNoteDetail } from '../store/note/note.action';

@Injectable({
  providedIn: 'root',
})
export class HasDetailsGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const noteId = route.params['id'];
    return this.store.pipe(
      select(selectNoteDetailsById(2)),
      map((details) => !!details),
      tap((details) => {
        if (!details) {
          this.store.dispatch(getNoteDetail({ noteId }));
        }
      }),
      filter((loaded) => !!loaded),
      mergeMap((filter) => of(filter))
    );
  }
}
