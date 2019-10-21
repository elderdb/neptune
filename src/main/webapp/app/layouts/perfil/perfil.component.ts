import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as $ from 'jquery';

@Component({
  selector: 'jhi-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public activeLang: String;

  constructor(private translate: TranslateService) {}

  setLang(lang: string) {
    this.translate.use(lang);
    this.activeLang = lang;
  }

  public goToKnowledge() {
    $('html, body').animate(
      {
        scrollTop: $('#knowledge').offset().top - 39
      },
      1000
    );
  }

  ngOnInit() {
    this.activeLang = 'pt-br';
  }
}
