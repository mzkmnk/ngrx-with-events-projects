import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { TodosStore } from './todos/todos.store';
import { injectDispatch } from '@ngrx/signals/events';
import { todosPageEvents } from './todos/todos.action';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <h1>{{ title }}</h1>
    <button (click)="getTodos()">get Todos</button>

    <div>
      @if(isLoading()){
      <p>Loading...</p>
      }@else{ @for(todo of todos();let i = $index; track i){
      <button (click)="editTodo(todo.id)">edit</button>
      @if(editTodoId() === todo.id){
      <input [(ngModel)]="editTodoContent" />
      <button (click)="updatedTodo()">update</button>
      }@else{
      <div>
        <small>{{ todo.id }}</small>
        <p>{{ todo.todo }}</p>
      </div>
      }
      <hr />
      } }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ngrx-with-events-projects';

  private readonly todosStore = inject(TodosStore);

  private readonly todosPageEventsDispatch = injectDispatch(todosPageEvents);

  readonly isLoading = this.todosStore.isLoading;

  readonly todos = this.todosStore.data;

  readonly editTodoId = signal<number>(-1);

  readonly editTodoContent = model<string>('');

  editTodo(id: number): void {
    this.editTodoId.set(id);
  }

  updatedTodo(): void {
    this.todosPageEventsDispatch.updated({
      id: this.editTodoId(),
      todo: { todo: this.editTodoContent() },
    });

    // initialize
    this.editTodoId.set(-1);
    this.editTodoContent.set('');
  }

  getTodos(): void {
    this.todosPageEventsDispatch.loaded();
  }
}
