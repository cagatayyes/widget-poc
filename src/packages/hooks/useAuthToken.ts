/**
 * This custom hook is used for storing the user in the context
 */

import { useContext } from 'react';
import { AuthContext } from 'casino/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IAuthToken {
    authToken: string;
    addAuthToken: (authToken: string) => void;
    removeAuthToken: () => void;
}

export const useAuthToken = (): IAuthToken => {
	const { authToken, setAuthToken } = useContext(AuthContext);

	const addAuthToken = (authToken: string): void => {
		setAuthToken(authToken);
	};

	const removeAuthToken = (): void => {
		setAuthToken('');
	};

	return { authToken, addAuthToken, removeAuthToken };
};
