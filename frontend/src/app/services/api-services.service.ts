import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { IRequestOptions } from '../services/interface/request-interface';

@Injectable({
  providedIn: "root",
})
export class ApiServicesService {
  constructor(public http: HttpClient) {}

  //Method is to process the http GET method
  get<T>(url: string, options?: IRequestOptions): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http.get<T>(url, options).pipe(catchError(this.handleError));
  }

  //To process the POST method
  post<T>(url: string, params: any, options?: IRequestOptions): Observable<T> {
   
    url = `${environment.API_PATH}/${url}`; 
    alert(url)
    return this.http
      .post<T>(url, params, options)
      .pipe(catchError(this.handleError));
  }

  //To process the PUT method
  put<T>(url: string, params: any, options?: IRequestOptions): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http
      .put<T>(url, params, options)
      .pipe(catchError(this.handleError));
  }

  //To process the DELETE method
  delete<T>(url: string, options?: IRequestOptions): Observable<T> {
    url = `${environment.API_PATH}/${url}`;
    return this.http.delete<T>(url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
