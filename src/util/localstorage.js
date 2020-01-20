const localStorage = {};

localStorage.setItem = function(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
};

localStorage.getItem = function(key) {
  const value = window.localStorage.getItem(key);

  if (value !== undefined && value !== "undefined") {
    return value && JSON.parse(value);
  }
};

localStorage.removeItem = function(key) {
  window.localStorage.removeItem(key);
};

export default localStorage;
