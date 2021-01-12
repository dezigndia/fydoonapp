import {detectChangesTypes} from './action-types';

export const updateChatList = isUpdate => {
  return {
    type: detectChangesTypes.UPDATE_CHAT_LIST,
    changeChatList: isUpdate,
  };
};
