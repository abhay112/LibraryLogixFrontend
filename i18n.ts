"use client"; // Ensure it's a Client Component if needed

import { default as UniversalCookie } from 'universal-cookie';

// Import language JSON files
import en from './public/locales/en.json';
import ae from './public/locales/ae.json';
import da from './public/locales/da.json';
import de from './public/locales/de.json';
import el from './public/locales/el.json';
import es from './public/locales/es.json';
import fr from './public/locales/fr.json';
import hu from './public/locales/hu.json';
import it from './public/locales/it.json';
import ja from './public/locales/ja.json';
import pl from './public/locales/pl.json';
import pt from './public/locales/pt.json';
import ru from './public/locales/ru.json';
import sv from './public/locales/sv.json';
import tr from './public/locales/tr.json';
import zh from './public/locales/zh.json';

// Language mapping object
const langObj: Record<string, any> = { en, ae, da, de, el, es, fr, hu, it, ja, pl, pt, ru, sv, tr, zh };

const getLang = (): string => {
    if (typeof window !== 'undefined') {
        // Client-side: Use `universal-cookie`
        const cookieInstance = new UniversalCookie();
        return cookieInstance.get('i18nextLng') || 'en'; // Default to 'en' if not found
    } else {
        return 'en'; // Default fallback for server-side rendering
    }
};

export const getTranslation = () => {
    const lang = getLang();
    const data = langObj[lang] || langObj['en']; // Fallback to English if missing

    const t = (key: string): string => {
        return data[key] ?? key; // Return translation or fallback to key
    };

    const initLocale = (themeLocale: string): void => {
        const lang = getLang();
        i18n.changeLanguage(lang || themeLocale);
    };

    const i18n = {
        language: lang,
        changeLanguage: (newLang: string) => {
            if (typeof window !== 'undefined') {
                const cookieInstance = new UniversalCookie();
                cookieInstance.set('i18nextLng', newLang, { path: '/' });
            }
        },
    };

    return { t, i18n, initLocale };
};
