import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Bus,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  TrainFront,
  X,
} from 'lucide-react';
import { DataTransparencyStrip } from '../components/DataTransparencyStrip';
import { IllustrativeRouteMap } from '../components/IllustrativeRouteMap';
import { OperatorLogo } from '../components/OperatorLogo';
import { Translations } from '../data/i18n';
import { OPERATORS } from '../data/mockJourneys';
import { Journey, Language, SearchParams, TransportMode } from '../types/relaybus';
import { formatDuration, getCityName, getModeLabel } from '../utils/formatters';

interface JourneyDetailsPageProps {
  t: Translations;
  lang: Language;
  journey: Journey;
  searchParams: SearchParams;
  onBack: () => void;
  onAskAssistant: (journey: Journey) => void;
}

export const JourneyDetailsPage: React.FC<JourneyDetailsPageProps> = ({
  t,
  lang,
  journey,
  searchParams,
  onBack,
  onAskAssistant,
}) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const BackArrow = lang === 'ar' ? ArrowRight : ArrowLeft;
  const ForwardArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const legFarePerPerson = journey.legs.reduce((sum, l) => sum + l.priceSar, 0);
  const perPersonTotal = legFarePerPerson + journey.platformFeeSar;
  const grandTotal = perPersonTotal * searchParams.passengers;

  const renderLegIcon = (mode: TransportMode.BUS | TransportMode.TRAIN | TransportMode.FLIGHT) => {
    if (mode === TransportMode.TRAIN) return <TrainFront className="w-5 h-5 text-[#167A5B]" />;
    if (mode === TransportMode.FLIGHT) return <Plane className="w-5 h-5 text-[#24332E]" />;
    return <Bus className="w-5 h-5 text-[#2A9D8F]" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Link */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#167A5B] hover:text-[#116249] cursor-pointer"
      >
        <BackArrow className="w-4 h-4" />
        <span>{t.details.backToResults}</span>
      </button>

      {/* Journey Summary Header */}
      <div className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5 text-2xl font-bold text-[#24332E]">
              <span>{getCityName(journey.originCityId, lang)}</span>
              <ForwardArrow className="w-5 h-5 text-[#167A5B]" />
              <span>{getCityName(journey.destinationCityId, lang)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#75847D] tabular-nums">
              <span>
                {journey.departureTime} – {journey.arrivalTime}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatDuration(journey.totalDurationMinutes, lang)}</span>
              <span aria-hidden="true">·</span>
              <span>{journey.verificationStatus[lang]}</span>
            </div>
          </div>

          <div className="md:text-end">
            <div className="text-xs text-[#75847D]">
              {t.details.totalEstimate} ({searchParams.passengers}{' '}
              {searchParams.passengers === 1
                ? t.search.passengerSingular
                : t.search.passengerPlural}
              )
            </div>
            <div className="text-3xl font-bold text-[#167A5B] tabular-nums">
              {grandTotal} {t.results.sar}
            </div>
          </div>
        </div>

        {journey.isAiRecommended && journey.aiFactors && (
          <div className="rounded-xl bg-[#F0F7F4] border border-[#B7E4D2] p-4 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#167A5B]">
              <Sparkles className="w-4 h-4" />
              <span>{t.results.whyRecommendedTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#24332E]">
                  {t.results.factorPrice}:{' '}
                </span>
                <span className="text-[#24332E]/80">
                  {journey.aiFactors.priceNote[lang]}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#24332E]">
                  {t.results.factorDuration}:{' '}
                </span>
                <span className="text-[#24332E]/80">
                  {journey.aiFactors.durationNote[lang]}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#24332E]">
                  {t.results.factorWaiting}:{' '}
                </span>
                <span className="text-[#24332E]/80">
                  {journey.aiFactors.waitingNote[lang]}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#24332E]">
                  {t.results.factorTransfers}:{' '}
                </span>
                <span className="text-[#24332E]/80">
                  {journey.aiFactors.transfersNote[lang]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <DataTransparencyStrip t={t} compact />

      {/* Main Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Column: Timeline + Map */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visual Timeline */}
          <section className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-6">
            <h2 className="text-lg font-bold text-[#24332E]">
              {t.details.routeTimelineTitle}
            </h2>

            <div className="space-y-6">
              {journey.legs.map((leg, idx) => {
                const op = OPERATORS[leg.operatorId] || OPERATORS.relayconnect;
                return (
                  <div key={leg.id} className="space-y-4">
                    {/* Leg Container */}
                    <div className="rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E1E9E4] pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white border border-[#E1E9E4] flex items-center justify-center">
                            {renderLegIcon(leg.mode)}
                          </div>
                          <div>
                            <div className="text-xs text-[#75847D]">
                              {t.details.legLabel} {idx + 1} · {getModeLabel(leg.mode, lang)} ·{' '}
                              <span className="font-mono-tabular">{leg.serviceCode}</span>
                            </div>
                            <div className="pt-0.5">
                              <OperatorLogo operatorId={op.id} lang={lang} />
                            </div>
                          </div>
                        </div>

                        <div className="text-end tabular-nums">
                          <div className="text-sm font-bold text-[#24332E]">
                            {formatDuration(leg.durationMinutes, lang)}
                          </div>
                          <div className="text-xs text-[#167A5B] font-semibold">
                            {leg.priceSar} {t.results.sar}
                          </div>
                        </div>
                      </div>

                      {/* Station Times */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-[#24332E] tabular-nums">
                            {leg.departureTime}
                          </div>
                          <div className="text-sm font-medium text-[#24332E]">
                            {leg.originStation[lang]}
                          </div>
                          <div className="text-xs text-[#75847D]">
                            {getCityName(leg.originCityId, lang)}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-lg font-bold text-[#24332E] tabular-nums">
                            {leg.arrivalTime}
                          </div>
                          <div className="text-sm font-medium text-[#24332E]">
                            {leg.destinationStation[lang]}
                          </div>
                          <div className="text-xs text-[#75847D]">
                            {getCityName(leg.destinationCityId, lang)}
                          </div>
                        </div>
                      </div>

                      {/* Amenities & Operator Policy */}
                      <div className="pt-3 border-t border-[#E1E9E4] space-y-2 text-xs text-[#75847D]">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-[#24332E]">
                            {t.details.amenitiesTitle}:
                          </span>
                          {leg.amenities.map((am, aIdx) => (
                            <React.Fragment key={aIdx}>
                              <span>{am[lang]}</span>
                              {aIdx < leg.amenities.length - 1 && (
                                <span aria-hidden="true">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <div>
                          <span className="font-semibold text-[#24332E]">
                            {t.details.operatorPolicyTitle}:{' '}
                          </span>
                          <span>{op.policySummary[lang]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transfer / Waiting Block */}
                    {leg.transferAfterMinutes && leg.transferLocation && (
                      <div className="mx-2 sm:mx-6 rounded-xl border border-[#B7E4D2] bg-[#F0F7F4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#167A5B] shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <div className="text-sm font-bold text-[#24332E]">
                              {t.details.transferTitle} · {leg.transferLocation[lang]}
                            </div>
                            {leg.transferNote && (
                              <p className="text-xs text-[#24332E]/80">
                                {leg.transferNote[lang]}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-[#167A5B] tabular-nums whitespace-nowrap shrink-0">
                          {t.details.waitingDuration}:{' '}
                          {formatDuration(leg.transferAfterMinutes, lang)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Illustrative Route Map */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#24332E]">{t.details.mapTitle}</h2>
            <IllustrativeRouteMap
              journey={journey}
              lang={lang}
              disclaimer={t.details.mapDisclaimer}
            />
          </section>
        </div>

        {/* Right/Side Column: Price Breakdown, Verification, Booking Preview */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Price Breakdown */}
          <div className="bg-white rounded-2xl border border-[#E1E9E4] p-6 space-y-4">
            <h2 className="text-base font-bold text-[#24332E]">
              {t.details.priceBreakdownTitle}
            </h2>

            <div className="space-y-3 text-sm border-b border-[#E1E9E4] pb-4">
              <div className="flex items-center justify-between text-[#75847D]">
                <span>{t.details.baseFarePerLeg}</span>
                <span className="font-medium text-[#24332E] tabular-nums">
                  {legFarePerPerson} {t.results.sar}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#75847D]">
                <span>{t.details.platformServiceEst}</span>
                <span className="font-medium text-[#24332E] tabular-nums">
                  {journey.platformFeeSar} {t.results.sar}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#75847D]">
                <span>{t.details.passengersMultiplier}</span>
                <span className="font-medium text-[#24332E] tabular-nums">
                  × {searchParams.passengers}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#24332E]">
                {t.details.totalEstimate}
              </span>
              <span className="text-2xl font-bold text-[#167A5B] tabular-nums">
                {grandTotal} {t.results.sar}
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full h-12 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold cursor-pointer transition-colors"
              >
                {t.details.bookPreviewBtn}
              </button>
              <button
                type="button"
                onClick={() => onAskAssistant(journey)}
                className="w-full h-11 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] hover:border-[#167A5B] text-[#24332E] text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Bot className="w-4 h-4 text-[#167A5B]" />
                <span>{t.details.askAssistantBtn}</span>
              </button>
            </div>
          </div>

          {/* Source & Verification Status */}
          <div className="bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#24332E]">
              <ShieldCheck className="w-4 h-4 text-[#167A5B]" />
              <span>{t.details.sourceSectionTitle}</span>
            </div>
            <p className="text-xs font-medium text-[#167A5B]">
              {journey.verificationStatus[lang]}
            </p>
            <p className="text-xs text-[#75847D] leading-relaxed">
              {journey.sourceNote[lang]}
            </p>
          </div>
        </aside>
      </div>

      {/* Honest Demo Reservation Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#16221E]/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-booking-title"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E1E9E4] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E9E4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#167A5B]" />
                <h3 id="demo-booking-title" className="text-base font-bold text-[#24332E]">
                  {t.details.modalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#75847D] hover:bg-[#F8FAF7]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F0F7F4] border border-[#B7E4D2] text-xs sm:text-sm text-[#24332E]">
                <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
                <span>{t.details.modalNotice}</span>
              </div>

              <div className="rounded-xl border border-[#E1E9E4] p-4 space-y-2 text-sm">
                <div className="text-xs font-semibold text-[#75847D]">
                  {t.details.modalItinerary}
                </div>
                <div className="flex items-center justify-between font-bold text-[#24332E]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#167A5B]" />
                    {getCityName(journey.originCityId, lang)} →{' '}
                    {getCityName(journey.destinationCityId, lang)}
                  </span>
                  <span className="tabular-nums text-[#167A5B]">
                    {grandTotal} {t.results.sar}
                  </span>
                </div>
                <div className="text-xs text-[#75847D] tabular-nums">
                  {searchParams.date} · {journey.departureTime} – {journey.arrivalTime} ·{' '}
                  {searchParams.passengers}{' '}
                  {searchParams.passengers === 1
                    ? t.search.passengerSingular
                    : t.search.passengerPlural}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="w-full h-11 rounded-xl bg-[#24332E] hover:bg-[#16221E] text-white text-sm font-semibold cursor-pointer transition-colors"
              >
                {t.details.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
