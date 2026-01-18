export enum Page {
  HOME = 'HOME',
  EVENTS = 'EVENTS',
  EVENT_REGISTER = 'EVENT_REGISTER',
  POINTS_CENTER = 'POINTS_CENTER',
  POINTS_MALL = 'POINTS_MALL',
  PROFILE = 'PROFILE',
  RANK = 'RANK'
}

export interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
}