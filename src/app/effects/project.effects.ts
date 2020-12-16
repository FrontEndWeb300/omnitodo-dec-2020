import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // ONLY EVER IMPORT THIS ONE.
import * as actions from '../actions/project.actions';
import { loginSucceeded } from '../actions/auth.actions';
import { ProjectEntity } from '../reducers/projects.reducer';
import { ProjectsDataService } from '../services/projects-data.service';

@Injectable()
export class ProjectEffects {
  readonly baseUrl = environment.apiUrl;

  loadTheDataWhenTheyLogOn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSucceeded),
      switchMap(() => this.service.getAllProject()
        .pipe(
          map((data) => actions.loadProjectsSucceeded({ payload: data })),
          catchError(err => of(actions.loadProjectsFailure({ payload: 'Could not load projects' })))
        )
      )
    ), { dispatch: true }
  );

  constructor(private client: HttpClient, private actions$: Actions, private service: ProjectsDataService) { }
}
