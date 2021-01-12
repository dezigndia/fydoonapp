import { SOCKET_IO, SUBSCRIPTIONS } from '../actions/action-types';

let initialState = {
    requested: false,
    connected: false,
    subscriptions: [],
};

export const SocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SOCKET_IO.REQUEST:
            return {
                ...state,
                requested: action.requested,
            };
        case SOCKET_IO.SUCCESS:
            return {
                ...state,
                connected: action.connected
            };
        case SOCKET_IO.DISCONNECT:
            return {
                ...state,
                connected: action.connected
            };
        case SUBSCRIPTIONS.SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.subscriptions,
            };
    }
    return state;
};