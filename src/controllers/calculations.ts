import { PerformedExercise } from '@prisma/client';
import { standards } from '../db/standards';
import { Exercise, Workout, PerformedSets } from '../utils/Types';
export const averageMultipleDatasets = (data: number[][]) => {
  let runningAvg = 0;
  let elementTotal = 0;
  let emptyArrCount = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].length === 0) {
      emptyArrCount++;
      continue;
    }
    for (let j = 0; j < data[i].length; j++) {
      elementTotal += data[i][j];
      if (!data[i][j + 1]) {
        // reset and average stuff out
        runningAvg += elementTotal / data[i].length;
        elementTotal = 0;
      }
    }
  }
  return parseFloat((runningAvg / (data.length - emptyArrCount)).toFixed(2));
};

export const calculate1RepMax = (data: any[], average: boolean) => {
  // unit agnostic, units that go in, are units that go out
  // use average 1RM averaging the sets in each exercise

  let estimatedORMArray;

  const calculateMax = (sets: PerformedSets[]) => {
    let avgForElementArr: number[] = [];

    for (let i = 0; i < sets.length; i++) {
      if (sets[i].reps >= 5) {
        const brzycki = sets[i].weight * (36 / (37 - sets[i].reps));
        avgForElementArr.push(brzycki);
      } else if (sets[i].reps < 5 && sets[i].reps !== 0) {
        const epley = sets[i].weight * (1 + sets[i].reps / 30);
        avgForElementArr.push(epley);
      } else return 0;
    }
    if (average) return calculateAverageOfArray(avgForElementArr);
    else return Math.max(...avgForElementArr);
  };
  const calculateAverageOfArray = (arr: number[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    return sum / arr.length;
  };
  if (data) {
    estimatedORMArray = data.map((el: any) => calculateMax(el.sets));
  }
  if (!estimatedORMArray) return [];
  return estimatedORMArray;
};

export const calculateStandardAvg = (
  exerciseIdx: string[] | [],
  userGender: 'm' | 'f',
  units: 'kg' | 'lb' = 'kg'
) => {
  const genderStandards = standards.gender[userGender];

  if (exerciseIdx.length === 0) return undefined;
  let beginner = 0;
  let novice = 0;
  let intermediate = 0;
  let advanced = 0;
  let elite = 0;
  for (let i = 0; i < exerciseIdx.length; i++) {
    for (let j = 0; j < genderStandards.length; j++) {
      if (exerciseIdx[i] === genderStandards[j].exerciseId) {
        beginner += genderStandards[j].level.beginner.weight[units];
        novice += genderStandards[j].level.novice.weight[units];
        intermediate += genderStandards[j].level.intermediate.weight[units];
        advanced += genderStandards[j].level.advanced.weight[units];
        elite += genderStandards[j].level.elite.weight[units];
      }
    }
  }
  beginner = parseFloat((beginner / exerciseIdx.length).toFixed(2));
  novice = parseFloat((novice / exerciseIdx.length).toFixed(2));
  intermediate = parseFloat((intermediate / exerciseIdx.length).toFixed(2));
  advanced = parseFloat((advanced / exerciseIdx.length).toFixed(2));
  elite = parseFloat((elite / exerciseIdx.length).toFixed(2));

  return {
    beginner: beginner,
    novice: novice,
    intermediate: intermediate,
    advanced: advanced,
    elite: elite,
    units: units,
  };
};

export const addExerciseIdx = (arr: PerformedExercise[][]) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length !== 0) {
      // these exercises WILL exist
      result.push(arr[i][0].exerciseId!);
    }
  }
  return result;
};

export const kgToLb = (kg: number) => {
  return parseFloat((kg * 2.20462).toFixed(2));
};
export const lbToKg = (lb: number) => {
  return parseFloat((lb / 2.20462).toFixed(2));
};
