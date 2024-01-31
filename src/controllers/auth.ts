import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { generateToken } from '../utils/authUtils';
import { User } from '@prisma/client';
export const auth_local = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'login',
    { session: false },
    (err: string, user: User) => {
      // Check for errors
      if (err) throw new Error(err); // Generate token
      const token = generateToken(user.id);
      return res.status(201).json({
        data: {
          user: user.id,
          token,
        },
        statusCode: res.statusCode,
      });
    }
  )(req, res, next);
};
export const auth_register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'signup',
    { session: false },
    (err: string, user: User) => {
      // Check for errors
      if (err) throw new Error(err); // Generate token
      const token = generateToken(user.id);
      return res.status(201).json({
        data: {
          user,
          token,
        },
        statusCode: res.statusCode,
      });
    }
  )(req, res, next);
};

export const auth_github = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('github controller');
};

export const auth_google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const auth_github_redirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect(process.env.CLIENT_URL!);
};
