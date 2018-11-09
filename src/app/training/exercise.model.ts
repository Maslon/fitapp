export interface Exercise {
    docId?: string;
    id: string;
    name: string;
    duration: number;
    calories: number;
    ownedBy: string;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
  }
  