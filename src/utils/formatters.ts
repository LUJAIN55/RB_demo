import { SAUDI_CITIES } from '../data/mockJourneys';
import { Language, TransportMode } from '../types/relaybus';

export function formatDuration(minutes: number, lang: Language): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (lang === 'ar') {
    if (h === 0) return `${m} د`;
    if (m === 0) return `${h} س`;
    return `${h} س ${m} د`;
  }
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function getCityName(cityId: string, lang: Language): string {
  const found = SAUDI_CITIES.find((c) => c.id === cityId);
  return found ? found.name[lang] : cityId;
}

export function getModeLabel(mode: TransportMode, lang: Language): string {
  switch (mode) {
    case TransportMode.BUS:
      return lang === 'ar' ? 'حافلة' : 'Bus';
    case TransportMode.TRAIN:
      return lang === 'ar' ? 'قطار' : 'Train';
    case TransportMode.FLIGHT:
      return lang === 'ar' ? 'طيران' : 'Flight';
    case TransportMode.MULTIMODAL:
      return lang === 'ar' ? 'متعدد الوسائط' : 'Multi-modal';
  }
}
