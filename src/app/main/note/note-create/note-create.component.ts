import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteModel } from '../../../model/note/note.model';
import { Router } from '@angular/router';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import { createNote } from '../../../store/note/note.action';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent implements OnInit {
  noteFormGroup: FormGroup;
  note: NoteModel;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.noteFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit(form: any) {
    this.store.dispatch(createNote({ note: form.value }));
  }
}
