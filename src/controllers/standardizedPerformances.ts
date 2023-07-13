import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import { PerformedSets } from '../utils/Types';
import {
  addExerciseIdx,
  averageMultipleDatasets,
  calculate1RepMax,
  calculateStandardAvg,
} from './calculations';

export const standardized_exercise_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, count, userGender, units } = req.query;
    console.log('begin');
    const referenceIdxTable = {
      benchPress: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
      squats: '5850e575-4f8d-4723-bb1f-6807fbab1458',
      deadlifts: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
      pullups: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
    };
    // reference only the last 5 performances?
    // 1. Bench Press eID = bf61dcb9-7147-4bdd-af5e-c987f2c2439a
    // 2. Squats eID = 5850e575-4f8d-4723-bb1f-6807fbab1458
    // 3. Deadlift eID = 4c08bff3-33d6-4ff2-9252-97ab9164349d
    // 4. Pullups eID = 6a10f694-25bd-4824-b2a2-bfb21b4167c4
    // If the standards have no data,
    // it needs to be discounted and not
    // counted in the averagedDS
    const recentBenchPressPerformances =
      await prisma.performedExercise.findMany({
        where: {
          userId: user as string,
          exerciseId: referenceIdxTable.benchPress,
        },
        include: {
          exercise: true,
          performedWorkout: true,
          sets: true,
        },
        orderBy: {
          date: 'desc',
        },
        take: parseInt(count as string),
      });
    const recentSquatsPerformances = await prisma.performedExercise.findMany({
      where: {
        userId: user as string,
        exerciseId: referenceIdxTable.squats,
      },
      include: {
        exercise: true,
        performedWorkout: true,
        sets: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: parseInt(count as string),
    });
    const recentDeadliftsPerformances = await prisma.performedExercise.findMany(
      {
        where: {
          userId: user as string,
          exerciseId: referenceIdxTable.deadlifts,
        },
        include: {
          exercise: true,
          performedWorkout: true,
          sets: true,
        },
        orderBy: {
          date: 'desc',
        },
        take: parseInt(count as string),
      }
    );
    const recentPullupsPerformances = await prisma.performedExercise.findMany({
      where: {
        userId: user as string,
        exerciseId: referenceIdxTable.pullups,
      },
      include: {
        exercise: true,
        performedWorkout: true,
        sets: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: parseInt(count as string),
    });

    console.log(recentBenchPressPerformances[0].sets);
    const average = averageMultipleDatasets([
      calculate1RepMax(recentBenchPressPerformances, true),
      calculate1RepMax(recentSquatsPerformances, true),
      calculate1RepMax(recentDeadliftsPerformances, true),
      calculate1RepMax(recentPullupsPerformances, true),
    ]);

    const averagedStandards = calculateStandardAvg(
      addExerciseIdx([
        recentBenchPressPerformances,
        recentDeadliftsPerformances,
        recentPullupsPerformances,
        recentSquatsPerformances,
      ]),
      userGender as 'm' | 'f',
      units as 'kg' | 'lb'
    );

    return average
      ? res.json({ average, averagedStandards }).status(200)
      : res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
