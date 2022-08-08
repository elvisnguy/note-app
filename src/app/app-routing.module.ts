import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NoteListComponent } from './main/note/note-list/note-list.component';
import { NoteDetailComponent } from './main/note/note-detail/note-detail.component';
import { NoteCreateComponent } from './main/note/note-create/note-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: NoteListComponent,
      },
      {
        path: 'posts/:id',
        component: NoteDetailComponent,
      },
      {
        path: 'create-note',
        component: NoteCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
