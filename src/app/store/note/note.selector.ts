import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './note.reducer';

export const selectNotesState =
  createFeatureSelector<fromReducer.NoteState>('notes');

export const selectNotes = createSelector(selectNotesState, (state) => {
  return state.notes;
});

export const selectNoteDetailsById = (id: number) =>
  createSelector(selectNotesState, (state) => {
    return state.notes.find((note) => note.id === Number(id));
  });
