import { navigation } from '../constants/navActionType';

const initialState = {
  drawerOpen: true,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case navigation.DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
