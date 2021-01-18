export const socketUrl = '';

export const ChatEvent = {
  CONNECT: 'connect',
  CONTACTS: 'contacts',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message',
  ME: 'me',
  SUBSCRIPTIONS: 'subscriptions',
  SEND_MESSAGE: 'sendMessage',
  JOIN_ROOM: 'joinRoom',
  CREATE_DIRECT_ROOM: 'createDirectRoom',
  CHAT_HISTORY: 'chatHistory',
  LOAD_HISTORY: 'loadHistory',
  EXIT_ROOM: 'exitRoom',
  BROADCAST_MESSAGE: 'broadcastMessage',
  ROOM_MEMBERS: 'roomMembers',
  JOIN_GROUP: 'joinGroup',
  EXIT_GROUP: 'exitGroup',
  DELETE_MESSAGE_FOR_ME: 'deleteMessageForMe',
  DELETE_MESSAGE_FOR_EVERYONE: 'deleteMessageForEveryone',
  READ_MESSAGE: 'readMessages',
  CLEAR_CHAT_HISTORY: 'clearChatHistory',
};
