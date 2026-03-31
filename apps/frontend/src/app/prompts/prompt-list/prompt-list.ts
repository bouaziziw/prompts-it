import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Prompt } from '../models/prompt.model'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../services/prompt-service'
// import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-prompt-list',
  imports: [PromptCard],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.scss',
})
export class PromptList {
  promptService = inject(PromptService)

  prompts = toSignal<Prompt[]>(this.promptService.getPrompts())
  // or pipe async to get the value of the signal => @for (prompt of $prompts | async; track prompt.id) {
  // in ts file : $prompts = this.prompts;
  // the async pipe subscribes to the signal and updates the view whenever the signal's value changes.
}
