import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { apiConstant } from 'src/app/services/api-constants';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
declare var $: any;

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {
  studentDetails: any;

  
  studentForm : FormGroup;
  studentSubmit: boolean = false;
  resMessage1: any;
  resMessage2: any;
  registerDetails:any;
  resMessage: string;
  editetails: { name: any; email: any; contactnumber: any; address: any; state: any; city: any; pinCode: any}

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private router: Router,private LocalStorageService:LocalStorageService) { }

  ngOnInit() {

       
    this.studentForm = this.formBuilder.group({
      name: [null, [Validators.required, ]],
      email: [null, [Validators.required,]],
      contactnumber: [null, [Validators.required,]],
      address: [null, [Validators.required, ]],
      state: [null, [Validators.required, ]],
      city: [null, [Validators.required, ]],
      pinCode: [null, [Validators.required, ]],
     
    })

    this.getStudents()
 
  }

  getStudents(){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    this.http.get(apiConstant.getLmsStudents, options).subscribe((res: any) => {
      console.log(res)
      if(res){
        this.studentDetails=res;
      }
    })
  }

  ngAfterViewInit(){
    setTimeout(() => {
      $('#datatable').dataTable({
        // "paging":   false,
       
        "info": false,
        columnDefs : [
          { targets: [4,5], sortable: false}
        ]
      })
    }, 1000);
   }


   submit(){
    this.studentSubmit = true;
    if (this.studentForm.invalid) {
     
      return;
    }
    else {
      var studentEditKey=this.LocalStorageService.getKey('editStudentKey')
      var studentEditData=this.LocalStorageService.getKey('editStudentData')
      this.registerDetails = {
        name: this.studentForm.value.name,
        email: this.studentForm.value.email,
        contactnumber:this.studentForm.value.contactnumber,
        address:this.studentForm.value.address,
        state:this.studentForm.value.state,
        city:this.studentForm.value.city,
        pinCode: this.studentForm.value.pinCode,
      };
      const options = {
        headers: new HttpHeaders({
           //'emailization': '',
          'Content-Type': 'application/json',
        }),
      };
      if(studentEditKey!=true){
        this.http.post(apiConstant.createLmsStudent, this.registerDetails, options).subscribe((res: any) => {
          console.log(res)
         
            // this.router.navigate(['/students'])
            this.resMessage="Added successfully"
            this.getStudents()
            $('#myModal').hide();
            this.studentForm.reset({});
         
       
        })
      }else{
        this.editetails = {
          name: this.studentForm.value.name,
          email: this.studentForm.value.email,
          contactnumber:this.studentForm.value.contactnumber,
          address:this.studentForm.value.address,
          state:this.studentForm.value.state,
          city:this.studentForm.value.city,
          pinCode: this.studentForm.value.pinCode,
        };
        this.http.put(apiConstant.updateLmsStudent+'/'+studentEditData.id, this.editetails, options).subscribe((res: any) => {
          console.log('home' + JSON.stringify(res))
          this.getStudents()
            $('#myModal').hide();
            this.studentForm.reset({});
        })
      }
      
     
   }
  }
  deleteUser(id){
    if(confirm('Are you sure to delete this record ?') == true) {
      const url = apiConstant.deleteLmsStudent + "/" + id;
      console.log(url)
      this.http.delete(url).subscribe((res: any) => {
        console.log('home' + JSON.stringify(res))
        if (res.message) {
          
          //this.isSuccessful = res.isSuccessful;
          $('#myModal').hide();
          this.getStudents()
        }
      });
  
    }
  }

}
