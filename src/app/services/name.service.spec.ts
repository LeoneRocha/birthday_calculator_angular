import { NameService } from './name.service';

describe('NameService', () => {
  let service: NameService;

  beforeEach(() => {
    service = new NameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate numerology correctly', () => {
    const name = 'John Doe';
    const numerology = service.calculateNumerology(name);
    expect(numerology).toBe(8); // Supondo que a numerologia de 'John Doe' seja 8
  });

  it('should generate anagrams correctly', () => {
    const name = 'John Doe';
    const anagrams = service.generateAnagrams(name);
    expect(anagrams).toEqual(['eoD nhoJ']); // Nome invertido
  });

  it('should return correct name info', () => {
    const name = 'John Doe';
    const nameInfo = service.getNameInfo(name);
    expect(nameInfo).toEqual({
      meaning: 'Significado do nome',
      origin: 'Origem do nome'
    });
  });
}); 