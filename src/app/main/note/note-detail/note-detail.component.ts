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
import { BackgroundColorModel } from '../../../model/note/background-color.model';
import { ColorNameEnum } from '../../../model/note/color-name.enum';
import { ColorValueEnum } from '../../../model/note/color-value.enum';
import { BackgroundImageModel } from '../../../model/note/background-image.model';
import { ImageNameEnum } from '../../../model/note/image-name.enum';
import { ImageValueEnum } from '../../../model/note/image-value.enum';

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
  backgroundNoteColor: BackgroundColorModel;
  backgroundNoteImage: BackgroundImageModel;
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

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getNoteDetailById();
  }

  getNoteDetailById(): void {
    const noteId = this.route.snapshot.params['id'];
    this.store.dispatch(getNoteDetail({ noteId }));
    this.store.pipe(select(selectNoteDetailsById(noteId))).subscribe((note) => {
      this.note = note as NoteModel;
      if (this.note) {
        this.setFormValue();
      }
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
      backgroundColor: new FormControl(''),
      backgroundImage: new FormControl(''),
    });
  }

  setFormValue(): void {
    console.log(this.noteFormGroup);
    this.noteFormGroup.patchValue(this.note);
    this.labels = _.cloneDeep(this.note?.labels);
  }
  setBackgroundColorName(
    c1: BackgroundColorModel,
    c2: BackgroundColorModel
  ): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  setBackgroundImageName(
    c1: BackgroundImageModel,
    c2: BackgroundImageModel
  ): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  updateNote(form: any): any {
    this.store.dispatch(
      updateNote({
        note: {
          ...form.value,
          labels: this.labels,
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

  applyNoteBackgroundColor(): any {
    if (!this.note?.backgroundColor?.color) {
      return {};
    }
    const styles = { backgroundColor: `${this.note.backgroundColor.color}` };
    return styles;
  }

  applyNoteBackgroundImage(): any {
    if (!this.note?.backgroundImage?.image) {
      return {};
    }
    const styles = { backgroundImage: `${this.note.backgroundImage.image}` };
    return styles;
  }

  setBackgroundColor(colorValue: any): void {
    this.backgroundNoteColor = colorValue;
    //@ts-ignore
    document.getElementById(
      'setNoteBackgroundColor'
    ).style.backgroundColor = `${this.backgroundNoteColor.color}`;
  }

  setBackgroundImage(imageValue: any): void {
    this.backgroundNoteImage = imageValue;
    // @ts-ignore
    document.getElementById(
      'setNoteBackgroundImage'
    ).style.backgroundImage = `${this.backgroundNoteImage.image}`;
    // @ts-ignore
    document.getElementById('setNoteBackgroundImage').style.backgroundPosition =
      'center';
    // @ts-ignore
    document.getElementById('setNoteBackgroundImage').style.backgroundSize =
      'cover';
  }
}
