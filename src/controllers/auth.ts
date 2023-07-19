import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import passport from 'passport';
import { generateToken } from '../utils/authUtils';
import { User } from '@prisma/client';
export const auth_local = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('querying', req);
  return res.sendStatus(200);
};
export const auth_register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('registering');
  console.log(req.body);
  passport.authenticate(
    'signup',
    { session: false },
    (err: string, user: User) => {
      // Check for errors
      if (err) throw new Error(err); // Generate token
      const token = generateToken(user.id);
      console.log(user);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Account created.',
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
  console.log(req.user);
  res.redirect(process.env.CLIENT_URL!);
};
