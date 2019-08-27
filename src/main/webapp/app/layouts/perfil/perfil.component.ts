import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailService } from 'app/services/email.service';

@Component({
  selector: 'jhi-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public activeLang: String;

  public email: String;

  constructor(private translate: TranslateService, private emailService: EmailService) {}

  setLang(lang: string) {
    this.translate.use(lang);
    this.activeLang = lang;
  }

  public sendEmail() {
    this.emailService.save(this.email).subscribe((data: String) => {
      return data;
    });
  }

  ngOnInit() {
    this.activeLang = 'pt-br';
    this.email = null;
  }
}
