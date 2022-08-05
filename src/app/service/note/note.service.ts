import { Injectable } from '@angular/core';
import { NoteModel } from '../../model/note/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  notes: Array<NoteModel> = [];

  constructor() {}

  getAllNote() {
    return this.notes;
  }

  addNote(note: NoteModel) {
    const newNote = this.notes.push(note);
    const index = newNote - 1;
    return index;
  }
}
