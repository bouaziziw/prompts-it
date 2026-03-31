import { Component, computed, inject, input } from '@angular/core'
import { Prompt } from '../models/prompt.model'
import { ButtonModule } from 'primeng/button'
import { TagModule } from 'primeng/tag'
import { CardModule } from 'primeng/card'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-prompt-card',
  imports: [ButtonModule, TagModule, CardModule, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {
  prompt = input.required<Prompt>()
  authService = inject(AuthService)

  canEdit = computed(() => {
    const currentUser = this.authService.currentUser()
    return currentUser && currentUser.id === this.prompt().author.id
  })

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content)
  }
}
