import { Modal } from 'casino/components/Modal/Modal';
import { ButtonVariant, ColorType, IButtonProps } from 'casino/components/Button/Button.types';
import { useTranslation } from 'react-i18next';
import { ROUTES, EventActions } from 'casino/constants';
import { useNavigate } from 'react-router-dom';
import { useGameSession } from 'casino/hooks/useGameSession';
import { useDispatchCustomEvent } from 'casino/hooks';

interface IExitGameModal {
    showExitGameModal: boolean;
    closeExitGamemodal: () => void;
}

export const ExitGameModal = ({ showExitGameModal, closeExitGamemodal }: IExitGameModal): JSX.Element => {
	const { t } = useTranslation();
	const labelStyle: string = 'tracking-widest leading-[14px] text-[14px] tracking-[16%] h-[14px]';
	const buttonStyle: string = 'w-full mx-1 mt-[14px] gap-[10px]';
	const navigate = useNavigate();
	const { clearGameSession } = useGameSession();
	const { dispatchCustomEvent } = useDispatchCustomEvent();

	const closeGame = (): void => {
		dispatchCustomEvent(EventActions.updateBalance);
		clearGameSession();
		closeExitGamemodal();
		navigate(ROUTES.PAGES.HOME);
	};

	const continueGame = (): void => {
		closeExitGamemodal();
	};

	const ExitGameModalActions: IButtonProps[] = [
		{
			label: `${t('yes')}`,
			className: buttonStyle,
			onClick: (): void => closeGame(),
			color: ColorType.Fullfilled,
			variant: ButtonVariant.White,
			noStyle: false,
			labelStyle: labelStyle
		},
		{
			label: `${t('no')}`,
			className: buttonStyle,
			onClick: (): void => continueGame(),
			color: ColorType.Fullfilled,
			variant: ButtonVariant.Yellow,
			noStyle: false,
			labelStyle: labelStyle
		}
	];

	return (
		<Modal
			show={showExitGameModal}
			actions={ExitGameModalActions}
			hasCloseButton={true}
			onClose={(): void => closeExitGamemodal()}
			overideContainerStyles='bg-[#0D1335] text-[#F3F5F8] w-[327px] h-[177px] rounded-[8px]'
		>
			<div className='flex flex-col mt-[15px] mb-[10px]'>
				<span className='font-roboto-normal text-center font-medium leading-[19px] text-[16px]'>{t('exitGame')}</span>
				<p className='flex font-robot-normal text-[13px] leading-[17px] text-center mt-[5px] h-[34px]'>{t('exitGameNote')}</p>
			</div>

		</Modal>
	);
};
