import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';
import { takeUntil } from 'rxjs';
import { DestroyableComponent } from '../../destroyable';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent
  extends DestroyableComponent
  implements OnInit
{
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  constructor(private progressBarService: ProgressBarService) {
    super();
  }

  ngOnInit(): void {
    this.progressBarService.bufferValue
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    this.progressBarService.mode
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((mode) => {
        this.mode = mode;
      });

    this.progressBarService.value
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value) => {
        this.value = value;
      });

    this.progressBarService.visible
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((visible) => {
        this.visible = visible;
      });
  }
}
