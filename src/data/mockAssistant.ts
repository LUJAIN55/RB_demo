import { Journey, Language } from '../types/relaybus';
import { CURATED_DEMO_JOURNEYS, getJourneysForCorridor } from './mockJourneys';

export interface AssistantReply {
  text: string;
  recommendedJourneys?: Journey[];
}

export function generateDemoAssistantReply(query: string, lang: Language): AssistantReply {
  const q = query.trim().toLowerCase();

  // 0. Dammam -> Haql / Haql query (strictly traveler-facing comparison)
  if (q.includes('حقل') || q.includes('haql')) {
    const haqlJourneys = getJourneysForCorridor('dammam', 'haql');
    return {
      text:
        lang === 'ar'
          ? 'لمقارنة خيارات السفر من الدمام إلى حقل في البيانات التجريبية المتاحة:\n\n• التوصية الذكية (الأكثر توازناً): طيران داخلي إلى تبوك + حافلة ربط إلى حقل خلال 4 ساعات و15 دقيقة (انتظار 35 دقيقة فقط، بسعر تقديري 415 ر.س).\n• الخيار الأقل سعراً: حافلات سابتكو عبر الرياض بسعر تقديري 285 ر.س (المدة 16 ساعة و20 دقيقة).\n• الخيار ثلاثي الوسائط: قطار + طيران + حافلة بتوقفين (115 دقيقة انتظار).\n\n(ملاحظة: هذه مقارنة استرشادية للمسافر بالاعتماد على بيانات تجريبية ومقدّرة).'
          : 'Comparing available demo travel options from Dammam to Haql:\n\n• AI Recommended (Best Balance): Flight to Tabuk + coastal shuttle to Haql in 4h 15m (35m transfer wait, est. 415 SAR).\n• Lowest Fare: SAPTCO coach corridor via Riyadh at est. 285 SAR (16h 20m total).\n• Tri-Modal Option: Rail + Flight + Coach with 2 transfers (115m total wait).\n\n(Note: Traveler guidance based on estimated and simulated prototype data.)',
      recommendedJourneys: haqlJourneys.slice(0, 2),
    };
  }

  // 1. Hail query
  if (q.includes('حائل') || q.includes('hail')) {
    const hailJourneys = getJourneysForCorridor('riyadh', 'hail');
    return {
      text:
        lang === 'ar'
          ? 'تتوفر ثلاثة مسارات تجريبية للوصول إلى حائل انطلاقاً من الرياض:\n\n• الخيار الأفضل والأكثر توازناً: قطار الشمال المباشر (سار) خلال 4 ساعات و45 دقيقة بسعر تقديري 145 ر.س دون تبديلات.\n• الخيار الأقل تكلفة: حافلة سابتكو المباشرة بسعر 98 ر.س.\n• الخيار الأسرع: الطيران الداخلي مع حافلة ربط مطار حائل خلال ساعتين و15 دقيقة.\n\n(تنبيه: هذه الخيارات مبنية على بيانات عرض تجريبية).'
          : 'Based on our demo schedule dataset, there are 3 ways to reach Hail from Riyadh:\n\n• Best overall balance: Direct SAR North Train in 4h 45m (est. 145 SAR) with zero transfers.\n• Lowest fare: Direct SAPTCO coach at est. 98 SAR.\n• Fastest option: Domestic flight + Hail airport shuttle in 2h 15m.\n\n(Note: Sample prototype recommendations using demo data.)',
      recommendedJourneys: hailJourneys.slice(0, 2),
    };
  }

  // 2. Cheapest journey query
  if (
    q.includes('أرخص') ||
    q.includes('رخيص') ||
    q.includes('سعر') ||
    q.includes('cheapest') ||
    q.includes('cheap') ||
    q.includes('price') ||
    q.includes('budget')
  ) {
    const sortedByPrice = [...CURATED_DEMO_JOURNEYS].sort((a, b) => a.priceSar - b.priceSar);
    return {
      text:
        lang === 'ar'
          ? 'في قاعدة البيانات التجريبية الحالية، تبدأ أقل الأسعار من 85 ر.س لمسار الحافلة المباشرة بين الرياض والدمام، و98 ر.س بين الرياض وحائل، بينما يبدأ مسار الحافلة بين الرياض وجدة من 165 ر.س.\n\nيمكنك استعراض أقل الخيارات تكلفة مباشرة أدناه:'
          : 'In the current demo dataset, the lowest estimated fares start at 85 SAR for Riyadh → Dammam by express coach, 98 SAR for Riyadh → Hail by coach, and 165 SAR for Riyadh → Jeddah.\n\nHere are the top budget demo itineraries:',
      recommendedJourneys: sortedByPrice.slice(0, 2),
    };
  }

  // 3. Long waiting times / transfers query
  if (
    q.includes('انتظار') ||
    q.includes('توقف') ||
    q.includes('تبديل') ||
    q.includes('wait') ||
    q.includes('transfer') ||
    q.includes('layover') ||
    q.includes('connection')
  ) {
    const longWaitExample = CURATED_DEMO_JOURNEYS.find((j) => j.id === 'RB-RUH-JED-04');
    const shortWaitExample = CURATED_DEMO_JOURNEYS.find((j) => j.id === 'RB-RUH-JED-01');
    return {
      text:
        lang === 'ar'
          ? 'تحرص RelayBus على إظهار وقت الانتظار بين كل مرحلة ومستوى أمان التبديل:\n\n• التوصية الذكية (طيران + قطار الحرمين) توفر توقفاً مثالياً لمدة 35 دقيقة فقط داخل نفس المجمع.\n• في المقابل، بعض المسارات الاقتصادية المدمجة قد تتضمن انتظاراً يصل إلى 95 دقيقة عند الانتقال بين محطة الحافلات ومحطة القطار.\n\nيمكنك مقارنة الخيارين أدناه:'
          : 'RelayBus explicitly flags transfer wait times before you select a route:\n\n• Our AI Recommended Riyadh → Jeddah route (Flight + Haramain Rail) keeps waiting to just 35 minutes via an indoor terminal link.\n• Some overland multi-modal combinations include longer 95-minute transfers when switching between separate city hubs.\n\nCompare both demo examples below:',
      recommendedJourneys: [shortWaitExample, longWaitExample].filter(Boolean) as Journey[],
    };
  }

  // 4. Compare bus vs flight
  if (
    q.includes('مقارن') ||
    q.includes('قارن') ||
    q.includes('الحافلة') ||
    q.includes('الطائرة') ||
    q.includes('compare') ||
    q.includes('bus') ||
    q.includes('flight')
  ) {
    const busOpt = CURATED_DEMO_JOURNEYS.find((j) => j.id === 'RB-RUH-JED-03');
    const airOpt = CURATED_DEMO_JOURNEYS.find((j) => j.id === 'RB-RUH-JED-02');
    return {
      text:
        lang === 'ar'
          ? 'مقارنة سريعة بين الحافلة والطائرة على محور الرياض – جدة (بيانات تجريبية):\n\n1. الحافلة المباشرة (سابتكو): تكلفة أقل (حوالي 165 ر.س)، تشمل حقيبتين، لكن المدة تصل إلى 12 ساعة و15 دقيقة.\n2. الطيران الداخلي: وقت طيران قصير (ساعة و50 دقيقة)، بسعر أعلى (حوالي 480 ر.س) مع ضرورة احتساب 90 دقيقة قبل الإقلاع.\n3. الحل المدمج الذكي: طيران + قطار الحرمين من المطار لوسط المدينة يوفر سرعة الطيران وسلاسة الوصول بسعر متوسط 325 ر.س.'
          : 'Quick Bus vs. Flight comparison on the Riyadh → Jeddah corridor (demo data):\n\n1. Intercity Coach (SAPTCO): Lowest cost (~165 SAR) with generous luggage, taking ~12h 15m.\n2. Domestic Flight: ~1h 50m flight time (~480 SAR), plus ~90m pre-flight airport arrival.\n3. Smart Multi-Modal (Flight + Haramain Rail): Combines rapid flight transit with direct central city rail drop-off around ~325 SAR.',
      recommendedJourneys: [busOpt, airOpt].filter(Boolean) as Journey[],
    };
  }

  // 5. Makkah / Madinah / Dammam / Jeddah / Tabuk general match
  if (
    q.includes('مكة') ||
    q.includes('المدينة') ||
    q.includes('makkah') ||
    q.includes('madinah')
  ) {
    const mm = CURATED_DEMO_JOURNEYS.filter(
      (j) => j.originCityId === 'makkah' || j.originCityId === 'madinah'
    );
    return {
      text:
        lang === 'ar'
          ? 'للتنقل بين مكة المكرمة والمدينة المنورة أو الانطلاق نحو تبوك، يبرز قطار الحرمين السريع كأكثر الخيارات راحة وسرعة (ساعتان و20 دقيقة تقريباً في بيانات العرض). كما يتوفر ربط جوي من مطار المدينة إلى تبوك:'
          : 'For travel between Makkah and Madinah, or onward to Tabuk, Haramain High Speed Rail offers the smoothest 2h 20m link, while Madinah–Tabuk combines shuttle + flight connections:',
      recommendedJourneys: mm.slice(0, 2),
    };
  }

  if (q.includes('دمام') || q.includes('dammam') || q.includes('الشرقية')) {
    const dmm = getJourneysForCorridor('riyadh', 'dammam');
    return {
      text:
        lang === 'ar'
          ? 'للوصول إلى الدمام من الرياض في نموذج العرض، يتصدر قطار الشرق (سار) بمدة 3 ساعات و40 دقيقة بسعر تجريبي 120 ر.س، مع توفر حافلة سريعة بسعر 85 ر.س:'
          : 'For Riyadh to Dammam, SAR East Rail leads with a 3h 40m direct trip at ~120 SAR, alongside an economy direct coach at ~85 SAR:',
      recommendedJourneys: dmm.slice(0, 2),
    };
  }

  // Default helpful demo fallback
  return {
    text:
      lang === 'ar'
        ? 'يمكنني مساعدتك في مقارنة الحافلات والقطارات والطيران عبر مدن المملكة، والتحقق من فترات الانتظار بين الرحلات.\n\nجرّب سؤالي مثلاً: "ما أفضل طريقة للوصول إلى حائل؟" أو "ما أرخص رحلة متاحة؟". إليك أبرز المسارات الموصى بها في العرض التجريبي:'
        : 'I can help you compare Saudi buses, trains, flights, and multi-modal waiting times across major corridors.\n\nTry asking: "What is the best way to reach Hail?" or "What is the cheapest available journey?". Here are featured demo itineraries:',
    recommendedJourneys: CURATED_DEMO_JOURNEYS.slice(0, 2),
  };
}
