import { signalStore, withState } from '@ngrx/signals';
import { Todos } from '../type/todo.type';
import { withTodosReducer } from './with-todos-reducer';
import { withTodosEffects } from './with-todos-effects';

const state: Todos = {
  isLoading: false,
  data: [],
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState<Todos>(state),
  withTodosReducer(),
  withTodosEffects()
);
