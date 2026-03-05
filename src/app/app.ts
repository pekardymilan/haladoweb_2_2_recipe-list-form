import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LocalStorageKeys } from './constants/local-storage-keys';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Recipe list');
  readonly authService = inject(AuthService);

  get isLoggedIn() {
    return localStorage.getItem(LocalStorageKeys.TOKEN) !== null;
  }

  onLogin() {
    if (this.isLoggedIn) {
      localStorage.removeItem(LocalStorageKeys.TOKEN);
    } else {
      this.authService
        .login()
        .pipe(take(1))
        .subscribe((token) => localStorage.setItem(LocalStorageKeys.TOKEN, token));
    }
  }
}
