import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListItem } from '../models';
import * as fromProjects from './projects.reducer';
export interface AppState {
  projects: fromProjects.ProjectState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer
};

// 1. If in a feature, create a featureSelector
//  note: we aren't. We are in the root app module.

// 2. Create a selector for each property off the root of the state.
const selectProjectsBranch = (state: AppState) => state.projects;
// 3. Any helpers that are used.
// look up on google (or bing) "MDN Object Destructuring"
const { selectAll: selectAllProjectsArray } =
  fromProjects.adapter.getSelectors(selectProjectsBranch);

// 4. What the component needs.

// TODO: ProjectListItem[]
export const selectProjectListItems = createSelector(
  selectAllProjectsArray,
  projects => projects as ProjectListItem[]
);
