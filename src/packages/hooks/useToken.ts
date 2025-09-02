import { useScriptAttribute } from './useScriptAttribute';

export const useToken = (): { userToken: boolean; token: string } => {
	const { scriptAttributes } = useScriptAttribute();
	const token = scriptAttributes.token || '';
	const tokenExists: boolean = Boolean(token.length > 0);

	return {
		userToken: tokenExists,
		token: tokenExists ? token : '',
	};
};
