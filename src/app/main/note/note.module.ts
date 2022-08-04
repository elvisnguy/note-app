import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-item/note-item.component';

@NgModule({
  declarations: [NoteListComponent, NoteItemComponent],
  imports: [BrowserModule, RouterModule],
  exports: [NoteListComponent, NoteItemComponent],
  providers: [],
})
export class NoteModule {}
