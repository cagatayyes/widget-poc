import { LoaderContext, ILoaderContext } from 'casino/context';
import { useContext } from 'react';

export const useLoader = (): ILoaderContext => {
	const context = useContext(LoaderContext);

	if (context === undefined) {
		throw new Error('useLoader must be used within a LoaderProvider');
	}

	return context;
};
