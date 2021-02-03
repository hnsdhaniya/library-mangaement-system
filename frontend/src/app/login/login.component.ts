import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServicesService } from '../services/api-services.service';
import { apiConstant } from '../services/api-constants';
import { LocalStorageService } from '../services/local-storage.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Login: boolean = false;
  userName: string;
  Password: string;
  alert: boolean= false
  resMessage:any;
  resMessage1: any;
  resMessage2: any;
  student: { username: any; password: any; };

  constructor(private router: Router,private formBuilder: FormBuilder,private http: HttpClient,private apiServices:ApiServicesService,private LocalStorageService:LocalStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength, Validators.pattern('^[0-9a-zA-Z]+$')]],
      password: [null, [Validators.required, Validators.maxLength, Validators.minLength]],
      styles: ['.form-group { margin-bottom: 5rem; }']

    });
    
  }
  enterKey(event){
    //console.log(event.charCode)
    if(event.charCode == '13'){
      event.preventDefault();
      this.submit();
    }
  }
 
  signUp(){
    this.router.navigate(['/register'])
  }
  submit(){
    this.Login = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.student = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      console.log(this.student)
      const options = {
        headers: new HttpHeaders({
           //'Authorization': '',
          'Content-Type': 'application/json',
        }),
      };
      this.http.post(apiConstant.login, this.student, options).subscribe((res: any) => {
        console.log(res)
        if(res.status==200){
          // $('#loginModel').modal('show');

          setTimeout(() => {
            this.router.navigate(['/students'])
          }, 1000);
       
          this.resMessage="Login successfully"
          this.LocalStorageService.setKey('IsAdmin',res.IsAdmin)
        }else if(res.status==400){
            this.resMessage1=res.reason;
        }
        else if(res.status==401){
            this.resMessage2=res.reason;
        }else{
            res.reason
          
          }
     
      })
      this.alert = true
    }
    
  }
  closeAlert() {
    this.alert = false
  }
  

}

