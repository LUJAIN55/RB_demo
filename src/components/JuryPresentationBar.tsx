import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Play,
  X,
} from 'lucide-react';
import { Translations } from '../data/i18n';
import { Language } from '../types/relaybus';

interface JuryPresentationBarProps {
  t: Translations;
  lang: Language;
  isOpen: boolean;
  currentStep: number; // 1..8
  onClose: () => void;
  onRunStep: (stepId: number) => void;
}

export const JuryPresentationBar: React.FC<JuryPresentationBarProps> = ({
  t,
  lang,
  isOpen,
  currentStep,
  onClose,
  onRunStep,
}) => {
  if (!isOpen) return null;

  const steps = t.presentation.steps;
  const active = steps.find((s) => s.id === currentStep) || steps[0];
  const PrevIcon = lang === 'ar' ? ChevronRight : ChevronLeft;
  const NextIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <section
      aria-label={t.presentation.panelTitle}
      className="bg-[#F0F7F4] border-b border-[#B7E4D2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#167A5B]">
                {t.presentation.panelTitle} · {t.presentation.stepOf} {currentStep}/8
              </div>
              <p className="text-xs text-[#24332E]">
                {t.presentation.panelSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={currentStep <= 1}
              onClick={() => onRunStep(Math.max(1, currentStep - 1))}
              className="h-8 px-3 rounded-lg border border-[#B7E4D2] bg-white text-xs font-semibold text-[#24332E] disabled:opacity-45 inline-flex items-center gap-1 cursor-pointer"
            >
              <PrevIcon className="w-3.5 h-3.5" />
              <span>{t.presentation.prevStep}</span>
            </button>
            <button
              type="button"
              disabled={currentStep >= 8}
              onClick={() => onRunStep(Math.min(8, currentStep + 1))}
              className="h-8 px-3 rounded-lg bg-[#167A5B] hover:bg-[#116249] text-xs font-semibold text-white disabled:opacity-45 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{t.presentation.nextStep}</span>
              <NextIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-2.5 rounded-lg border border-[#B7E4D2] bg-white text-xs text-[#75847D] hover:text-[#24332E] inline-flex items-center gap-1 cursor-pointer"
              aria-label={t.presentation.closePanel}
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.presentation.closePanel}</span>
            </button>
          </div>
        </div>

        {/* 8-Step Sequence Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {steps.map((step) => {
            const isCurrent = step.id === currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onRunStep(step.id)}
                className={`text-start p-2 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#167A5B] border-[#167A5B] text-white'
                    : 'bg-white border-[#D6E9DF] text-[#24332E] hover:border-[#167A5B]'
                }`}
              >
                <div className="font-mono-tabular font-bold mb-0.5">
                  0{step.id}
                </div>
                <div className="font-medium leading-tight line-clamp-2">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Action Cue */}
        <div className="bg-white rounded-xl border border-[#D6E9DF] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs text-[#24332E]">
            <span className="font-bold text-[#167A5B]">
              {active.id}. {active.title}:{' '}
            </span>
            <span className="text-[#75847D]">{active.desc}</span>
          </div>
          <button
            type="button"
            onClick={() => onRunStep(active.id)}
            className="h-8 px-3.5 rounded-lg bg-[#F0F7F4] hover:bg-[#167A5B] text-[#167A5B] hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            <Play className="w-3 h-3" />
            <span>{active.actionLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
