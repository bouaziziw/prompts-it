import { Component, inject, signal } from '@angular/core'
import { value } from '@primeuix/themes/aura/knob'
import { Button } from 'primeng/button'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-navbar',
  imports: [Button, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isDarkMode = signal(false)
  public authService = inject(AuthService)
  router = inject(Router)

  toggleDarkMode() {
    this.isDarkMode.update((value) => !value)
    document.documentElement.classList.toggle('dark-mode', this.isDarkMode())
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
