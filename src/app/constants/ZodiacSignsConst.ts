import { IZodiacSign, Season, SignInfo } from "../interfaces/IZodiacSign";

export const ZodiacSignsConst: IZodiacSign[] = [
  { name: "Aquário", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "Peixes", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "Áries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "Touro", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "Gêmeos", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Câncer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "Leão", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "Virgem", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "Escorpião", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "Sagitário", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  {
    name: "Capricórnio",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
  },
];
export const SeasonsConst: Season[] = [
  { name: "Verão", startMonth: 12, startDay: 21, endMonth: 3, endDay: 20 },
  { name: "Outono", startMonth: 3, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Inverno", startMonth: 6, startDay: 21, endMonth: 9, endDay: 22 },
  { name: "Primavera", startMonth: 9, startDay: 23, endMonth: 12, endDay: 20 },
];
 
export const SIGN_COLORS: SignInfo = {
  'Aquário': 'Azul', 'Peixes': 'Verde', 'Áries': 'Vermelho', 'Touro': 'Rosa',
  'Gêmeos': 'Amarelo', 'Câncer': 'Branco', 'Leão': 'Dourado', 'Virgem': 'Marrom',
  'Libra': 'Rosa', 'Escorpião': 'Preto', 'Sagitário': 'Roxo', 'Capricórnio': 'Cinza'
};

export const SIGN_ELEMENTS: SignInfo = {
  'Aquário': 'Ar', 'Peixes': 'Água', 'Áries': 'Fogo', 'Touro': 'Terra',
  'Gêmeos': 'Ar', 'Câncer': 'Água', 'Leão': 'Fogo', 'Virgem': 'Terra',
  'Libra': 'Ar', 'Escorpião': 'Água', 'Sagitário': 'Fogo', 'Capricórnio': 'Terra'
};