import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import { PerformedSets } from '../utils/Types';

export const performed_exercises_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { exercise, user, standardized } = req.query;
    if (standardized) {
      const performedExercises = await prisma.performedExercise.findMany({
        where: {
          userId: user as string,
          exercise: { standardized: true },
        },
        include: { exercise: true, performedWorkout: true, sets: true },
        orderBy: {
          date: 'asc',
        },
      });
      res.json({ performedExercises }).status(200);
    } else {
      const performedExercises = await prisma.performedExercise.findMany({
        where: {
          exerciseId: exercise as string,
          userId: user as string,
        },
        include: { exercise: true, performedWorkout: true, sets: true },
        orderBy: {
          date: 'asc',
        },
      });

      res.json({ performedExercises }).status(200);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const performed_exercises_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { performedWorkout, exercise, sets, user, date } = req.body;
  try {
    // Post a new exercise, connect to a workout IF the user selected a workout from the list.
    // It does not HAVE to be connected to a workout.

    const performedExercise = await prisma.performedExercise.create({
      data: {
        sets: {
          createMany: {
            data: sets as PerformedSets,
          },
        },
        /*         date: date || Date.now(),
         */ exercise: { connect: { id: exercise } },
        performedWorkout: { connect: { id: performedWorkout } },
        user: { connect: { id: user } },
      },
    });
    console.log(performedExercise);
    res.json({ performedExercise }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const performed_exercise_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get a single performed exercise
  try {
    const performedExercise = await prisma.performedExercise.findUnique({
      where: { id: req.params.id },
    });
    res.json({ performedExercise }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const performed_exercise_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // edit a single performed exercise
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
