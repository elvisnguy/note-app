import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../service/note/note.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectNotes } from '../../../store/note/note.selector';
import { getNote } from '../../../store/note/note.action';
import { Observable } from 'rxjs';
import { NoteModel } from '../../../model/note/note.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';

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
  displayNotes: Array<NoteModel> = [];

  constructor(
    private noteService: NoteService,
    private store: Store<AppState>,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    this.store.dispatch(getNote());
    this.notes$ = this.store.pipe(select(selectNotes));
    this.notes$.pipe().subscribe((notes) => {
      this.notes = notes;
      this.displayNotes = notes;
    });
  }

  noteFilterChanged(notes: Array<NoteModel>, searchText: string): any {
    if (!notes) return [];
    if (!searchText) return notes;

    this.displayNotes = notes.filter((note: NoteModel) => {
      return note.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayNotes, event.previousIndex, event.currentIndex);
  }
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }
}
