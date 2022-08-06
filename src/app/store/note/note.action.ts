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
