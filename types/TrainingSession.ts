import Exercise from "./Exercise";

type TrainingSession = {
  id?: string; // reserved for firestore id
  // userId: string;
  sessionDate: Date;
  exercises: Exercise[];
  notes?: string;
};

export default TrainingSession;
