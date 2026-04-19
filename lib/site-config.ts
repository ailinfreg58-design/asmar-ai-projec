// Site configuration - can be updated via admin dashboard
export interface SiteConfig {
  siteName: string
  siteNameAr: string
  tagline: string
  taglineAr: string
  heroTitle: string
  heroTitleAr: string
  heroSubtitle: string
  heroSubtitleAr: string
  matchCenterTitle: string
  matchCenterTitleAr: string
  aiAnalysisTitle: string
  aiAnalysisTitleAr: string
  newsletterTitle: string
  newsletterTitleAr: string
  showAds: boolean
  adsScript: string
  footerText: string
  footerTextAr: string
}

export const defaultSiteConfig: SiteConfig = {
  siteName: "S-SPORTS Kora",
  siteNameAr: "كورة",
  tagline: "Real-time sports analytics powered by cutting-edge AI technology",
  taglineAr: "منصة البيانات الرياضية المتقدمة",
  heroTitle: "S-SPORTS",
  heroTitleAr: "النتيجة مباشرة",
  heroSubtitle: "Live Match Scores",
  heroSubtitleAr: "مباريات حية الآن",
  matchCenterTitle: "Match Center",
  matchCenterTitleAr: "مركز المباريات",
  aiAnalysisTitle: "AI Analysis",
  aiAnalysisTitleAr: "التحليل الذكي",
  newsletterTitle: "Stay in the Game",
  newsletterTitleAr: "ابقَ على اطلاع",
  showAds: false,
  adsScript: "",
  footerText: "The ultimate AI-powered sports data platform for enthusiasts and professionals alike.",
  footerTextAr: "منصة البيانات الرياضية المدعومة بالذكاء الاصطناعي",
}

// Arabic translations for common terms
export const arabicTranslations = {
  // Navigation
  live: "مباشر",
  matchCenter: "مركز المباريات",
  aiAnalysis: "التحليل الذكي",
  trending: "الأكثر متابعة",
  signIn: "تسجيل الدخول",
  getStarted: "ابدأ الآن",
  
  // Match related
  liveNow: "مباشر الآن",
  noLiveMatches: "لا توجد مباريات مباشرة حالياً",
  loadingMatches: "جارٍ تحميل المباريات",
  upcomingMatches: "المباريات القادمة",
  viewDetails: "عرض التفاصيل",
  viewAll: "عرض الكل",
  home: "مستضيف",
  away: "ضيف",
  featured: "مميزة",
  
  // Time related
  firstHalf: "الشوط الأول",
  secondHalf: "الشوط الثاني",
  halfTime: "استراحة",
  extraTime: "وقت إضافي",
  penalties: "ركلات ترجيح",
  
  // Stats
  activeUsers: "مستخدم نشط",
  uptime: "وقت التشغيل",
  aiPowered: "مدعوم بالذكاء الاصطناعي",
  
  // AI Analysis
  neuralPredictions: "التنبؤات العصبية",
  trendAnalysis: "تحليل الاتجاهات",
  valueDetection: "كشف القيمة",
  riskAssessment: "تقييم المخاطر",
  recentPredictions: "أحدث التوقعات",
  confidence: "نسبة الثقة",
  won: "صحيح",
  pending: "قيد الانتظار",
  getPredictions: "احصل على التوقعات",
  
  // Newsletter
  enterEmail: "أدخل بريدك الإلكتروني",
  subscribe: "اشترك",
  
  // Footer
  product: "المنتج",
  company: "الشركة",
  legal: "قانوني",
  support: "الدعم",
  liveScores: "النتائج المباشرة",
  statistics: "الإحصائيات",
  predictions: "التوقعات",
  aboutUs: "من نحن",
  careers: "وظائف",
  pressKit: "الصحافة",
  contact: "اتصل بنا",
  termsOfService: "شروط الخدمة",
  privacyPolicy: "سياسة الخصوصية",
  cookiePolicy: "سياسة ملفات تعريف الارتباط",
  responsibleGaming: "اللعب المسؤول",
  helpCenter: "مركز المساعدة",
  faq: "الأسئلة الشائعة",
  community: "المجتمع",
  apiDocs: "توثيق API",
  allRightsReserved: "جميع الحقوق محفوظة",
  
  // Leagues
  premierLeague: "الدوري الإنجليزي الممتاز",
  laLiga: "الدوري الإسباني",
  serieA: "الدوري الإيطالي",
  bundesliga: "الدوري الألماني",
  ligue1: "الدوري الفرنسي",
  championsLeague: "دوري أبطال أوروبا",
  europaLeague: "الدوري الأوروبي",
}

// League name translations
export const leagueTranslations: Record<string, string> = {
  "Premier League": "الدوري الإنجليزي الممتاز",
  "La Liga": "الدوري الإسباني",
  "Serie A": "الدوري الإيطالي",
  "Bundesliga": "الدوري الألماني",
  "Ligue 1": "الدوري الفرنسي",
  "UEFA Champions League": "دوري أبطال أوروبا",
  "UEFA Europa League": "الدوري الأوروبي",
  "FA Cup": "كأس الاتحاد الإنجليزي",
  "Copa del Rey": "كأس ملك إسبانيا",
  "DFB Pokal": "كأس ألمانيا",
  "Coppa Italia": "كأس إيطاليا",
  "Coupe de France": "كأس فرنسا",
}

export function getLeagueArabicName(leagueName: string): string {
  return leagueTranslations[leagueName] || leagueName
}
