import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './note.reducer';
import { cloneDeep } from 'lodash';

export const selectNotesState =
  createFeatureSelector<fromReducer.NoteState>('notes');

export const selectNotes = createSelector(selectNotesState, (state) => {
  return cloneDeep(state.notes)
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 10);
});

export const selectNoteDetailsById = (id: number) =>
  createSelector(selectNotesState, (state) => {
    return state.notes.find((note) => note.id === Number(id));
  });
