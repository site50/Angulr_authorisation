import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit, VERSION } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, CookieService],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  savePas: string = '';
  class = 'correct';
  class_email = '';
  input_pass = '';
  messageDenied = '';
  messageError = '';
  form: any = []
  show: boolean = true;
  constructor(private fb: FormBuilder, public authentication: AuthService, private cookieService: CookieService) { }

  setActiveClass() {
    this.class = 'uncorrect';
  }

  passw() {
    this.show = !this.show;
  }
  setBox() {
    this.class_email = 'correct'
  }

  Login(email: any, password: any) {
    this.authentication.login(email, password);
    this.cookieService.set('pas', password);
    if (email == 'vietpartner@yandex.ru' && password == 'l63PYR') {
      this.class = 'uncorrect';
      this.class_email = 'uncorrect_email'
      this.messageDenied = 'tultype_denied'; 
    }
    else {
      this.class = 'uncorrect';
      this.class_email = 'uncorrect_email'
      this.messageError = 'tultype';
    }
  }
  hidemMessageError() {
    this.messageError = 'close_message_error';
  }

  hidemMessageDenied() {
    this.messageDenied = 'close_message_denied';
  }
  saveCookie(password: any, event: any) {
    this.savePas = 'save'
    this.cookieService.set('savePas', this.savePas);
    this.input_pass = 'eye';
  }

  getCookie(password: any) {
    this.class = 'save';
    if (this.cookieService.get('savePas') == 'save') {
      this.cookieService.get('pas')
      this.password = this.cookieService.get('pas')
    }
  }
  DeleteCookie() {
    this.cookieService.delete('pas');
    this.cookieService.delete('savePas');
  }

  ngOnInit(): void {
    this.form = this.authentication.form
  }

}
