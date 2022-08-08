import { createReducer, on } from '@ngrx/store';
import * as NoteAction from './note.action';
import { NoteModel } from '../../model/note/note.model';
// @ts-ignore
import * as _ from 'lodash';

export interface NoteState {
  notes: Array<NoteModel>;
}

export const initialState: NoteState = {
  notes: [],
};

export const notesReducer = createReducer(
  initialState,

  on(NoteAction.getNote, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteSuccess, (state, action) => {
    return {
      ...state,
      notes: action.notes,
    };
  }),

  on(NoteAction.getNoteFail, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteDetail, (state) => {
    return { ...state };
  }),

  on(NoteAction.getNoteDetailSuccess, (state, { note }) => {
    const newNotes = _.cloneDeep(state.notes);
    const noteIndex = newNotes.findIndex(
      (aNote: { id: number }) => aNote.id === note.id
    );

    if (noteIndex > -1) {
      newNotes[noteIndex] = note;
    } else {
      newNotes.push(note);
    }

    return {
      ...state,
      notes: newNotes,
    };
  }),

  on(NoteAction.getNoteDetailFail, (state) => {
    return { ...state };
  }),

  on(NoteAction.createNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.createNoteSuccess, (state, { note }) => {
    const newNoteCreated = _.cloneDeep(state.notes);
    const noteIndex = newNoteCreated.findIndex(
      (aNote: { id: number }) => aNote.id === note.id
    );

    if (noteIndex > -1) {
      newNoteCreated[noteIndex] = note;
    } else {
      newNoteCreated.push(note);
    }

    return {
      ...state,
      notes: newNoteCreated,
    };
  }),
  on(NoteAction.createNoteFail, (state) => {
    return { ...state };
  }),
  on(NoteAction.deleteNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.deleteNoteSuccess, (state, { noteId }) => {
    const noteDeleted = state.notes.filter((note) => note.id !== noteId);
    return {
      ...state,
      notes: noteDeleted,
    };
  }),
  on(NoteAction.deleteNoteFail, (state) => {
    return { ...state };
  }),
  on(NoteAction.updateNote, (state) => {
    return { ...state };
  }),
  on(NoteAction.updateNoteSuccess, (state, { note }) => {
    const noteUpdated = _.cloneDeep(state.notes);
    const noteIndex = noteUpdated.findIndex(
      (aNote: { id: number }) => aNote.id === note.id
    );

    if (noteIndex > -1) {
      noteUpdated[noteIndex] = note;
    } else {
      noteUpdated.push(note);
    }

    return {
      ...state,
      notes: noteUpdated,
    };
  }),
  on(NoteAction.updateNoteFail, (state) => {
    return { ...state };
  })
);
