const validateEmail = email => {
  // eslint-disable-next-line max-len
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

// zipcode (only numbers, 1000-9999, no space before and after)
const onlyDigitsWithExactLength = (zipCode, digits = 4) => {
  zipCode = String(zipCode);
  if (zipCode.length !== digits) return false;

  const re = /^\d+$/g;
  return re.test(zipCode);
};

// house number (only numbers, no letters, no spaces before and after, max 5 digits)
const onlyDigitsMaxLength = (digits, maxLength = 5) => {
  digits = String(digits);
  if (digits.length > maxLength) return false;

  const re = /^\d+$/g;
  return re.test(digits);
};

// first name and last name (no numbers, no spaces before and after, start with capital)
const nameValidation = name => {
  name = String(name);

  const re = /^[A-Z][^\d ]{1,100}$/;
  return re.test(name);
};

// insertion (no numbers, no spaces before and after)
const noNumberAndSpacesAtStartOrEnd = name => {
  name = String(name);

  const re = /^[^\s0-9][\D]+[^\s0-9]$/;
  return re.test(name);
};

// addition (no spaces before and after, max 6 symbols)
const maxSymbols = (symbols, maxLength = 6) => {
  symbols = String(symbols);
  if (symbols.length > maxLength) return false;

  const re = /^\S+(?: \S+)*$/g;
  return re.test(symbols);
};

// street name and city (max 100 characters)
const checkLength = (characters, maxLength = 100) => {
  characters = String(characters);
  if (characters.length > maxLength || characters.length === 0) return false;
  return true;
};

// telephone (start with 0, no +, minimum 9, max 10 digits, no spaces)
const telephoneValidation = telephone => {
  telephone = String(telephone);
  if (telephone.length > 10 || telephone.length < 9) return false;

  const re = /[0]\d+[0-9]$/g;
  return re.test(telephone);
};

// one capital letter, one small letter, one number, at least 6 symbols
const passwordValidation = password => {
  password = String(password);

  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/g;
  return re.test(password);
};

export {
  validateEmail,
  onlyDigitsWithExactLength,
  nameValidation,
  noNumberAndSpacesAtStartOrEnd,
  onlyDigitsMaxLength,
  maxSymbols,
  telephoneValidation,
  checkLength,
  passwordValidation
};
