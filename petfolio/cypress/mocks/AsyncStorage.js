const AsyncStorage = {
  setItem: (key, value) => Promise.resolve(),
  getItem: (key) => Promise.resolve(null),
  removeItem: (key) => Promise.resolve(),
  clear: () => Promise.resolve(),
};

export default AsyncStorage;
export { AsyncStorage };