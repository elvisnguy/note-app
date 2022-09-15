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
import { BackgroundImageModel } from '../../../model/note/background-image.model';
import { ImageValueEnum } from 'src/app/model/note/image-value.enum';
import { ImageNameEnum } from 'src/app/model/note/image-name.enum';
import { Observable } from 'rxjs';
import { CanLeaveComponent } from '../../../guards/can-leave.component';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss'],
})
export class NoteCreateComponent implements OnInit, CanLeaveComponent {
  noteFormGroup: FormGroup;
  note: NoteModel;
  labels: Array<string> = [];
  backgroundNoteColor: BackgroundColorModel;
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
  backgroundNoteImage: BackgroundImageModel;
  backgroundImages: Array<BackgroundImageModel> = [
    {
      name: ImageNameEnum.DEFAULT,
      image: ImageValueEnum.DEFAULT,
    },
    {
      name: ImageNameEnum.NOTES,
      image: ImageValueEnum.NOTES,
    },
    {
      name: ImageNameEnum.GROCERY,
      image: ImageValueEnum.GROCERY,
    },
    {
      name: ImageNameEnum.FOOD,
      image: ImageValueEnum.FOOD,
    },
    {
      name: ImageNameEnum.RECIPE,
      image: ImageValueEnum.RECIPE,
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
    this.noteFormGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  canLeave(): boolean | Observable<boolean> {
    const ctrl = this.noteFormGroup;
    if (ctrl.dirty) {
      return confirm('Di nha ck iu');
    }
    return true;
  }

  onSubmit(form: any) {
    this.store.dispatch(
      createNote({
        note: {
          ...form.value,
          labels: this.labels,
          backgroundColor: this.backgroundNoteColor,
          backgroundImage: this.backgroundNoteImage,
        },
      })
    );
    this.noteFormGroup.reset();
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
    this.backgroundNoteColor = colorValue;
    (
      document.getElementById('setNoteBackgroundColor') as HTMLElement
    ).style.backgroundColor = `${this.backgroundNoteColor.color}`;
  }

  setBackgroundImage(imageValue: any): void {
    const element = document.getElementById(
      'setNoteBackgroundImage'
    ) as HTMLElement;
    this.backgroundNoteImage = imageValue;
    element.style.backgroundImage = `${this.backgroundNoteImage.image}`;
    element.style.backgroundPosition = 'center';
    element.style.backgroundSize = 'cover';
  }
}
