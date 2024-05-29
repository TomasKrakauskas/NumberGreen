import {Badge} from '@/interfaces/badge';

export interface Profile {
  difficulty: string;
  badges: Badge[]; 
  metrics: {
    average_pace: number;
    fastest_pace: number;
    longest_route: string;
    total_steps: number;
    user_id: string;
    user_image: string;
    username: string;
  };
}
