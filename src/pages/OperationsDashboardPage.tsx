import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  Info,
  LayoutDashboard,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Table2,
  User,
  XCircle,
} from 'lucide-react';
import { DataTransparencyStrip } from '../components/DataTransparencyStrip';
import { Translations } from '../data/i18n';
import { OPERATORS } from '../data/mockJourneys';
import {
  INITIAL_OPERATIONAL_CONNECTIONS,
  WAITING_DISTRIBUTION_DATA,
  WEEKLY_PUNCTUALITY_DATA,
} from '../data/mockOperations';
import {
  Language,
  OperationalConnection,
  OpsSection,
  RiskLevel,
} from '../types/relaybus';
import { getCityName } from '../utils/formatters';

interface OperationsDashboardPageProps {
  t: Translations;
  lang: Language;
  activeSection: OpsSection;
  onSectionChange: (section: OpsSection) => void;
  onOpenProfile: () => void;
  highlightedConnectionId?: string | null;
  onHighlightConnection?: (id: string | null) => void;
}

export const OperationsDashboardPage: React.FC<OperationsDashboardPageProps> = ({
  t,
  lang,
  activeSection,
  onSectionChange,
  onOpenProfile,
  highlightedConnectionId = null,
  onHighlightConnection,
}) => {
  const [connections, setConnections] = useState<OperationalConnection[]>(
    INITIAL_OPERATIONAL_CONNECTIONS
  );
  const [corridorFilter, setCorridorFilter] = useState<string>('all');
  const [operatorFilter, setOperatorFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredBarId, setHoveredBarId] = useState<string | null>(null);

  const handleSimulateOptimization = (connId: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.id !== connId || c.appliedOptimization) return c;
        return {
          ...c,
          waitingMinutes: c.optimizedWaitMinutes,
          riskLevel: RiskLevel.GOOD,
          appliedOptimization: true,
        };
      })
    );
  };

  const handleResetSimulation = () => {
    setConnections(INITIAL_OPERATIONAL_CONNECTIONS);
  };

  const hasSimulatedChanges = connections.some((c) => c.appliedOptimization);

  const filteredConnections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return connections.filter((c) => {
      if (corridorFilter !== 'all' && c.corridorKey !== corridorFilter) return false;
      if (operatorFilter !== 'all' && c.operatorId !== operatorFilter) return false;
      if (riskFilter !== 'all' && c.riskLevel !== riskFilter) return false;
      if (q) {
        const hub = c.transferHub[lang].toLowerCase();
        const code = c.journeyCode.toLowerCase();
        if (!hub.includes(q) && !code.includes(q)) return false;
      }
      return true;
    });
  }, [connections, corridorFilter, operatorFilter, riskFilter, searchQuery, lang]);

  // Dynamic KPIs linked to live simulation state
  const kpis = useMemo(() => {
    const longGaps = connections.filter((c) => c.waitingMinutes > 90).length;
    const highRisk = connections.filter((c) => c.riskLevel === RiskLevel.HIGH_RISK).length;
    const opportunities = connections.filter(
      (c) => c.riskLevel !== RiskLevel.GOOD && !c.appliedOptimization
    ).length;

    return {
      monitored: 1284,
      analyzed: 204,
      longGaps: 29 + longGaps,
      missedRisk: 11 + highRisk,
      opportunities: opportunities + 8,
    };
  }, [connections]);

  const riskCounts = useMemo(() => {
    const good = connections.filter((c) => c.riskLevel === RiskLevel.GOOD).length;
    const attention = connections.filter((c) => c.riskLevel === RiskLevel.ATTENTION).length;
    const high = connections.filter((c) => c.riskLevel === RiskLevel.HIGH_RISK).length;
    const total = connections.length || 1;
    return {
      good,
      attention,
      high,
      goodPct: Math.round((good / total) * 100),
      attentionPct: Math.round((attention / total) * 100),
      highPct: Math.round((high / total) * 100),
    };
  }, [connections]);

  const longestConnections = useMemo(
    () =>
      [...connections]
        .sort((a, b) => b.waitingMinutes - a.waitingMinutes)
        .slice(0, 5),
    [connections]
  );

  const renderRiskBadge = (risk: RiskLevel) => {
    if (risk === RiskLevel.GOOD) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167A5B] whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{t.operations.riskGood}</span>
        </span>
      );
    }
    if (risk === RiskLevel.ATTENTION) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] whitespace-nowrap">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{t.operations.riskAttention}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] whitespace-nowrap">
        <XCircle className="w-3.5 h-3.5 shrink-0" />
        <span>{t.operations.riskHigh}</span>
      </span>
    );
  };

  const sidebarLinks: { id: OpsSection; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: t.nav.opOverview,
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'connections',
      label: t.nav.opSchedules,
      icon: <Table2 className="w-4 h-4" />,
    },
    {
      id: 'gap-analysis',
      label: t.nav.opGapAnalysis,
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: 'optimization',
      label: t.nav.opOptimization,
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'analytics',
      label: t.nav.opAnalytics,
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  const maxBucketCount = Math.max(...WAITING_DISTRIBUTION_DATA.map((d) => d.count));
  const maxWeeklyVal = Math.max(
    ...WEEKLY_PUNCTUALITY_DATA.map((d) => Math.max(d.onTime, d.delayed))
  );

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col lg:flex-row">
      {/* Sidebar Navigation (Operator Portal Only) */}
      <aside className="lg:w-64 bg-white border-b lg:border-b-0 lg:border-e border-[#E1E9E4] shrink-0">
        <div className="p-5 space-y-6 lg:sticky lg:top-16">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#24332E]">
              {t.operations.sidebarTitle}
            </h2>
            <p className="text-xs text-[#75847D]">RelayBus Ops · KSA</p>
          </div>

          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {sidebarLinks.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#F0F7F4] text-[#167A5B] font-semibold'
                      : 'text-[#75847D] hover:bg-[#F8FAF7] hover:text-[#24332E]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block pt-4 border-t border-[#E1E9E4]">
            <button
              type="button"
              onClick={onOpenProfile}
              className="w-full h-10 px-3 rounded-xl border border-[#E1E9E4] hover:border-[#167A5B]/40 text-xs font-semibold text-[#24332E] inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#167A5B]" />
              <span>{t.nav.operatorProfile}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px]">
        {/* Header & Operator Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#24332E]">
              {t.operations.pageTitle}
            </h1>
            <p className="text-sm text-[#75847D]">{t.operations.pageSubtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {onHighlightConnection && (
              <button
                type="button"
                onClick={() => {
                  onHighlightConnection('CONN-00');
                  onSectionChange('overview');
                  setTimeout(() => {
                    document
                      .getElementById('ops-gap-analysis')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 60);
                }}
                className="h-10 px-4 rounded-xl border border-[#B7E4D2] bg-[#F0F7F4] hover:bg-[#E2F1EA] text-xs font-semibold text-[#167A5B] inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'معاينة فجوة الدمام–حقل (165 د)'
                    : 'Spotlight Dammam–Haql Gap (165m)'}
                </span>
              </button>
            )}
            {hasSimulatedChanges && (
              <button
                type="button"
                onClick={handleResetSimulation}
                className="h-10 px-4 rounded-xl border border-[#E1E9E4] bg-white hover:bg-[#F0F7F4] text-xs font-semibold text-[#167A5B] inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.operations.resetSimBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Simulated Data Disclaimer Banner + 4-Tier Transparency */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#E1E9E4] text-xs sm:text-sm text-[#75847D]">
          <Info className="w-4 h-4 text-[#167A5B] shrink-0 mt-0.5" />
          <span>{t.operations.simulationBanner}</span>
        </div>
        <DataTransparencyStrip t={t} compact />

        {/* 5 KPI Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {[
            { label: t.operations.kpiMonitored, value: kpis.monitored, accent: '#24332E' },
            { label: t.operations.kpiAnalyzed, value: kpis.analyzed, accent: '#167A5B' },
            { label: t.operations.kpiLongGaps, value: kpis.longGaps, accent: '#D97706' },
            { label: t.operations.kpiMissedRisk, value: kpis.missedRisk, accent: '#DC2626' },
            { label: t.operations.kpiOpportunities, value: kpis.opportunities, accent: '#2A9D8F' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-[#E1E9E4] p-4 space-y-1.5"
            >
              <div className="text-xs font-medium text-[#75847D]">{kpi.label}</div>
              <div
                className="text-2xl font-bold tabular-nums"
                style={{ color: kpi.accent }}
              >
                {kpi.value.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
              </div>
            </div>
          ))}
        </section>

        {/* Visual Analytics Grid */}
        {(activeSection === 'overview' || activeSection === 'analytics') && (
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* 1. Waiting-Time Distribution Bar Chart */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#24332E]">
                  {t.operations.chartWaitDistTitle}
                </h3>
                <p className="text-xs text-[#75847D]">{t.operations.chartWaitDistDesc}</p>
              </div>

              <div className="h-52 flex items-end justify-between gap-3 pt-4 border-b border-[#E1E9E4] pb-2">
                {WAITING_DISTRIBUTION_DATA.map((bucket) => {
                  const pctHeight = Math.max(12, Math.round((bucket.count / maxBucketCount) * 100));
                  const barColor =
                    bucket.tone === 'good'
                      ? '#167A5B'
                      : bucket.tone === 'teal'
                      ? '#2A9D8F'
                      : bucket.tone === 'attention'
                      ? '#D97706'
                      : '#DC2626';

                  return (
                    <div
                      key={bucket.id}
                      onMouseEnter={() => setHoveredBarId(bucket.id)}
                      onMouseLeave={() => setHoveredBarId(null)}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                    >
                      <span className="text-xs font-bold text-[#24332E] tabular-nums">
                        {bucket.count}
                      </span>
                      <div
                        className="w-full max-w-[46px] rounded-t-lg transition-opacity"
                        style={{
                          height: `${pctHeight}%`,
                          backgroundColor: barColor,
                          opacity: hoveredBarId && hoveredBarId !== bucket.id ? 0.65 : 1,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-[#75847D] text-center">
                {WAITING_DISTRIBUTION_DATA.map((bucket) => (
                  <span key={bucket.id} className="flex-1 truncate">
                    {bucket.label[lang]}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Delayed vs. On-Time Journeys Chart */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#24332E]">
                    {t.operations.chartDelayTitle}
                  </h3>
                  <p className="text-xs text-[#75847D]">{t.operations.chartDelayDesc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[#24332E]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#167A5B]" />
                    {t.operations.chartOnTimeLegend}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#24332E]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#D97706]" />
                    {t.operations.chartDelayedLegend}
                  </span>
                </div>
              </div>

              <div className="h-52 flex items-end justify-between gap-2 pt-4 border-b border-[#E1E9E4] pb-2">
                {WEEKLY_PUNCTUALITY_DATA.map((pt, i) => {
                  const onTimeH = Math.round((pt.onTime / maxWeeklyVal) * 100);
                  const delayedH = Math.max(8, Math.round((pt.delayed / maxWeeklyVal) * 100));
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center justify-end h-full gap-1"
                    >
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-3 sm:w-4 rounded-t bg-[#167A5B]"
                          style={{ height: `${onTimeH}%` }}
                          title={`${t.operations.chartOnTimeLegend}: ${pt.onTime}`}
                        />
                        <div
                          className="w-3 sm:w-4 rounded-t bg-[#D97706]"
                          style={{ height: `${delayedH}%` }}
                          title={`${t.operations.chartDelayedLegend}: ${pt.delayed}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-[#75847D] text-center">
                {WEEKLY_PUNCTUALITY_DATA.map((pt, i) => (
                  <span key={i} className="flex-1 truncate">
                    {pt.day[lang]}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Connections with Longest Waiting Periods */}
            <div className="xl:col-span-7 bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#24332E]">
                  {t.operations.chartLongestTitle}
                </h3>
                <p className="text-xs text-[#75847D]">{t.operations.chartLongestDesc}</p>
              </div>

              <div className="space-y-3">
                {longestConnections.map((conn) => {
                  const widthPct = Math.min(100, Math.round((conn.waitingMinutes / 170) * 100));
                  const barHex =
                    conn.riskLevel === RiskLevel.HIGH_RISK
                      ? '#DC2626'
                      : conn.riskLevel === RiskLevel.ATTENTION
                      ? '#D97706'
                      : '#167A5B';
                  return (
                    <div key={conn.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#24332E] truncate">
                          <span className="font-mono-tabular text-[#75847D] me-2">
                            {conn.journeyCode}
                          </span>
                          {conn.transferHub[lang]}
                        </span>
                        <span className="font-bold tabular-nums text-[#24332E] shrink-0">
                          {conn.waitingMinutes} {t.results.minutesUnit}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[#F1F5F3] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${widthPct}%`, backgroundColor: barHex }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Journey Performance Overview */}
            <div className="xl:col-span-5 bg-white rounded-2xl border border-[#E1E9E4] p-5 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#24332E]">
                  {t.operations.chartHealthTitle}
                </h3>
                <p className="text-xs text-[#75847D]">{t.operations.chartHealthDesc}</p>
              </div>

              {/* Segmented Horizontal Proportion Bar */}
              <div className="space-y-4">
                <div className="h-4 w-full rounded-full overflow-hidden flex bg-[#F1F5F3]">
                  <div
                    style={{ width: `${riskCounts.goodPct}%` }}
                    className="bg-[#167A5B] transition-all duration-300"
                  />
                  <div
                    style={{ width: `${riskCounts.attentionPct}%` }}
                    className="bg-[#D97706] transition-all duration-300"
                  />
                  <div
                    style={{ width: `${riskCounts.highPct}%` }}
                    className="bg-[#DC2626] transition-all duration-300"
                  />
                </div>

                <div className="divide-y divide-[#E1E9E4] text-sm">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[#167A5B] font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.operations.riskGood}
                    </span>
                    <span className="font-bold text-[#24332E] tabular-nums">
                      {riskCounts.good} ({riskCounts.goodPct}%)
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[#D97706] font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      {t.operations.riskAttention}
                    </span>
                    <span className="font-bold text-[#24332E] tabular-nums">
                      {riskCounts.attention} ({riskCounts.attentionPct}%)
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[#DC2626] font-semibold">
                      <XCircle className="w-4 h-4" />
                      {t.operations.riskHigh}
                    </span>
                    <span className="font-bold text-[#24332E] tabular-nums">
                      {riskCounts.high} ({riskCounts.highPct}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stage 1: AI Gap Analysis Table */}
        {(activeSection === 'overview' ||
          activeSection === 'connections' ||
          activeSection === 'gap-analysis') && (
          <section
            id="ops-gap-analysis"
            className="bg-white rounded-2xl border border-[#E1E9E4] overflow-hidden"
          >
            <div className="p-5 sm:p-6 border-b border-[#E1E9E4] bg-[#F8FAF7]/60 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.operations.gapSectionBadge}</span>
                </div>
                <h2 className="text-lg font-bold text-[#24332E]">
                  {t.operations.gapSectionTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#75847D] max-w-2xl">
                  {t.operations.gapSectionDesc}
                </p>
              </div>

              {/* Interactive Dashboard Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#75847D] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.operations.searchPlaceholder}
                    className="h-9 ps-9 pe-3 rounded-lg border border-[#E1E9E4] bg-white text-xs text-[#24332E] focus:outline-none focus:border-[#167A5B]"
                  />
                </div>

                <select
                  value={corridorFilter}
                  onChange={(e) => setCorridorFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-[#E1E9E4] bg-white text-xs text-[#24332E]"
                  aria-label={t.operations.filterCorridor}
                >
                  <option value="all">
                    {t.operations.filterCorridor}: {t.operations.filterAll}
                  </option>
                  <option value="dammam-haql">
                    {getCityName('dammam', lang)} - {getCityName('haql', lang)}
                  </option>
                  <option value="riyadh-jeddah">
                    {getCityName('riyadh', lang)} - {getCityName('jeddah', lang)}
                  </option>
                  <option value="riyadh-dammam">
                    {getCityName('riyadh', lang)} - {getCityName('dammam', lang)}
                  </option>
                  <option value="riyadh-hail">
                    {getCityName('riyadh', lang)} - {getCityName('hail', lang)}
                  </option>
                  <option value="madinah-tabuk">
                    {getCityName('madinah', lang)} - {getCityName('tabuk', lang)}
                  </option>
                  <option value="makkah-madinah">
                    {getCityName('makkah', lang)} - {getCityName('madinah', lang)}
                  </option>
                </select>

                <select
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-[#E1E9E4] bg-white text-xs text-[#24332E]"
                  aria-label={t.operations.filterOperator}
                >
                  <option value="all">
                    {t.operations.filterOperator}: {t.operations.filterAll}
                  </option>
                  {Object.values(OPERATORS).map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name[lang]}
                    </option>
                  ))}
                </select>

                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-[#E1E9E4] bg-white text-xs text-[#24332E]"
                  aria-label={t.operations.filterRisk}
                >
                  <option value="all">
                    {t.operations.filterRisk}: {t.operations.filterAll}
                  </option>
                  <option value={RiskLevel.GOOD}>{t.operations.riskGood}</option>
                  <option value={RiskLevel.ATTENTION}>{t.operations.riskAttention}</option>
                  <option value={RiskLevel.HIGH_RISK}>{t.operations.riskHigh}</option>
                </select>
              </div>
            </div>

            {filteredConnections.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <p className="text-sm font-bold text-[#24332E]">
                  {t.operations.emptyTableTitle}
                </p>
                <p className="text-xs text-[#75847D]">{t.operations.emptyTableDesc}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAF7] border-b border-[#E1E9E4] text-[11px] font-semibold text-[#75847D]">
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colJourneyId}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colOperator}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colOrigin} → {t.operations.colDestination}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colArrival}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colNextDep}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colWaiting}
                      </th>
                      <th className="py-3 px-4 text-start whitespace-nowrap">
                        {t.operations.colSeverity}
                      </th>
                      <th className="py-3 px-4 text-start min-w-[210px]">
                        {t.operations.colSuggestion}
                      </th>
                      <th className="py-3 px-4 text-start min-w-[200px]">
                        {t.operations.colImpact}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E9E4] text-xs">
                    {filteredConnections.map((conn) => {
                      const op = OPERATORS[conn.operatorId];
                      const isHighlighted = highlightedConnectionId === conn.id;
                      return (
                        <tr
                          key={conn.id}
                          className={`transition-colors ${
                            isHighlighted
                              ? 'bg-[#F0F7F4] ring-1 ring-inset ring-[#167A5B]/35'
                              : 'hover:bg-[#F8FAF7]'
                          }`}
                        >
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-mono-tabular font-bold text-[#24332E]">
                              {conn.journeyCode}
                            </div>
                            <div className="text-[11px] text-[#75847D]">
                              {conn.transferHub[lang]}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#24332E] whitespace-nowrap">
                            {op?.name[lang]}
                          </td>
                          <td className="py-3.5 px-4 text-[#24332E] whitespace-nowrap font-medium">
                            {getCityName(conn.originCityId, lang)} →{' '}
                            {getCityName(conn.destinationCityId, lang)}
                          </td>
                          <td className="py-3.5 px-4 font-mono-tabular text-[#24332E] whitespace-nowrap">
                            {conn.scheduledArrival}
                          </td>
                          <td className="py-3.5 px-4 font-mono-tabular text-[#24332E] whitespace-nowrap">
                            {conn.appliedOptimization ? (
                              <span className="inline-flex items-center gap-1.5">
                                <span className="line-through text-[#75847D]">
                                  {conn.nextDeparture}
                                </span>
                                <span className="font-bold text-[#167A5B]">
                                  {conn.proposedDeparture}
                                </span>
                              </span>
                            ) : (
                              conn.nextDeparture
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#24332E] whitespace-nowrap">
                            {conn.waitingMinutes} {t.results.minutesUnit}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="space-y-0.5">
                              {renderRiskBadge(conn.riskLevel)}
                              <div className="text-[11px] text-[#75847D]">
                                {conn.severityLabel[lang]}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#24332E] leading-relaxed">
                            {conn.aiSuggestion[lang]}
                          </td>
                          <td className="py-3.5 px-4 text-[#167A5B] font-medium leading-relaxed">
                            {conn.expectedImpact[lang]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Stage 2: AI Schedule Optimization & Before vs After Comparison */}
        {(activeSection === 'overview' || activeSection === 'optimization') && (
          <section
            id="ops-ai-optimization"
            className="bg-white rounded-2xl border border-[#E1E9E4] p-5 sm:p-6 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#E1E9E4] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#167A5B]">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.operations.optSectionBadge}</span>
                </div>
                <h2 className="text-lg font-bold text-[#24332E]">
                  {t.operations.optSectionTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#75847D]">
                  {t.operations.optSectionDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {connections
                .filter(
                  (c) =>
                    c.riskLevel !== RiskLevel.GOOD ||
                    c.appliedOptimization ||
                    c.id === highlightedConnectionId
                )
                .map((conn) => {
                  const baseline =
                    INITIAL_OPERATIONAL_CONNECTIONS.find((x) => x.id === conn.id) ||
                    conn;
                  const savedMinutes =
                    baseline.waitingMinutes - conn.optimizedWaitMinutes;
                  const isHighlighted = highlightedConnectionId === conn.id;

                  return (
                    <div
                      key={conn.id}
                      id={`ops-before-after-${conn.id}`}
                      className={`rounded-xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                        isHighlighted
                          ? 'border-[#167A5B] bg-[#F0F7F4]/60 ring-2 ring-[#B7E4D2]'
                          : 'border-[#E1E9E4] bg-[#F8FAF7]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-mono-tabular font-bold text-[#24332E]">
                              {conn.journeyCode} · {getCityName(conn.originCityId, lang)} →{' '}
                              {getCityName(conn.destinationCityId, lang)}
                            </div>
                            <div className="text-[11px] text-[#75847D]">
                              {conn.transferHub[lang]}
                            </div>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold ${
                              conn.appliedOptimization
                                ? 'bg-[#F0F7F4] border-[#B7E4D2] text-[#167A5B]'
                                : 'bg-white border-[#E1E9E4] text-[#D97706]'
                            }`}
                          >
                            {conn.appliedOptimization ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <ShieldCheck className="w-3.5 h-3.5" />
                            )}
                            <span>
                              {conn.appliedOptimization
                                ? t.operations.approvalApprovedBadge
                                : t.operations.approvalRequiredBadge}
                            </span>
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#24332E] leading-relaxed font-medium">
                          {conn.aiSuggestion[lang]}
                        </p>

                        <p className="text-xs text-[#167A5B] font-medium">
                          {t.operations.colImpact}: {conn.expectedImpact[lang]}
                        </p>

                        {/* Before vs After Comparison Box */}
                        <div className="bg-white rounded-xl border border-[#E1E9E4] p-3.5 space-y-2.5">
                          <div className="text-[11px] font-bold text-[#24332E]">
                            {t.operations.beforeAfterTitle}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {/* Before */}
                            <div className="rounded-lg bg-[#F8FAF7] border border-[#E1E9E4] p-3 space-y-1.5">
                              <div className="text-[11px] font-bold text-[#75847D]">
                                {t.operations.beforeLabel}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#75847D]">
                                  {t.operations.waitingReductionLabel}
                                </span>
                                <span className="font-mono-tabular font-bold text-[#DC2626]">
                                  {baseline.waitingMinutes} {t.results.minutesUnit}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#75847D]">
                                  {t.operations.scheduleChangeLabel}
                                </span>
                                <span className="font-mono-tabular font-semibold text-[#24332E]">
                                  {baseline.nextDeparture}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-0.5">
                                <span className="text-[#75847D]">
                                  {t.operations.riskBeforeAfterLabel}
                                </span>
                                {renderRiskBadge(baseline.riskLevel)}
                              </div>
                            </div>

                            {/* After */}
                            <div className="rounded-lg bg-[#F0F7F4] border border-[#B7E4D2] p-3 space-y-1.5">
                              <div className="text-[11px] font-bold text-[#167A5B]">
                                {t.operations.afterLabel}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#24332E]/80">
                                  {t.operations.waitingReductionLabel}
                                </span>
                                <span className="font-mono-tabular font-bold text-[#167A5B]">
                                  {conn.optimizedWaitMinutes} {t.results.minutesUnit}
                                  {savedMinutes > 0 && (
                                    <span className="ms-1 text-[11px]">
                                      (-{savedMinutes}
                                      {t.results.minutesUnit})
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[#24332E]/80">
                                  {t.operations.scheduleChangeLabel}
                                </span>
                                <span className="font-mono-tabular font-bold text-[#167A5B]">
                                  {conn.proposedDeparture}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-0.5">
                                <span className="text-[#24332E]/80">
                                  {t.operations.riskBeforeAfterLabel}
                                </span>
                                {renderRiskBadge(RiskLevel.GOOD)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={Boolean(conn.appliedOptimization)}
                        onClick={() => handleSimulateOptimization(conn.id)}
                        className={`h-10 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          conn.appliedOptimization
                            ? 'bg-[#F0F7F4] border border-[#B7E4D2] text-[#167A5B] cursor-default'
                            : 'bg-[#167A5B] hover:bg-[#116249] text-white'
                        }`}
                      >
                        {conn.appliedOptimization
                          ? t.operations.simulatedApplied
                          : t.operations.approvePreviewBtn}
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
