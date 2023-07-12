import { PerformedExercise } from '@prisma/client';
import { PerformedSets } from '../utils/Types';

export const averageMultipleDatasets = (data: number[][]) => {
  let runningAvg = 0;
  let elementTotal = 0;
  let emptyArrCount = 0;
  console.log(data);
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
  // unit agnostic
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
