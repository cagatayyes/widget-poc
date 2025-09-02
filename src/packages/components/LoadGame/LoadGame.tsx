/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX, useEffect, useState } from 'react';
import HamburgerHeader from 'casino/components/layouts/HamburgerHeader/HamburgerHeader';
import HamburgerModal from 'casino/components/HamburgerModal/HamburgerModal';
import { IEvolutionGaming } from 'casino/types';
import { IFrame } from 'casino/components/IFrame/IFrame';
import { useGenerateRedirectURL } from 'casino/hooks';

interface IGameOverviewProps {
	maxWidth: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    EvolutionGaming?: IEvolutionGaming;
  }
}

export const LoadGame = ({ maxWidth }: IGameOverviewProps): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isExitModal, setIsExitModal] = useState<boolean>(false);
	const { redirectURL } = useGenerateRedirectURL();

	const handleModalVisibility = (): void => {
		setIsVisible(!isVisible);
		const iframeElement : HTMLElement | null= document?.getElementById('iframe');
		if (!isVisible && iframeElement) {
			iframeElement.style.position= 'relative';
			iframeElement.style.visibility = 'hidden';
		} else if (iframeElement) {
			iframeElement.style.position = 'absolute';
			iframeElement.style.visibility = 'visible';
		}
	};

	const handleUnloadEvent = (event: PopStateEvent): void => {
		event.preventDefault();
		setIsExitModal(true);
	};

	useEffect(() => {
		window.addEventListener('popstate', handleUnloadEvent, { capture: true });

		return () => window.removeEventListener('popstate', handleUnloadEvent, { capture: true });
	}, []);

	useEffect(() => {
		if (!isExitModal) {
			window.history.pushState(null, '', redirectURL);
		}
	}, [isExitModal]);

	const renderHamburger = (): JSX.Element => (
		<HamburgerModal
			toggleHamburgerModal={handleModalVisibility}
			maxWidth={maxWidth}
		/>
	);

	const renderHamburgerHeader = (): JSX.Element => (
		<HamburgerHeader
			isVisible={isVisible}
			toggleHamburgerModal={handleModalVisibility}
			maxWidth={maxWidth}
			showExitModal={isExitModal}
			hideExitModal={setIsExitModal}
		/>
	);

	return (
		<>
			<div className='absolute top-0 flex justify-center w-full z-[1000] h-screen overflow:hidden'
				style={{ maxWidth }}>
				<div
					className='bg-[var(--main-bg-color)] px-0 py-0 w-full justify-center'
					style={{ maxWidth }}
				>
					{renderHamburgerHeader()}
					<div className='flex flex-row'>
						<IFrame isVisible={isVisible} />
					</div>
					{isVisible && renderHamburger()}
				</div>
			</div>
		</>
	);
};
