import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Clock,
  Info,
  Plane,
  SlidersHorizontal,
  Sparkles,
  TrainFront,
  X,
} from 'lucide-react';
import { DataTransparencyStrip } from '../components/DataTransparencyStrip';
import { OperatorLogo } from '../components/OperatorLogo';
import { SearchFormCard } from '../components/SearchFormCard';
import { Translations } from '../data/i18n';
import { getJourneysForCorridor, OPERATORS } from '../data/mockJourneys';
import {
  Journey,
  Language,
  SearchParams,
  SortOption,
  TransportMode,
} from '../types/relaybus';
import { formatDuration, getCityName, getModeLabel } from '../utils/formatters';

interface SearchResultsPageProps {
  t: Translations;
  lang: Language;
  searchParams: SearchParams;
  onUpdateSearch: (params: SearchParams) => void;
  onSelectJourney: (journey: Journey) => void;
}

type DepartureWindow = 'all' | 'morning' | 'afternoon' | 'evening';
type TransferFilter = 'any' | '0' | '1' | '2+';

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  t,
  lang,
  searchParams,
  onUpdateSearch,
  onSelectJourney,
}) => {
  const [showEditSearch, setShowEditSearch] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Sort
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(650);
  const [maxDurationHours, setMaxDurationHours] = useState<number>(15);
  const [transferFilter, setTransferFilter] = useState<TransferFilter>('any');
  const [departureWindow, setDepartureWindow] = useState<DepartureWindow>('all');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RECOMMENDED);

  const allJourneys = useMemo(
    () => getJourneysForCorridor(searchParams.fromCityId, searchParams.toCityId),
    [searchParams.fromCityId, searchParams.toCityId]
  );

  const handleSearchUpdate = (nextParams: SearchParams) => {
    setIsLoading(true);
    onUpdateSearch(nextParams);
    setShowEditSearch(false);
    setTimeout(() => setIsLoading(false), 260);
  };

  const toggleModeFilter = (mode: TransportMode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const resetAllFilters = () => {
    setSelectedModes([]);
    setMaxPrice(650);
    setMaxDurationHours(15);
    setTransferFilter('any');
    setDepartureWindow('all');
    setSortBy(SortOption.RECOMMENDED);
  };

  const filteredAndSorted = useMemo(() => {
    const list = allJourneys.filter((j) => {
      if (selectedModes.length > 0 && !selectedModes.includes(j.primaryMode)) {
        return false;
      }
      if (j.priceSar > maxPrice) {
        return false;
      }
      if (j.totalDurationMinutes > maxDurationHours * 60) {
        return false;
      }
      if (transferFilter === '0' && j.transfersCount !== 0) return false;
      if (transferFilter === '1' && j.transfersCount !== 1) return false;
      if (transferFilter === '2+' && j.transfersCount < 2) return false;

      if (departureWindow !== 'all') {
        const hour = Number(j.departureTime.split(':')[0]);
        if (departureWindow === 'morning' && (hour < 5 || hour >= 12)) return false;
        if (departureWindow === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (departureWindow === 'evening' && hour < 18) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case SortOption.LOWEST_PRICE:
          return a.priceSar - b.priceSar;
        case SortOption.SHORTEST_DURATION:
          return a.totalDurationMinutes - b.totalDurationMinutes;
        case SortOption.FEWEST_TRANSFERS:
          return a.transfersCount - b.transfersCount || a.totalDurationMinutes - b.totalDurationMinutes;
        case SortOption.RECOMMENDED:
        default:
          if (a.isAiRecommended !== b.isAiRecommended) {
            return a.isAiRecommended ? -1 : 1;
          }
          return a.totalDurationMinutes + a.priceSar * 0.4 - (b.totalDurationMinutes + b.priceSar * 0.4);
      }
    });
  }, [
    allJourneys,
    selectedModes,
    maxPrice,
    maxDurationHours,
    transferFilter,
    departureWindow,
    sortBy,
  ]);

  const DirectionalArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const renderModeIcon = (mode: TransportMode.BUS | TransportMode.TRAIN | TransportMode.FLIGHT) => {
    if (mode === TransportMode.TRAIN) return <TrainFront className="w-4 h-4 text-[#167A5B]" />;
    if (mode === TransportMode.FLIGHT) return <Plane className="w-4 h-4 text-[#24332E]" />;
    return <Bus className="w-4 h-4 text-[#2A9D8F]" />;
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#E1E9E4] pb-3">
        <h2 className="text-base font-bold text-[#24332E]">{t.results.filtersTitle}</h2>
        <button
          type="button"
          onClick={resetAllFilters}
          className="text-xs font-semibold text-[#167A5B] hover:underline cursor-pointer"
        >
          {t.results.resetFilters}
        </button>
      </div>

      {/* Transport Mode */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-[#75847D]">
          {t.results.modeLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { mode: TransportMode.MULTIMODAL, label: t.results.modeMultimodal },
            { mode: TransportMode.TRAIN, label: t.results.modeTrain },
            { mode: TransportMode.BUS, label: t.results.modeBus },
            { mode: TransportMode.FLIGHT, label: t.results.modeFlight },
          ].map(({ mode, label }) => {
            const active = selectedModes.includes(mode);
            return (
              <button
                key={mode}
                type="button"
                onClick={() => toggleModeFilter(mode)}
                className={`h-9 px-3 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer whitespace-nowrap truncate ${
                  active
                    ? 'bg-[#167A5B] border-[#167A5B] text-white'
                    : 'bg-[#F8FAF7] border-[#E1E9E4] text-[#24332E] hover:border-[#167A5B]/50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#75847D]">{t.results.maxPriceLabel}</span>
          <span className="font-semibold text-[#24332E] tabular-nums">
            {maxPrice} {t.results.sar}
          </span>
        </div>
        <input
          type="range"
          min={80}
          max={650}
          step={15}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#167A5B] cursor-pointer"
        />
      </div>

      {/* Max Duration */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#75847D]">{t.results.maxDurationLabel}</span>
          <span className="font-semibold text-[#24332E] tabular-nums">
            {maxDurationHours} {t.results.hoursUnit}
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={15}
          step={1}
          value={maxDurationHours}
          onChange={(e) => setMaxDurationHours(Number(e.target.value))}
          className="w-full accent-[#167A5B] cursor-pointer"
        />
      </div>

      {/* Transfers */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-[#75847D]">
          {t.results.transfersLabel}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { val: 'any', label: t.results.transferAny },
              { val: '0', label: t.results.transferDirect },
              { val: '1', label: t.results.transferOne },
              { val: '2+', label: t.results.transferTwoPlus },
            ] as { val: TransferFilter; label: string }[]
          ).map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setTransferFilter(val)}
              className={`h-9 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap truncate ${
                transferFilter === val
                  ? 'bg-[#24332E] border-[#24332E] text-white'
                  : 'bg-[#F8FAF7] border-[#E1E9E4] text-[#24332E] hover:border-[#167A5B]/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Window */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#75847D]">
          {t.results.departureWindowLabel}
        </label>
        <div className="space-y-1.5">
          {(
            [
              { val: 'all', label: t.results.windowAll },
              { val: 'morning', label: t.results.windowMorning },
              { val: 'afternoon', label: t.results.windowAfternoon },
              { val: 'evening', label: t.results.windowEvening },
            ] as { val: DepartureWindow; label: string }[]
          ).map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => setDepartureWindow(val)}
              className={`w-full h-9 px-3 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                departureWindow === val
                  ? 'bg-[#F0F7F4] border-[#167A5B] text-[#167A5B]'
                  : 'bg-white border-[#E1E9E4] text-[#24332E] hover:bg-[#F8FAF7]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
      {/* Demo Prototype Notice + 4-Tier Data Transparency */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#E1E9E4] text-xs sm:text-sm text-[#75847D]">
        <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
        <span>{t.results.demoBanner}</span>
      </div>
      <DataTransparencyStrip t={t} compact />

      {/* Search Summary Bar */}
      <div className="bg-white rounded-2xl border border-[#E1E9E4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl font-bold text-[#24332E]">
            <span>{getCityName(searchParams.fromCityId, lang)}</span>
            <DirectionalArrow className="w-5 h-5 text-[#167A5B]" />
            <span>{getCityName(searchParams.toCityId, lang)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#75847D] tabular-nums">
            <span>{searchParams.date}</span>
            <span aria-hidden="true">·</span>
            <span>
              {searchParams.passengers}{' '}
              {searchParams.passengers === 1
                ? t.search.passengerSingular
                : t.search.passengerPlural}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {filteredAndSorted.length} {t.results.foundCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden h-10 px-4 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-xs font-semibold text-[#24332E] inline-flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#167A5B]" />
            <span>{t.results.mobileFiltersBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowEditSearch((prev) => !prev)}
            className="h-10 px-4 rounded-xl border border-[#167A5B]/30 bg-[#F0F7F4] hover:bg-[#E1EFE8] text-xs sm:text-sm font-semibold text-[#167A5B] whitespace-nowrap cursor-pointer transition-colors"
          >
            {t.search.modifySearch}
          </button>
        </div>
      </div>

      {showEditSearch && (
        <SearchFormCard
          initialParams={searchParams}
          onSubmit={handleSearchUpdate}
          t={t}
          lang={lang}
          compact
        />
      )}

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-[#E1E9E4] p-5 sticky top-24">
          <FiltersContent />
        </aside>

        {/* Mobile Filters Modal Drawer */}
        {mobileFiltersOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden bg-[#16221E]/50 flex justify-end"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#24332E]">
                  {t.results.filtersTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-9 h-9 rounded-lg border border-[#E1E9E4] flex items-center justify-center text-[#24332E]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FiltersContent />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full h-11 rounded-xl bg-[#167A5B] text-white text-sm font-semibold"
              >
                {lang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
              </button>
            </div>
          </div>
        )}

        {/* Results Column */}
        <div className="lg:col-span-9 space-y-4">
          {/* Sort Bar */}
          <div className="bg-white rounded-xl border border-[#E1E9E4] p-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#75847D] px-2">
              {t.results.sortLabel}:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { val: SortOption.RECOMMENDED, label: t.results.sortRecommended },
                { val: SortOption.LOWEST_PRICE, label: t.results.sortPrice },
                { val: SortOption.SHORTEST_DURATION, label: t.results.sortDuration },
                { val: SortOption.FEWEST_TRANSFERS, label: t.results.sortTransfers },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSortBy(val)}
                  className={`h-9 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    sortBy === val
                      ? 'bg-[#167A5B] text-white'
                      : 'text-[#75847D] hover:bg-[#F8FAF7] hover:text-[#24332E]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="space-y-4" aria-busy="true">
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="bg-white rounded-2xl border border-[#E1E9E4] p-6 animate-pulse space-y-4"
                >
                  <div className="h-4 w-48 bg-[#E8EFEA] rounded" />
                  <div className="h-7 w-full bg-[#F1F6F3] rounded" />
                  <div className="h-4 w-64 bg-[#E8EFEA] rounded" />
                </div>
              ))}
            </div>
          ) : filteredAndSorted.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-[#E1E9E4] p-10 text-center space-y-3">
              <h3 className="text-lg font-bold text-[#24332E]">{t.results.emptyTitle}</h3>
              <p className="text-sm text-[#75847D] max-w-md mx-auto">
                {t.results.emptyDesc}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="h-10 px-5 rounded-xl bg-[#167A5B] text-white text-sm font-semibold cursor-pointer"
                >
                  {t.results.resetFilters}
                </button>
              </div>
            </div>
          ) : (
            /* Journey Cards */
            <div className="space-y-4">
              {filteredAndSorted.map((journey) => {
                const totalForPassengers =
                  (journey.priceSar + journey.platformFeeSar) * searchParams.passengers;
                const primaryOp = OPERATORS[journey.operatorIds[0]];

                return (
                  <article
                    key={journey.id}
                    className={`bg-white rounded-2xl overflow-hidden transition-colors ${
                      journey.isAiRecommended
                        ? 'border-2 border-[#167A5B]'
                        : 'border border-[#E1E9E4] hover:border-[#167A5B]/45'
                    }`}
                  >
                    {/* AI Recommended Header Strip */}
                    {journey.isAiRecommended && (
                      <div className="bg-[#F0F7F4] border-b border-[#D6E9DF] px-5 py-3 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#167A5B]">
                            <Sparkles className="w-4 h-4" />
                            <span>{t.results.aiRecommendedBadge}</span>
                          </div>
                          {journey.aiReason && (
                            <span className="text-xs font-medium text-[#24332E]">
                              {journey.aiReason[lang]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Operator + Modes */}
                        <div className="md:col-span-3 space-y-2">
                          <div className="text-[11px] font-medium text-[#75847D]">
                            {t.results.labelOperators}
                          </div>
                          <OperatorLogo operatorId={primaryOp.id} lang={lang} />
                          {journey.operatorIds.length > 1 && (
                            <div className="text-xs text-[#75847D]">
                              +{' '}
                              {journey.operatorIds
                                .slice(1)
                                .map((id) => OPERATORS[id]?.name[lang])
                                .join(' · ')}
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {journey.modesSequence.map((mode, idx) => (
                              <React.Fragment key={`${journey.id}-m-${idx}`}>
                                <span
                                  className="inline-flex items-center gap-1 text-xs font-medium text-[#24332E]"
                                  title={getModeLabel(mode, lang)}
                                >
                                  {renderModeIcon(mode)}
                                  <span>{getModeLabel(mode, lang)}</span>
                                </span>
                                {idx < journey.modesSequence.length - 1 && (
                                  <span className="text-[#75847D]" aria-hidden="true">
                                    →
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Times, Duration, Transfers & Waiting */}
                        <div className="md:col-span-6 space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-[11px] text-[#75847D] mb-0.5">
                                {getCityName(journey.originCityId, lang)}
                              </div>
                              <div className="text-xl font-bold text-[#24332E] tabular-nums">
                                {journey.departureTime}
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center px-2">
                              <span className="text-xs font-bold text-[#24332E] tabular-nums mb-1">
                                {formatDuration(journey.totalDurationMinutes, lang)}
                              </span>
                              <div className="w-full h-px bg-[#D6E3DC] relative flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-[#167A5B]" />
                              </div>
                              <span className="text-[11px] text-[#75847D] mt-1">
                                {journey.transfersCount === 0
                                  ? t.results.directLabel
                                  : journey.transfersCount === 1
                                  ? t.results.transferSingle
                                  : `${journey.transfersCount} ${t.results.transferMultiple}`}
                              </span>
                            </div>

                            <div className="text-end">
                              <div className="text-[11px] text-[#75847D] mb-0.5">
                                {getCityName(journey.destinationCityId, lang)}
                              </div>
                              <div className="text-xl font-bold text-[#24332E] tabular-nums">
                                {journey.arrivalTime}
                              </div>
                            </div>
                          </div>

                          {/* At-a-glance Scannable Metrics Strip */}
                          <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-[#E1E9E4] text-xs">
                            <div>
                              <span className="block text-[11px] text-[#75847D]">
                                {t.results.labelTotalDuration}
                              </span>
                              <span className="font-semibold text-[#24332E] tabular-nums">
                                {formatDuration(journey.totalDurationMinutes, lang)}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[11px] text-[#75847D]">
                                {t.results.labelTransfers}
                              </span>
                              <span className="font-semibold text-[#24332E] tabular-nums">
                                {journey.transfersCount === 0
                                  ? t.results.directLabel
                                  : journey.transfersCount === 1
                                  ? t.results.transferSingle
                                  : `${journey.transfersCount} ${t.results.transferMultiple}`}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[11px] text-[#75847D]">
                                {t.results.labelWaitingTime}
                              </span>
                              <span className="font-semibold text-[#24332E] tabular-nums inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#2A9D8F]" />
                                {journey.totalWaitingMinutes > 0
                                  ? formatDuration(journey.totalWaitingMinutes, lang)
                                  : t.results.noWaiting}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price & View Details Action */}
                        <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-s border-[#E1E9E4] pt-4 md:pt-0 md:ps-5">
                          <div className="md:text-end">
                            <div className="text-xs text-[#75847D]">
                              {t.results.labelTotalPrice} ({searchParams.passengers}{' '}
                              {searchParams.passengers === 1
                                ? t.search.passengerSingular
                                : t.search.passengerPlural}
                              )
                            </div>
                            <div className="text-2xl font-bold text-[#167A5B] tabular-nums">
                              {totalForPassengers} {t.results.sar}
                            </div>
                            <div className="text-[11px] text-[#75847D] mt-0.5">
                              {journey.verificationStatus[lang]}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectJourney(journey)}
                            className="h-11 px-5 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors"
                          >
                            <span>{t.results.viewDetails}</span>
                            <DirectionalArrow className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 4-Factor AI Explanation Breakdown for Recommended Journey */}
                      {journey.isAiRecommended && journey.aiFactors && (
                        <div className="rounded-xl bg-[#F8FAF7] border border-[#D6E9DF] p-3.5 space-y-2">
                          <div className="text-xs font-bold text-[#167A5B]">
                            {t.results.whyRecommendedTitle}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                            <div>
                              <span className="font-semibold text-[#24332E]">
                                {t.results.factorPrice}:{' '}
                              </span>
                              <span className="text-[#75847D]">
                                {journey.aiFactors.priceNote[lang]}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#24332E]">
                                {t.results.factorDuration}:{' '}
                              </span>
                              <span className="text-[#75847D]">
                                {journey.aiFactors.durationNote[lang]}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#24332E]">
                                {t.results.factorWaiting}:{' '}
                              </span>
                              <span className="text-[#75847D]">
                                {journey.aiFactors.waitingNote[lang]}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-[#24332E]">
                                {t.results.factorTransfers}:{' '}
                              </span>
                              <span className="text-[#75847D]">
                                {journey.aiFactors.transfersNote[lang]}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
