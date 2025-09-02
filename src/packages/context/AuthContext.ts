import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IAuthContext {
    authToken: string;
    setAuthToken: (authToken: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
	authToken: '',
	setAuthToken: () => { }
});
