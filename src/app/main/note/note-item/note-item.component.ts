import { Component, Input, OnInit } from '@angular/core';
import { NoteModel } from '../../../model/note/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() content: string = '';

  constructor() {}

  ngOnInit(): void {}
}
