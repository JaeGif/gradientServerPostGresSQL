import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const exercises_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercises = await prisma.exercise.findMany({});
    res.json({ exercises }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const exercise_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ exercise }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const exercise_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = JSON.parse(req.body);
  try {
    const exercise = await prisma.exercise.update({
      where: {
        id: req.params.id,
      },
      data,
    });
    res.json({ exercise }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const exercise_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercise = await prisma.exercise.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ exercise }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
