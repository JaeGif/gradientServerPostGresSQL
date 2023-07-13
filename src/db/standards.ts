type exerciseLevel = {
  exercise: string;
  exerciseId: string;
  level: {
    beginner: {
      weight: {
        kg: number;
        lb: number;
      };
    };
    novice: {
      weight: {
        kg: number;
        lb: number;
      };
    };
    intermediate: {
      weight: {
        kg: number;
        lb: number;
      };
    };
    advanced: {
      weight: {
        kg: number;
        lb: number;
      };
    };
    elite: {
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
          beginner: { weight: { kg: 47, lb: 103 } },
          novice: { weight: { kg: 70, lb: 154 } },
          intermediate: { weight: { kg: 98, lb: 217 } },
          advanced: { weight: { kg: 132, lb: 291 } },
          elite: { weight: { kg: 169, lb: 372 } },
        },
      },
      {
        exerciseId: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
        exercise: 'pull up',
        level: {
          beginner: { weight: { kg: -13, lb: -28 } },
          novice: { weight: { kg: 8, lb: 18 } },
          intermediate: { weight: { kg: 34, lb: 75 } },
          advanced: { weight: { kg: 63, lb: 138 } },
          elite: { weight: { kg: 93, lb: 206 } },
        },
      },
      {
        exerciseId: '5850e575-4f8d-4723-bb1f-6807fbab1458',
        exercise: 'squat',
        level: {
          beginner: { weight: { kg: 64, lb: 141 } },
          novice: { weight: { kg: 93, lb: 206 } },
          intermediate: { weight: { kg: 130, lb: 287 } },
          advanced: { weight: { kg: 173, lb: 381 } },
          elite: { weight: { kg: 219, lb: 483 } },
        },
      },
      {
        exerciseId: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
        exercise: 'deadlift',
        level: {
          beginner: { weight: { kg: 78, lb: 173 } },
          novice: { weight: { kg: 112, lb: 246 } },
          intermediate: { weight: { kg: 152, lb: 336 } },
          advanced: { weight: { kg: 200, lb: 440 } },
          elite: { weight: { kg: 250, lb: 552 } },
        },
      },
    ],
    f: [
      {
        exerciseId: 'bf61dcb9-7147-4bdd-af5e-c987f2c2439a',
        exercise: 'bench press',
        level: {
          beginner: { weight: { kg: 17, lb: 38 } },
          novice: { weight: { kg: 31, lb: 69 } },
          intermediate: { weight: { kg: 51, lb: 111 } },
          advanced: { weight: { kg: 74, lb: 164 } },
          elite: { weight: { kg: 101, lb: 223 } },
        },
      },
      {
        exerciseId: '5850e575-4f8d-4723-bb1f-6807fbab1458',
        exercise: 'squat',
        level: {
          beginner: { weight: { kg: 30, lb: 65 } },
          novice: { weight: { kg: 48, lb: 107 } },
          intermediate: { weight: { kg: 73, lb: 161 } },
          advanced: { weight: { kg: 103, lb: 227 } },
          elite: { weight: { kg: 136, lb: 300 } },
        },
      },
      {
        exerciseId: '6a10f694-25bd-4824-b2a2-bfb21b4167c4',
        exercise: 'pull up',
        level: {
          beginner: { weight: { kg: -22, lb: -48 } },
          novice: { weight: { kg: -8, lb: -17 } },
          intermediate: { weight: { kg: 10, lb: 22 } },
          advanced: { weight: { kg: 30, lb: 65 } },
          elite: { weight: { kg: 51, lb: 112 } },
        },
      },
      {
        exerciseId: '4c08bff3-33d6-4ff2-9252-97ab9164349d',
        exercise: 'deadlift',
        level: {
          beginner: { weight: { kg: 38, lb: 84 } },
          novice: { weight: { kg: 60, lb: 132 } },
          intermediate: { weight: { kg: 87, lb: 193 } },
          advanced: { weight: { kg: 120, lb: 265 } },
          elite: { weight: { kg: 157, lb: 345 } },
        },
      },
    ],
  },
};
