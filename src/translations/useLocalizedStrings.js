import { useEffect, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const useLocalizedStrings = () => {
  const [localizedStrings, setLocalizedStrings] = useState({});

  useEffect(() => {
    const loadLocalizedStrings = () => {
      try {
        // Determine the user's preferred language
        const preferredLocale = RNLocalize.getLocales()[0]?.languageCode || 'en';

        // Load the appropriate localization data based on the preferred language
        let selectedLocale;
        switch (preferredLocale) {
          case 'fr':
            selectedLocale = fr;
            break;
          case 'es':
            selectedLocale = es;
            break;
          default:
            selectedLocale = en;
        }

        setLocalizedStrings(selectedLocale);
      } catch (error) {
        console.error('Error loading localized strings:', error);
      }
    };

    loadLocalizedStrings();

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return localizedStrings;
};

export default useLocalizedStrings;