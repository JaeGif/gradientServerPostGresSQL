import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const auth_local = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
