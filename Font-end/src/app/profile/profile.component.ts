import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormBuilder,FormGroup, NgForm, Validators } from "@angular/forms";
//import arina from './arina';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService]
})
export class ProfileComponent implements OnInit {
  mes: string = '';
  data: any = {}
  userInfo: any = {}
  name: any = '';
  id: any = '';
  avatar: any = '';
  isClickSuccess: boolean = true;
  message:any=[];
  array_message:any=[]
  constructor(public authentication: AuthService) { }

  getUser() {
   //	Данные о пользователе которые вернул бэк выводим в соответствующей области
    this.authentication.getuser().subscribe((res) => {
      this.data = res;
      this.name = this.data.data.userInfo.userName
      this.id = this.data.data.userInfo.userId
      this.avatar = this.data.data.userInfo.userAvatar
    })
  }


Add_message(mes:string){
  this.array_message.push(mes);
  this.message=mes;

console.log(mes, 'ADDMES')
}
resetA() {
  this.message = ''

}
  Logout() {
    this.authentication.logout()
  }

  hideSucces() {
    this.isClickSuccess = false;
  }

  ngOnInit(): void {
    this.getUser();
  }

}
