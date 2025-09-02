import { Modal } from 'casino/components/Modal/Modal';
import { ButtonVariant, ColorType, IButtonProps } from 'casino/components/Button/Button.types';
import { useTranslation } from 'react-i18next';
import { EventActions } from 'casino/constants';
import { useDispatchCustomEvent } from 'casino/hooks/useDispatchEvents';

interface ILoginModal {
	showLoginModal: boolean;
	closeLoginModal: () => void;
}

export const LoginModal = ({ showLoginModal, closeLoginModal }: ILoginModal): JSX.Element => {
	const { t } = useTranslation();
	const labelStyle: string = 'tracking-widest leading-[14px] text-[14px] tracking-[16%] h-[14px]';
	const buttonStyle: string = 'w-full mx-1 mt-[14px] gap-[10px]';
	const { dispatchCustomEvent } = useDispatchCustomEvent();

	const handleLoginFlow = (action: EventActions): void => {
		closeLoginModal();
		dispatchCustomEvent(action);
	};

	const LoginModalActions: IButtonProps[] = [
		{
			label: `${t('login')}`,
			className: buttonStyle,
			onClick: (): void => handleLoginFlow(EventActions.login),
			color: ColorType.Fullfilled,
			variant: ButtonVariant.White,
			noStyle: false,
			labelStyle: labelStyle
		},
		{
			label: `${t('register')}`,
			className: buttonStyle,
			onClick: (): void => handleLoginFlow(EventActions.register),
			color: ColorType.Fullfilled,
			variant: ButtonVariant.Yellow,
			noStyle: false,
			labelStyle: labelStyle
		}
	];

	return (
		<Modal
			show={showLoginModal}
			actions={LoginModalActions}
			hasCloseButton={true}
			onClose={(): void => closeLoginModal()}
			overideContainerStyles='bg-[#0D1335] text-[#F3F5F8] w-[327px] h-[149px]'
		>
			<div className='flex justify-center mt-[10px]'>
				<p className='flex font-medium text-[16px] leading-[19px] text-center mb-[15px] mt-[10px] h-[19px]'>{t('loginInfo')}</p>
			</div>

		</Modal>
	);
};
