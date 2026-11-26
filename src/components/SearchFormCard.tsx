import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, Calendar, MapPin, Search, Users } from 'lucide-react';
import { Translations } from '../data/i18n';
import { SAUDI_CITIES } from '../data/mockJourneys';
import { Language, SearchParams } from '../types/relaybus';

interface SearchFormCardProps {
  initialParams: SearchParams;
  onSubmit: (params: SearchParams) => void;
  t: Translations;
  lang: Language;
  compact?: boolean;
}

export const SearchFormCard: React.FC<SearchFormCardProps> = ({
  initialParams,
  onSubmit,
  t,
  lang,
  compact = false,
}) => {
  const [fromCityId, setFromCityId] = useState(initialParams.fromCityId);
  const [toCityId, setToCityId] = useState(initialParams.toCityId);
  const [date, setDate] = useState(initialParams.date);
  const [passengers, setPassengers] = useState(initialParams.passengers);
  const [error, setError] = useState('');

  useEffect(() => {
    setFromCityId(initialParams.fromCityId);
    setToCityId(initialParams.toCityId);
    setDate(initialParams.date);
    setPassengers(initialParams.passengers);
  }, [initialParams]);

  const handleSwap = () => {
    setError('');
    const prevFrom = fromCityId;
    setFromCityId(toCityId);
    setToCityId(prevFrom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fromCityId || !toCityId || !date) {
      setError(t.search.validationMissingFields);
      return;
    }

    if (fromCityId === toCityId) {
      setError(t.search.validationSameCity);
      return;
    }

    onSubmit({
      fromCityId,
      toCityId,
      date,
      passengers,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl border border-[#E1E9E4] ${
        compact ? 'p-4' : 'p-5 sm:p-6 shadow-lg shadow-[#24332E]/5'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
        {/* From City */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-[#75847D] mb-1.5">
            {t.search.fromLabel}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#167A5B] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
            <select
              value={fromCityId}
              onChange={(e) => {
                setFromCityId(e.target.value);
                setError('');
              }}
              className="w-full h-12 ps-9 pe-3 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-sm font-medium text-[#24332E] focus:outline-none focus:bg-white focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
            >
              {SAUDI_CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex items-center justify-center">
          <button
            type="button"
            onClick={handleSwap}
            title={t.search.swapCities}
            aria-label={t.search.swapCities}
            className="w-11 h-12 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] hover:bg-[#F0F7F4] hover:border-[#167A5B]/40 text-[#167A5B] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To City */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-[#75847D] mb-1.5">
            {t.search.toLabel}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#2A9D8F] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
            <select
              value={toCityId}
              onChange={(e) => {
                setToCityId(e.target.value);
                setError('');
              }}
              className="w-full h-12 ps-9 pe-3 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-sm font-medium text-[#24332E] focus:outline-none focus:bg-white focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
            >
              {SAUDI_CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[#75847D] mb-1.5">
            {t.search.dateLabel}
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError('');
              }}
              className="w-full h-12 ps-9 pe-3 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-sm font-medium text-[#24332E] tabular-nums focus:outline-none focus:bg-white focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold text-[#75847D] mb-1.5 truncate">
            {t.search.passengersLabel}
          </label>
          <div className="relative">
            <Users className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full h-12 ps-9 pe-2 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-sm font-medium text-[#24332E] tabular-nums focus:outline-none focus:bg-white focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full h-12 px-5 rounded-xl bg-[#167A5B] hover:bg-[#116249] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>{t.search.searchButton}</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-xs font-medium text-[#DC2626]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
