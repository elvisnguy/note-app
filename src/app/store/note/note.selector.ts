import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './note.reducer';
import { noteAdapter } from './note.reducer';

export const selectNotesState =
  createFeatureSelector<fromReducer.NoteState>('notes');

const {
  selectIds,
  selectEntities: selectNoteEntities,
  selectAll: selectAllNotes,
  selectTotal,
} = noteAdapter.getSelectors(selectNotesState);

export const selectNotes = createSelector(selectAllNotes, (notes) => {
  return notes;
});

export const selectNoteDetailsById = (noteId: number) =>
  createSelector(selectNoteEntities, (noteEntities) => noteEntities[noteId]);
