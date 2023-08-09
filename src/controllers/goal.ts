import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import { connect } from 'http2';

export const goal_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goals = await prisma.goal.findFirst({ where: { id: req.params.id } });
    res.json({ goals }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const goal_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goalData = req.body.goal;
    const userId = req.body.userId;

    const goal = await prisma.goal.create({
      data: { ...goalData, user: { connect: { id: userId as string } } },
    });
    res.json({ goal }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const goal_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let updateFields: {
      lifts?: {
        benchPress?: number;
        pullup?: number;
        squats?: number;
        deadlift?: number;
        shoulderPress?: number;
      };
      weight?: number;
      bodyFatPercentage?: number;
    } = {};
    if (req.body.lifts) updateFields.lifts = req.body.lifts;
    if (req.body.weight) updateFields.weight = req.body.weight;
    if (req.body.bodyFatPercentage)
      updateFields.bodyFatPercentage = req.body.bodyFatPercentage;

    const updateGoal = await prisma.goal.update({
      where: { id: req.params.id },
      data: updateFields,
    });
    res.json({ updateGoal }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
