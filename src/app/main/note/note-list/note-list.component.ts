import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  noteTitle: string = 'Hehehe';
  noteContent: string = 'Lalala';

  constructor() {}

  ngOnInit(): void {}
}
