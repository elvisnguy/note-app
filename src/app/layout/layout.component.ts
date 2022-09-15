import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user: string;
  constructor(public translate: TranslateService, private data: DataService) {}

  ngOnInit(): void {
    this.data.getUserSubject().subscribe((res) => (this.user = res));
  }

  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  setTheme(): void {}
}
