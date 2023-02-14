import types from './actionType';

let init_state = {
  token: null,
  userData: {},
};

const auth = (state = init_state, action: any) => {
  switch (action.type) {
    case types.INSERT: {
      let data = action.payload;
      return {...state, userData: data};
    }
    case types.UPDATE: {
      let data = action.payload;
      return {...state, userData: data};
    }

    default:
      return {...state};
  }
};
export default auth;
