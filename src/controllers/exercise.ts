import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const exercises_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { muscleGroup, userId, name } = req.query;
    let query = {};
    if (muscleGroup) {
      const userPerformedIdx = await prisma.performedExercise.findMany({
        where: {
          userId: userId as string,
        },
      });
      if (muscleGroup !== 'standards' && muscleGroup !== 'all') {
        query = {
          include: { muscleGroups: true },
          where: {
            muscleGroups: { name: muscleGroup as string },
            id: { in: userPerformedIdx.map((el) => el.exerciseId) },
          },
        };
      } else if (muscleGroup === 'standards') {
        query = {
          where: {
            standardized: true,
            id: { in: userPerformedIdx.map((el) => el.exerciseId) },
          },
        };
      } else if (muscleGroup === 'all') {
        query = {
          where: {
            id: { in: userPerformedIdx.map((el) => el.exerciseId) },
          },
        };
      }

      const exercises = await prisma.exercise.findMany(query);

      res.json({ exercises }).status(200);
    } else if (name) {
      query = {
        where: { name: { startsWith: name as string } },
      };
      const exercises = await prisma.exercise.findMany(query);
      res.json({ exercises }).status(200);
    } else {
      const exercises = await prisma.exercise.findMany(query);
      res.json({ exercises }).status(200);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const exercise_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Make a new exercise for the exercise library
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
