import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { todosApiEvents, todosPageEvents } from './todos.action';
import { Todo, Todos } from '../type/todo.type';

export function withTodosReducer() {
  return signalStoreFeature(
    { state: type<Todos>() },
    withReducer(
      on(todosPageEvents.loaded, todosPageEvents.updated, () => [
        setLoading(true),
      ]),
      on(todosApiEvents.loadedSuccess, ({ payload }) => [
        setLoading(false),
        setTodos(payload),
      ])
    )
  );
}

function setLoading(isLoading: boolean): Pick<Todos, 'isLoading'> {
  return {
    isLoading,
  };
}

function setTodos(todos: Todo[]): Pick<Todos, 'data'> {
  return {
    data: todos,
  };
}
