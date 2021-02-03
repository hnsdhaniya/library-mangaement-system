import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { apiConstant } from 'src/app/services/api-constants';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
declare var $: any;
@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {
  bookList:any;
  
  bookAddFome: FormGroup;
  bookSubmit: boolean = false;
  resMessage1: any;
  resMessage2: any;
  registerDetails:any;
  resMessage: string;
  editetails: { bookname: any; author: any; department: any; rating: any; published_date: any; UsersId: any; };
  IsAdmin: any;

  constructor(private http: HttpClient,private formBuilder: FormBuilder,private router: Router,private LocalStorageService:LocalStorageService) { }

  ngOnInit() {
    this.IsAdmin=this.LocalStorageService.getKey('IsAdmin')
    this.bookAddFome = this.formBuilder.group({
      bookname: [null, [Validators.required, ]],
      author: [null, [Validators.required, ]],
      department: [null, [Validators.required,]],
      rating: [null, [Validators.required,]],
      published_date: [null, [Validators.required, ]],
      UsersId: [null, [Validators.required, ]],
     
    })
    this.getBooks()
  }
getBooks(){
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  this.http.get(apiConstant.getLmsBooks, options).subscribe((res: any) => {
    console.log(res)
    if(res){
      this.bookList=res;
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
    this.bookSubmit = true;
    if (this.bookAddFome.invalid) {
     
      return;
    }
    else {
      var bookEditKey=this.LocalStorageService.getKey('editBookKey')
      var bookEditData=this.LocalStorageService.getKey('editBookData')
      this.registerDetails = {
        bookname: this.bookAddFome.value.bookname,
        author: this.bookAddFome.value.author,
        department:this.bookAddFome.value.department,
        rating:this.bookAddFome.value.rating,
        published_date:this.bookAddFome.value.published_date,
        UsersId:this.bookAddFome.value.UsersId,
      };
      const options = {
        headers: new HttpHeaders({
           //'Authorization': '',
          'Content-Type': 'application/json',
        }),
      };
      if(bookEditKey!=true){
        this.http.post(apiConstant.createLmsBooks, this.registerDetails, options).subscribe((res: any) => {
          console.log(res)
         
            $('#myModal').hide();
            this.router.navigate(['/books'])
            this.resMessage="Added successfully"
            this.getBooks()
            this.bookAddFome.reset({});
         
        })
      }else{
        this.editetails = {
          bookname: this.bookAddFome.value.bookname,
          author: this.bookAddFome.value.author,
          department:this.bookAddFome.value.department,
          rating:this.bookAddFome.value.rating,
          published_date:this.bookAddFome.value.published_date,
          UsersId:this.bookAddFome.value.UsersId,
        };
        this.http.put(apiConstant.updateLmsBooks+'/'+bookEditData.id, this.editetails, options).subscribe((res: any) => {
          console.log('home' + JSON.stringify(res))
          $('#myModal').hide();
          this.getBooks()
            this.bookAddFome.reset({});
        })
      }
      
     
   }
  }
  editData(data){
    $('#myModal').show();
    this.LocalStorageService.setKey('editBookKey',true)
    this.LocalStorageService.setKey('editBookData',data)
    this.bookAddFome.patchValue({
      bookname: data.bookname,
        author: data.author,
        department:data.department,
        rating:data.rating,
        published_date:data.published_date,
        UsersId:data.UsersId,
     
    })
  }
  deleteUser(id){
    if(confirm('Are you sure to delete this record ?') == true) {
      const url = apiConstant.deleteLmsBooks + "/" + id;
      console.log(url)
      this.http.delete(url).subscribe((res: any) => {
        console.log('home' + JSON.stringify(res))
        if (res.message) {
          
          //this.isSuccessful = res.isSuccessful;
          $('#myModal').hide();
          this.getBooks()
        }
      });
  
    }
  }
}
