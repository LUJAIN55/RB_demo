import React from 'react';
import { OPERATORS } from '../data/mockJourneys';
import { Language } from '../types/relaybus';

interface OperatorLogoProps {
  operatorId: string;
  lang: Language;
  compact?: boolean;
}

export const OperatorLogo: React.FC<OperatorLogoProps> = ({
  operatorId,
  lang,
  compact = false,
}) => {
  const op = OPERATORS[operatorId] || OPERATORS.relayconnect;

  return (
    <div className="inline-flex items-center gap-2.5 shrink-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono-tabular font-semibold tracking-tight text-white shrink-0"
        style={{ backgroundColor: op.accentHex }}
        aria-hidden="true"
      >
        {op.shortCode}
      </div>
      {!compact && (
        <span className="text-sm font-medium text-[#24332E] whitespace-nowrap">
          {op.name[lang]}
        </span>
      )}
    </div>
  );
};
