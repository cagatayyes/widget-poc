export interface IScriptAttribute {
    token?: string;
    timezone: string;
    currency: string;
    maxwidth: string;
    clientlogo: string;
    pagenotfoundlogo: string;
    isTokenChanged?: boolean;
    baseURL: string;
}

export interface ICasinoScriptAttribute extends IScriptAttribute {
	[key: string]: string | undefined | null | boolean;
}

export const SCRIPT_ATTRIBUTE_KEYS = [
	'token',
	'timezone',
	'currency',
	'maxwidth',
	'clientlogo',
	'pagenotfoundlogo',
	'baseURL',
];


