import { Badge } from '@/interfaces/badge';

export interface Goals {
  badges: Badge[];
  daily_km: string;
  streak: string;
  user_id: string;
  weekly_km: string;
}