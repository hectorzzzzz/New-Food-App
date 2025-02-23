//file for user (MongoDB) model => define the data structure that will be stored in MongoDB

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;

export interface IUser {
  username: string;
}