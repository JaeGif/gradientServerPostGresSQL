import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client

export const notes_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.query;
    const userNotes = await prisma.note.findMany({
      where: {
        userId: user as string,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    return res.json({ userNotes }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const note_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ note }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const note_put = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await prisma.note.update({
      where: { id: req.params.id },
      data: {
        text: req.body.text,
      },
    });
    return res.json({ note }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const note_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = prisma.note.create({
      data: {
        text: req.body.text,
        user: { connect: { id: req.body.userId } },
      },
    });
    return res.json({ note }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
export const note_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = prisma.note.delete({ where: { id: req.params.id } });
    return res.json({ note }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
