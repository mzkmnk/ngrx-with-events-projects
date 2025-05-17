import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { Todo } from '../type/todo.type';

export const todosPageEvents = eventGroup({
  source: 'Todo Events',
  events: {
    loaded: type<void>(),
    updated: type<{ id: number; todo: Partial<Todo> }>(),
  },
});

export const todosApiEvents = eventGroup({
  source: 'Todos API',
  events: {
    loadedSuccess: type<Todo[]>(),
    loadedFailure: type<void>(),
  },
});
