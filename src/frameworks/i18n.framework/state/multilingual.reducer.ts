import {Reducer, Action} from '@ngrx/store';

export const I18N_LANG_CHANGE: string = 'I18N_LANG_CHANGE';

export const MultilingualReducer: Reducer<any> = (state: any = { lang: 'en' }, action: Action) => {
  let reduceI18n = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case I18N_LANG_CHANGE:
      return reduceI18n();
    default:
      return state;
  }
};

