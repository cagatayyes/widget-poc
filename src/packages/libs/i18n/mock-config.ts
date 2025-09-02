import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	ns: ['translationsNS'],
	defaultNS: 'translationsNS',

	debug: true,

	interpolation: {
		escapeValue: false
	},

	resources: {
		en: { translationsNS: { welcomeMessage: 'Welcome to the CASINO!' } }
	}
});

const i18nCasinoMockInstance = i18n;
export default i18nCasinoMockInstance;
