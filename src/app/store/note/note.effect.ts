import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../../service/note/note.service';
import * as NoteAction from './note.action';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';

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

  constructor(private actions$: Actions, private noteService: NoteService) {}
}
