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
      include: { goal: true },
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
  const { weight, bodyFatPercentage, preferences } = req.body;
  let innerPreferences: {
    unit?: 'kg' | 'lb';
    standard?: 'percentile' | 'ratio';
  } = {};
  let updateFields: {
    weight?: number;
    bodyFatPercentage?: number;
    preferences?: any;
  } = {};
  // update only selected fields
  console.log(req.body);
  if (weight) updateFields.weight = weight as number;
  if (bodyFatPercentage)
    updateFields.bodyFatPercentage = bodyFatPercentage as number;

  if (preferences) {
    if (preferences.unit) innerPreferences.unit = preferences.unit;
    if (preferences.standard) innerPreferences.standard = preferences.standard;
    updateFields.preferences = innerPreferences;
  }
  console.log(updateFields);
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: updateFields,
    });
    res.sendStatus(200);
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
