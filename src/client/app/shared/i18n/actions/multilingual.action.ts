// libs
import { Action } from '@ngrx/store';

// app
import { type } from '../../core/utils/type';

// module
import { CATEGORY } from '../common/category.common';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IMultilingualActions {
  CHANGE: string;
  LANG_CHANGED: string;
  LANG_UNSUPPORTED: string;
}

export const ActionTypes: IMultilingualActions = {
  CHANGE:           type(`[${CATEGORY}] Change`),
  LANG_CHANGED:     type(`[${CATEGORY}] Lang Changed`),
  LANG_UNSUPPORTED: type(`[${CATEGORY}] Lang Unsupported`)
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ChangeAction implements Action {
  type = ActionTypes.CHANGE;

  constructor(public payload: string) { }
}

export class LangChangedAction implements Action {
  type = ActionTypes.LANG_CHANGED;

  constructor(public payload: string) { }
}

export class LangUnsupportedAction implements Action {
  type = ActionTypes.LANG_UNSUPPORTED;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ChangeAction
  | LangChangedAction
  | LangUnsupportedAction;
