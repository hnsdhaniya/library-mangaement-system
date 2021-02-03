import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonService } from 'src/app/services/common.service';
declare var $:any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  IsAdmin: any;

  constructor(private LocalStorageService:LocalStorageService, private common: CommonService) { }

  ngOnInit() {
    this.IsAdmin=this.LocalStorageService.getKey('IsAdmin')
    console.log(this.IsAdmin)
  }

  logout(key){
   
    if(key == 'yes'){
      this.LocalStorageService.clearStorage();
      this.common.navigateToPage('/login')
    }
    else{
       this.LocalStorageService.removeKey('logout')
    }

  }

}
