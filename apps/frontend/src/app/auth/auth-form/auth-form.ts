import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, CardModule, ButtonModule, InputTextModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  authService = inject(AuthService)
  mode = signal<'login' | 'register'>('login')
  router = inject(Router)

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { username, password } = this.form.getRawValue()

    if (this.mode() === 'login') {
      // Handle authentication logic here
      this.loging(username, password)
    } else {
      // Handle registration logic here
      this.register(username, password)
    }
  }

  loging(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login successful')
        this.form.reset()
        void this.router.navigate(['/'])
      },
      (error) => {
        console.error('Login failed', error)
      },
    )
  }

  register(username: string, password: string) {
    this.authService.register(username, password).subscribe(
      () => {
        console.log('Registration successful')
        this.form.reset()
        void this.router.navigate(['/'])
      },
      (error) => {
        console.error('Registration failed', error)
      },
    )
  }

  toggleMode() {
    this.mode.update((value) => (value === 'login' ? 'register' : 'login'))
  }
}
