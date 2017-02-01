import { makeTempKey } from '../utils/tempKey';
import { fields, stripFields } from '../resource/fields';
import { IBatchDescriptor } from './interfaces';
import { isType } from 'redux-typescript-actions';

export default function reducer<T>(descriptor: IBatchDescriptor<T>, options) {
  const { actions } = descriptor;
  return (state = { creating: false, reading: false, updating: false, deleting: false, error: null, items: [], item: {} }, action) => {
    if (isType(action, actions.APPLY)) {
      return { ...state, item: { ...state.item, ...(action.payload.item as any) }
    };
  }

  if (isType(action, actions.CREATE)) {
    return { ...state, creating: true, items: action.payload.items, item: {} };
  }
  if (isType(action, actions.CREATE_CANCEL)) {
    return { ...state, creating: false, items: [], item: {} };
  }
  if (isType(action, actions.CREATE_CONTINUE)) {
    return { ...state, creating: false };
  }

  if (isType(action, actions.READ)) {
    return { ...state, reading: true, items: action.payload.items, item: {} };
  }
  if (isType(action, actions.READ_CANCEL)) {
    return { ...state, reading: false, items: [], item: {} };
  }
  if (isType(action, actions.READ_CONTINUE)) {
    return { ...state, reading: false };
  }

  if (isType(action, actions.UPDATE)) {
    return { ...state, updating: true, items: action.payload.items, item: {} };
  }
  if (isType(action, actions.UPDATE_CANCEL)) {
    return { ...state, updating: false, items: [], item: {} };
  }
  if (isType(action, actions.UPDATE_CONTINUE)) {
    return { ...state, updating: false };
  }

  if (isType(action, actions.DELETE)) {
    return { ...state, deleting: true, items: action.payload.items, item: {} };
  }
  if (isType(action, actions.DELETE_CANCEL)) {
    return { ...state, deleting: false, items: [], item: {} };
  }
  if (isType(action, actions.DELETE_CONTINUE)) {
    return { ...state, deleting: false };
  }

  if (isType(action, actions.RESET)) {
    return { ...state, creating: false, reading: false, updating: false, deleting: false, items: [], item: {} };
  }

  return state;
};
}
