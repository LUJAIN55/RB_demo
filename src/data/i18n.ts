import { Language } from '../types/relaybus';

export interface Translations {
  brandName: string;
  nav: {
    home: string;
    explore: string;
    assistant: string;
    operations: string;
    about: string;
    login: string;
    signup: string;
    switchLang: string;
    openMenu: string;
    closeMenu: string;
    logout: string;
    travelerProfile: string;
    operatorProfile: string;
    opOverview: string;
    opSchedules: string;
    opGapAnalysis: string;
    opOptimization: string;
    opAnalytics: string;
    roleTravelerBadge: string;
    roleOperatorBadge: string;
    travelerPortal: string;
    travelerPortalDesc: string;
    operationsPortal: string;
    operationsPortalDesc: string;
    portalSwitcherLabel: string;
  };
  presentation: {
    toggleBtn: string;
    panelTitle: string;
    panelSubtitle: string;
    stepOf: string;
    prevStep: string;
    nextStep: string;
    closePanel: string;
    steps: {
      id: number;
      title: string;
      desc: string;
      actionLabel: string;
    }[];
  };
  transparency: {
    title: string;
    official: string;
    verified: string;
    estimated: string;
    simulated: string;
    officialDesc: string;
    verifiedDesc: string;
    estimatedDesc: string;
    simulatedDesc: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subtitle: string;
    demoNote: string;
  };
  search: {
    fromLabel: string;
    toLabel: string;
    dateLabel: string;
    passengersLabel: string;
    passengerSingular: string;
    passengerPlural: string;
    swapCities: string;
    searchButton: string;
    selectCity: string;
    validationSameCity: string;
    validationMissingFields: string;
    modifySearch: string;
  };
  home: {
    destinationsTitle: string;
    destinationsSubtitle: string;
    fromSar: string;
    routesLabel: string;
    exploreRoute: string;
    aiSectionKicker: string;
    aiSectionTitle: string;
    aiSectionSubtitle: string;
    aiFeature1Title: string;
    aiFeature1Desc: string;
    aiFeature1Metric: string;
    aiFeature1Cta: string;
    aiFeature2Title: string;
    aiFeature2Desc: string;
    aiFeature2Cta: string;
    aiFeature3Title: string;
    aiFeature3Desc: string;
    aiFeature3Cta: string;
    aboutKicker: string;
    aboutTitle: string;
    aboutDesc: string;
    aboutPoint1Title: string;
    aboutPoint1Desc: string;
    aboutPoint2Title: string;
    aboutPoint2Desc: string;
    aboutPoint3Title: string;
    aboutPoint3Desc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  results: {
    pageTitle: string;
    demoBanner: string;
    foundCount: string;
    filtersTitle: string;
    resetFilters: string;
    mobileFiltersBtn: string;
    modeLabel: string;
    allModes: string;
    modeBus: string;
    modeTrain: string;
    modeFlight: string;
    modeMultimodal: string;
    maxPriceLabel: string;
    maxDurationLabel: string;
    transfersLabel: string;
    transferAny: string;
    transferDirect: string;
    transferOne: string;
    transferTwoPlus: string;
    departureWindowLabel: string;
    windowAll: string;
    windowMorning: string;
    windowAfternoon: string;
    windowEvening: string;
    sortLabel: string;
    sortRecommended: string;
    sortPrice: string;
    sortDuration: string;
    sortTransfers: string;
    aiRecommendedBadge: string;
    directLabel: string;
    transferSingle: string;
    transferMultiple: string;
    waitingLabel: string;
    noWaiting: string;
    totalPriceFor: string;
    sar: string;
    viewDetails: string;
    emptyTitle: string;
    emptyDesc: string;
    hoursUnit: string;
    minutesUnit: string;
    whyRecommendedTitle: string;
    factorPrice: string;
    factorDuration: string;
    factorWaiting: string;
    factorTransfers: string;
    labelDepartureArrival: string;
    labelOperators: string;
    labelTotalDuration: string;
    labelTransfers: string;
    labelWaitingTime: string;
    labelTotalPrice: string;
  };
  details: {
    backToResults: string;
    routeTimelineTitle: string;
    legLabel: string;
    transferTitle: string;
    waitingDuration: string;
    mapTitle: string;
    mapDisclaimer: string;
    priceBreakdownTitle: string;
    baseFarePerLeg: string;
    platformServiceEst: string;
    passengersMultiplier: string;
    totalEstimate: string;
    sourceSectionTitle: string;
    bookPreviewBtn: string;
    askAssistantBtn: string;
    modalTitle: string;
    modalNotice: string;
    modalItinerary: string;
    modalClose: string;
    amenitiesTitle: string;
    operatorPolicyTitle: string;
  };
  assistant: {
    pageTitle: string;
    pageSubtitle: string;
    demoNotice: string;
    greeting: string;
    quickPromptsTitle: string;
    quickPrompts: string[];
    inputPlaceholder: string;
    sendBtn: string;
    typingLabel: string;
    contextTitle: string;
    contextDesc: string;
    sampleResponseTag: string;
    viewJourneyBtn: string;
    clearChat: string;
  };
  operations: {
    sidebarTitle: string;
    navOverview: string;
    navCharts: string;
    navConnections: string;
    navRecommendations: string;
    backToTraveler: string;
    simulationBanner: string;
    pageTitle: string;
    pageSubtitle: string;
    kpiMonitored: string;
    kpiAnalyzed: string;
    kpiLongGaps: string;
    kpiMissedRisk: string;
    kpiOpportunities: string;
    chartWaitDistTitle: string;
    chartWaitDistDesc: string;
    chartDelayTitle: string;
    chartDelayDesc: string;
    chartOnTimeLegend: string;
    chartDelayedLegend: string;
    chartLongestTitle: string;
    chartLongestDesc: string;
    chartHealthTitle: string;
    chartHealthDesc: string;
    filterCorridor: string;
    filterOperator: string;
    filterRisk: string;
    filterAll: string;
    searchPlaceholder: string;
    tableTitle: string;
    colJourneyId: string;
    colOperator: string;
    colOrigin: string;
    colDestination: string;
    colArrival: string;
    colNextDep: string;
    colWaiting: string;
    colRisk: string;
    colSuggestion: string;
    riskGood: string;
    riskAttention: string;
    riskHigh: string;
    aiPanelTitle: string;
    aiPanelDesc: string;
    simulateBtn: string;
    simulatedApplied: string;
    resetSimBtn: string;
    emptyTableTitle: string;
    emptyTableDesc: string;
    gapSectionBadge: string;
    gapSectionTitle: string;
    gapSectionDesc: string;
    optSectionBadge: string;
    optSectionTitle: string;
    optSectionDesc: string;
    colSeverity: string;
    colImpact: string;
    beforeAfterTitle: string;
    beforeLabel: string;
    afterLabel: string;
    approvalRequiredBadge: string;
    approvalApprovedBadge: string;
    approvePreviewBtn: string;
    waitingReductionLabel: string;
    scheduleChangeLabel: string;
    riskBeforeAfterLabel: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    nameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    submitLogin: string;
    submitSignup: string;
    switchToSignup: string;
    switchToLogin: string;
    demoNotice: string;
    successLogin: string;
    successSignup: string;
    invalidEmail: string;
    shortPassword: string;
  };
  authEntry: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    selectRoleLabel: string;
    travelerRoleTitle: string;
    travelerRoleDesc: string;
    operatorRoleTitle: string;
    operatorRoleDesc: string;
    tabLogin: string;
    tabRegister: string;
    nameLabel: string;
    orgLabel: string;
    orgPlaceholder: string;
    emailLabel: string;
    passwordLabel: string;
    loginBtnTraveler: string;
    loginBtnOperator: string;
    registerBtnTraveler: string;
    registerBtnOperator: string;
    switchToRegister: string;
    switchToLogin: string;
    forgotPasswordLink: string;
    forgotPasswordNotice: string;
    demoSectionTitle: string;
    demoSectionSubtitle: string;
    demoTravelerCardTitle: string;
    demoTravelerCardDesc: string;
    demoTravelerBtn: string;
    demoOperatorCardTitle: string;
    demoOperatorCardDesc: string;
    demoOperatorBtn: string;
    securityDisclaimer: string;
    routeAuthRequiredNotice: string;
    missingOrgError: string;
  };
  accessDenied: {
    badge: string;
    title: string;
    desc: string;
    attemptedRouteLabel: string;
    activeRoleLabel: string;
    requiredRoleLabel: string;
    securityNote: string;
    backToPortalBtn: string;
    logoutSwitchBtn: string;
  };
  profile: {
    travelerTitle: string;
    operatorTitle: string;
    subtitle: string;
    accountDetailsTitle: string;
    nameLabel: string;
    emailLabel: string;
    roleLabel: string;
    orgLabel: string;
    sessionTypeLabel: string;
    demoSessionValue: string;
    permissionsTitle: string;
    travelerPermissions: string[];
    operatorPermissions: string[];
    restrictedNoticeTitle: string;
    travelerRestrictedNotice: string;
    operatorRestrictedNotice: string;
    backendNoticeTitle: string;
    backendNoticeDesc: string;
    logoutBtn: string;
    testGuardTitle: string;
    testGuardTravelerBtn: string;
    testGuardOperatorBtn: string;
  };
  footer: {
    desc: string;
    linksTitle: string;
    corridorsTitle: string;
    contactTitle: string;
    corridors: string[];
    email: string;
    location: string;
    demoFooterNote: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    brandName: 'RelayBus',
    nav: {
      home: 'الرئيسية',
      explore: 'استكشف الرحلات',
      assistant: 'المساعد الذكي',
      operations: 'لوحة العمليات',
      about: 'عن المنصة',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      switchLang: 'EN',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      logout: 'تسجيل الخروج',
      travelerProfile: 'ملفي الشخصي',
      operatorProfile: 'ملف المشغل',
      opOverview: 'نظرة عامة',
      opSchedules: 'الرحلات والجداول',
      opGapAnalysis: 'تحليل الفجوات',
      opOptimization: 'التحسين الذكي',
      opAnalytics: 'التحليلات',
      roleTravelerBadge: 'حساب مسافر',
      roleOperatorBadge: 'حساب مشغل',
      travelerPortal: 'بوابة المسافر',
      travelerPortalDesc: 'البحث عن الرحلات ومقارنتها',
      operationsPortal: 'بوابة العمليات',
      operationsPortalDesc: 'مراقبة المشغلين وتحسين الجداول',
      portalSwitcherLabel: 'التجربة النشطة:',
    },
    presentation: {
      toggleBtn: 'مسار عرض التحكيم',
      panelTitle: 'تسلسل العرض التقديمي (8 خطوات)',
      panelSubtitle: 'تنقل سريع لاستعراض رحلة المسافر وبوابة العمليات أمام لجنة التحكيم.',
      stepOf: 'الخطوة',
      prevStep: 'السابق',
      nextStep: 'التالي',
      closePanel: 'إخفاء الشريط',
      steps: [
        {
          id: 1,
          title: 'البحث عن رحلة من الدمام إلى حقل',
          desc: 'تعبئة مسار الدمام ⇄ حقل في بوابة المسافر والانتقال لنتائج المقارنة.',
          actionLabel: 'تنفيذ الخطوة 1',
        },
        {
          id: 2,
          title: 'مقارنة خيارات السفر المتاحة',
          desc: 'استعراض المدة والسعر بالريال وعدد التبديلات ووقت الانتظار والمشغلين.',
          actionLabel: 'عرض المقارنة',
        },
        {
          id: 3,
          title: 'توصية الذكاء الاصطناعي وتفسيرها',
          desc: 'فحص تفاصيل المسار الموصى به وسبب اختياره وفق السعر والمدة والانتظار.',
          actionLabel: 'فتح التفاصيل',
        },
        {
          id: 4,
          title: 'استشارة المساعد الذكي للمسافرين',
          desc: 'طرح سؤال حول مسار حقل ومقارنة وسائل النقل للمسافر.',
          actionLabel: 'سؤال المساعد',
        },
        {
          id: 5,
          title: 'التبديل إلى بوابة العمليات',
          desc: 'الانتقال إلى تجربة المشغلين والإداريين لمراقبة كفاءة الربط.',
          actionLabel: 'دخول بوابة العمليات',
        },
        {
          id: 6,
          title: 'رصد فجوة انتظار طويلة',
          desc: 'مراجعة جدول تحليل الفجوات وتحديد ربط الدمام–حقل (165 دقيقة انتظار).',
          actionLabel: 'تمييز الفجوة',
        },
        {
          id: 7,
          title: 'استعراض توصية التحسين بالذكاء الاصطناعي',
          desc: 'عرض مقترح تعديل موعد المغادرة بانتظار موافقة المشغل.',
          actionLabel: 'عرض التوصية',
        },
        {
          id: 8,
          title: 'مقارنة النتائج قبل وبعد التحسين',
          desc: 'معاينة الأثر المتوقع وتقليص الانتظار من 165 إلى 40 دقيقة.',
          actionLabel: 'مقارنة قبل/بعد',
        },
      ],
    },
    transparency: {
      title: 'شفافية مصادر البيانات',
      official: 'بيانات رسمية',
      verified: 'بيانات موثقة',
      estimated: 'بيانات تقديرية',
      simulated: 'بيانات محاكاة',
      officialDesc: 'أسماء المحطات والمطارات والمشغلين',
      verifiedDesc: 'روابط المحطات وإحداثيات الربط المعتمدة',
      estimatedDesc: 'الأسعار التقديرية بالريال والأثر المتوقع',
      simulatedDesc: 'الجداول التجريبية والتأخيرات وتحسينات المحاكاة',
    },
    hero: {
      kicker: 'منصة النقل الذكي متعدد الوسائط في المملكة العربية السعودية',
      headline: 'رحلتك تبدأ بقرار أذكى',
      subtitle: 'اكتشف أفضل خيارات التنقل بين مدن المملكة مع RelayBus.',
      demoNote: 'نموذج أولي تفاعلي ببيانات تجريبية للمعاينة فقط',
    },
    search: {
      fromLabel: 'من مدينة',
      toLabel: 'إلى مدينة',
      dateLabel: 'تاريخ السفر',
      passengersLabel: 'عدد المسافرين',
      passengerSingular: 'مسافر',
      passengerPlural: 'مسافرين',
      swapCities: 'تبديل الوجهتين',
      searchButton: 'ابحث عن الرحلات',
      selectCity: 'اختر المدينة',
      validationSameCity: 'يرجى اختيار مدينة وصول مختلفة عن مدينة الانطلاق.',
      validationMissingFields: 'يرجى تحديد مدينة الانطلاق والوصول وتاريخ السفر.',
      modifySearch: 'تعديل البحث',
    },
    home: {
      destinationsTitle: 'وجهات شائعة بين مدن المملكة',
      destinationsSubtitle: 'انقر على أي وجهة لاستكشاف خيارات الربط بين الحافلات والقطارات والطيران.',
      fromSar: 'تبدأ تقديرياً من',
      routesLabel: 'مسارات مقترحة',
      exploreRoute: 'استعرض المسارات',
      aiSectionKicker: 'قدرات الذكاء الاصطناعي في المنصة',
      aiSectionTitle: 'تخطيط أذكى للركاب، وكفاءة أعلى للمشغلين',
      aiSectionSubtitle: 'ثلاث ركائز متكاملة تعالج فجوات التنقل بين وسائل النقل البرية والسككية والجوية.',
      aiFeature1Title: 'توصيات الرحلات الذكية',
      aiFeature1Desc: 'يقوم المحرك بموازنة السعر الإجمالي، مدة الرحلة، أوقات الانتظار بين المحطات، وعدد التبديلات لاقتراح المسار الأنسب لراحتك وميزانيتك.',
      aiFeature1Metric: 'مقارنة متعددة المعايير خلال أجزاء من الثانية',
      aiFeature1Cta: 'قارن الرحلات الآن',
      aiFeature2Title: 'المساعد الذكي للمسافرين',
      aiFeature2Desc: 'محادثة تفاعلية باللغة العربية والإنجليزية للإجابة عن استفسارات المسارات، تقييم فترات الانتظار، وتوضيح سياسات المشغلين.',
      aiFeature2Cta: 'تحدث مع المساعد',
      aiFeature3Title: 'تنسيق أوقات الانتظار الذكي',
      aiFeature3Desc: 'تعتمد المنصة على خوارزميات تحليل الفجوات لمساعدتك على اختيار رحلات مترابطة بأقل فترات انتظار ممكنة بين المحطات.',
      aiFeature3Cta: 'استكشف الرحلات المترابطة',
      aboutKicker: 'عن منصة RelayBus',
      aboutTitle: 'جسر رقمي يربط شبكات النقل في المملكة',
      aboutDesc: 'بدلاً من البحث المتفرق في تطبيقات الحافلات والقطارات والطيران، تجمع RelayBus المسارات المدمجة في تجربة واحدة واضحة، مع مراعاة واقعية لفترات الانتقال بين المحطات.',
      aboutPoint1Title: 'رحلات متعددة الوسائط في تخطيط واحد',
      aboutPoint1Desc: 'دمج سلس بين قطارات سار والحرمين، حافلات سابتكو، والرحلات الجوية الداخلية.',
      aboutPoint2Title: 'شفافية كاملة في أوقات الانتظار',
      aboutPoint2Desc: 'عرض واضح لمدة التوقف وموقع التبديل ومستوى الملاءمة قبل اتخاذ القرار.',
      aboutPoint3Title: 'توصيات دقيقة حسب أولوياتك',
      aboutPoint3Desc: 'توازن ذكي بين السعر الإجمالي ومدة الرحلة وعدد التبديلات لكل مسار.',
      ctaTitle: 'جاهز لتجربة تخطيط رحلتك القادمة؟',
      ctaDesc: 'ابدأ بمقارنة الرحلات بين مدن المملكة أو استشر المساعد الذكي لاختيار المسار الأنسب.',
      ctaPrimary: 'استكشف الرحلات',
      ctaSecondary: 'اسأل المساعد الذكي',
    },
    results: {
      pageTitle: 'نتائج البحث والمقارنة',
      demoBanner: 'تنبيه: جميع الجداول والأسعار وحالة التوفر المعروضة هي بيانات تجريبية لأغراض العرض التوضيحي للنموذج الأولي.',
      foundCount: 'رحلة متاحة للمقارنة',
      filtersTitle: 'تصفية النتائج',
      resetFilters: 'إعادة ضبط',
      mobileFiltersBtn: 'خيارات التصفية',
      modeLabel: 'وسيلة النقل',
      allModes: 'جميع الوسائل',
      modeBus: 'حافلة',
      modeTrain: 'قطار',
      modeFlight: 'طيران',
      modeMultimodal: 'متعدد الوسائط',
      maxPriceLabel: 'الحد الأقصى للسعر',
      maxDurationLabel: 'المدة القصوى للرحلة',
      transfersLabel: 'عدد التبديلات',
      transferAny: 'الكل',
      transferDirect: 'مباشر (0)',
      transferOne: 'تبديل واحد',
      transferTwoPlus: 'تبديلان فأكثر',
      departureWindowLabel: 'وقت المغادرة',
      windowAll: 'أي وقت',
      windowMorning: 'صباحاً (05:00 - 11:59)',
      windowAfternoon: 'ظهراً (12:00 - 17:59)',
      windowEvening: 'مساءً (18:00 - 23:59)',
      sortLabel: 'ترتيب حسب',
      sortRecommended: 'توصية الذكاء الاصطناعي',
      sortPrice: 'الأقل سعراً',
      sortDuration: 'الأقصر مدة',
      sortTransfers: 'الأقل توقفات',
      aiRecommendedBadge: 'توصية الذكاء الاصطناعي',
      directLabel: 'مباشر بدون تبديل',
      transferSingle: 'تبديل واحد',
      transferMultiple: 'تبديلات',
      waitingLabel: 'انتظار بين المراحل:',
      noWaiting: 'بدون انتظار',
      totalPriceFor: 'الإجمالي لـ',
      sar: 'ر.س',
      viewDetails: 'عرض التفاصيل',
      emptyTitle: 'لا توجد رحلات مطابقة لمعايير التصفية',
      emptyDesc: 'جرّب توسيع نطاق السعر أو المدة أو إعادة ضبط الفلاتر لعرض جميع المسارات التجريبية.',
      hoursUnit: 'س',
      minutesUnit: 'د',
      whyRecommendedTitle: 'لماذا يوصي الذكاء الاصطناعي بهذه الرحلة؟',
      factorPrice: 'السعر',
      factorDuration: 'المدة',
      factorWaiting: 'الانتظار',
      factorTransfers: 'التبديلات',
      labelDepartureArrival: 'المغادرة والوصول',
      labelOperators: 'المشغلون',
      labelTotalDuration: 'المدة الإجمالية',
      labelTransfers: 'التبديلات',
      labelWaitingTime: 'وقت الانتظار',
      labelTotalPrice: 'السعر الإجمالي',
    },
    details: {
      backToResults: 'العودة إلى نتائج البحث',
      routeTimelineTitle: 'الخط الزمني التفصيلي للرحلة',
      legLabel: 'المرحلة',
      transferTitle: 'محطة تبديل وانتظار',
      waitingDuration: 'مدة الانتظار',
      mapTitle: 'خريطة المسار التوضيحية',
      mapDisclaimer: 'خريطة تخطيطية توضيحية للمسار عبر محاور النقل في المملكة (وضع المعاينة الأولية).',
      priceBreakdownTitle: 'تفصيل التكلفة التقديرية',
      baseFarePerLeg: 'تكلفة المراحل للمسافر الواحد',
      platformServiceEst: 'رسوم التنسيق التقديرية',
      passengersMultiplier: 'عدد المسافرين',
      totalEstimate: 'التكلفة الإجمالية التقديرية',
      sourceSectionTitle: 'مصدر البيانات وحالة التحقق',
      bookPreviewBtn: 'معاينة طلب الحجز (تجريبي)',
      askAssistantBtn: 'اسأل المساعد الذكي عن هذه الرحلة',
      modalTitle: 'معاينة الحجز التجريبية',
      modalNotice: 'هذا الإجراء للمعاينة التوضيحية فقط؛ لم يتم إتمام أي حجز فعلي أو معالجة دفع أو إصدار تذكرة.',
      modalItinerary: 'ملخص المسار المحدد',
      modalClose: 'إغلاق المعاينة',
      amenitiesTitle: 'مزايا المرحلة',
      operatorPolicyTitle: 'ملاحظات المشغل',
    },
    assistant: {
      pageTitle: 'المساعد الذكي للمسافرين',
      pageSubtitle: 'استشارة فورية حول المسارات متعددة الوسائط، فترات الانتظار، ومقارنات التكلفة والوقت.',
      demoNotice: 'وضع المحاكاة التجريبية: الردود المعروضة أمثلة تجريبية مبرمجة للعرض ما لم يتم ربط المنصة ببيانات ومزودين فعليين.',
      greeting: 'مرحبًا بك في RelayBus! كيف أقدر أساعدك في تخطيط رحلتك اليوم؟',
      quickPromptsTitle: 'أسئلة مقترحة',
      quickPrompts: [
        'ما أفضل طريقة للوصول إلى حائل؟',
        'ما أرخص رحلة متاحة؟',
        'هل يوجد انتظار طويل بين الرحلات؟',
        'كيف أقارن بين الحافلة والطائرة؟',
      ],
      inputPlaceholder: 'اكتب سؤالك عن الوجهات، الأسعار، أو فترات الانتظار...',
      sendBtn: 'إرسال',
      typingLabel: 'المساعد يحلل الخيارات...',
      contextTitle: 'نطاق المساعدة الذكية للمسافر',
      contextDesc: 'يساعدك المساعد الذكي في مقارنة خيارات السفر المتاحة بين مدن المملكة (الرياض، جدة، مكة، المدينة، الدمام، تبوك، حائل، حقل)، وتقييم فترات الانتظار والأسعار دون الدخول في قرارات الجدولة الداخلية للمشغلين.',
      sampleResponseTag: 'رد تجريبي للمعاينة',
      viewJourneyBtn: 'عرض تفاصيل الرحلة',
      clearChat: 'محادثة جديدة',
    },
    operations: {
      sidebarTitle: 'مركز تحليل العمليات',
      navOverview: 'نظرة عامة',
      navCharts: 'التحليلات البصرية',
      navConnections: 'جدول الروابط',
      navRecommendations: 'توصيات الذكاء الاصطناعي',
      backToTraveler: 'العودة لواجهة المسافر',
      simulationBanner: 'بيانات تشغيلية محاكاة لأغراض العرض التحليلي — لا تمثل قياساً حياً من أنظمة المشغلين.',
      pageTitle: 'تحليل الفجوات وتحسين الربط التشغيلي',
      pageSubtitle: 'مراقبة التزامن بين خدمات النقل البرية والسككية والجوية واكتشاف فرص تقليص الانتظار.',
      kpiMonitored: 'الرحلات المراقبة',
      kpiAnalyzed: 'الروابط المحللة',
      kpiLongGaps: 'فجوات انتظار طويلة',
      kpiMissedRisk: 'احتمال فوات الربط',
      kpiOpportunities: 'فرص تحسين متاحة',
      chartWaitDistTitle: 'توزيع أوقات الانتظار بين الرحلات',
      chartWaitDistDesc: 'تصنيف الروابط حسب مدة التوقف بالدقائق (بيانات محاكاة)',
      chartDelayTitle: 'الرحلات المتأخرة مقابل المنضبطة',
      chartDelayDesc: 'مقارنة أسبوعية لأداء الالتزام بالمواعيد عبر المحاور',
      chartOnTimeLegend: 'في الموعد',
      chartDelayedLegend: 'متأخرة',
      chartLongestTitle: 'أطول فترات الانتظار المسجلة',
      chartLongestDesc: 'أبرز محاور الربط ذات الفجوات الزمنية المرتفعة',
      chartHealthTitle: 'ملخص حالة كفاءة الربط',
      chartHealthDesc: 'توزيع مستويات المخاطرة التشغيلية للروابط المحللة',
      filterCorridor: 'المحور',
      filterOperator: 'المشغل',
      filterRisk: 'مستوى المخاطرة',
      filterAll: 'الكل',
      searchPlaceholder: 'ابحث برقم الرحلة أو المحطة...',
      tableTitle: 'تحليل روابط التبديل ومستويات المخاطرة',
      colJourneyId: 'رقم الرحلة',
      colOperator: 'المشغل',
      colOrigin: 'الانطلاق',
      colDestination: 'الوجهة',
      colArrival: 'الوصول المجدول',
      colNextDep: 'المغادرة التالية',
      colWaiting: 'مدة الانتظار',
      colRisk: 'مستوى المخاطرة',
      colSuggestion: 'اقتراح الذكاء الاصطناعي',
      riskGood: 'اتصال جيد',
      riskAttention: 'يحتاج متابعة',
      riskHigh: 'خطر مرتفع',
      aiPanelTitle: 'توصيات تحسين الجداول الزمنية',
      aiPanelDesc: 'إجراءات مقترحة لتقليل فجوات الانتظار ورفع موثوقية الربط.',
      simulateBtn: 'محاكاة تطبيق التحسين',
      simulatedApplied: 'تمت المحاكاة',
      resetSimBtn: 'إعادة ضبط المحاكاة',
      emptyTableTitle: 'لا توجد روابط مطابقة للبحث',
      emptyTableDesc: 'عدّل معايير التصفية أو ابحث برقم رحلة آخر.',
      gapSectionBadge: 'المرحلة 1 · تحليل الفجوات (Gap Analysis)',
      gapSectionTitle: 'رصد فجوات الانتظار ومخاطر الربط',
      gapSectionDesc: 'تحليل وقت الوصول الحالي ومغادرة الرحلة التالية لتحديد فجوات الانتظار الطويلة وشدة المشكلة.',
      optSectionBadge: 'المرحلة 2 · التحسين الذكي (AI Optimization)',
      optSectionTitle: 'توصيات تحسين الجداول ومقارنة قبل وبعد',
      optSectionDesc: 'مقترحات تحسين تستند إلى بيانات محاكاة وتتطلب موافقة المشغل قبل أي اعتماد تشغيلي.',
      colSeverity: 'شدة المشكلة',
      colImpact: 'الأثر المتوقع',
      beforeAfterTitle: 'مقارنة الأثر المتوقع: قبل التحسين مقابل بعده',
      beforeLabel: 'قبل التحسين (الوضع الحالي)',
      afterLabel: 'بعد التحسين (مقترح محاكاة)',
      approvalRequiredBadge: 'مقترح يتطلب موافقة المشغل',
      approvalApprovedBadge: 'تمت معاينة الموافقة (محاكاة)',
      approvePreviewBtn: 'معاينة اعتماد المقترح (محاكاة)',
      waitingReductionLabel: 'مدة الانتظار',
      scheduleChangeLabel: 'موعد المغادرة التالية',
      riskBeforeAfterLabel: 'حالة الربط',
    },
    auth: {
      loginTitle: 'تسجيل الدخول إلى RelayBus',
      signupTitle: 'إنشاء حساب مسافر جديد',
      nameLabel: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      submitLogin: 'دخول (نموذج تجريبي)',
      submitSignup: 'تسجيل حساب (نموذج تجريبي)',
      switchToSignup: 'ليس لديك حساب؟ أنشئ حساباً جديداً',
      switchToLogin: 'لديك حساب بالفعل؟ سجّل الدخول',
      demoNotice: 'واجهة مصادقة تجريبية للعرض فقط ولا تقوم بإنشاء جلسات فعلية.',
      successLogin: 'تمت محاكاة تسجيل الدخول بنجاح.',
      successSignup: 'تمت محاكاة إنشاء الحساب بنجاح.',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
      shortPassword: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.',
    },
    authEntry: {
      welcomeTitle: 'مرحباً بك في منصة RelayBus',
      welcomeSubtitle: 'سجّل الدخول وفق نوع حسابك للوصول إلى بوابة المسافرين أو بوابة مشغلي النقل بصلاحيات مخصصة.',
      selectRoleLabel: 'اختر نوع الحساب',
      travelerRoleTitle: 'حساب مسافر',
      travelerRoleDesc: 'البحث عن الرحلات متعددة الوسائط، المقارنة، والتوصيات الذكية.',
      operatorRoleTitle: 'حساب مشغل نقل',
      operatorRoleDesc: 'إدارة جداول الربط، تحليل الفجوات الزمنية، وتوصيات التحسين.',
      tabLogin: 'تسجيل الدخول',
      tabRegister: 'إنشاء حساب جديد',
      nameLabel: 'الاسم الكامل',
      orgLabel: 'اسم الجهة / المشغل',
      orgPlaceholder: 'مثال: سابتكو أو قطار سار',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      loginBtnTraveler: 'دخول إلى بوابة المسافر',
      loginBtnOperator: 'دخول إلى بوابة العمليات',
      registerBtnTraveler: 'تسجيل حساب مسافر',
      registerBtnOperator: 'تسجيل حساب مشغل نقل',
      switchToRegister: 'مستخدم جديد؟ أنشئ حساباً وفق دورك',
      switchToLogin: 'لديك حساب بالفعل؟ سجّل الدخول',
      forgotPasswordLink: 'نسيت كلمة المرور؟',
      forgotPasswordNotice: 'ميزة استعادة كلمة المرور تتطلب ربط خدمة مصادقة وبريد إلكتروني من الخادم (غير مفعلة في النموذج الأولي الحالي). يمكنك استخدام حسابات العرض التوضيحي الجاهزة.',
      demoSectionTitle: 'حسابات العرض التوضيحي للتحكيم (Demo Accounts)',
      demoSectionSubtitle: 'للمعاينة السريعة أمام لجنة التحكيم، اختر أحد الحسابين التجريبيين أدناه لاستعراض الصلاحيات المنفصلة لكل دور.',
      demoTravelerCardTitle: 'حساب مسافر تجريبي',
      demoTravelerCardDesc: 'صلاحيات بوابة المسافر فقط: البحث من الدمام إلى حقل، التوصية الذكية، المساعد الذكي للمسافرين، والملف الشخصي.',
      demoTravelerBtn: 'دخول كمسافر تجريبي',
      demoOperatorCardTitle: 'حساب مشغل نقل تجريبي',
      demoOperatorCardDesc: 'صلاحيات بوابة العمليات فقط: جدول الربط، تحليل الفجوات، توصيات تحسين الجداول، والتحليلات التشغيلية.',
      demoOperatorBtn: 'دخول كمشغل تجريبي',
      securityDisclaimer: 'تنبيه معماري: المصادقة وحماية المسارات الحالية تعمل على مستوى الواجهة (Frontend Demo Session) لأغراض العرض. يتطلب النشر الإنتاجي مصادقة خادم حقيقية والتحقق من الصلاحيات (RBAC) عبر الـ Backend.',
      routeAuthRequiredNotice: 'يتطلب الوصول إلى المسار المطلوب تسجيل الدخول بالحساب المصرح له أولاً.',
      missingOrgError: 'يرجى إدخال اسم جهة النقل أو المشغل.',
    },
    accessDenied: {
      badge: 'حماية المسارات حسب الصلاحية · 403',
      title: 'الوصول مرفوض — صلاحيات غير مصرح بها',
      desc: 'لا يمتلك حسابك النشط صلاحية الوصول إلى هذه الصفحة. تفصل RelayBus بين تجربة المسافرين وتجربة مشغلي النقل.',
      attemptedRouteLabel: 'المسار المطلوب',
      activeRoleLabel: 'الدور النشط حالياً',
      requiredRoleLabel: 'الدور المطلوب لهذا المسار',
      securityNote: 'تنبيه: حارس المسارات في المتصفح (Frontend Route Guard) يمثل طبقة فصل للعرض الأولي فقط ولا يغني عن التحقق من الصلاحيات في الخادم (Backend RBAC) في بيئة الإنتاج.',
      backToPortalBtn: 'العودة إلى بوابتك المصرح بها',
      logoutSwitchBtn: 'تسجيل الخروج وتبديل الحساب',
    },
    profile: {
      travelerTitle: 'الملف الشخصي للمسافر',
      operatorTitle: 'ملف مشغل النقل والعمليات',
      subtitle: 'إدارة تفاصيل الحساب النشط ومراجعة الصلاحيات الممنوحة لدورك.',
      accountDetailsTitle: 'بيانات الجلسة النشطة',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      roleLabel: 'الدور المصرح به',
      orgLabel: 'الجهة التشغيلية',
      sessionTypeLabel: 'نوع الجلسة',
      demoSessionValue: 'جلسة عرض تجريبية (Demo Session في الذاكرة)',
      permissionsTitle: 'الصلاحيات المتاحة لهذا الدور',
      travelerPermissions: [
        'تصفح بوابة المسافر والصفحة الرئيسية (/traveler/home)',
        'البحث ومقارنة الرحلات متعددة الوسائط (/traveler/explore)',
        'عرض تفاصيل المسار وتفسير توصية الذكاء الاصطناعي',
        'استشارة المساعد الذكي للمسافرين (/traveler/assistant)',
      ],
      operatorPermissions: [
        'لوحة نظرة عامة على العمليات (/operator/overview)',
        'إدارة جداول الرحلات والربط (/operator/schedules)',
        'تحليل فجوات الانتظار (/operator/gap-analysis)',
        'مراجعة توصيات تحسين الجداول قبل/بعد (/operator/optimization)',
        'التحليلات البصرية للأداء التشغيلي (/operator/analytics)',
      ],
      restrictedNoticeTitle: 'نطاق العزل الأمني',
      travelerRestrictedNotice: 'حساب المسافر معزول تماماً عن لوحة العمليات وتحليل الفجوات وإدارة جداول المشغلين.',
      operatorRestrictedNotice: 'حساب المشغل معزول تماماً عن صفحات الحجز الشخصية وتجربة البحث الخاصة بالمسافرين.',
      backendNoticeTitle: 'متطلب الخادم للإنتاج (Backend RBAC)',
      backendNoticeDesc: 'لا يوجد خادم مصادقة خلفي متصل حالياً؛ يتم التحقق من الصلاحيات في الواجهة لأغراض العرض فقط، ويلزم ربط نظام تحقق خادم (JWT / Session + RBAC) عند الإنتاج.',
      logoutBtn: 'تسجيل الخروج والعودة لصفحة الدخول',
      testGuardTitle: 'اختبار حماية المسارات المباشرة (للعرض التقديمي)',
      testGuardTravelerBtn: 'محاولة فتح مسار المشغل (/operator/gap-analysis)',
      testGuardOperatorBtn: 'محاولة فتح مسار المسافر (/traveler/explore)',
    },
    footer: {
      desc: 'منصة تقنية سعودية لتخطيط ومقارنة رحلات النقل متعدد الوسائط بين مدن المملكة بذكاء وشفافية.',
      linksTitle: 'روابط المنصة',
      corridorsTitle: 'أبرز المحاور المدعومة',
      contactTitle: 'التواصل والبيانات',
      corridors: ['الرياض ⇄ جدة', 'مكة المكرمة ⇄ المدينة المنورة', 'الرياض ⇄ الدمام', 'المدينة المنورة ⇄ تبوك', 'الرياض ⇄ حائل'],
      email: 'info@relaybus.sa',
      location: 'الرياض، المملكة العربية السعودية',
      demoFooterNote: 'نموذج أولي للعرض التوضيحي باستخدام بيانات محاكاة تجريبية.',
      copyright: '© 2026 RelayBus. جميع الحقوق محفوظة للنموذج الأولي.',
    },
  },
  en: {
    brandName: 'RelayBus',
    nav: {
      home: 'Home',
      explore: 'Explore Journeys',
      assistant: 'AI Assistant',
      operations: 'Operations',
      about: 'About',
      login: 'Login',
      signup: 'Sign Up',
      switchLang: 'العربية',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      logout: 'Logout',
      travelerProfile: 'Profile',
      operatorProfile: 'Operator Profile',
      opOverview: 'Overview',
      opSchedules: 'Schedules',
      opGapAnalysis: 'Gap Analysis',
      opOptimization: 'AI Optimization',
      opAnalytics: 'Analytics',
      roleTravelerBadge: 'Traveler',
      roleOperatorBadge: 'Operator',
      travelerPortal: 'Traveler Portal',
      travelerPortalDesc: 'Search & compare intercity journeys',
      operationsPortal: 'Operations Portal',
      operationsPortalDesc: 'Monitor connections & optimize schedules',
      portalSwitcherLabel: 'Active Experience:',
    },
    presentation: {
      toggleBtn: 'Jury Demo Flow',
      panelTitle: 'Jury Presentation Flow (8 Steps)',
      panelSubtitle: 'Guided navigation to demonstrate Traveler and Operations portals in sequence.',
      stepOf: 'Step',
      prevStep: 'Previous',
      nextStep: 'Next',
      closePanel: 'Hide Bar',
      steps: [
        {
          id: 1,
          title: 'Search Dammam to Haql',
          desc: 'Load the Dammam → Haql corridor in the Traveler Portal search experience.',
          actionLabel: 'Run Step 1',
        },
        {
          id: 2,
          title: 'Compare Journey Options',
          desc: 'Review total duration, SAR price, transfers, waiting times, and operators.',
          actionLabel: 'Compare Results',
        },
        {
          id: 3,
          title: 'View AI-Recommended Journey',
          desc: 'Inspect the recommended itinerary and its 4-factor explanation.',
          actionLabel: 'Open Details',
        },
        {
          id: 4,
          title: 'Ask the AI Travel Assistant',
          desc: 'Ask a traveler comparison question about reaching Haql.',
          actionLabel: 'Ask Assistant',
        },
        {
          id: 5,
          title: 'Switch to Operations Portal',
          desc: 'Enter the operator view for connection monitoring and schedule optimization.',
          actionLabel: 'Switch Portal',
        },
        {
          id: 6,
          title: 'Identify a Long Waiting Gap',
          desc: 'Spot the Dammam–Haql Tabuk hub connection with a 165m waiting gap.',
          actionLabel: 'Highlight Gap',
        },
        {
          id: 7,
          title: 'View AI Optimization Suggestion',
          desc: 'Inspect the schedule proposal marked as requiring operator approval.',
          actionLabel: 'View Suggestion',
        },
        {
          id: 8,
          title: 'Compare Before vs. After Results',
          desc: 'Preview expected impact cutting layover from 165m down to 40m.',
          actionLabel: 'Compare Before/After',
        },
      ],
    },
    transparency: {
      title: 'Data Provenance & Transparency',
      official: 'Official Data',
      verified: 'Verified Data',
      estimated: 'Estimated Data',
      simulated: 'Simulated Data',
      officialDesc: 'Published airport, rail, and coach operator names',
      verifiedDesc: 'Validated hub coordinates and terminal transfers',
      estimatedDesc: 'Estimated SAR fares and expected schedule impact',
      simulatedDesc: 'Prototype timetables, delays, and optimization previews',
    },
    hero: {
      kicker: 'Smart Multi-Modal Mobility Platform for Saudi Arabia',
      headline: 'Your Journey Starts With a Smarter Decision',
      subtitle: 'Discover and compare the best intercity travel options across Saudi Arabia with RelayBus.',
      demoNote: 'Interactive prototype · Clearly labeled demo data for preview only',
    },
    search: {
      fromLabel: 'From City',
      toLabel: 'To City',
      dateLabel: 'Travel Date',
      passengersLabel: 'Passengers',
      passengerSingular: 'Passenger',
      passengerPlural: 'Passengers',
      swapCities: 'Swap cities',
      searchButton: 'Search Journeys',
      selectCity: 'Select city',
      validationSameCity: 'Please select a destination city different from your origin.',
      validationMissingFields: 'Please select origin, destination, and travel date.',
      modifySearch: 'Modify Search',
    },
    home: {
      destinationsTitle: 'Popular Saudi Destinations',
      destinationsSubtitle: 'Select any destination to compare intercity buses, trains, flights, and multi-modal routes.',
      fromSar: 'Demo est. from',
      routesLabel: 'sample routes',
      exploreRoute: 'Explore Routes',
      aiSectionKicker: 'Platform AI Capabilities',
      aiSectionTitle: 'Smarter planning for travelers, sharper visibility for operators',
      aiSectionSubtitle: 'Three integrated intelligence modules designed to bridge timing gaps across Saudi road, rail, and air networks.',
      aiFeature1Title: 'AI Journey Recommendation',
      aiFeature1Desc: 'Helps travelers choose the best connected journey by balancing price, duration, waiting time, and number of transfers.',
      aiFeature1Metric: 'Multi-factor route scoring in milliseconds',
      aiFeature1Cta: 'Compare Journeys',
      aiFeature2Title: 'AI Travel Assistant',
      aiFeature2Desc: 'Answers travel questions using available journey information to help travelers compare modes and transfer buffers.',
      aiFeature2Cta: 'Open AI Assistant',
      aiFeature3Title: 'Synchronized Multi-Modal Transfers',
      aiFeature3Desc: 'Built on smart connection scoring so travelers discover smoothly aligned routes with minimal waiting gaps between stations.',
      aiFeature3Cta: 'Explore Connected Routes',
      aboutKicker: 'About RelayBus',
      aboutTitle: 'A unified transit layer connecting Saudi cities',
      aboutDesc: 'Instead of checking separate bus, rail, and airline apps, RelayBus brings multi-modal combinations into a single transparent comparison with realistic transfer awareness.',
      aboutPoint1Title: 'Unified Multi-Modal Routing',
      aboutPoint1Desc: 'Combines SAR & Haramain rail, SAPTCO intercity coaches, and domestic flights seamlessly.',
      aboutPoint2Title: 'Transparent Transfer Buffers',
      aboutPoint2Desc: 'Displays exact waiting times, station transfers, and comfort notes before you commit.',
      aboutPoint3Title: 'Multi-Factor Route Scoring',
      aboutPoint3Desc: 'Balances total price, journey duration, waiting time, and number of transfers clearly.',
      ctaTitle: 'Ready to plan a smarter intercity trip?',
      ctaDesc: 'Compare multi-modal routes across the Kingdom or ask our AI Travel Assistant for route guidance.',
      ctaPrimary: 'Explore Journeys',
      ctaSecondary: 'Ask AI Travel Assistant',
    },
    results: {
      pageTitle: 'Journey Comparison & Results',
      demoBanner: 'Prototype Notice: All schedules, fares, and availability shown here are demo data for prototype demonstration only.',
      foundCount: 'demo journeys available',
      filtersTitle: 'Filter Results',
      resetFilters: 'Reset',
      mobileFiltersBtn: 'Filters',
      modeLabel: 'Transport Mode',
      allModes: 'All Modes',
      modeBus: 'Bus',
      modeTrain: 'Train',
      modeFlight: 'Flight',
      modeMultimodal: 'Multi-modal',
      maxPriceLabel: 'Max Price',
      maxDurationLabel: 'Max Total Duration',
      transfersLabel: 'Transfers',
      transferAny: 'Any',
      transferDirect: 'Direct (0)',
      transferOne: '1 Transfer',
      transferTwoPlus: '2+ Transfers',
      departureWindowLabel: 'Departure Time',
      windowAll: 'Any time',
      windowMorning: 'Morning (05:00 - 11:59)',
      windowAfternoon: 'Afternoon (12:00 - 17:59)',
      windowEvening: 'Evening (18:00 - 23:59)',
      sortLabel: 'Sort by',
      sortRecommended: 'AI Recommended',
      sortPrice: 'Lowest Price',
      sortDuration: 'Shortest Duration',
      sortTransfers: 'Fewest Transfers',
      aiRecommendedBadge: 'AI Recommended',
      directLabel: 'Direct · No transfers',
      transferSingle: '1 transfer',
      transferMultiple: 'transfers',
      waitingLabel: 'Connection wait:',
      noWaiting: 'No wait',
      totalPriceFor: 'Total for',
      sar: 'SAR',
      viewDetails: 'View Details',
      emptyTitle: 'No journeys match your current filters',
      emptyDesc: 'Try widening the price or duration slider, or reset filters to view all demo journeys.',
      hoursUnit: 'h',
      minutesUnit: 'm',
      whyRecommendedTitle: 'Why AI Recommends This Journey',
      factorPrice: 'Price',
      factorDuration: 'Duration',
      factorWaiting: 'Waiting Time',
      factorTransfers: 'Transfers',
      labelDepartureArrival: 'Departure & Arrival',
      labelOperators: 'Operators',
      labelTotalDuration: 'Total Duration',
      labelTransfers: 'Transfers',
      labelWaitingTime: 'Waiting Time',
      labelTotalPrice: 'Total Price',
    },
    details: {
      backToResults: 'Back to Search Results',
      routeTimelineTitle: 'Visual Journey Timeline',
      legLabel: 'Leg',
      transferTitle: 'Transfer & Waiting Stop',
      waitingDuration: 'Waiting Time',
      mapTitle: 'Illustrative Route Map',
      mapDisclaimer: 'Clean schematic route visualization across Saudi transit hubs (prototype preview).',
      priceBreakdownTitle: 'Estimated Price Breakdown',
      baseFarePerLeg: 'Leg fares per passenger',
      platformServiceEst: 'Estimated coordination fee',
      passengersMultiplier: 'Passengers',
      totalEstimate: 'Estimated Total',
      sourceSectionTitle: 'Data Source & Verification Status',
      bookPreviewBtn: 'Preview Reservation (Demo)',
      askAssistantBtn: 'Ask AI Assistant About This Route',
      modalTitle: 'Demo Reservation Preview',
      modalNotice: 'This preview is for prototype demonstration only. No real booking has been completed, no payment processed, and no ticket issued.',
      modalItinerary: 'Selected Itinerary Summary',
      modalClose: 'Close Preview',
      amenitiesTitle: 'Leg Amenities',
      operatorPolicyTitle: 'Operator Notes',
    },
    assistant: {
      pageTitle: 'AI Travel Assistant',
      pageSubtitle: 'Instant guidance on multi-modal Saudi routes, transfer waiting times, and mode comparisons.',
      demoNotice: 'Demo Mode: Assistant responses use sample prototype data unless connected to live operator feeds.',
      greeting: 'Welcome to RelayBus! How can I help you plan your journey across Saudi Arabia today?',
      quickPromptsTitle: 'Suggested Questions',
      quickPrompts: [
        'What is the best way to reach Hail?',
        'What is the cheapest available journey?',
        'Are there long waiting times between transfers?',
        'How do buses compare to flights?',
      ],
      inputPlaceholder: 'Ask about cities, fares, transfer buffers, or transport modes...',
      sendBtn: 'Send',
      typingLabel: 'Assistant is analyzing routes...',
      contextTitle: 'Traveler Assistant Scope',
      contextDesc: 'Helps travelers understand and compare available intercity options (Riyadh, Jeddah, Makkah, Madinah, Dammam, Tabuk, Hail, Haql) without exposing internal operator scheduling controls.',
      sampleResponseTag: 'Demo Sample Response',
      viewJourneyBtn: 'View Journey Details',
      clearChat: 'New Chat',
    },
    operations: {
      sidebarTitle: 'Operations Analytics',
      navOverview: 'Overview',
      navCharts: 'Visual Analytics',
      navConnections: 'Connections Table',
      navRecommendations: 'AI Optimization',
      backToTraveler: 'Back to Traveler Site',
      simulationBanner: 'Simulated Operational Data: Metrics and connection statuses shown below are simulated for prototype analysis, not live operator telemetry.',
      pageTitle: 'AI Gap Analysis & Connection Optimization',
      pageSubtitle: 'Monitor intermodal timing alignment across bus, rail, and flight hubs and uncover schedule improvements.',
      kpiMonitored: 'Journeys Monitored',
      kpiAnalyzed: 'Connections Analyzed',
      kpiLongGaps: 'Long Waiting Gaps',
      kpiMissedRisk: 'Missed Connection Risk',
      kpiOpportunities: 'Optimization Opportunities',
      chartWaitDistTitle: 'Waiting-Time Distribution',
      chartWaitDistDesc: 'Breakdown of analyzed transfers by waiting duration (simulated)',
      chartDelayTitle: 'Delayed vs. On-Time Journeys',
      chartDelayDesc: 'Weekly corridor punctuality comparison across services',
      chartOnTimeLegend: 'On Time',
      chartDelayedLegend: 'Delayed',
      chartLongestTitle: 'Connections With Longest Waiting Periods',
      chartLongestDesc: 'Top transfer hubs showing excessive layover gaps',
      chartHealthTitle: 'Journey Performance Overview',
      chartHealthDesc: 'Connection risk distribution across monitored corridors',
      filterCorridor: 'Corridor',
      filterOperator: 'Operator',
      filterRisk: 'Risk Level',
      filterAll: 'All',
      searchPlaceholder: 'Search by Journey ID or station...',
      tableTitle: 'Connection Gap Analysis Table',
      colJourneyId: 'Journey ID',
      colOperator: 'Operator',
      colOrigin: 'Origin',
      colDestination: 'Destination',
      colArrival: 'Scheduled Arrival',
      colNextDep: 'Next Departure',
      colWaiting: 'Waiting Time',
      colRisk: 'Risk Level',
      colSuggestion: 'AI Suggestion',
      riskGood: 'Good connection',
      riskAttention: 'Needs attention',
      riskHigh: 'High-risk connection',
      aiPanelTitle: 'AI Schedule Recommendations',
      aiPanelDesc: 'Actionable adjustments to reduce connection waiting times and missed transfers.',
      simulateBtn: 'Simulate Optimization',
      simulatedApplied: 'Simulated',
      resetSimBtn: 'Reset Simulation',
      emptyTableTitle: 'No matching connections found',
      emptyTableDesc: 'Adjust your corridor, operator, or risk filters to inspect simulated transfers.',
      gapSectionBadge: 'Stage 1 · AI Gap Analysis',
      gapSectionTitle: 'Detected Connection Gaps & Severity',
      gapSectionDesc: 'Analyzes current arrival and next departure times to surface long waiting gaps and transfer risk.',
      optSectionBadge: 'Stage 2 · AI Schedule Optimization',
      optSectionTitle: 'Schedule Suggestions & Before vs. After Comparison',
      optSectionDesc: 'Simulated proposals requiring explicit operator approval before any schedule change takes effect.',
      colSeverity: 'Problem Severity',
      colImpact: 'Expected Impact',
      beforeAfterTitle: 'Expected Impact Comparison: Before vs. After',
      beforeLabel: 'Before (Current Schedule)',
      afterLabel: 'After (Simulated Proposal)',
      approvalRequiredBadge: 'Suggestion · Requires Operator Approval',
      approvalApprovedBadge: 'Approval Previewed (Simulated)',
      approvePreviewBtn: 'Preview Approval Impact (Simulated)',
      waitingReductionLabel: 'Waiting Gap',
      scheduleChangeLabel: 'Next Departure',
      riskBeforeAfterLabel: 'Connection Status',
    },
    auth: {
      loginTitle: 'Sign In to RelayBus',
      signupTitle: 'Create Traveler Account',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      submitLogin: 'Sign In (Demo)',
      submitSignup: 'Create Account (Demo)',
      switchToSignup: 'New to RelayBus? Create an account',
      switchToLogin: 'Already have an account? Sign in',
      demoNotice: 'Prototype authentication UI for demonstration only; no account is persisted.',
      successLogin: 'Demo sign-in completed successfully.',
      successSignup: 'Demo account preview completed.',
      invalidEmail: 'Please enter a valid email address.',
      shortPassword: 'Password must be at least 6 characters.',
    },
    authEntry: {
      welcomeTitle: 'Welcome to RelayBus',
      welcomeSubtitle: 'Sign in with your account type to enter either the Traveler Portal or the Transport Operations Portal.',
      selectRoleLabel: 'Select Account Type',
      travelerRoleTitle: 'Traveler Account',
      travelerRoleDesc: 'Search multi-modal journeys, compare routes, and ask the AI Travel Assistant.',
      operatorRoleTitle: 'Transport Operator Account',
      operatorRoleDesc: 'Monitor transfer schedules, inspect Gap Analysis, and review AI schedule optimizations.',
      tabLogin: 'Sign In',
      tabRegister: 'Register',
      nameLabel: 'Full Name',
      orgLabel: 'Transport Operator / Organization',
      orgPlaceholder: 'e.g. SAPTCO or SAR Operations',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      loginBtnTraveler: 'Sign In to Traveler Portal',
      loginBtnOperator: 'Sign In to Operations Portal',
      registerBtnTraveler: 'Create Traveler Account',
      registerBtnOperator: 'Create Operator Account',
      switchToRegister: 'Need an account? Register for your selected role',
      switchToLogin: 'Already registered? Sign in here',
      forgotPasswordLink: 'Forgot password?',
      forgotPasswordNotice: 'Password recovery requires a configured backend authentication & email service (not enabled in this prototype). Use the Demo Accounts panel for instant jury presentation access.',
      demoSectionTitle: 'Jury Presentation Demo Accounts',
      demoSectionSubtitle: 'Quick-access demo accounts illustrating strict role isolation between travelers and transport operators.',
      demoTravelerCardTitle: 'Demo Traveler Account',
      demoTravelerCardDesc: 'Traveler permissions only: Dammam to Haql search, AI Journey Recommendation, AI Travel Assistant, and Traveler Profile.',
      demoTravelerBtn: 'Sign In as Demo Traveler',
      demoOperatorCardTitle: 'Demo Operator Account',
      demoOperatorCardDesc: 'Operations permissions only: Schedules, Gap Analysis, AI Optimization Recommendations, and Operational Analytics.',
      demoOperatorBtn: 'Sign In as Demo Operator',
      securityDisclaimer: 'Prototype Notice: Current authentication and route guards run in browser memory for demonstration only. Production deployment requires backend authentication and server-side RBAC enforcement.',
      routeAuthRequiredNotice: 'Please sign in with an authorized account to access the requested route.',
      missingOrgError: 'Please enter your transport operator or organization name.',
    },
    accessDenied: {
      badge: 'Role-Based Route Guard · 403',
      title: 'Access Denied — Unauthorized Route',
      desc: 'Your currently authenticated account role does not have permission to open this portal route.',
      attemptedRouteLabel: 'Requested Route',
      activeRoleLabel: 'Active Role',
      requiredRoleLabel: 'Required Role',
      securityNote: 'Transparency Note: Frontend route guards prevent cross-portal navigation in this UI prototype, but real production security requires backend server-side role authorization on all APIs and routes.',
      backToPortalBtn: 'Return to Authorized Portal',
      logoutSwitchBtn: 'Logout & Switch Account',
    },
    profile: {
      travelerTitle: 'Traveler Profile',
      operatorTitle: 'Transport Operator Profile',
      subtitle: 'View your authenticated session details and role-based permissions.',
      accountDetailsTitle: 'Active Session Details',
      nameLabel: 'Name',
      emailLabel: 'Email Address',
      roleLabel: 'Assigned Role',
      orgLabel: 'Organization',
      sessionTypeLabel: 'Session Type',
      demoSessionValue: 'In-memory Demo Session (Prototype)',
      permissionsTitle: 'Authorized Capabilities',
      travelerPermissions: [
        'Traveler Home & corridor discovery (/traveler/home)',
        'Explore Journeys & multi-modal search (/traveler/explore)',
        'Journey Details & AI Recommendation breakdown',
        'AI Travel Assistant (/traveler/assistant)',
      ],
      operatorPermissions: [
        'Operations Overview (/operator/overview)',
        'Journey & Transfer Schedules (/operator/schedules)',
        'Gap Analysis console (/operator/gap-analysis)',
        'AI Optimization & Before/After view (/operator/optimization)',
        'Operational Analytics (/operator/analytics)',
      ],
      restrictedNoticeTitle: 'Portal Isolation',
      travelerRestrictedNotice: 'Traveler accounts cannot access Operations Dashboard, Gap Analysis, or Operator Schedule Optimization.',
      operatorRestrictedNotice: 'Operator accounts are scoped exclusively to Operations and cannot access traveler-only booking or trip planning routes.',
      backendNoticeTitle: 'Missing Backend Requirement for Production',
      backendNoticeDesc: 'Backend role authorization is not yet connected in this client-side prototype. Production deployment must validate signed tokens and enforce RBAC on the server.',
      logoutBtn: 'Logout & Return to Sign In',
      testGuardTitle: 'Test Route Authorization Guard (Jury Verification)',
      testGuardTravelerBtn: 'Attempt Direct Operator Route (/operator/gap-analysis)',
      testGuardOperatorBtn: 'Attempt Direct Traveler Route (/traveler/explore)',
    },
    footer: {
      desc: 'A Saudi travel-tech platform prototype unifying intercity buses, rail, and flights with transparent multi-modal planning.',
      linksTitle: 'Platform',
      corridorsTitle: 'Key Corridors',
      contactTitle: 'Contact & Prototype',
      corridors: ['Riyadh ⇄ Jeddah', 'Makkah ⇄ Madinah', 'Riyadh ⇄ Dammam', 'Madinah ⇄ Tabuk', 'Riyadh ⇄ Hail'],
      email: 'info@relaybus.sa',
      location: 'Riyadh, Kingdom of Saudi Arabia',
      demoFooterNote: 'Prototype build using clearly labeled demo and simulated data.',
      copyright: '© 2026 RelayBus Prototype. All rights reserved.',
    },
  },
};
