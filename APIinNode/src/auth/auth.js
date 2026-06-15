import * as bcrypt from "bcrypt";

// The following two function were to be used during
// an user creation for saving passowrds in the db
// as a hash representation.
//
// This functionality does not exist yet, though.

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
