import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NoteListComponent, NoteItemComponent],
  imports: [
    BrowserModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [NoteListComponent, NoteItemComponent],
  providers: [],
})
export class NoteModule {}
