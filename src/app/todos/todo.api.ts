import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodosApiResponse } from '../type/todo.type';
import { Observable } from 'rxjs';

const endPoint = 'https://dummyjson.com';

/**
 * https://dummyjson.com/docs/todos
 */

@Injectable({ providedIn: 'root' })
export class TodoAPI {
  private readonly http = inject(HttpClient);

  getTodos(): Observable<TodosApiResponse> {
    return this.http.get<TodosApiResponse>(`${endPoint}/todos`);
  }
}
