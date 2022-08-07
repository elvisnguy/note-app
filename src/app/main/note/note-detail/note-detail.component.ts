import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteModel } from '../../../model/note/note.model';
import { NoteService } from '../../../service/note/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectNoteDetailsById } from '../../../store/note/note.selector';
import { getNoteDetail } from '../../../store/note/note.action';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  noteFormGroup: FormGroup;
  note: NoteModel;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNoteDetailById();
    this.initForm();
    this.setFormValue();
  }

  getNoteDetailById(): void {
    const noteId = this.route.snapshot.params['id'];
    this.store.dispatch(getNoteDetail({ noteId }));
    this.store.pipe(select(selectNoteDetailsById(noteId))).subscribe((note) => {
      this.note = note as NoteModel;
    });
  }

  initForm(): void {
    this.noteFormGroup = this.formBuilder.group({
      title: [''],
      body: [''],
    });
  }

  setFormValue(): void {
    this.noteFormGroup.get('title')?.setValue(this.note.title);
    this.noteFormGroup.get('body')?.setValue(this.note.body);
  }
}
