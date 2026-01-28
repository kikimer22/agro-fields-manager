export type Point = {
  id: string;
  mgrs: string;
  lng: number;
  lat: number;
  type: string;
  description: string;
  date: string;
  icon: string;
}

export type DraftPoint = Pick<Point, 'lat' | 'lng'>;
