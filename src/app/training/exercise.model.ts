export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    ownedBy: string;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
  }
  