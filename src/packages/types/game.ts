import { ISash } from 'casino/types';

export interface IGame {
	id: number;
	name: string;
	status: boolean;
	image_url: string;
	sash: ISash;
}
