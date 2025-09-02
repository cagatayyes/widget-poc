import { Loader } from 'casino/components';
import { createContext, useState } from 'react';

export interface ILoaderContext {
	isLoading: boolean;
	showLoader: (loaderMessage: string) => void;
	hideLoader: () => void;
}

export const LoaderContext = createContext<ILoaderContext | undefined>(undefined);

export const LoaderProvider = ({ children }: {children: React.ReactNode }): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('');

	const showLoader = (loaderMessage: string): void => {
		setIsLoading(true);
		setLoadingText(loaderMessage);
	};
	const hideLoader = (): void => setIsLoading(false);

	return (
		<LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
			<>
				{isLoading && <Loader loaderText={loadingText} />}
				{children}
			</>
		</LoaderContext.Provider>
	);
};
