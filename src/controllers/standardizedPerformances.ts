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
    const referenceIdxTable = {
      benchPress: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
      pullups: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
      deadlifts: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
      squats: '5850e575-4f8d-4723-bb1f-6807fbab1458',
      shoulderPress: 'a00e222e-b2b4-4447-9274-7b9c011af8b5',
    };

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
    const recentShoulderPressPerformances =
      await prisma.performedExercise.findMany({
        where: {
          userId: user as string,
          exerciseId: referenceIdxTable.shoulderPress,
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

    const average = averageMultipleDatasets([
      calculate1RepMax(recentBenchPressPerformances, true),
      calculate1RepMax(recentPullupsPerformances, true, true, 83),
      calculate1RepMax(recentDeadliftsPerformances, true),
      calculate1RepMax(recentSquatsPerformances, true),
      calculate1RepMax(recentShoulderPressPerformances, true),
    ]);

    const averagedStandards = calculateStandardAvg(
      addExerciseIdx([
        recentBenchPressPerformances,
        recentPullupsPerformances,
        recentDeadliftsPerformances,
        recentSquatsPerformances,
        recentShoulderPressPerformances,
      ]),
      userGender as 'm' | 'f',
      units as 'kg' | 'lb'
    );

    return average && averagedStandards
      ? res.json({ average, averagedStandards }).status(200)
      : res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const standardized_exercise_maxes_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, count } = req.query;
    const referenceIdxTable = {
      benchPress: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
      pullups: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
      deadlifts: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
      squats: '5850e575-4f8d-4723-bb1f-6807fbab1458',
      shoulderPress: 'a00e222e-b2b4-4447-9274-7b9c011af8b5',
    };

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
    const recentShoulderPressPerformances =
      await prisma.performedExercise.findMany({
        where: {
          userId: user as string,
          exerciseId: referenceIdxTable.shoulderPress,
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

    const max = [
      Math.max(...calculate1RepMax(recentBenchPressPerformances, false)),
      Math.max(...calculate1RepMax(recentPullupsPerformances, false, true, 83)),
      Math.max(...calculate1RepMax(recentSquatsPerformances, false)),
      Math.max(...calculate1RepMax(recentDeadliftsPerformances, false)),
      Math.max(...calculate1RepMax(recentShoulderPressPerformances, false)),
    ];

    return max ? res.json({ max }).status(200) : res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
