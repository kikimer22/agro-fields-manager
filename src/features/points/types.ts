export type Point = {
  id: string;
  lng: number;
  lat: number;
  mgrs: string;
  type: string;
  description: string;
  date: string;
  icon: string;
}

export type PointsCollection = Record<string, Point[]>

export type DraftPoint = Pick<Point, 'lat' | 'lng'>;
