import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoteCreateComponent } from './note-create/note-create.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    NoteListComponent,
    NoteItemComponent,
    NoteDetailComponent,
    NoteCreateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    DragDropModule,
    MatChipsModule,
  ],
  exports: [NoteListComponent, NoteItemComponent],
  providers: [],
})
export class NoteModule {}
