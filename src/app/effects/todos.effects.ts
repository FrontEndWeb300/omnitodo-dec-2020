import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // ONLY EVER IMPORT THIS ONE.
import * as actions from '../actions/todo-item.actions';
import { loginSucceeded } from '../actions/auth.actions';
import { TodosDataService } from '../services/todos-data.service';

@Injectable()
export class TodoEffects {

  loadDataOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSucceeded),
      map(() => actions.loadTodos())
    )
  );

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.service.getAllTodos()
        .pipe(
          map(payload => actions.loadTodosSucceeded({ payload })),
          catchError(() => of(actions.loadTodosFailed({ payload: 'Could not load todos' })))
        )
      )
    )
  );

  constructor(private service: TodosDataService, private actions$: Actions) { }
}
