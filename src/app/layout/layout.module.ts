import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
