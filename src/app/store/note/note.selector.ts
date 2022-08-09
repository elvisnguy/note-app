import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './note.reducer';
import { cloneDeep } from 'lodash';
import { NoteModel } from '../../model/note/note.model';
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
  return notes.slice(0, 10);
});

export const selectNoteDetailsById = (noteId: number) =>
  createSelector(selectNoteEntities, (noteEntities) => noteEntities[noteId]);
