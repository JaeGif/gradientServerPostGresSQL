import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

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

export const goal_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let updateFields: {
      lifts?: {
        benchPress?: string;
        pullups?: string;
        squats?: string;
        deadlifts?: string;
        shoulderPress?: string;
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
