import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { CurrentUser } from './current-user.model'
import { catchError, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient)
  baseUrl = `${environment.apiUrl}/auth`

  currentUser = signal<CurrentUser | undefined>(undefined)

  login(username: string, password: string) {
    // Implement your login logic here, e.g., make an HTTP request to your backend
    console.log('Logging in with', username, password)
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((user) => this.currentUser.set(user)))
  }

  logout() {
    // Implement your logout logic here, e.g., clear tokens, reset user state, etc.
    return this.httpClient.post(`${this.baseUrl}/logout`, {}).pipe(tap(() => this.currentUser.set(undefined)))
  }

  register(username: string, password: string) {
    // Implement your registration logic here, e.g., make an HTTP request to your backend
    console.log('Registering with', username, password)
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/register`, { username, password })
      .pipe(tap((user) => this.currentUser.set(user)))
  }

  loadCurrentUser() {
    // Implement logic to load the current user, e.g., from a token or an API call
    return this.httpClient.get<CurrentUser>(`${this.baseUrl}/me`).pipe(
      tap((user) => this.currentUser.set(user)),
      // Handle errors, e.g., if the user is not authenticated
      catchError(() => {
        this.currentUser.set(undefined)
        return of(undefined) // Return an empty observable to complete the stream
      }),
    )
  }
}
