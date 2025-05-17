import { inject } from '@angular/core';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';
import { TodoAPI } from './todo.api';
import { todosApiEvents, todosPageEvents } from './todos.action';
import { exhaustMap, map } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { Todos } from '../type/todo.type';

export function withTodosEffects() {
  return signalStoreFeature(
    { state: type<Todos>() },
    withEffects(
      (store, events = inject(Events), todoAPI = inject(TodoAPI)) => ({
        loadTodos$: events.on(todosPageEvents.loaded).pipe(
          exhaustMap(() =>
            todoAPI.getTodos().pipe(
              mapResponse({
                next: ({ todos }) => todosApiEvents.loadedSuccess(todos),
                error: () => todosApiEvents.loadedFailure(),
              })
            )
          )
        ),
        updateTodo$: events.on(todosPageEvents.updated).pipe(
          map(({ payload }) => {
            const { id, todo } = payload;

            const todos = store.data().map((value) => {
              if (value.id === id) {
                return {
                  ...value,
                  ...todo,
                };
              }

              return value;
            });

            return todosApiEvents.loadedSuccess(todos);
          })
        ),
      })
    )
  );
}
