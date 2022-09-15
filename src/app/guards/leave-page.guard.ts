import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanLeaveComponent } from './can-leave.component';

@Injectable({
  providedIn: 'root',
})
export class LeavePageGuard implements CanDeactivate<CanLeaveComponent> {
  canDeactivate(
    component: CanLeaveComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.canLeave && typeof component.canLeave === 'function') {
      return component.canLeave();
    }
    return true;
  }
}
