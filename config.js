export const locales = ['en', 'zh', 'es', 'pt', 'de', 'fr', 'it', 'ja', 'ko']

export const defaultLocale = 'en'
export const localePrefix = 'as-needed'
export const siteUrl = "https://www.chronologicalagecalculator.org"

export const generateLanguagesJson = (currentLocale) => {
    const filteredLocales = locales.filter(locale => locale !== currentLocale);

    const languages = filteredLocales.reduce((acc, locale) => {
        acc[locale] = siteUrl + `/${locale}`;
        return acc;
    }, {});

    return { languages };
};