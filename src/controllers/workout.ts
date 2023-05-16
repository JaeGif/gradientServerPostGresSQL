import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const workouts_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workouts = await prisma.workout.findMany({});
    res.json({ workouts }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const workout_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ workout }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const workout_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = JSON.parse(req.body);
  try {
    const workout = await prisma.workout.update({
      where: {
        id: req.params.id,
      },
      data,
    });
    res.json({ workout }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const workout_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workout = await prisma.workout.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ workout }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
