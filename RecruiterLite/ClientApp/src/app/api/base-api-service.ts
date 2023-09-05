/*
 * @Copyright The Gap Partnership. All rights reserved.
 */
import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { NEVER, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private readonly baseHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  private http: HttpClient;
  public baseUrl: string;

  constructor() {
    // Use inject function, so extending classes don't have to provide in constructor
    this.http = inject(HttpClient);
    this.baseUrl = inject(API_BASE_URL);
  }

  get<T>(uri: string, queryParams: any = null, handleError: boolean = true, body: any = null): Observable<T> {
    const headers = this.baseHeaders;
    const params = BaseApiService.setupParams(queryParams);
    const uri_ = (this.baseUrl + uri).replace(/[?&]$/, '');

    return this.http
      .get<T>(uri_, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error, handleError)));
  }

  post<T>(uri: string, body: any, queryParams: any = null, handleError: boolean = true): Observable<T> {
    const headers = this.baseHeaders;
    const params = BaseApiService.setupParams(queryParams);
    const uri_ = (this.baseUrl + uri).replace(/[?&]$/, '');

    return this.http
      .post<T>(uri_, body, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error, handleError)));
  }

  put<T>(uri: string, body: any, queryParams: any = null, handleError: boolean = true): Observable<T> {
    const headers = this.baseHeaders;
    const params = BaseApiService.setupParams(queryParams);
    const uri_ = (this.baseUrl + uri).replace(/[?&]$/, '');

    return this.http
      .put<T>(uri_, body, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error, handleError)));
  }

  delete<T>(uri: string, queryParams: any = null, handleError: boolean = true): Observable<T> {
    const headers = this.baseHeaders;
    const params = BaseApiService.setupParams(queryParams);
    const uri_ = (this.baseUrl + uri).replace(/[?&]$/, '');

    return this.http
      .delete<T>(uri_, { headers, params })
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error, handleError)));
  }

  private errorHandler(error: HttpErrorResponse, handleError: boolean): Observable<never> {
    if (handleError) {
      console.log('caught HTTP error:', error);
      return NEVER;
    } else {
      // Rethrow error if we want to handle it in place of subscription.
      return throwError(() => error);
    }
  }

  private static setupParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams) {
      for (const key of Object.keys(queryParams)) {
        if (queryParams[key] !== undefined) {
          if (Array.isArray(queryParams[key])) {
            const list = queryParams[key] as Array<string | number | boolean>;
            list.forEach((value) => {
              params = params.append(key, value);
            });
          } else {
            params = params.append(key, queryParams[key]);
          }
        }
      }
    }
    return params;
  }
}
