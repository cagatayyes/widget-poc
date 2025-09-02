/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'casino/components';
import 'casino/assets/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { RouteList } from './routes/routes';
import { LoaderProvider, ScriptAttributeProvider } from 'casino/context';
import i18nCasinoInstance from 'casino/libs/i18n/config';
import { CASINO_WIDGET_SCRIPT_ID } from 'casino/constants';

let observer: any;

const checkAndLoadRoot = () => {
	const interval = setInterval(() => {
		rootElement = document.getElementById('b2b-casino');

		if (rootElement) {
			try {
				observer?.disconnect();
			} catch (e) {
				console.error('error disconnecting observer');
			}

			loadRoot();
			clearInterval(interval);
		}
	}, 1000);
};

var rootElement = document.getElementById('b2b-casino');

if (!rootElement) {
	checkAndLoadRoot();
}

const mutateObserveElement = () => {
	const target = document.getElementById('b2b-casino') as Node;

	observer = new MutationObserver(function (mutations) {
		// check for removed target
		mutations.forEach(function (mutation) {
			const nodes = Array.from(mutation.removedNodes);
			const directMatch = nodes.indexOf(target) > -1;
			const parentMatch = nodes.some((parent) => parent.contains(target));
			if (directMatch) {
				checkAndLoadRoot();
			} else if (parentMatch) {
				checkAndLoadRoot();
			}
		});
	});

	const config = {
		subtree: true,
		childList: true,
		attributes: true,
		CharacterData: true
	};
	observer.observe(document.body, config);
};

const loadRoot = () => {
	const rootElement = document.getElementById('b2b-casino');
	const root = createRoot(rootElement as HTMLElement);

	if (rootElement) {
		rootElement.setAttribute('translate', 'no');

		const casinoWidgetScript = document.getElementById(CASINO_WIDGET_SCRIPT_ID);
		const baseURL = casinoWidgetScript?.getAttribute('baseURL') || '';

		const content = (
			<ErrorBoundary>
				<LoaderProvider>
					<ScriptAttributeProvider>
						<Suspense fallback={<div>loading...</div>}>
							<BrowserRouter basename={baseURL}>
								<RouteList />
							</BrowserRouter>
						</Suspense>
					</ScriptAttributeProvider>
				</LoaderProvider>
			</ErrorBoundary>
		);

		if (rootElement.hasChildNodes()) {
			// eslint-disable-next-line react/no-deprecated
			ReactDOM.hydrate(content, rootElement);
		} else {
			// eslint-disable-next-line react/no-deprecated
			root.render(content);
		}
	}

	mutateObserveElement();
};

const initializeApp = () => {
	const handleInitialization = () => {
		i18nCasinoInstance.off('initialized', handleInitialization);
		loadRoot();
	};

	const handleFailedLoading = (lng: string, ns: string, msg: string) => {
		console.error(`Failed to load ${ns} namespace for ${lng} language. Error: ${msg}`);
		i18nCasinoInstance.off('failedLoading', handleFailedLoading);
		loadRoot();
	};

	i18nCasinoInstance.on('initialized', handleInitialization);
	i18nCasinoInstance.on('failedLoading', handleFailedLoading);
};


initializeApp();
