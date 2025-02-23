//file to handle login, check session, and register

import { RequestHandler } from 'express';
import { AuthErrorMessage } from './authError';
import { generateToken, registerUser } from '../../service/auth';

export const login: RequestHandler = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw 401;
      }
  
      const token = await generateToken(username, password);
      res.cookie('token', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : undefined,
      });
      res.status(200).json({ message: 'login Success', token });
    } catch (err) {
      if (err === 401 || err === 404) {
        res.status(err).json({ message: AuthErrorMessage.InvalidCredential });
        return;
      }
      res.status(500).json({ message: 'login failed', error: err });
    }
};

export const checkSession: RequestHandler = async (req, res) => {
    try {
      console.log('CHECKING SESSION');
      res.status(200).json({ message: 'success', isAuth: true });
    } catch (err) {
      if (err === 401 || err === 404) {
        res.status(err).json({ message: AuthErrorMessage.InvalidCredential });
        return;
      }
      res.status(500).json({ message: 'register failed', error: err });
    }
};

export const register: RequestHandler = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        throw 401;
      }
  
      await registerUser(username, password);
  
      res.status(200).json({ message: 'success' });
    } catch (err) {
      if (err === 401 || err === 404) {
        res.status(err).json({ message: AuthErrorMessage.InvalidCredential });
        return;
      }
      res.status(500).json({ message: 'register failed', error: err });
    }
};