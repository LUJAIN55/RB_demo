import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Info,
  RotateCcw,
  Send,
  User,
} from 'lucide-react';
import { DataTransparencyStrip } from '../components/DataTransparencyStrip';
import { Translations } from '../data/i18n';
import { generateDemoAssistantReply } from '../data/mockAssistant';
import { OPERATORS } from '../data/mockJourneys';
import { ChatMessage, Journey, Language } from '../types/relaybus';
import { formatDuration, getCityName } from '../utils/formatters';

interface AiAssistantPageProps {
  t: Translations;
  lang: Language;
  onSelectJourney: (journey: Journey) => void;
  contextJourney?: Journey | null;
  onClearContextJourney?: () => void;
  contextPrompt?: string | null;
  onClearContextPrompt?: () => void;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  t,
  lang,
  onSelectJourney,
  contextJourney,
  onClearContextJourney,
  contextPrompt,
  onClearContextPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting-1',
      role: 'assistant',
      content: t.assistant.greeting,
      timestamp: '09:00',
      isDemo: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync initial greeting when language changes if only greeting exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'greeting-1') {
        return [{ ...prev[0], content: t.assistant.greeting }];
      }
      return prev;
    });
  }, [t.assistant.greeting]);

  // If navigated from a specific journey's details page, inject helpful context
  useEffect(() => {
    if (contextJourney) {
      const fromName = getCityName(contextJourney.originCityId, lang);
      const toName = getCityName(contextJourney.destinationCityId, lang);
      const autoQuestion =
        lang === 'ar'
          ? `أرغب في تقييم رحلة ${fromName} إلى ${toName} (${contextJourney.id}) ووقت الانتظار فيها.`
          : `Can you review the ${fromName} to ${toName} route (${contextJourney.id}) and its transfer buffer?`;

      sendMessage(autoQuestion, contextJourney);
      if (onClearContextJourney) onClearContextJourney();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextJourney]);

  // If navigated from Jury Presentation Step 4 with a preset traveler question
  useEffect(() => {
    if (contextPrompt && !isTyping) {
      sendMessage(contextPrompt);
      if (onClearContextPrompt) onClearContextPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const nowHHMM = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const sendMessage = (textToSend: string, pinnedJourney?: Journey) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: nowHHMM(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let recommended: Journey[] | undefined;

      if (pinnedJourney) {
        const waitText =
          pinnedJourney.totalWaitingMinutes > 0
            ? formatDuration(pinnedJourney.totalWaitingMinutes, lang)
            : t.results.noWaiting;
        replyText =
          lang === 'ar'
            ? `مراجعة سريعة للرحلة ${pinnedJourney.id}:\n• المدة الإجمالية: ${formatDuration(
                pinnedJourney.totalDurationMinutes,
                lang
              )}\n• وقت الانتظار بين المراحل: ${waitText}\n• التكلفة التقديرية للفرد: ${
                pinnedJourney.priceSar
              } ر.س\n\n${
                pinnedJourney.totalWaitingMinutes > 60
                  ? 'ملاحظة: يوجد انتظار ملحوظ بين المراحل، تأكد من ملاءمته لجدولك.'
                  : 'تقييم الانتقال: هامش الانتقال مريح ومتوازن مقارنة ببقية الخيارات.'
              }`
            : `Quick review of route ${pinnedJourney.id}:\n• Total duration: ${formatDuration(
                pinnedJourney.totalDurationMinutes,
                lang
              )}\n• Transfer wait time: ${waitText}\n• Estimated fare per traveler: ${
                pinnedJourney.priceSar
              } SAR\n\n${
                pinnedJourney.totalWaitingMinutes > 60
                  ? 'Note: This itinerary includes a noticeable layover buffer; verify it fits your schedule.'
                  : 'Transfer assessment: Balanced and comfortable connection margin.'
              }`;
        recommended = [pinnedJourney];
      } else {
        const res = generateDemoAssistantReply(trimmed, lang);
        replyText = res.text;
        recommended = res.recommendedJourneys;
      }

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: nowHHMM(),
        isDemo: true,
        recommendedJourneys: recommended,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'greeting-1',
        role: 'assistant',
        content: t.assistant.greeting,
        timestamp: nowHHMM(),
        isDemo: true,
      },
    ]);
  };

  const DirectionalArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header & Demo Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#24332E]">
            {t.assistant.pageTitle}
          </h1>
          <p className="text-sm text-[#75847D]">{t.assistant.pageSubtitle}</p>
        </div>

        <button
          type="button"
          onClick={handleResetChat}
          className="h-10 px-4 rounded-xl border border-[#E1E9E4] bg-white hover:bg-[#F8FAF7] text-xs font-semibold text-[#24332E] inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#167A5B]" />
          <span>{t.assistant.clearChat}</span>
        </button>
      </div>

      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#E1E9E4] text-xs sm:text-sm text-[#75847D]">
        <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
        <span>{t.assistant.demoNotice}</span>
      </div>

      <DataTransparencyStrip t={t} compact />

      {/* Main Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Start Context & Suggested Prompts */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#24332E]">
              {t.assistant.quickPromptsTitle}
            </h2>
            <div className="space-y-2">
              {[
                lang === 'ar'
                  ? 'ما أفضل طريقة للسفر من الدمام إلى حقل؟'
                  : 'What is the best way from Dammam to Haql?',
                ...t.assistant.quickPrompts,
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                  className="w-full text-start px-3.5 py-2.5 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] hover:bg-[#F0F7F4] hover:border-[#167A5B]/50 text-xs sm:text-sm font-medium text-[#24332E] transition-colors cursor-pointer disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-2">
            <h3 className="text-sm font-bold text-[#24332E]">
              {t.assistant.contextTitle}
            </h3>
            <p className="text-xs text-[#75847D] leading-relaxed">
              {t.assistant.contextDesc}
            </p>
          </div>
        </aside>

        {/* Chat Container */}
        <section className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E9E4] flex flex-col h-[600px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#F8FAF7]/50">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-[#24332E] text-white'
                        : 'bg-[#167A5B] text-white'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] space-y-3 ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-[#167A5B] text-white'
                          : 'bg-white border border-[#E1E9E4] text-[#24332E]'
                      }`}
                    >
                      {msg.content}
                      <div
                        className={`mt-2 flex items-center gap-2 text-[11px] tabular-nums ${
                          isUser ? 'text-[#B7E4D2]' : 'text-[#75847D]'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {msg.isDemo && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{t.assistant.sampleResponseTag}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Interactive Journey Cards inside Assistant Response */}
                    {msg.recommendedJourneys && msg.recommendedJourneys.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.recommendedJourneys.map((j) => {
                          const op = OPERATORS[j.operatorIds[0]];
                          return (
                            <div
                              key={j.id}
                              className="bg-white rounded-xl border border-[#E1E9E4] p-4 space-y-3 hover:border-[#167A5B]/50 transition-colors"
                            >
                              <div className="flex items-center justify-between gap-2 text-xs text-[#75847D]">
                                <span className="font-semibold text-[#167A5B]">
                                  {op?.name[lang]}
                                </span>
                                <span className="font-mono-tabular">{j.id}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-bold text-[#24332E]">
                                  {getCityName(j.originCityId, lang)} →{' '}
                                  {getCityName(j.destinationCityId, lang)}
                                </div>
                                <div className="text-sm font-bold text-[#167A5B] tabular-nums">
                                  {j.priceSar} {t.results.sar}
                                </div>
                              </div>
                              <div className="text-xs text-[#75847D] tabular-nums">
                                {j.departureTime} – {j.arrivalTime} ·{' '}
                                {formatDuration(j.totalDurationMinutes, lang)}
                              </div>
                              <button
                                type="button"
                                onClick={() => onSelectJourney(j)}
                                className="w-full h-9 rounded-lg bg-[#F0F7F4] hover:bg-[#167A5B] text-[#167A5B] hover:text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <span>{t.assistant.viewJourneyBtn}</span>
                                <DirectionalArrow className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#167A5B] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#E1E9E4] rounded-2xl px-4 py-3 text-xs text-[#75847D] flex items-center gap-2">
                  <span>{t.assistant.typingLabel}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-4 bg-white border-t border-[#E1E9E4] flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.assistant.inputPlaceholder}
              className="flex-1 h-11 px-4 rounded-xl border border-[#E1E9E4] bg-[#F8FAF7] text-sm text-[#24332E] focus:outline-none focus:bg-white focus:border-[#167A5B] focus:ring-2 focus:ring-[#B7E4D2]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-11 px-5 rounded-xl bg-[#167A5B] hover:bg-[#116249] disabled:opacity-50 text-white text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{t.assistant.sendBtn}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
