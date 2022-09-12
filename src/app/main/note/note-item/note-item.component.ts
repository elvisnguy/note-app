import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteModel } from '../../../model/note/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() note: NoteModel;

  @Output() viewDetailNote = new EventEmitter<number>();
  @Output() removeNote = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  viewNoteDetail(): void {
    this.viewDetailNote.emit(this.note.id);
  }

  deleteNote(): void {
    this.removeNote.emit(this.note.id);
  }
}
