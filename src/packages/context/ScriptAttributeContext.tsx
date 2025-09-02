import { CASINO_CLIENT_LOGO, CASINO_NOT_FOUND, CASINO_WIDGET_SCRIPT_ID } from 'casino/constants';
import { ICasinoScriptAttribute, IScriptAttribute, SCRIPT_ATTRIBUTE_KEYS } from 'casino/types';
import React, { Dispatch, createContext, useEffect, useReducer } from 'react';

export const scriptAttributeInitialState: IScriptAttribute = {
	token: '',
	currency: 'NGN',
	maxwidth: '640px',
	timezone: 'Africa/Lagos',
	clientlogo: CASINO_CLIENT_LOGO,
	pagenotfoundlogo: CASINO_NOT_FOUND,
	isTokenChanged: false,
	baseURL: '/casino'
};

type Action = | { type: 'SET_SCRIPT_ATTRIBUTE', payload: IScriptAttribute }
	| { type: 'SET_TOKEN_CHANGED', payload: boolean };

const scriptAttributeReducer = (state: IScriptAttribute, action: Action): IScriptAttribute => {
	switch (action.type) {
	case 'SET_SCRIPT_ATTRIBUTE': {
		const isTokenChanged = action.payload.token !== state.token;

		return { ...state, ...action.payload, isTokenChanged };
	}
	case 'SET_TOKEN_CHANGED': {
		return { ...state, isTokenChanged: action.payload };
	}
	default:
		return state;
	}
};

export interface IScriptAttributeContext {
    scriptAttributes: IScriptAttribute,
	scriptAttributesDispatch: Dispatch<Action>;
}

const getScriptAttributes = (): IScriptAttribute => {
	const casinoScriptAttributes: NamedNodeMap | undefined = document.getElementById(CASINO_WIDGET_SCRIPT_ID)?.attributes;

	return Array.from(casinoScriptAttributes || []).reduce((attribute: ICasinoScriptAttribute, { name, value }) => {
		if (SCRIPT_ATTRIBUTE_KEYS.includes(name)) {
			attribute[name] = value;
		}

		return attribute;
	}, { ...scriptAttributeInitialState });
};

const observeScriptAttributes = (scriptAttributesDispatch: Dispatch<Action>): (() => void) => {
	const casinoWidgetScript = document.getElementById(CASINO_WIDGET_SCRIPT_ID);
	if (!casinoWidgetScript) return () => {};

	const config = { attributes: true };
	const mutationObserverCallback = (mutationsList: MutationRecord[]): void => {
		for (const mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName) {
				const name: string = mutation.attributeName;
				const newValue: string | null = casinoWidgetScript.getAttribute(name);

				if (SCRIPT_ATTRIBUTE_KEYS.includes(name)) {
					scriptAttributesDispatch({
						type: 'SET_SCRIPT_ATTRIBUTE',
						payload: { [name]: newValue } as ICasinoScriptAttribute,
					});
				}
			}
		}
	};

	const observer = new MutationObserver(mutationObserverCallback);
	observer.observe(casinoWidgetScript, config);

	return (): void => observer.disconnect();
};

export const ScriptAttributeContext = createContext<IScriptAttributeContext | undefined>(undefined);

export const ScriptAttributeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const initialState = getScriptAttributes();
	const [scriptAttributes, scriptAttributesDispatch] = useReducer(scriptAttributeReducer, initialState);

	useEffect(() => {
		const casinoWidgetObserver =  observeScriptAttributes(scriptAttributesDispatch);

		return () => {
			casinoWidgetObserver();
		};
	}, []);

	return (
		<ScriptAttributeContext.Provider value={{ scriptAttributes, scriptAttributesDispatch }}>
			{children}
		</ScriptAttributeContext.Provider>
	);
};
