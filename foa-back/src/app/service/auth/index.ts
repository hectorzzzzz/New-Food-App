//file to generate jwt after login and to hash the pasword after register

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createNewUser, getUserByUsername } from '../../repository/user';

const SECRET = 'secret';

export async function generateToken(username: string, password: string) {
  const user = await getUserByUsername(username);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw 401;
  }

  return jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
}

export async function registerUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return createNewUser(username, hashedPassword);
}