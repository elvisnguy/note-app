import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../../service/note/note.service';
import * as NoteAction from './note.action';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class NoteEffect {
  getNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteAction.getNote),
      concatMap(() =>
        this.noteService.getNote().pipe(
          map((res) => {
            return NoteAction.getNoteSuccess({ notes: res });
          }),
          catchError((error) => {
            return of(NoteAction.getNoteFail({ error }));
          })
        )
      )
    )
  );

  getNoteDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteAction.getNoteDetail),
      mergeMap((action) =>
        this.noteService.getNoteDetail(action.noteId).pipe(
          map((res) => {
            return NoteAction.getNoteDetailSuccess({ note: res });
          }),
          catchError((error) => {
            return of(NoteAction.getNoteDetailFail({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private noteService: NoteService) {}
}
