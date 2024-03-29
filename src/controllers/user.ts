import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import { hash } from '../utils/authUtils';

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
  const { weight, gender, bodyFatPercentage, preferences, newPassword } =
    req.body;
  let innerPreferences: {
    unit?: 'kg' | 'lb';
    standard?: 'percentile' | 'ratio';
  } = {};
  let updateFields: {
    gender?: 'm' | 'f';
    weight?: { value?: number; unit?: 'kg' | 'lb' };
    bodyFatPercentage?: number;
    preferences?: any;
  } = {};
  // update only selected fields
  if (gender) updateFields.gender = gender as 'm' | 'f';
  if (weight)
    updateFields.weight = { value: weight as number, unit: preferences.unit };
  if (bodyFatPercentage)
    updateFields.bodyFatPercentage = bodyFatPercentage as number;
  if (preferences) {
    if (preferences.unit) innerPreferences.unit = preferences.unit;
    if (preferences.standard) innerPreferences.standard = preferences.standard;
    updateFields.preferences = innerPreferences;
  }
  if (newPassword) {
    try {
      const user = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          password: await hash(newPassword as string),
        },
      });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(404);
    }
  } else {
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
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
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
