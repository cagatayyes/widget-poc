import { CategoryContext } from 'casino/context';
import { ICategoryResponse } from 'casino/types';
import { useContext } from 'react';

export const useCategory = (): ICategoryResponse => {
	const context = useContext(CategoryContext);
	if (context === undefined) {
		throw new Error('useCategory must be used within a CategoryProvider');
	}

	return context;
};
