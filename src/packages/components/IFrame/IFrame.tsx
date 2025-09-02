import { EventActions, IFRAME_INTEGRATION_ENDPOINT, IFrameActions } from 'casino/constants';
import { useAPI, useGameSession, useLoader, useScriptAttribute } from 'casino/hooks';
import { IFrameIntegration, IFrameMessageEvent } from 'casino/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { MenuTypes } from 'casino/components/HamburgerModal/HamburgerModal';
import { useDispatchCustomEvent } from 'casino/hooks/useDispatchEvents';
import { removeIFrameJS } from 'casino/utils/loadIframeJS';

interface IFrameProps {
	isVisible: boolean;
}
export const IFrame = ({ isVisible }: IFrameProps): JSX.Element => {
	const { scriptAttributes } = useScriptAttribute();
	const { gameid: paramGameId } = useParams();
	const gameId = paramGameId ? parseInt(paramGameId) : 0;
	const [gameLoaded, setGameLoaded] = useState<boolean>(false);
	const [serviceMessage, setServiceMessage] = useState<string>('');
	const { t } = useTranslation();
	const { showLoader, hideLoader } = useLoader();
	const { dispatchCustomEvent } = useDispatchCustomEvent();
	const { clearGameSession } = useGameSession();
	const maxWidth: string = scriptAttributes.maxwidth;
	const { fetchData } = useAPI<IFrameIntegration>(
		{ endpoint: `${IFRAME_INTEGRATION_ENDPOINT}?gameId=${gameId}`, autoFetch: false });

	const resetGame = (): void => {
		clearGameSession();
		setGameLoaded(false);
		hideLoader();
	};

	const evoEventsInformation = (message: IFrameMessageEvent): void => {
		if (process.env.NODE_ENV === 'development' && message?.data?.event) {
			// eslint-disable-next-line no-console
			console.log('EVO event type: ', message.data.event);
		}
	};

	const iframeMessageEventListener = (message: IFrameMessageEvent): void => {
		if (message?.data?.event) {
			if (message.data.event === IFrameActions.applicationLoadStarted) {
				message?.source?.postMessage({
					command: 'EVO:EVENT_SUBSCRIBE',
					event: 'EVO:GAME_LIFECYCLE',
					interruptAllowed: true,
				});
				hideLoader();
			}
			else if (message.data.event === IFrameActions.showDeposit) {
				clearGameSession();
				dispatchCustomEvent(MenuTypes.Deposit);
			} else if (message.data.event === IFrameActions.sessionInvalid) {
				resetGame();
				dispatchCustomEvent(EventActions.logout);
			}
			else if (isVisible) {
				message?.source?.postMessage({
					command: 'EVO:REALITY_CHECK_STOP_BUTTON_PRESSED',
				});
			}
			else if (!isVisible) {
				message?.source?.postMessage({
					command: 'EVO:REALITY_CHECK_CONTINUE_BUTTON_PRESSED',
				});
			}
		}
		evoEventsInformation(message);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printErrorMessage = (response: any): void => {
		const errorMessage = response?.data?.message;
		if (errorMessage && typeof errorMessage === 'string' && errorMessage.length > 0) {
			setServiceMessage(errorMessage);
			resetGame();
		}
	};

	const getEntryUrl = async(): Promise<void> => {
		try {
			fetchData().then((response) => {
				if (response?.success && response?.data) {
					const entry = response?.data?.entry || '';
					const entryEmbedded = response?.data?.entryEmbedded || '';
					if (entry && entryEmbedded && !gameLoaded) {
						setGameLoaded(true);
						const url = entry || entryEmbedded;
						window?.EvolutionGaming?.init({
							url: url,
							topBar: 40
						});
					} else {
						printErrorMessage(response);
					}
					hideLoader();
				} else {
					printErrorMessage(response);
				}
			});

		} catch (error) {
			setServiceMessage('OOps Something went wrong');
			resetGame();
		}

	};

	useEffect(() => {
		showLoader(t('gameLoading'));
		getEntryUrl();
		window.addEventListener('message', iframeMessageEventListener as unknown as (this: Window, ev: MessageEvent) => unknown);

		return () => {
			resetGame();
			removeIFrameJS();
			window.EvolutionGaming?.removeEventListeners();
			window.removeEventListener('message', iframeMessageEventListener as unknown as (this: Window, ev: MessageEvent) => unknown);
		};
	}, []);

	useEffect(() => {
		if (gameLoaded) {
			document.getElementById('iframe')?.setAttribute('style', `max-width:${maxWidth}; padding-bottom: 0'`);
		}
	}, [gameLoaded]);

	return (
		<>
			{serviceMessage?.length > 0 ? <div className='flex flex-row justify-center items-center h-screen text-[#FFFFFF]'>{serviceMessage}</div> : null}
		</>
	);
};
