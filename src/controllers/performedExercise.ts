import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const performed_exercises_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const performedExercises = await prisma.performedExercise.findMany({});
    res.json({ performedExercises }).status(200);
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
  console.log('body', req.body);

  const { performedWorkout, exercise, reps, sets, rtf } = req.body;
  try {
    // Post a new exercise, connect to a workout IF the user selected a workout from the list.
    // It does not HAVE to be connected to a workout.

    const performedExercise = await prisma.performedExercise.create({
      data: {
        reps: reps,
        sets: sets,
        rtf: rtf,
        exercise: { connect: { id: exercise } },
        performedWorkout: { connect: { id: performedWorkout } },
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
