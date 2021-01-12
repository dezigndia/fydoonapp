import {detectChangesTypes} from '../actions/action-types';

let initialState = {
  changeChatList: true,
};
export const DetectChangesReducer = (state = initialState, action) => {
  switch (action.type) {
    case detectChangesTypes.UPDATE_CHAT_LIST:
      return {
        ...state,
        changeChatList: action.changeChatList,
      };
      break;
  }
  return state;
};
