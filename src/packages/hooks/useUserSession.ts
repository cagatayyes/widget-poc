/**
 * This Custom hook is responsible for checking user login and logout state
 */
import { useEffect } from 'react';
import { useAuthToken } from 'casino/hooks/useAuthToken';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IUseUserSession {
    authToken: string;
    login: (userToken: string) => void;
    logout: () => void;
}

export const useUserSession = (): IUseUserSession  => {
	const { authToken, addAuthToken, removeAuthToken } = useAuthToken();

	useEffect(() => {
		if (authToken) {
			addAuthToken(authToken);
		}
	}, []);

	const login = (userToken: string): void => {
		addAuthToken(userToken);
	};

	const logout = (): void => {
		removeAuthToken();
	};

	return { authToken, login, logout };
};
