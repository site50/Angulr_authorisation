import { Injectable, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,  Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  uri = `http://localhost:82/api`;
  private baseURL = "http://localhost:82/api/login";
  token: any = '';

  token_save: any = [];
  email: any = '';
  password: any = '';
  form:FormGroup;
  constructor(private fb:FormBuilder,private http: HttpClient, private router: Router, private renderer: Renderer2, private elRef: ElementRef) 
  {
      this.form=this.fb.group({
        email:['', Validators.required],
       password:['', Validators.required],
      })
  
  }

  login(email: string, password: string) {
         this.http.post(this.uri + '/authenticate', { email: email, password: password })
        .subscribe((resp: any) => {
           this.router.navigate(['dashboard']);
          this.token_save = resp.token;
          localStorage.setItem('auth_token', this.token_save);
        })
    }

  getuser() {
    return this.http.get(`${this.baseURL}`)
  }
  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  ngOnInit(): void {
    this.form
  }
}

