import { createReducer, on } from '@ngrx/store';
import * as NoteAction from './note.action';
import { NoteModel } from '../../model/note/note.model';
// @ts-ignore
import * as _ from 'lodash';
import {
  createEntityAdapter,
  EntityState,
  EntityAdapter,
  Update,
} from '@ngrx/entity';

export interface NoteState extends EntityState<NoteModel> {
  pending: boolean;
}

export const noteAdapter: EntityAdapter<NoteModel> =
  createEntityAdapter<NoteModel>({
    sortComparer: (a, b) => Number(b.id) - Number(a.id),
    selectId: (note: NoteModel) => note.id,
  });

export const initialState: NoteState = noteAdapter.getInitialState({
  pending: false,
});

export const notesReducer = createReducer(
  initialState,

  on(NoteAction.getNote, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteSuccess, (state, { notes }) => {
    return noteAdapter.setAll(notes, { ...state, pending: false });
  }),

  on(NoteAction.getNoteFail, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteDetail, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteDetailSuccess, (state, { note }) => {
    return noteAdapter.upsertOne(note, { ...state });
  }),

  on(NoteAction.getNoteDetailFail, (state) => {
    return { ...state };
  }),

  on(NoteAction.createNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.createNoteSuccess, (state, { note }) => {
    return noteAdapter.addOne(note, { ...state, pending: false });
  }),
  on(NoteAction.createNoteFail, (state) => {
    return { ...state };
  }),
  on(NoteAction.deleteNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.deleteNoteSuccess, (state, { noteId }) => {
    return noteAdapter.removeOne(noteId, { ...state });
  }),
  on(NoteAction.deleteNoteFail, (state) => {
    return { ...state };
  }),
  on(NoteAction.updateNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.updateNoteSuccess, (state, { note }) => {
    const notes: Update<NoteModel> = {
      id: note.id,
      changes: note,
    };
    return noteAdapter.updateOne(notes, { ...state });
  }),
  on(NoteAction.updateNoteFail, (state) => {
    return { ...state };
  })
);
