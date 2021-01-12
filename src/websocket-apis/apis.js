const chat = pk => `${pk}`;

const wsUrl = (pk, type) => {
  return chat(pk);
};

export {wsUrl};
