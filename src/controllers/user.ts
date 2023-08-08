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
    console.log(user);
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
    weight?: { value?: number; unit?: 'kg' | 'lb' };
    bodyFatPercentage?: number;
    preferences?: any;
  } = {};
  // update only selected fields
  if (weight)
    updateFields.weight = { value: weight as number, unit: preferences.unit };
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
    console.log(user);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};

export const user_emailcheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email as string,
      },
    });
    if (!user) {
      console.log('not found');
      return res.json({ message: 'Success' }).sendStatus(200);
    } else {
      console.log('found');
      return res.json({ message: 'Email already taken' }).sendStatus(409);
    }
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
