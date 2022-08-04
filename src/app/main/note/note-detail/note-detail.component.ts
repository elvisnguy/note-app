import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoteModel } from '../../../model/note/note.model';
import { NoteService } from '../../../service/note/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  noteFormGroup!: FormGroup;
  note!: NoteModel;
  constructor(
    private _formBuilder: FormBuilder,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.note = new NoteModel();

    this.noteFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: any) {
    this.noteService.addNote(form.value);
    this.router.navigateByUrl('/');
  }
}
