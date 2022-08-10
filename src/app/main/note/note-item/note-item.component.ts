import { Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../../../model/note/note.model';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import { deleteNote, getNoteDetail } from '../../../store/note/note.action';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() note: NoteModel;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  viewNoteDetail(): void {
    this.store.dispatch(getNoteDetail({ noteId: this.note.id }));
  }

  deleteNote(): void {
    this.store.dispatch(deleteNote({ noteId: this.note.id }));
  }
}
