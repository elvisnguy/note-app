import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoteModel } from '../../../model/note/note.model';
import { NoteService } from '../../../service/note/note.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectNoteDetailsById } from '../../../store/note/note.selector';
import { getNoteDetail } from '../../../store/note/note.action';
import { updateNote } from '../../../store/note/note.action';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import * as _ from 'lodash';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  noteFormGroup: FormGroup;
  note: NoteModel;
  labels: Array<string> = [];

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
    // this.noteFormGroup = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   body: ['', Validators.required],
    //   id: [''],

    this.noteFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      id: new FormControl(''),
    });
  }

  setFormValue(): void {
    this.noteFormGroup.patchValue(this.note);
    this.labels = _.cloneDeep(this.note?.labels);
  }

  updateNote(form: any): any {
    this.store.dispatch(
      updateNote({ note: { ...form.value, labels: this.labels } })
    );
  }

  add(event: MatChipInputEvent, input: HTMLInputElement): void {
    const value = event.value;

    if (value && value !== '' && !this.labels.includes(value)) {
      this.labels = [...new Set(this.labels.concat(value))];
    }

    if (input) {
      input.value = '';
    }
  }

  paste(event: ClipboardEvent): void {
    event.preventDefault();
    // @ts-ignore
    event.clipboardData
      .getData('Text')
      .split(/;|,|\n/)
      .forEach((value) => {
        const labels = value.split(' ');
        if (labels && labels.length > 0) {
          this.labels = [...new Set(this.labels.concat(labels))];
        }
      });
  }

  removeLabel(label: string): void {
    const index = this.labels.indexOf(label);
    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }
}
