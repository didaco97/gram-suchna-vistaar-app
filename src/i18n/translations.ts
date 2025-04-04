
export type Language = 'en' | 'hi' | 'mr';

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
  },
};

// Common translations across the app
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    agriculture: 'Agriculture',
    healthcare: 'Healthcare',
    education: 'Education',
    localNews: 'Local News',
    profile: 'Profile',
    login: 'Login',
    register: 'Register',
    
    // App name and tagline
    appName: 'Gram Suchna',
    nativeAppName: 'ग्राम सूचना',
    tagline: 'Your one-stop platform for government schemes, programs, and local news updates for rural development.',
    
    // Home page
    welcome: 'Welcome to',
    exploreInfo: 'Explore Information',
    featuredSchemes: 'Featured Schemes',
    recentNews: 'Recent News',
    viewAllSchemes: 'View All Schemes',
    viewAllNews: 'View All News',
    
    // Category descriptions
    agricultureDesc: 'Schemes and subsidies for farmers and agricultural development.',
    healthcareDesc: 'Health insurance, medical facilities and wellness programs.',
    educationDesc: 'Scholarships, educational initiatives and skill development.',
    newsDesc: 'Updates, events and announcements from your area.',
    
    // Scheme Card
    viewDetails: 'View Details',
    deadlineLabel: 'Deadline',
    
    // News
    loadLatestNews: 'Load Latest News',
    newsUpdated: 'News updated successfully!',
    fetchingNews: 'Fetching latest news...',
    
    // Footer
    information: 'Information',
    account: 'Account',
    contact: 'Contact',
    email: 'Email:',
    phone: 'Phone:',
    helpline: 'Helpline:',
    allRightsReserved: 'All rights reserved.',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    accessibility: 'Accessibility',
    
    // Language selector
    selectLanguage: 'Select Language',
    
    // Search and filters
    search: 'Search',
    searchSchemes: 'Search Schemes',
    category: 'Category',
    allCategories: 'All Categories',
    sortBy: 'Sort By',
    relevance: 'Relevance',
    newest: 'Newest',
    deadlineSort: 'Deadline',
    searchResults: 'Search Results',
    noResults: 'No results found',
    
    // Profile
    notifications: 'Notifications',
    noNotifications: 'You have no new notifications',
    
    // Footer content
    footerText: 'Providing rural citizens with easy access to government schemes, programs, and local news.',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    agriculture: 'कृषि',
    healthcare: 'स्वास्थ्य देखभाल',
    education: 'शिक्षा',
    localNews: 'स्थानीय समाचार',
    profile: 'प्रोफाइल',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    
    // App name and tagline
    appName: 'ग्राम सूचना',
    nativeAppName: 'ग्राम सूचना',
    tagline: 'ग्रामीण विकास के लिए सरकारी योजनाओं, कार्यक्रमों और स्थानीय समाचार अपडेट के लिए आपका वन-स्टॉप प्लेटफॉर्म।',
    
    // Home page
    welcome: 'आपका स्वागत है',
    exploreInfo: 'जानकारी का अन्वेषण करें',
    featuredSchemes: 'विशेष योजनाएँ',
    recentNews: 'हालिया समाचार',
    viewAllSchemes: 'सभी योजनाएँ देखें',
    viewAllNews: 'सभी समाचार देखें',
    
    // Category descriptions
    agricultureDesc: 'किसानों और कृषि विकास के लिए योजनाएँ और सब्सिडी।',
    healthcareDesc: 'स्वास्थ्य बीमा, चिकित्सा सुविधाएँ और स्वास्थ्य कार्यक्रम।',
    educationDesc: 'छात्रवृत्ति, शैक्षिक पहल और कौशल विकास।',
    newsDesc: 'आपके क्षेत्र से अपडेट, कार्यक्रम और घोषणाएँ।',
    
    // Scheme Card
    viewDetails: 'विवरण देखें',
    deadlineLabel: 'समय सीमा',
    
    // News
    loadLatestNews: 'नवीनतम समाचार लोड करें',
    newsUpdated: 'समाचार सफलतापूर्वक अपडेट किए गए!',
    fetchingNews: 'नवीनतम समाचार ला रहे हैं...',
    
    // Footer
    information: 'जानकारी',
    account: 'खाता',
    contact: 'संपर्क',
    email: 'ईमेल:',
    phone: 'फोन:',
    helpline: 'हेल्पलाइन:',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    termsOfService: 'सेवा की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    accessibility: 'अभिगम्यता',
    
    // Language selector
    selectLanguage: 'भाषा चुनें',
    
    // Search and filters
    search: 'खोज',
    searchSchemes: 'योजनाएँ खोजें',
    category: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    sortBy: 'क्रमबद्ध करें',
    relevance: 'प्रासंगिकता',
    newest: 'नवीनतम',
    deadlineSort: 'समय सीमा',
    searchResults: 'खोज परिणाम',
    noResults: 'कोई परिणाम नहीं मिला',
    
    // Profile
    notifications: 'सूचनाएँ',
    noNotifications: 'आपके पास कोई नई सूचना नहीं है',
    
    // Footer content
    footerText: 'ग्रामीण नागरिकों को सरकारी योजनाओं, कार्यक्रमों और स्थानीय समाचारों तक आसान पहुंच प्रदान करना।',
  },
  
  mr: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    agriculture: 'शेती',
    healthcare: 'आरोग्य',
    education: 'शिक्षण',
    localNews: 'स्थानिक बातम्या',
    profile: 'प्रोफाईल',
    login: 'लॉगिन',
    register: 'नोंदणी',
    
    // App name and tagline
    appName: 'ग्राम सूचना',
    nativeAppName: 'ग्राम सूचना',
    tagline: 'ग्रामीण विकासासाठी सरकारी योजना, कार्यक्रम आणि स्थानिक बातम्यांसाठी तुमचे एकच स्थान.',
    
    // Home page
    welcome: 'स्वागत आहे',
    exploreInfo: 'माहिती शोधा',
    featuredSchemes: 'विशेष योजना',
    recentNews: 'ताज्या बातम्या',
    viewAllSchemes: 'सर्व योजना पहा',
    viewAllNews: 'सर्व बातम्या पहा',
    
    // Category descriptions
    agricultureDesc: 'शेतकरी आणि शेती विकासासाठी योजना आणि अनुदान.',
    healthcareDesc: 'आरोग्य विमा, वैद्यकीय सुविधा आणि कल्याण कार्यक्रम.',
    educationDesc: 'शिष्यवृत्ती, शैक्षणिक उपक्रम आणि कौशल्य विकास.',
    newsDesc: 'तुमच्या भागातील अपडेट्स, कार्यक्रम आणि घोषणा.',
    
    // Scheme Card
    viewDetails: 'तपशील पहा',
    deadlineLabel: 'अंतिम तारीख',
    
    // News
    loadLatestNews: 'नवीनतम बातम्या लोड करा',
    newsUpdated: 'बातम्या यशस्वीरित्या अपडेट झाल्या!',
    fetchingNews: 'नवीनतम बातम्या आणत आहे...',
    
    // Footer
    information: 'माहिती',
    account: 'खाते',
    contact: 'संपर्क',
    email: 'ईमेल:',
    phone: 'फोन:',
    helpline: 'हेल्पलाईन:',
    allRightsReserved: 'सर्व हक्क राखीव.',
    termsOfService: 'सेवा अटी',
    privacyPolicy: 'गोपनीयता धोरण',
    accessibility: 'प्रवेशयोग्यता',
    
    // Language selector
    selectLanguage: 'भाषा निवडा',
    
    // Search and filters
    search: 'शोध',
    searchSchemes: 'योजना शोधा',
    category: 'श्रेणी',
    allCategories: 'सर्व श्रेणी',
    sortBy: 'क्रमवारी',
    relevance: 'संबंधितता',
    newest: 'नवीनतम',
    deadlineSort: 'अंतिम तारीख',
    searchResults: 'शोध परिणाम',
    noResults: 'कोणतेही परिणाम सापडले नाहीत',
    
    // Profile
    notifications: 'सूचना',
    noNotifications: 'तुमच्याकडे कोणत्याही नवीन सूचना नाहीत',
    
    // Footer content
    footerText: 'ग्रामीण नागरिकांना सरकारी योजना, कार्यक्रम आणि स्थानिक बातम्यांमध्ये सहज प्रवेश देणे.',
  }
};

// Function to translate text
export const translate = (key: keyof typeof translations.en, lang: Language = 'en'): string => {
  const translation = translations[lang][key];
  return translation || translations.en[key] || key;
};

// Language detection
export const getInitialLanguage = (): Language => {
  // Check if there's a language saved in localStorage
  const savedLang = localStorage.getItem('language') as Language;
  if (savedLang && Object.keys(LANGUAGES).includes(savedLang)) {
    return savedLang;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  if (browserLang && Object.keys(LANGUAGES).includes(browserLang)) {
    return browserLang;
  }
  
  // Default to English
  return 'en';
};
