import { Component, OnInit } from '@angular/core';
import { NoteModel } from '../../../model/note/note.model';
import { NoteService } from '../../../service/note/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Array<NoteModel> = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.notes = this.noteService.getAllNote();
  }
}
