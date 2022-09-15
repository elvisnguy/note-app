import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Resolve,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NoteListComponent } from './main/note/note-list/note-list.component';
import { NoteDetailComponent } from './main/note/note-detail/note-detail.component';
import { NoteCreateComponent } from './main/note/note-create/note-create.component';
import { AuthComponent } from './main/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LeavePageGuard } from './guards/leave-page.guard';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from './store/reducer';
import { selectNoteDetailsById } from './store/note/note.selector';
import { HasDetailsGuard } from './guards/has-details.guard';

@Injectable({ providedIn: 'root' })
class NoteTitleResolve implements Resolve<string> {
  constructor(private store: Store<AppState>, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | Promise<string> | string {
    console.log(route);
    console.log(state);
    const noteId = route.params['id'];
    return this.store.pipe(
      select(selectNoteDetailsById(noteId)),
      map((detail) => (detail ? detail.title : 'Detail'))
    );
  }
}

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NoteListComponent,
        title: 'Note list',
      },
      {
        path: '',
        canActivateChild: [RoleGuard],
        children: [
          {
            path: 'notes/:id',
            canDeactivate: [LeavePageGuard],
            component: NoteDetailComponent,
            title: NoteTitleResolve,
            canActivate: [HasDetailsGuard],
          },
          {
            path: 'create-note',
            canDeactivate: [LeavePageGuard],
            component: NoteCreateComponent,
            title: 'Create Note ',
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
