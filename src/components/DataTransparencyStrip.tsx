import React from 'react';
import { CheckCircle2, FileCheck2, Calculator, FlaskConical } from 'lucide-react';
import { Translations } from '../data/i18n';

interface DataTransparencyStripProps {
  t: Translations;
  compact?: boolean;
}

export const DataTransparencyStrip: React.FC<DataTransparencyStripProps> = ({
  t,
  compact = false,
}) => {
  const items = [
    {
      key: 'official',
      label: t.transparency.official,
      desc: t.transparency.officialDesc,
      icon: <FileCheck2 className="w-3.5 h-3.5 text-[#167A5B] shrink-0" />,
    },
    {
      key: 'verified',
      label: t.transparency.verified,
      desc: t.transparency.verifiedDesc,
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />,
    },
    {
      key: 'estimated',
      label: t.transparency.estimated,
      desc: t.transparency.estimatedDesc,
      icon: <Calculator className="w-3.5 h-3.5 text-[#D97706] shrink-0" />,
    },
    {
      key: 'simulated',
      label: t.transparency.simulated,
      desc: t.transparency.simulatedDesc,
      icon: <FlaskConical className="w-3.5 h-3.5 text-[#75847D] shrink-0" />,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E1E9E4] px-4 py-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#24332E] whitespace-nowrap shrink-0">
          {t.transparency.title}:
        </span>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            compact ? 'xl:grid-cols-4' : 'lg:grid-cols-4'
          } gap-2.5 flex-1`}
        >
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-start gap-2 text-xs text-[#75847D]"
            >
              <span className="mt-0.5">{item.icon}</span>
              <div className="leading-snug">
                <span className="font-semibold text-[#24332E]">{item.label}: </span>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
