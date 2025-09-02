import { JSX, useEffect, useState } from 'react';
import OverviewMenu from 'casino/components/OverviewMenu/OverviewMenu';
import { MoreInformation } from 'casino/components/MoreInformation/MoreInformation';
import  GameInformation  from 'casino/components/GameInformation/GameInformation';
import HamburgerFooter from 'casino/components/layouts/HamburgerFooter/HamburgerFooter';
import { useDispatchCustomEvent } from 'casino/hooks/useDispatchEvents';
import { useGameSession } from 'casino/hooks';
import { removeIFrameJS } from 'casino/utils/loadIframeJS';

export enum MenuTypes  {
	Resume = 'RESUME',
	Overview = 'OVERVIEW',
	GameInfo = 'GAMEINFO',
	More = 'MORE',
	Deposit = 'DEPOSIT',
	Withdraw = 'WITHDRAW',
	Account = 'ACCOUNT',
	CustomerSupport = 'CUSTOMER_SUPPORT',
	SafeGambling = 'SAFE_GAMBLING'
}
export interface IHamburgerModalProps {
	toggleHamburgerModal: (isVisible: boolean) => void;
	maxWidth: string;
	gameId?: number;
}

const HamburgerModal = ({ toggleHamburgerModal, maxWidth }: IHamburgerModalProps): JSX.Element => {
	const [activeTab, setActiveTab] = useState<string>(MenuTypes.Overview);
	const { dispatchCustomEvent } = useDispatchCustomEvent();
	const { clearGameSession } = useGameSession();

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = '';
		};
	},[]);

	const handleTabClick = (pathName: string): void => {
		switch (pathName) {
		case MenuTypes.Deposit:
		case MenuTypes.Account:
		case MenuTypes.Withdraw:
		case MenuTypes.SafeGambling:
		case MenuTypes.CustomerSupport: {
			clearGameSession();
			removeIFrameJS();
			document.body.style.overflow = '';
			dispatchCustomEvent(pathName);
		}
			break;
		case MenuTypes.Resume:
			toggleHamburgerModal(false);
			break;
		default:
			setActiveTab(pathName);
		}
	};

	return (
		<>
			<div
				className='absolute w-full z-[1600] bg-[#070C26] text-[#ffffff] pt-[44px] pb-[70px] self-center overflow-hidden'
				style={{ maxWidth }}
			>
				{activeTab === MenuTypes.Overview  && <OverviewMenu
					handleTabClick={handleTabClick}
					activeTab={activeTab} />}
				{activeTab === MenuTypes.More && <MoreInformation
					handleTabClick={handleTabClick}
					activeTab={activeTab} />}
				{activeTab === MenuTypes.GameInfo && <GameInformation maxWidth={maxWidth} />}
			</div>
			<HamburgerFooter
				handleTabClick={handleTabClick}
				activeTab={activeTab}
			/>
		</>

	);
};

export default HamburgerModal;
