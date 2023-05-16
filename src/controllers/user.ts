import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const users_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({});
    res.json({ users }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const user_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ user }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const user_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = JSON.parse(req.body);
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data,
    });
    res.json({ user }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const user_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ user }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
