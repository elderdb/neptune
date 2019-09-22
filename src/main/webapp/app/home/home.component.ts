import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Account, AccountService, EmailService, LoginModalService} from 'app/core';

import * as $ from 'jquery';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;

  constructor(
    private accountService: AccountService,
    private emailService: EmailService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {}
  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }


  login() {
    this.modalRef = this.loginModalService.open();
  }
}

function journalOverviewSizes() {
  var windowHeight = $(window).height();
  if ($('.second-container').length > 0) {
    $('.second-container').css('top',windowHeight);
  }
}
$(document).ready(function() {
  journalOverviewSizes();
});
$(window).resize(function() {
  journalOverviewSizes();
});
