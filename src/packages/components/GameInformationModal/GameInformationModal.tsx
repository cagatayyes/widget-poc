
import { ModalPlacement } from 'casino/components/Modal/Modal.type';
import { Modal } from 'casino/components/Modal/Modal';
import { ButtonVariant, IButtonProps } from 'casino/components/Button/Button.types';
import GameInformation from 'casino/components/GameInformation/GameInformation';
import { getGameNameFromLink } from 'casino/utils';

interface IGameInformationModal {
    gameId: number;
	selectedGameLink: string;
    isShowModal:boolean;
    showgameinfomodal: (gameId:number, gameLink: string)=>void;
	maxWidth:string;
	handlePlayNow: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

export const GameInformationModal = (
	{
		gameId,
		selectedGameLink,
		isShowModal,
		showgameinfomodal,
		maxWidth,
		handlePlayNow
	}: IGameInformationModal): JSX.Element => {

	const playGameNow = (): void => {
		const gameName = getGameNameFromLink(selectedGameLink);

		showgameinfomodal(gameId, selectedGameLink);
		handlePlayNow(selectedGameLink, gameName, 'Information Modal');
	};

	const GameInfoModalActions: IButtonProps[] = [
		{
			label: 'PLAY NOW',
			className: 'flex w-full mx-1 mt-[14px] !w-[180px] !h-[38px] items-center',
			onClick: playGameNow,
			color: ButtonVariant.Yellow,
			variant: ButtonVariant.Yellow,
			noStyle: false,
			labelStyle:'text-[16px] font-bold tracking-widest leading-[14px] text-[14px] tracking-[16%] h-[14px]'
		}
	];

	return(
		<Modal
			show={isShowModal && gameId > -1}
			placement={ModalPlacement.CENTER}
			actions={GameInfoModalActions}
			overideContainerStyles='bg-[var(--main-bg-color)] px-0 py-0 h-[429px] w-full max-w-screen-sm mx-[24px]'
			hasCloseButton={true}
			onClose={(): void => showgameinfomodal(gameId, selectedGameLink)}
		>
			{/* TODO: The complete information is not provided by provider */}
			<div className='h-[350px]'>
				<GameInformation
					gameId={gameId}
					overideImageStyles="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
					overideImageContainerStyles="h-[90px]"
					maxWidth={maxWidth}
				/>
			</div>
		</Modal>
	);
};
