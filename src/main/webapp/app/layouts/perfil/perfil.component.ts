import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  setLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {}
}
