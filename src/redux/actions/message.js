
import { MESSAGE } from './action-types';
export const sendMessage = (message) => {
    return {
        type: MESSAGE.SEND,
        message
    };
}