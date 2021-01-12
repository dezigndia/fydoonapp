const fetchMessages = (anotherUser, type, start = 0, end = 10) => {
  const cmd = {
    command: 'fetch_message',
    start_point: start,
    end_point: end,
  };
  if (type === 'o') {
    cmd['another_user'] = anotherUser;
    cmd['chat'] = 'one_to_one';
  } else if (type === 'g') {
    cmd['group_id'] = anotherUser;
    cmd['chat'] = 'group';
  } else if (type === 'b') {
    cmd['chat'] = 'broadcast';
    cmd['broadcast_id'] = anotherUser;
  }
  return JSON.stringify(cmd);
};

const newMessage = (anotherUser, type, message, file) => {
  const cmd = {
    command: 'new_message',
    message: message,
    file: file != null ? file : '0',
  };
  if (type === 'o') {
    cmd['another_user'] = anotherUser;
    cmd['chat'] = 'one_to_one';
  } else if (type === 'g') {
    cmd['group_id'] = anotherUser;
    cmd['chat'] = 'group';
  } else if (type === 'b') {
    cmd['chat'] = 'broadcast';
    cmd['broadcast_id'] = anotherUser;
  }
  return JSON.stringify(cmd);
};
const getChatsLists = type => {
  const cmd = {
    chat: type,
  };

  return JSON.stringify(cmd);
};
const deleteCompleteOnetoOneChat = another_user => {
  const cmd = {
    command: 'delete_chat',
    another_user: another_user,
    chat: 'one_to_one',
  };
  return JSON.stringify(cmd);
};
const deleteCompleteGroupChat = group_id => {
  const cmd = {
    command: 'delete_chat',
    group_id,
    chat: 'group',
  };
  return JSON.stringify(cmd);
};
const exitFromGroup = (group_id, participant) => {
  const cmd = {
    command: 'remove_participant',
    group_id,
    chat: 'group',
    participant,
  };
  return JSON.stringify(cmd);
};
const getGroupDetails = group_id => {
  const cmd = {
    command: 'fetch_group_detail',
    group_id,
    chat: 'group',
  };
  return JSON.stringify(cmd);
};
const addAdmin = (group_id, userNames) => {
  const cmd = {
    command: 'add_admin',
    group_id,
    chat: 'group',
    admin: userNames,
  };
  return JSON.stringify(cmd);
};
const clearChat = (id, type) => {
  const cmd = {
    command: 'clear_chat',
  };
  if (type === 'o') {
    cmd['another_user'] = id;
    cmd['chat'] = 'one_to_one';
  } else if (type === 'g') {
    cmd['group_id'] = id;
    cmd['chat'] = 'group';
  } else if (type === 'b') {
    cmd['chat'] = 'broadcast';
    cmd['broadcast_id'] = id;
  }
  return JSON.stringify(cmd);
};
const addGroupDetails = (group_id, group_name, display_pic) => {
  const cmd = {
    chat: 'group',
    command: 'change_basic_info',
    group_id,
    group_name,
    display_pic,
  };
  return JSON.stringify(cmd);
};
const addGroupParticipants = (group_id, participant) => {
  const cmd = {
    chat: 'group',
    command: 'add_participant',
    group_id,
    participant,
    permission: '0',
  };
  return JSON.stringify(cmd);
};
const getBoadcastDetails = broadcast_id => {
  const cmd = {
    command: 'fetch_broadcast_detail',
    broadcast_id,
    chat: 'broadcast',
  };
  return JSON.stringify(cmd);
};
const addBroadcastDetails = (broadcast_id, broadcast_name, display_pic) => {
  const cmd = {
    chat: 'broadcast',
    command: 'change_basic_info',
    broadcast_id,
    broadcast_name,
    display_pic,
  };
  return JSON.stringify(cmd);
};
export {
  addGroupParticipants,
  fetchMessages,
  getGroupDetails,
  getChatsLists,
  clearChat,
  deleteCompleteOnetoOneChat,
  deleteCompleteGroupChat,
  exitFromGroup,
  newMessage,
  addAdmin,
  addGroupDetails,
  getBoadcastDetails,
  addBroadcastDetails
};
