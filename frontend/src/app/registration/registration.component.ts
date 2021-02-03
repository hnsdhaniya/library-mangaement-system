import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiConstant } from '../services/api-constants';
import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  register: boolean = false;
  resMessage1: any;
  resMessage2: any;
  registerDetails:any;
  resMessage: string;
  constructor(private router: Router,private formBuilder: FormBuilder,private http: HttpClient,private apiServices:ApiServicesService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength, Validators.pattern('^[0-9a-zA-Z]+$')]],
      email: [null, [Validators.required, Validators.maxLength, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      username: [null, [Validators.required, Validators.maxLength, Validators.pattern('^[0-9a-zA-Z]+$')]],
      password: [null, [Validators.required, Validators.maxLength, Validators.minLength]],
      confirmpassword: [null, [Validators.required, Validators.maxLength, Validators.minLength]],
      contactnumber: [null, [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')]],
     
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      });
  }
  login(){
   
    this.router.navigate(['/login'])
  }
  registeration(){
    this.register = true;
    if (this.registrationForm.invalid) {
     
      return;
    }
    else {
      this.registerDetails = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        username:this.registrationForm.value.username,
        password:this.registrationForm.value.password,
        confirmpassword:this.registrationForm.value.confirmpassword,
        contactnumber:this.registrationForm.value.contactnumber,
      };
      const options = {
        headers: new HttpHeaders({
           //'Authorization': '',
          'Content-Type': 'application/json',
        }),
      };
      this.http.post(apiConstant.createLmsStudent, this.registerDetails, options).subscribe((res: any) => {
        console.log(res)
      
          // $('#loginModel').modal('show');
          this.router.navigate(['/login'])
          this.resMessage="Register successfully"
          
          this.registrationForm.reset({});
     
      })
     
    }
    

  }

}
function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (registrationForm: FormGroup) => {
    const control = registrationForm.controls['password'];
    const matchingControl = registrationForm.controls['confirm'];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
