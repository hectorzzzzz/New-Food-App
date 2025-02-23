//file to manage user

import User from '../../model/user';

export async function getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    if (!user) {
      throw 404;
    }
  
    return user;
}

export async function createNewUser(username: string, password: string) {
    const user = new User({ username, password });
    await user.save();
    return user;
}

