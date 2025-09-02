import { useGameSession } from './useGameSession';
import { useGenerateRedirectURL } from './useGenerateRedirectURL';

interface IUseDispatchCustomEvent {
	dispatchCustomEvent: (action: string, data?: unknown) => void;
}

export const useDispatchCustomEvent = (): IUseDispatchCustomEvent => {
	const { redirectURL } = useGenerateRedirectURL();
	const { clearGameSession } = useGameSession();

	const dispatchCustomEvent = (action: string, data: unknown = {}): void => {
		clearGameSession();
		window.dispatchEvent(
			new CustomEvent('casinoActionEvent', {
				detail: {
					action: action,
					redirectURL: redirectURL,
					data: data,
				},
				bubbles: true,
			})
		);
	};

	return { dispatchCustomEvent };

};
