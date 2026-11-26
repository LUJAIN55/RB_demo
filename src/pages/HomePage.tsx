import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Compass,
  Gauge,
  Route,
  ShieldCheck,
  Sparkles,
  Clock,
} from 'lucide-react';
import { DataTransparencyStrip } from '../components/DataTransparencyStrip';
import { SearchFormCard } from '../components/SearchFormCard';
import { Translations } from '../data/i18n';
import { HERO_IMAGE_PATH, SAUDI_CITIES } from '../data/mockJourneys';
import { Language, PageId, SearchParams } from '../types/relaybus';

interface HomePageProps {
  t: Translations;
  lang: Language;
  searchParams: SearchParams;
  onSearchSubmit: (params: SearchParams) => void;
  onSelectCityDestination: (cityId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  t,
  lang,
  searchParams,
  onSearchSubmit,
  onSelectCityDestination,
  onNavigate,
}) => {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [failedCityImages, setFailedCityImages] = useState<Record<string, boolean>>({});

  const featuredCities = SAUDI_CITIES.filter((c) => c.featured);
  const DirectionalArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#16221E] overflow-hidden">
        <div className="relative h-[460px] sm:h-[520px] w-full">
          {!heroImgFailed ? (
            <img
              src={HERO_IMAGE_PATH}
              alt={
                lang === 'ar'
                  ? 'قطار وحافلة حديثة على طريق بري في المملكة العربية السعودية عند الغروب'
                  : 'Modern Saudi intercity train and coach corridor at golden hour'
              }
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#167A5B] via-[#1B493B] to-[#24332E]" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#16221E]/90 via-[#16221E]/55 to-[#16221E]/35"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-20">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs sm:text-sm font-medium text-[#B7E4D2]">
                  {t.hero.kicker}
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight text-balance">
                  {t.hero.headline}
                </h1>
                <p className="text-base sm:text-lg text-[#E6EFEA] leading-relaxed max-w-xl">
                  {t.hero.subtitle}
                </p>
                <p className="text-xs text-[#B7E4D2]/90 pt-1">
                  {t.hero.demoNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Search Card overlapping hero bottom */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 space-y-3">
        <SearchFormCard
          initialParams={searchParams}
          onSubmit={onSearchSubmit}
          t={t}
          lang={lang}
        />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() =>
              onSearchSubmit({
                fromCityId: 'dammam',
                toCityId: 'haql',
                date: searchParams.date || '2026-12-01',
                passengers: searchParams.passengers || 1,
              })
            }
            className="h-9 px-3.5 rounded-lg bg-white border border-[#E1E9E4] hover:border-[#167A5B] text-xs font-semibold text-[#167A5B] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? 'معاينة مسار العرض: الدمام ← حقل'
                : 'Quick Demo Search: Dammam → Haql'}
            </span>
            <DirectionalArrow className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Popular Saudi Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#24332E] text-balance">
              {t.home.destinationsTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#75847D]">
              {t.home.destinationsSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#167A5B] hover:text-[#116249] whitespace-nowrap cursor-pointer"
          >
            <span>{t.home.exploreRoute}</span>
            <DirectionalArrow className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => onSelectCityDestination(city.id)}
              className="group text-start bg-white rounded-2xl border border-[#E1E9E4] overflow-hidden hover:border-[#167A5B]/50 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#167A5B]"
            >
              <div className="relative aspect-[4/3] bg-[#EAF2ED] overflow-hidden">
                {city.image && !failedCityImages[city.id] ? (
                  <img
                    src={city.image}
                    alt={city.name[lang]}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedCityImages((prev) => ({ ...prev, [city.id]: true }))
                    }
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F0F7F4] to-[#D9ECE3] text-[#167A5B] gap-2">
                    <Compass className="w-8 h-8" />
                    <span className="text-sm font-semibold">{city.name[lang]}</span>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#16221E]/65 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 inset-x-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-xl font-bold">{city.name[lang]}</h3>
                    <p className="text-xs text-white/85">{city.region[lang]}</p>
                  </div>
                  <span className="text-xs font-medium text-[#B7E4D2] tabular-nums">
                    {city.sampleRoutesCount} {t.home.routesLabel}
                  </span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <div className="text-xs text-[#75847D] truncate">
                  {city.hubType[lang]}
                </div>
                <div className="text-sm font-semibold text-[#167A5B] tabular-nums whitespace-nowrap shrink-0">
                  {t.home.fromSar} {city.startingPriceSar} {t.results.sar}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Three AI Capabilities Section (Asymmetric Editorial Grid) */}
      <section className="bg-white border-y border-[#E1E9E4] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-10">
            <p className="text-xs font-semibold text-[#167A5B]">
              {t.home.aiSectionKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#24332E] text-balance">
              {t.home.aiSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#75847D]">
              {t.home.aiSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Marquee AI Feature 1: Journey Recommendation */}
            <div className="lg:col-span-12 bg-[#F8FAF7] rounded-2xl border border-[#E1E9E4] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#167A5B]">
                  <Sparkles className="w-4 h-4" />
                  <span>01 · {t.home.aiFeature1Metric}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#24332E]">
                  {t.home.aiFeature1Title}
                </h3>
                <p className="text-sm sm:text-base text-[#75847D] leading-relaxed max-w-2xl">
                  {t.home.aiFeature1Desc}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('search')}
                    className="h-11 px-5 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>{t.home.aiFeature1Cta}</span>
                    <DirectionalArrow className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Clean illustrative comparison summary */}
              <div className="lg:col-span-5 bg-white rounded-xl border border-[#E1E9E4] p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#75847D] border-b border-[#E1E9E4] pb-3">
                  <span className="font-semibold text-[#167A5B]">
                    {t.results.aiRecommendedBadge}
                  </span>
                  <span className="tabular-nums">
                    {lang === 'ar' ? 'الرياض ⇄ جدة (مثال)' : 'Riyadh ⇄ Jeddah (Demo)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-[#24332E] tabular-nums">
                      08:15 — 10:55
                    </div>
                    <div className="text-xs text-[#75847D] mt-0.5">
                      {lang === 'ar'
                        ? 'طيران + قطار الحرمين · انتظار 35 د'
                        : 'Flight + Haramain Rail · 35m wait'}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-xl font-bold text-[#167A5B] tabular-nums">
                      325 {t.results.sar}
                    </div>
                    <div className="text-xs text-[#75847D] tabular-nums">
                      {lang === 'ar' ? '2 س 40 د' : '2h 40m'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Feature 2: Travel Assistant */}
            <div className="lg:col-span-6 bg-[#F8FAF7] rounded-2xl border border-[#E1E9E4] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E1E9E4] flex items-center justify-center text-[#167A5B]">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#24332E]">
                  {t.home.aiFeature2Title}
                </h3>
                <p className="text-sm text-[#75847D] leading-relaxed">
                  {t.home.aiFeature2Desc}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="h-11 px-5 rounded-xl bg-white border border-[#E1E9E4] hover:border-[#167A5B] text-[#167A5B] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>{t.home.aiFeature2Cta}</span>
                  <DirectionalArrow className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI Feature 3: Gap Analysis & Optimization */}
            <div className="lg:col-span-6 bg-[#F8FAF7] rounded-2xl border border-[#E1E9E4] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E1E9E4] flex items-center justify-center text-[#2A9D8F]">
                  <Gauge className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#24332E]">
                  {t.home.aiFeature3Title}
                </h3>
                <p className="text-sm text-[#75847D] leading-relaxed">
                  {t.home.aiFeature3Desc}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('search')}
                  className="h-11 px-5 rounded-xl bg-white border border-[#E1E9E4] hover:border-[#167A5B] text-[#167A5B] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>{t.home.aiFeature3Cta}</span>
                  <DirectionalArrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section
        id="about-platform"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold text-[#167A5B]">
              {t.home.aboutKicker}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#24332E] text-balance">
              {t.home.aboutTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#75847D] leading-relaxed">
              {t.home.aboutDesc}
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#E1E9E4] bg-white rounded-2xl border border-[#E1E9E4]">
            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0F7F4] text-[#167A5B] flex items-center justify-center shrink-0">
                <Route className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#24332E]">
                  {t.home.aboutPoint1Title}
                </h3>
                <p className="text-sm text-[#75847D] leading-relaxed">
                  {t.home.aboutPoint1Desc}
                </p>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0F7F4] text-[#2A9D8F] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#24332E]">
                  {t.home.aboutPoint2Title}
                </h3>
                <p className="text-sm text-[#75847D] leading-relaxed">
                  {t.home.aboutPoint2Desc}
                </p>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0F7F4] text-[#167A5B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#24332E]">
                  {t.home.aboutPoint3Title}
                </h3>
                <p className="text-sm text-[#75847D] leading-relaxed">
                  {t.home.aboutPoint3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Transparency Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <DataTransparencyStrip t={t} />
      </section>

      {/* Final Call-to-Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#167A5B] rounded-2xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-balance">
              {t.home.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#E6EFEA]">
              {t.home.ctaDesc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('search')}
              className="h-12 px-6 rounded-xl bg-white hover:bg-[#F8FAF7] text-[#167A5B] text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              {t.home.ctaPrimary}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assistant')}
              className="h-12 px-6 rounded-xl border border-[#B7E4D2]/50 hover:bg-[#116249] text-white text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              {t.home.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
