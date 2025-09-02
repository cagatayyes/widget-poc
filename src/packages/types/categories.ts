import { IGame, ISash, IPagination, IResponse } from 'casino/types';

export interface ICategory {
	id: number;
	name: string;
	slug: string;
	icon: string;
	games: IGame[];
}

export interface IDynamicCategory extends ICategory {
	dynamic_id: number;
}

export interface IGameData {
	id: number;
	name: string;
	status: string;
	image_url: string;
	sash: ISash;
	categories: {
		id: number;
		name: string;
		slug: string;
		icon: string;
	}
}

export interface ISingleCategory {
	id: number;
	name: string;
	slug: string;
	icon: string;
}

export interface ICategoryDetail {
	category: ISingleCategory;
	games: IGame[];
	pagination: IPagination;
}

export interface ICategoryResponse {
  categoryList?: IResponse<ICategory[]> | null;
  isCategoryLoading?: boolean;
  categoryFetchError?: unknown;
  fetchCategoryData: (page?: number) => Promise<IResponse<ICategory[]> | null>;
}
