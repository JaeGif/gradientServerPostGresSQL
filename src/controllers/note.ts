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
        createdAt: 'asc',
      },
      take: 10,
    });
    userNotes ? res.json({ userNotes }).status(200) : res.sendStatus(404);
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
    note ? res.json({ note }).status(200) : res.sendStatus(404);
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
    note ? res.json({ note }).status(200) : res.sendStatus(404);
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
    const note = await prisma.note.create({
      data: {
        text: req.body.text,
        user: { connect: { id: req.body.userId } },
      },
    });
    note ? res.json({ note }).status(200) : res.sendStatus(404);
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
    const note = await prisma.note.delete({ where: { id: req.params.id } });
    return res.json({ note }).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(404);
  }
};
