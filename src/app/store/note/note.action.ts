import { createAction, props } from '@ngrx/store';
import { NoteModel } from '../../model/note/note.model';

export const getNote = createAction('[NOTE] Get Notes');
export const getNoteSuccess = createAction(
  '[NOTE] Get Notes Success',
  props<{ notes: Array<NoteModel> }>()
);
export const getNoteFail = createAction(
  '[NOTE] Get Notes Fail',
  props<{ error: any }>()
);

export const getNoteDetail = createAction(
  '[NOTE] Get Notes Detail',
  props<{ noteId: number }>()
);
export const getNoteDetailSuccess = createAction(
  '[NOTE] Get Notes Detail Success',
  props<{ note: NoteModel }>()
);
export const getNoteDetailFail = createAction(
  '[NOTE] Get Notes Detail Success',
  props<{ error: any }>()
);

export const createNote = createAction(
  '[NOTE] Create Note',
  props<{ note: NoteModel }>()
);

export const createNoteSuccess = createAction(
  '[NOTE] Create Note Success',
  props<{ note: NoteModel }>()
);

export const createNoteFail = createAction(
  '[NOTE] Create Note Fail',
  props<{ error: any }>()
);

export const deleteNote = createAction(
  '[NOTE] Delete Note',
  props<{ noteId: number }>()
);

export const deleteNoteSuccess = createAction(
  '[NOTE] Delete Note Success',
  props<{ noteId: number }>()
);

export const deleteNoteFail = createAction(
  '[NOTE] Delete Note Fail',
  props<{ error: any }>()
);

export const updateNote = createAction(
  '[NOTE] Update Note',
  props<{ note: any }>()
);

export const updateNoteSuccess = createAction(
  '[NOTE] Update Note Success',
  props<{ note: NoteModel }>()
);
export const updateNoteFail = createAction(
  '[NOTE] Update Note Fail',
  props<{ error: any }>()
);
