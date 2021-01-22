exports.stringToLowerCase = (obj) => {
  for (let key in obj) {
    if (key === "username" || "email") {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj;
};
