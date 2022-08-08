import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../service/note/note.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectNotes } from '../../../store/note/note.selector';
import { getNote } from '../../../store/note/note.action';
import { Observable } from 'rxjs';
import { NoteModel } from '../../../model/note/note.model';
// @ts-ignore
import * as _ from 'lodash';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes$: Observable<Array<NoteModel>>;
  notes: Array<NoteModel>;
  note: NoteModel;
  searchText: string;

  constructor(
    private noteService: NoteService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    this.store.dispatch(getNote());
    this.notes$ = this.store.pipe(select(selectNotes));
    this.notes$.pipe().subscribe((notes) => (this.notes = notes));
  }

  noteFilterChanged(notes: Array<NoteModel>, searchText: string): any {
    this.notes = notes;
    if (!notes) return [];
    if (!searchText) return notes;
    searchText = searchText.toLowerCase();
    return notes.filter((note: NoteModel) => {
      debugger;
      return note.title.toLowerCase().includes(searchText);
    });
  }
}
