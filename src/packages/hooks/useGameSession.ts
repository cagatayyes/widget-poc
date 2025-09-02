
interface IUseGameSession {
    clearGameSession: () => void;
}
export const useGameSession = (): IUseGameSession => {

	const clearGameSession = (): void  => {
		window?.EvolutionGaming?.removeEventListeners();
		if (window?.EvolutionGaming?.url && window?.EvolutionGaming?.url.length > 0) {
			const iframe = document.getElementById('iframe') as HTMLIFrameElement;
			if (iframe) {
				iframe.remove();
			}
		}
	};

	return { clearGameSession };
};
