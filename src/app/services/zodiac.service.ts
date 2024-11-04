import { ZodiacSignsConst } from "../constants/ZodiacSignsConst";

export class ZodiacService {
  
  getZodiacSign(birthdate: Date): string {
    const month = birthdate.getUTCMonth() + 1;
    const day = birthdate.getUTCDate();
    for (const sign of ZodiacSignsConst) {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign.name;
      }
    }
    return "";
  }
  getChineseZodiac(year: number): string {
    const animals = ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'];
    const baseYear = 2000; // 2000 é o ano do Dragão
    const index = (year - baseYear + 4) % 12; // Ajusta o índice para alinhar com o ano do Dragão
    return animals[(index + 12) % 12]; // Adiciona 12 para garantir um índice positivo
  }
}
