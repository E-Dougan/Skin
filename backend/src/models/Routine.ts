export interface Routine {
  id?: number;
  user_id: number;
  name: string;
  description?: string;
  steps: RoutineStep[];
  frequency: string;
  created_at?: string;
  updated_at?: string;
}

export interface RoutineStep {
  product_id: number;
  step_name: string;
  order: number;
  time_of_day?: string;
}

export interface CreateRoutineData {
  user_id: number;
  name: string;
  description?: string;
  steps: RoutineStep[];
  frequency: string;
}

export interface RoutineProgress {
  id?: number;
  routine_id: number;
  date: string;
  completed: boolean;
  notes?: string;
}