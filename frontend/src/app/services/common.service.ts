import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor(private router: Router) {}

  navigateToPage(path: string, params?: any) {
    if (params) {
      this.router.navigate([path, params]);
    } else {
      this.router.navigate([path]);
    }
  }
}
