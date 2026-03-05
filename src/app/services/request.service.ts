import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly http = inject(HttpClient);

  get<T>(url: string, options: Record<string, unknown> = {}): Observable<T> {
    return this.http.get<T>(url, options).pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(url: string, body: never, options: Record<string, unknown> = {}): Observable<T> {
    return this.http
      .post<T>(url, body, options)
      .pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(url: string, body: never, options: Record<string, unknown> = {}): Observable<T> {
    return this.http
      .put<T>(url, body, options)
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(url: string, options: Record<string, unknown> = {}): Observable<T> {
    return this.http.delete<T>(url, options).pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any) {
    console.error(`API error: ${error.message || error}`);
    return throwError(() => error.message || 'Error occured');
  }
}
