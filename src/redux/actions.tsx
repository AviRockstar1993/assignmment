import store from './store';
import actionType from './actionType';

//const {dispatch} = store;

export function insert(data: String) {
  console.log('Insert function call', data);
  return {
    type: actionType.INSERT,
    payload: data,
  };
}

export function update(data: String) {
  console.log('Update function call', data);
  return {
    type: actionType.UPDATE,
    payload: data,
  };
}
