import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const initialLanguageCode = 'en';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ILanguage {
	languageId: number;
	label: string;
	code: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IParameterResponse {
	status: number;
	data?: {
		success: boolean;
		value: unknown[];
	};
}

//TODO: Replace with our API call after BE side is ready
const getLanguageList = (): ILanguage[] => {
	const languages: ILanguage[] = [
		{
			languageId: 1,
			label: 'English',
			code: 'en',
		},
		{
			languageId: 2,
			label: 'Turkish',
			code: 'tr'
		}
	];

	return languages;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTranslations = async (locale: string): Promise<{data:any}> => {
	return getTranslationsByLocale(locale); //TODO: Replace with our API call after BE side is ready
};

//TODO: Remove this function after BE side is ready
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTranslationsByLocale = async (locale: string): Promise<{ data: any }> => {
	const response = await fetch(`${process.env.REACT_APP_TRANSLATIONS_CDN_URL}/locales/${locale}/translation.json`);
	const data = await response.json();

	return { data };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBackendOptions():any {
	const backendOptions = {
		loadPath: '{{lng}}|{{ns}}',
		getLanguageList: getLanguageList(),
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		request: (
			options: unknown,
			url: string,
			payload: unknown,
			// eslint-disable-next-line no-unused-vars
			callback: (arg0: null, arg1: IParameterResponse) => void,
		) => {
			try {
				const [lng] = url.split('|');
				getTranslations(lng).then((response) => {
					callback(null, {
						data: response.data,
						status: 200,
					});
				});
			} catch (e) {
				callback(null, {
					status: 500
				});
			}
		}
	};

	return backendOptions;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getInitialValues(): any {
	const defaultValues: InitOptions = {
		debug: process.env.REACT_APP_ENV === 'development',
		// detection: {
		//   order: ['queryString', 'cookie'],
		//   caches: ['cookie'],
		// },
		interpolation: {
			escapeValue: false,
		},
		supportedLngs: ['en', 'tr'],
		fallbackLng: initialLanguageCode,
		fallbackNS: false,
		preload: [initialLanguageCode],
		load: 'languageOnly',
		react: {
			useSuspense: true
		}
	};

	if (process.env.REACT_APP_USE_BACKEND_TRANSLATIONS != 'false') {
		return { ...defaultValues, backend: getBackendOptions() };
	}

	return defaultValues;
}

i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init(getInitialValues());

const i18nCasinoInstance = i18n;
export default i18nCasinoInstance;

function getCurrentLanguage(): string {
	return i18n.language;
}

export { getCurrentLanguage };
