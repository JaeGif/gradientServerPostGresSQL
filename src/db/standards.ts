type exerciseLevel = {
  exercise: string;
  exerciseId: string;
  level: {
    beginner: {
      ratio?: number;
      reps?: number;
      weight: {
        kg: number;
        lb: number;
      };
    };
    novice: {
      ratio?: number;
      reps?: number;
      weight: {
        kg: number;
        lb: number;
      };
    };
    intermediate: {
      ratio?: number;
      reps?: number;
      weight: {
        kg: number;
        lb: number;
      };
    };
    advanced: {
      ratio?: number;
      reps?: number;
      weight: {
        kg: number;
        lb: number;
      };
    };
    elite: {
      ratio?: number;
      reps?: number;
      weight: {
        kg: number;
        lb: number;
      };
    };
  };
};
export const standards: {
  gender: {
    [key: string]: exerciseLevel[];
    m: exerciseLevel[];
    f: exerciseLevel[];
  };
} = {
  gender: {
    m: [
      {
        exercise: 'bench press',
        exerciseId: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
        level: {
          beginner: { ratio: 0.5, weight: { kg: 47, lb: 103 } },
          novice: { ratio: 0.75, weight: { kg: 70, lb: 154 } },
          intermediate: { ratio: 1.25, weight: { kg: 98, lb: 217 } },
          advanced: { ratio: 1.75, weight: { kg: 132, lb: 291 } },
          elite: { ratio: 2, weight: { kg: 169, lb: 372 } },
        },
      },
      {
        exerciseId: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
        exercise: 'pull up',
        level: {
          beginner: { reps: 0, weight: { kg: -13, lb: -28 } },
          novice: { reps: 5, weight: { kg: 8, lb: 18 } },
          intermediate: { reps: 14, weight: { kg: 34, lb: 75 } },
          advanced: { reps: 25, weight: { kg: 63, lb: 138 } },
          elite: { reps: 37, weight: { kg: 93, lb: 206 } },
        },
      },
      {
        exerciseId: '5850e575-4f8d-4723-bb1f-6807fbab1458',
        exercise: 'squat',
        level: {
          beginner: { ratio: 0.75, weight: { kg: 64, lb: 141 } },
          novice: { ratio: 1.25, weight: { kg: 93, lb: 206 } },
          intermediate: { ratio: 1.5, weight: { kg: 130, lb: 287 } },
          advanced: { ratio: 2.25, weight: { kg: 173, lb: 381 } },
          elite: { ratio: 2.75, weight: { kg: 219, lb: 483 } },
        },
      },
      {
        exerciseId: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
        exercise: 'deadlift',
        level: {
          beginner: { ratio: 1, weight: { kg: 78, lb: 173 } },
          novice: { ratio: 1.5, weight: { kg: 112, lb: 246 } },
          intermediate: { ratio: 2, weight: { kg: 152, lb: 336 } },
          advanced: { ratio: 2.5, weight: { kg: 200, lb: 440 } },
          elite: { ratio: 3, weight: { kg: 250, lb: 552 } },
        },
      },
      {
        exerciseId: 'a00e222e-b2b4-4447-9274-7b9c011af8b5',
        exercise: 'shoulder press',
        level: {
          beginner: { ratio: 0.35, weight: { kg: 30, lb: 66 } },
          novice: { ratio: 0.55, weight: { kg: 45, lb: 99 } },
          intermediate: { ratio: 0.8, weight: { kg: 64, lb: 142 } },
          advanced: { ratio: 1.1, weight: { kg: 87, lb: 192 } },
          elite: { ratio: 1.4, weight: { kg: 112, lb: 248 } },
        },
      },
    ],
    f: [
      {
        exerciseId: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
        exercise: 'bench press',
        level: {
          beginner: { ratio: 0.25, weight: { kg: 17, lb: 38 } },
          novice: { ratio: 0.5, weight: { kg: 31, lb: 69 } },
          intermediate: { ratio: 0.75, weight: { kg: 51, lb: 111 } },
          advanced: { ratio: 1, weight: { kg: 74, lb: 164 } },
          elite: { ratio: 1.5, weight: { kg: 101, lb: 223 } },
        },
      },
      {
        exerciseId: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
        exercise: 'pull up',
        level: {
          beginner: { reps: 0, weight: { kg: -22, lb: -48 } },
          novice: { reps: 0, weight: { kg: -8, lb: -17 } },
          intermediate: { reps: 6, weight: { kg: 10, lb: 22 } },
          advanced: { reps: 15, weight: { kg: 30, lb: 65 } },
          elite: { reps: 26, weight: { kg: 51, lb: 112 } },
        },
      },
      {
        exerciseId: '5850e575-4f8d-4723-bb1f-6807fbab1458',
        exercise: 'squat',
        level: {
          beginner: { ratio: 0.5, weight: { kg: 30, lb: 65 } },
          novice: { ratio: 0.75, weight: { kg: 48, lb: 107 } },
          intermediate: { ratio: 1.25, weight: { kg: 73, lb: 161 } },
          advanced: { ratio: 1.5, weight: { kg: 103, lb: 227 } },
          elite: { ratio: 2, weight: { kg: 136, lb: 300 } },
        },
      },

      {
        exerciseId: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
        exercise: 'deadlift',
        level: {
          beginner: { ratio: 0.5, weight: { kg: 38, lb: 84 } },
          novice: { ratio: 1, weight: { kg: 60, lb: 132 } },
          intermediate: { ratio: 1.25, weight: { kg: 87, lb: 193 } },
          advanced: { ratio: 1.75, weight: { kg: 120, lb: 265 } },
          elite: { ratio: 2.5, weight: { kg: 157, lb: 345 } },
        },
      },
      {
        exerciseId: 'a00e222e-b2b4-4447-9274-7b9c011af8b5',
        exercise: 'shoulder press',
        level: {
          beginner: { ratio: 0.2, weight: { kg: 13, lb: 28 } },
          novice: { ratio: 0.35, weight: { kg: 22, lb: 48 } },
          intermediate: { ratio: 0.5, weight: { kg: 34, lb: 75 } },
          advanced: { ratio: 0.75, weight: { kg: 48, lb: 107 } },
          elite: { ratio: 1, weight: { kg: 65, lb: 143 } },
        },
      },
    ],
  },
};
