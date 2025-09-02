import { CATEGORIES_ENDPOINT } from 'casino/constants';
import { useAPI } from 'casino/hooks';
import { ICategory, ICategoryResponse } from 'casino/types';
import React, { createContext } from 'react';

export const CategoryContext = createContext<ICategoryResponse | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { fetchData: fetchCategoryData, data: categoryList, isLoading: isCategoryLoading, error: categoryFetchError } =
		useAPI<ICategory[]>({ endpoint: CATEGORIES_ENDPOINT });

	return (
		<CategoryContext.Provider value={{ categoryList, isCategoryLoading, categoryFetchError, fetchCategoryData }}>
			{children}
		</CategoryContext.Provider>
	);
};

