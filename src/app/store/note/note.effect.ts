import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../../service/note/note.service';
import * as NoteAction from './note.action';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Route, Router } from '@angular/router';

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

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteAction.createNote),
      exhaustMap((action) =>
        this.noteService.createNote(action.note).pipe(
          map((res) => {
            this.router.navigate(['/']);
            return NoteAction.createNoteSuccess({ note: res });
          }),
          catchError((error) => {
            return of(
              NoteAction.createNoteFail({
                error,
              })
            );
          })
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteAction.deleteNote),
      exhaustMap((action) =>
        this.noteService.deleteNote(action.noteId).pipe(
          map(() =>
            NoteAction.deleteNoteSuccess({
              noteId: action.noteId,
            })
          ),
          catchError((error) => of(NoteAction.createNoteFail({ error })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteAction.updateNote),
      exhaustMap((action) =>
        this.noteService.updateNote(action.note).pipe(
          map((res) => {
            this.router.navigate(['/']);
            return NoteAction.updateNoteSuccess({ note: res });
          }),
          catchError((error) => of(NoteAction.updateNoteFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private noteService: NoteService,
    private router: Router
  ) {}
}
