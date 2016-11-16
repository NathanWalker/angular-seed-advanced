import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { Category } from '../../core/common/category.common';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export interface INameListActions {
  INIT: string;
  INITIALIZED: string;
  INIT_FAILED: string;
  ADD: string;
  NAME_ADDED: string;
}

export const ActionTypes: INameListActions = {
  INIT:        type(`[${Category.NAMELIST}] Init`),
  INITIALIZED: type(`[${Category.NAMELIST}] Initialized`),
  INIT_FAILED: type(`[${Category.NAMELIST}] Init Failed`),
  ADD:         type(`[${Category.NAMELIST}] Add`),
  NAME_ADDED:  type(`[${Category.NAMELIST}] Name Added`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class InitAction implements Action {
  type = ActionTypes.INIT;
}

export class InitializedAction implements Action {
  type = ActionTypes.INITIALIZED;

  constructor(public payload: Array<string>) { }
}

export class InitFailedAction implements Action {
  type = ActionTypes.INIT_FAILED;
}

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: string) { }
}

export class NameAddedAction implements Action {
  type = ActionTypes.NAME_ADDED;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  | InitializedAction
  | InitFailedAction
  | AddAction
  | NameAddedAction;
