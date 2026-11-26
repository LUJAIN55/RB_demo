import React, { useState } from 'react';
import { Bus, Plane, TrainFront, MapPin } from 'lucide-react';
import { SAUDI_CITIES } from '../data/mockJourneys';
import { Journey, Language, TransportMode } from '../types/relaybus';

interface IllustrativeRouteMapProps {
  journey: Journey;
  lang: Language;
  disclaimer: string;
}

export const IllustrativeRouteMap: React.FC<IllustrativeRouteMapProps> = ({
  journey,
  lang,
  disclaimer,
}) => {
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const cityById = (id: string) =>
    SAUDI_CITIES.find((c) => c.id === id) || SAUDI_CITIES[0];

  // Collect distinct ordered waypoints across legs
  const waypointIds: string[] = [];
  journey.legs.forEach((leg) => {
    if (!waypointIds.includes(leg.originCityId)) {
      waypointIds.push(leg.originCityId);
    }
    if (!waypointIds.includes(leg.destinationCityId)) {
      waypointIds.push(leg.destinationCityId);
    }
  });

  // Build inter-city leg segments for drawing
  const interCityLegs = journey.legs.filter(
    (leg) => leg.originCityId !== leg.destinationCityId
  );
  const displayLegs =
    interCityLegs.length > 0 ? interCityLegs : [journey.legs[0]];

  return (
    <div className="bg-white rounded-2xl border border-[#E1E9E4] overflow-hidden">
      <div className="relative bg-[#F4F8F5] p-4 sm:p-6">
        <svg
          viewBox="0 0 100 92"
          className="w-full h-64 sm:h-72 select-none"
          role="img"
          aria-label={
            lang === 'ar'
              ? 'خريطة تخطيطية لمسار الرحلة في المملكة العربية السعودية'
              : 'Illustrative Saudi route map'
          }
        >
          {/* Subtle Saudi Peninsula Stylized Silhouette */}
          <path
            d="M12 18 L34 15 L48 22 L68 25 L85 38 L88 52 L77 67 L60 77 L41 85 L29 77 L21 62 L14 42 L10 26 Z"
            fill="#FFFFFF"
            stroke="#D6E3DC"
            strokeWidth="0.7"
          />

          {/* Subtle grid lines */}
          <line x1="10" y1="35" x2="88" y2="35" stroke="#EEF3F0" strokeWidth="0.35" />
          <line x1="10" y1="60" x2="88" y2="60" stroke="#EEF3F0" strokeWidth="0.35" />
          <line x1="45" y1="15" x2="45" y2="85" stroke="#EEF3F0" strokeWidth="0.35" />

          {/* Secondary Saudi cities */}
          {SAUDI_CITIES.map((city) => {
            const isWaypoint = waypointIds.includes(city.id);
            if (isWaypoint) return null;
            return (
              <g
                key={city.id}
                onMouseEnter={() => setHoveredCityId(city.id)}
                onMouseLeave={() => setHoveredCityId(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={city.mapCoords.x}
                  cy={city.mapCoords.y}
                  r="1.35"
                  fill="#B7E4D2"
                  stroke="#75847D"
                  strokeWidth="0.4"
                />
                <text
                  x={city.mapCoords.x}
                  y={city.mapCoords.y + 3.6}
                  textAnchor="middle"
                  fontSize="2.4"
                  fill="#75847D"
                >
                  {city.name[lang]}
                </text>
              </g>
            );
          })}

          {/* Route paths */}
          {displayLegs.map((leg, idx) => {
            const from = cityById(leg.originCityId);
            const to = cityById(leg.destinationCityId);
            const midX = (from.mapCoords.x + to.mapCoords.x) / 2;
            const midY = (from.mapCoords.y + to.mapCoords.y) / 2 - (idx % 2 === 0 ? 6 : -5);

            const strokeColor =
              leg.mode === TransportMode.TRAIN
                ? '#167A5B'
                : leg.mode === TransportMode.BUS
                ? '#2A9D8F'
                : '#24332E';

            const dashArray =
              leg.mode === TransportMode.FLIGHT
                ? '1.6 1.4'
                : leg.mode === TransportMode.BUS
                ? '2.8 1.2'
                : undefined;

            return (
              <path
                key={leg.id}
                d={`M ${from.mapCoords.x} ${from.mapCoords.y} Q ${midX} ${midY} ${to.mapCoords.x} ${to.mapCoords.y}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.15"
                strokeDasharray={dashArray}
                strokeLinecap="round"
              />
            );
          })}

          {/* Active route waypoints */}
          {waypointIds.map((cityId, idx) => {
            const city = cityById(cityId);
            const isEndpoint = idx === 0 || idx === waypointIds.length - 1;
            return (
              <g
                key={cityId}
                onMouseEnter={() => setHoveredCityId(cityId)}
                onMouseLeave={() => setHoveredCityId(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={city.mapCoords.x}
                  cy={city.mapCoords.y}
                  r={isEndpoint ? '2.8' : '2.2'}
                  fill={isEndpoint ? '#167A5B' : '#2A9D8F'}
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                />
                <text
                  x={city.mapCoords.x}
                  y={city.mapCoords.y - 4}
                  textAnchor="middle"
                  fontSize="3"
                  fontWeight="700"
                  fill="#24332E"
                >
                  {city.name[lang]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend & Hovered Hub Info */}
        <div className="mt-3 pt-3 border-t border-[#E1E9E4] flex flex-wrap items-center justify-between gap-3 text-xs text-[#75847D]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <TrainFront className="w-3.5 h-3.5 text-[#167A5B]" />
              <span>{lang === 'ar' ? 'قطار (خط متصل)' : 'Rail (Solid)'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>{lang === 'ar' ? 'حافلة (خط متقطع)' : 'Bus (Dashed)'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#24332E]" />
              <span>{lang === 'ar' ? 'طيران (مسار منقط)' : 'Flight (Dotted)'}</span>
            </span>
          </div>
          {hoveredCityId && (
            <span className="inline-flex items-center gap-1 text-[#167A5B] font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {cityById(hoveredCityId).name[lang]} · {cityById(hoveredCityId).hubType[lang]}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-3 bg-white border-t border-[#E1E9E4] text-xs text-[#75847D]">
        {disclaimer}
      </div>
    </div>
  );
};
