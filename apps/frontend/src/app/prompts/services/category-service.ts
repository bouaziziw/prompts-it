import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Category } from '../models/category.model'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpClient = inject(HttpClient)
  url = environment.apiUrl

  getCategories() {
    return this.httpClient.get<Category[]>(`${this.url}/categories`)
  }
}
