"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "km";

type Translations = {
  [key: string]: {
    en: string;
    km: string;
  };
};

const translations: Translations = {
  // Navbar
  logo: {
    en: "Logo",
    km: "និមិត្តសញ្ញា",
  },
  dashboard: {
    en: "Dashboard",
    km: "ផ្ទាំងគ្រប់គ្រង",
  },
  signIn: {
    en: "Sign In",
    km: "ចូល",
  },
  signUp: {
    en: "Sign Up",
    km: "ចុះឈ្មោះ",
  },
  signOut: {
    en: "Sign out",
    km: "ចាកចេញ",
  },

  // Dashboard
  userProfile: {
    en: "User Profile",
    km: "ប្រវត្តិរូបអ្នកប្រើប្រាស់",
  },
  protectedPage: {
    en: "This is a protected page only visible to authenticated users",
    km: "នេះគឺជាទំព័រការពារដែលអាចមើលឃើញតែចំពោះអ្នកប្រើប្រាស់ដែលបានផ្ទៀងផ្ទាត់ប៉ុណ្ណោះ",
  },

  // Reset Password
  resetPassword: {
    en: "Reset password",
    km: "កំណត់ពាក្យសម្ងាត់ឡើងវិញ",
  },
  enterNewPassword: {
    en: "Please enter your new password below.",
    km: "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកខាងក្រោម។",
  },
  newPassword: {
    en: "New password",
    km: "ពាក្យសម្ងាត់ថ្មី",
  },
  confirmPassword: {
    en: "Confirm password",
    km: "បញ្ជាក់ពាក្យសម្ងាត់",
  },
  resettingPassword: {
    en: "Resetting password...",
    km: "កំពុងកំណត់ពាក្យសម្ងាត់ឡើងវិញ...",
  },
  home: {
    en: "Home",
    km: "ទំព័រដើម",
  },

  // Hero
  streamMovies: {
    en: "Stream Movies Anytime, Anywhere",
    km: "មើលខ្សែភាពយន្តគ្រប់ពេលគ្រប់ទីកន្លែង",
  },
  movies: {
    en: "Movies",
    km: "ខ្សែភាពយន្ត",
  },
  heroDescription: {
    en: "Discover thousands of free movies across all genres. No subscription needed, just press play and enjoy high-quality streaming instantly.",
    km: "រកមើលខ្សែភាពយន្តឥតគិតថ្លៃរាប់ពាន់នៅគ្រប់ប្រភេទ។ មិនត្រូវការការជាវប្រចាំខែទេ គ្រាន់តែចុចលេងហើយរីករាយជាមួយការស្ត្រីមគុណភាពខ្ពស់ភ្លាមៗ។",
  },
  browseMovies: {
    en: "Browse Movies",
    km: "រកមើលខ្សែភាពយន្ត",
  },
  featuredToday: {
    en: "Featured Today",
    km: "ពិសេសថ្ងៃនេះ",
  },
  freeContent: {
    en: "100% Free Content",
    km: "មាតិកាឥតគិតថ្លៃ១០០%",
  },
  noRegistration: {
    en: "No Registration Required",
    km: "មិនត្រូវការចុះឈ្មោះ",
  },
  hdQuality: {
    en: "HD Quality Available",
    km: "មានគុណភាព HD",
  },

  // Featured Movies
  featuredMovies: {
    en: "Featured Movies",
    km: "ខ្សែភាពយន្តពិសេស",
  },
  viewAll: {
    en: "View All",
    km: "មើលទាំងអស់",
  },
  watchNow: {
    en: "Watch Now",
    km: "មើលឥឡូវនេះ",
  },

  // Categories
  browseByCategory: {
    en: "Browse by Category",
    km: "រកមើលតាមប្រភេទ",
  },
  action: {
    en: "Action",
    km: "សកម្មភាព",
  },
  drama: {
    en: "Drama",
    km: "ដ្រាម៉ា",
  },
  comedy: {
    en: "Comedy",
    km: "កំប្លែង",
  },
  thriller: {
    en: "Thriller",
    km: "រំភើប",
  },
  movies: {
    en: "Movies",
    km: "ខ្សែភាពយន្ត",
  },

  // Stats
  freeMovies: {
    en: "Free Movies",
    km: "ខ្សែភាពយន្តឥតគិតថ្លៃ",
  },
  categories: {
    en: "Categories",
    km: "ប្រភេទ",
  },
  qualityStreaming: {
    en: "Quality Streaming",
    km: "ការស្ត្រីមគុណភាពខ្ពស់",
  },

  // CTA
  startWatchingNow: {
    en: "Start Watching Now",
    km: "ចាប់ផ្តើមមើលឥឡូវនេះ",
  },
  unlimitedMovies: {
    en: "Unlimited movies, completely free. No subscription, no credit card, just press play.",
    km: "ខ្សែភាពយន្តគ្មានដែនកំណត់ ឥតគិតថ្លៃទាំងស្រុង។ គ្មានការជាវប្រចាំខែ គ្មានកាតឥណទាន គ្រាន់តែចុចលេង។",
  },
  browseLibrary: {
    en: "Browse Library",
    km: "រកមើលបណ្ណាល័យ",
  },

  // Footer
  helpCenter: {
    en: "Help Center",
    km: "មជ្ឈមណ្ឌលជំនួយ",
  },
  faq: {
    en: "FAQ",
    km: "សំណួរញឹកញាប់",
  },
  contactUs: {
    en: "Contact Us",
    km: "ទំនាក់ទំនងមកយើង",
  },
  reportIssue: {
    en: "Report an Issue",
    km: "រាយការណ៍បញ្ហា",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    km: "គោលការណ៍ឯកជនភាព",
  },
  termsOfService: {
    en: "Terms of Service",
    km: "លក្ខខណ្ឌនៃសេវាកម្ម",
  },
  dmca: {
    en: "DMCA",
    km: "DMCA",
  },
  contentGuidelines: {
    en: "Content Guidelines",
    km: "គោលការណ៍ណែនាំមាតិកា",
  },
  allRightsReserved: {
    en: "All rights reserved.",
    km: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
  },
  newReleases: {
    en: "New Releases",
    km: "ការចេញផ្សាយថ្មី",
  },
  mostWatched: {
    en: "Most Watched",
    km: "មើលច្រើនបំផុត",
  },
  topRated: {
    en: "Top Rated",
    km: "វាយតម្លៃខ្ពស់បំផុត",
  },
  featured: {
    en: "Featured",
    km: "ពិសេស",
  },
  support: {
    en: "Support",
    km: "ជំនួយ",
  },
  legal: {
    en: "Legal",
    km: "ផ្លូវច្បាប់",
  },

  // Theme Switcher
  light: {
    en: "Light",
    km: "ភ្លឺ",
  },
  dark: {
    en: "Dark",
    km: "ងងឹត",
  },
  system: {
    en: "System",
    km: "ប្រព័ន្ធ",
  },

  // Language Switcher
  english: {
    en: "English",
    km: "អង់គ្លេស",
  },
  khmer: {
    en: "ភាសាខ្មែរ",
    km: "ភាសាខ្មែរ",
  },

  // Navbar Storyboard
  navbarWithLanguage: {
    en: "Navbar with Language & Theme Switchers",
    km: "របារនាំផ្លូវជាមួយកម្មវិធីប្តូរភាសា និងរូបរាង",
  },
  storyboardDemonstrates: {
    en: "This storyboard demonstrates the navbar with:",
    km: "ស្តូរីបតនេះបង្ហាញពីរបារនាំផ្លូវជាមួយ៖",
  },
  khmerLanguageSwitcher: {
    en: "Khmer language switcher",
    km: "កម្មវិធីប្តូរភាសាខ្មែរ",
  },
  darkModeToggle: {
    en: "Dark mode toggle",
    km: "ប៊ូតុងប្តូររូបរាងងងឹត",
  },
  responsiveDesign: {
    en: "Responsive design with mobile menu",
    km: "ការរចនាឆ្លើយតបជាមួយម៉ឺនុយទូរស័ព្ទ",
  },
  tryResizing: {
    en: "Try resizing the window to see the mobile menu in action.",
    km: "សាកល្បងប្តូរទំហំបង្អួចដើម្បីមើលម៉ឺនុយទូរស័ព្ទដំណើរការ។",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Get language from localStorage if available
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "km")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
