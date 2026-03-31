import { Component } from '@angular/core'
import { Navbar } from './navbar/navbar'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Navbar, RouterOutlet],
})
export class App {}
