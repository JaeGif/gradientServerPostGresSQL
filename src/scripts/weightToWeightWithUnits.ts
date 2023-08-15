import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.service'; // current client
import { PerformedSets } from '../utils/Types';
import { kgToLb } from '../controllers/calculations';

const convertWeightToWeightWithUnits = async () => {
  const allSets = await prisma.performedSet.findMany();

  for (let i = 0; i < allSets.length; i++) {
    // go through all exercises, get the weight column, and push it to weightUnits as
    //    JSON in the format weightUnits: {kg: Float, lb: Float}
    //    all weights originally in kgs
    const weightInKg = allSets[i].weight;
    await prisma.performedSet.update({
      where: { id: allSets[i].id },
      data: { weightUnits: { kg: weightInKg, lb: kgToLb(weightInKg) } },
    });
    console.log(i, ' done');
  }
};

convertWeightToWeightWithUnits();
