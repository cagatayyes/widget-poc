import { LoadGame } from 'casino/components/LoadGame/LoadGame';
import { CASINO_SESSION_STORAGE_KEY, ROUTES } from 'casino/constants';
import { useGameSession, useLoader, useScriptAttribute, useToken } from 'casino/hooks';
import { addMetaAndStyles, loadIFrameJS } from 'casino/utils/loadIframeJS';
import { JSX, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const GameLobby = (): JSX.Element | null => {
	const { t } = useTranslation();
	const { scriptAttributes } = useScriptAttribute();
	const maxWidth: string = scriptAttributes.maxwidth;
	const [isHide, setIsHide] = useState(false);
	const { showLoader, hideLoader } = useLoader();
	const { userToken } = useToken();
	const navigate = useNavigate();
	const { clearGameSession } =  useGameSession();

	useEffect(() => {
		if (window.history.length === 2) {
			showLoader(t('gameLoading'));

			setTimeout(() => {
				const sessionToken = globalThis?.sessionStorage?.getItem(CASINO_SESSION_STORAGE_KEY);
				if (sessionToken || userToken) {
					setIsHide(true);
				} else {
					navigate(ROUTES.PAGES.HOME);
					setIsHide(false);
					hideLoader();
				}
			}, 5000);
		} else {
			setIsHide(true);
		}
	},[]);

	useEffect(() => {
		const cleanupIFrameJS = loadIFrameJS();
		const cleanupMetaAndStyles = addMetaAndStyles();

		return () => {
			cleanupIFrameJS();
			cleanupMetaAndStyles();
			clearGameSession();
		};
	}, []);

	return (
		<Suspense fallback={<div>{t('loading')}</div>}>
			<div className='bg-[var(--main-bg-color)] overflow-hidden'
				data-testid='LoadGame'
			>
				<div className='flex justify-center'>
					{isHide  && <LoadGame maxWidth={maxWidth} /> }
				</div>
			</div>
		</Suspense>
	);
};
