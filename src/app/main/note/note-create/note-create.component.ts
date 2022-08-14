import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoteModel } from '../../../model/note/note.model';
import { Router } from '@angular/router';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import { createNote } from '../../../store/note/note.action';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BackgroundColorModel } from '../../../model/note/background-color.model';
import { ColorNameEnum } from '../../../model/note/color-name.enum';
import { ColorValueEnum } from '../../../model/note/color-value.enum';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent implements OnInit {
  noteFormGroup: FormGroup;
  note: NoteModel;
  labels: Array<string> = [];
  backgroundNote: BackgroundColorModel;

  backgroundColors: Array<BackgroundColorModel> = [
    {
      name: ColorNameEnum.DEFAULT,
      color: ColorValueEnum.DEFAULT,
    },
    {
      name: ColorNameEnum.RED,
      color: ColorValueEnum.RED,
    },
    {
      name: ColorNameEnum.ORANGE,
      color: ColorValueEnum.ORANGE,
    },
    {
      name: ColorNameEnum.YELLOW,
      color: ColorValueEnum.YELLOW,
    },
    {
      name: ColorNameEnum.PURPLE,
      color: ColorValueEnum.PURPLE,
    },
  ];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    // this.noteFormGroup = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   body: ['', Validators.required],
    //   labels: this.formBuilder.array([this.formBuilder.control('')]),
    // });

    this.noteFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: any) {
    this.store.dispatch(
      createNote({
        note: {
          ...form.value,
          labels: this.labels,
          backgroundColor: this.backgroundNote,
        },
      })
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

  setBackgroundColor(colorValue: any): void {
    this.backgroundNote = colorValue;
    // @ts-ignore
    document.getElementById(
      'setNoteBackground'
    ).style.backgroundColor = `${this.backgroundNote.color}`;
  }
}
