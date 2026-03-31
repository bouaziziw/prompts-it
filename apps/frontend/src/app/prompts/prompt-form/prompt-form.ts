import { Component, effect, inject, input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { toSignal } from '@angular/core/rxjs-interop'
import { CategoryService } from '../services/category-service'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { PromptService } from '../services/prompt-service'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-prompt-form',
  imports: [
    CardModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  router = inject(Router)
  categoryService = inject(CategoryService)
  promptService = inject(PromptService)

  promptId = input<number>()

  categories = toSignal(this.categoryService.getCategories())

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.max(30)],
      nonNullable: true,
    }),
    content: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  })

  constructor() {
    effect(() => {
      const promptId = this.promptId()
      if (promptId) {
        // Fetch the prompt details using the promptId and populate the form for editing
        this.promptService.getPrompt(promptId).subscribe((prompt) => {
          this.form.patchValue({
            title: prompt.title,
            content: prompt.content,
            categoryId: prompt.category.id,
          })
        })
      }
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const prompt = this.form.getRawValue() // Convert categoryId to a number if it's not already
    const promptId = this.promptId()

    if (promptId) {
      this.promptService.updatePrompt(promptId, prompt).subscribe(() => {
        console.log('Prompt updated successfully')
        // Optionally, reset the form or provide feedback to the user
        this.form.reset()
        void this.router.navigate(['/']) // Navigate to the prompt list after successful update
      })
    } else {
      this.promptService.createPrompt(prompt).subscribe(() => {
        console.log('Prompt created successfully')
        // Optionally, reset the form or provide feedback to the user
        this.form.reset()
        void this.router.navigate(['/']) // Navigate to the prompt list after successful creation
      })
    }
  }

  deletePrompt() {
    this.promptService.deletePrompt(this.promptId()!).subscribe(() => {
      console.log('Prompt deleted successfully')
      void this.router.navigate(['/']) // Navigate to the prompt list after successful deletion
    })
  }
}
