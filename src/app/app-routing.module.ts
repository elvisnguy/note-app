import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NoteListComponent } from './main/note/note-list/note-list.component';

const routes: Routes = [
  {
    path: '**',
    redirectTo: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: NoteListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
