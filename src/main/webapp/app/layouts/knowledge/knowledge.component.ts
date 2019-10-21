import { Component, OnInit } from '@angular/core';
import { EmailService } from 'app/services/email.service';
import * as $ from 'jquery';

@Component({
  selector: 'jhi-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent implements OnInit {
  imageObject: Object[];

  public email: String;
  public sendEmailStatus: any;
  public emailIsEmpty: boolean = false;

  constructor(private emailService: EmailService) {
    this.imageObject = [
      {
        image: '../content/images/java.png',
        thumbImage: '../content/images/java.png',
        alt: 'Java 8',
        title: 'Java 8'
      },
      {
        image: '../content/images/spring.png',
        thumbImage: '../content/images/spring.png',
        alt: 'Spring',
        title: 'Spring'
      },
      {
        image: '../content/images/aws.png',
        thumbImage: '../content/images/aws.png',
        alt: 'AWS',
        title: 'AWS'
      },
      {
        image: '../content/images/git.png',
        thumbImage: '../content/images/git.png',
        alt: 'Git',
        title: 'Git'
      },
      {
        image: '../content/images/angular.png',
        thumbImage: '../content/images/angular.png',
        alt: 'AngularJS',
        title: 'AngularJS'
      },
      {
        image: '../content/images/html.png',
        thumbImage: '../content/images/html.png',
        alt: 'HTML5',
        title: 'HTML5'
      },
      {
        image: '../content/images/javascript.png',
        thumbImage: '../content/images/javascript.png',
        alt: 'JavaScript',
        title: 'JavaScript'
      },
      {
        image: '../content/images/bootstrap.png',
        thumbImage: '../content/images/bootstrap.png',
        alt: 'Bootstrap',
        title: 'Bootstrap'
      },
      {
        image: '../content/images/css.png',
        thumbImage: '../content/images/css.png',
        alt: 'CSS3',
        title: 'CSS3'
      },
      {
        image: '../content/images/npm.png',
        thumbImage: '../content/images/npm.png',
        alt: 'NPM',
        title: 'NPM'
      },
      {
        image: '../content/images/postgres.png',
        thumbImage: '../content/images/postgres.png',
        alt: 'PostgreSQL',
        title: 'PostgreSQL'
      },
      {
        image: '../content/images/oracle.png',
        thumbImage: '../content/images/oracle.png',
        alt: 'Oracle',
        title: 'Oracle'
      },
      {
        image: '../content/images/mysql.png',
        thumbImage: '../content/images/mysql.png',
        alt: 'MySql',
        title: 'MySql'
      },
      {
        image: '../content/images/xml.png',
        thumbImage: '../content/images/xml.png',
        alt: 'XML',
        title: 'XML'
      },
      {
        image: '../content/images/json.png',
        thumbImage: '../content/images/json.png',
        alt: 'Json',
        title: 'Json'
      }
    ];
  }

  public sendEmail() {
    this.clearSendEmailStatus();

    if (!this.email) {
      this.emailIsEmpty = true;
      this.goToWarning();
      return;
    }

    this.emailIsEmpty = false;

    this.emailService
      .save(this.email)
      .then(response => {
        this.sendEmailStatus.code = response.status;
        this.sendEmailStatus.body = response.body;
      })
      .catch(reason => {
        this.sendEmailStatus.code = reason.status;
        this.sendEmailStatus.body = reason.body;
      });

    this.goToWarning();
  }

  private clearSendEmailStatus = function() {
    this.sendEmailStatus.code = null;
    this.sendEmailStatus.body = null;
  };

  private goToWarning = function() {
    $('html, body').animate(
      {
        scrollTop: $('#emailAlert').offset().top
      },
      1000
    );
  };

  ngOnInit() {
    this.email = '';

    this.sendEmailStatus = {
      code: 0,
      body: null
    };
  }
}
