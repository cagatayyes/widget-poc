import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from 'casino/constants';
import { useToken } from 'casino/hooks/useToken';
import { useGameSession, useLoader, useScriptAttribute } from 'casino/hooks';

export const MainLayout = (): JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	const { hideLoader } = useLoader();
	const { userToken } = useToken();
	const singleGamePageRouteRegex = new RegExp(`^${ROUTES.PAGES.GAME}/([^/]+)/(\\d+)$`);
	const { scriptAttributes, scriptAttributesDispatch } = useScriptAttribute();
	const {  clearGameSession } = useGameSession();


	useEffect(() => {
		const isGameRoute = singleGamePageRouteRegex.test(location.pathname);
		if (isGameRoute && !userToken && window.history.length !== 2) {
			navigate(ROUTES.PAGES.HOME);
			hideLoader();
		}

	}, []);

	const resetToken = (): void => {
		clearGameSession();
		scriptAttributesDispatch({
			type: 'SET_SCRIPT_ATTRIBUTE',
			payload: { ...scriptAttributes, token: '' }
		});
	};

	useEffect(() => {
		//Listener to reset token when player logs out
		window.addEventListener('playerLoggedOut', resetToken);

		return () => {
			window.removeEventListener('playerLoggedOut', resetToken);
		};
	}, []);

	return <Outlet />;
};
