export interface PathSegment {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

export interface TrackPerformance {
  _id: string;
  trackId: string; 
  creatorId: string; 
  start: number; 
  end: number; 
  distance: number; 
  speed_ms: number;
  stepsTaken: number;
  path: PathSegment[];
}
