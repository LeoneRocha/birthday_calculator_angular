export interface IZodiacSign {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}
export interface Season {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
} 
export interface SignColor {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
} 
export interface SignInfo {
  [key: string]: string;
} 