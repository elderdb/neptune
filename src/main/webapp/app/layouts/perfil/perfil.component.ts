import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  private activeLang: String = 'pt-br';

  setLang(lang: string) {
    this.translate.use(lang);
    this.activeLang = lang;
  }

  ngOnInit() {}
}
