import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../service/note/note.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectNotes } from '../../../store/note/note.selector';
import {
  getNote,
  getNoteDetail,
  updateNote,
  deleteNote,
} from '../../../store/note/note.action';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { NoteModel } from '../../../model/note/note.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes$: Observable<Array<NoteModel>>;
  notes: Array<NoteModel>;
  note: NoteModel;
  searchText: any;
  displayNotes: Array<NoteModel> = [];
  searchControl: FormControl;

  constructor(
    private noteService: NoteService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getNote();
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe(() => {
        this.noteFilterChanged(this.searchText);
      });
  }

  getNote(): void {
    this.store.dispatch(getNote());
    this.notes$ = this.store.pipe(select(selectNotes));
    this.notes$.pipe().subscribe((notes) => {
      this.notes = notes;
      this.displayNotes = notes;
      this.displayNotes = this.displayNotes.sort(
        (a, b) => +a.isNew - +b.isNew || a.order - b.order
      );
    });
  }

  noteFilterChanged(searchText: string): any {
    if (!this.notes) return [];
    if (!searchText) this.displayNotes = this.notes;
    this.displayNotes = this.notes.filter((note: NoteModel) => {
      return note.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const previousNote = this.notes[event.previousIndex];
    const currentNote = this.notes[event.currentIndex];
    const [note1, note2] = this.swapNoteOrder(previousNote, currentNote);
    this.store.dispatch(updateNote({ note: note1 }));
    this.store.dispatch(updateNote({ note: note2 }));
  }

  swapNoteOrder(note1: NoteModel, note2: NoteModel): Array<NoteModel> {
    const note1Order = note1.order;
    const note2Order = note2.order;

    note1 = {
      ...note1,
      order: note2Order,
    };
    note2 = {
      ...note2,
      order: note1Order,
    };

    return [note1, note2];
  }

  viewNoteDetail(noteId: number): void {
    this.store.dispatch(getNoteDetail({ noteId }));
  }

  deleteNote(noteId: number): void {
    this.store.dispatch(deleteNote({ noteId }));
  }
}
