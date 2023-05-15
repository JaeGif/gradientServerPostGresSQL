export type User = {
  username: String;
  age: number;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  email: string;
  preferences: JSON;
};

export type Muscle = {
  name: string;
};

export type MuscleGroup = {
  name: string;
};

export type Exercise = {
  name: string;
  reps: number;
  sets: number;
  rtf?: number;
};

export type Workout = {
  name: string;
};
