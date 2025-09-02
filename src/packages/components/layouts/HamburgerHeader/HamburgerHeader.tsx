import { JSX, useEffect, useState } from 'react';
import { useDatePattern } from 'casino/hooks/useDatePattern';
import { useTranslation } from 'react-i18next';
import { ExitGameModal } from 'casino/components/ExitGameModal/ExitGameModal';
import { useAPI, useScriptAttribute } from 'casino/hooks';
import { SERVER_TIME_ENDPOINT } from 'casino/constants';

interface IHamburgerHeaderProps {
	maxWidth: string;
	isVisible: boolean;
	toggleHamburgerModal: (isVisible: boolean) => void;
	showExitModal:boolean;
	hideExitModal: (isExit: boolean) => void;
}

const HamburgerHeader = ({ maxWidth, isVisible, toggleHamburgerModal, showExitModal, hideExitModal }: IHamburgerHeaderProps): JSX.Element => {
	const [isExitGame, setIsExitGame] = useState<boolean>(showExitModal ?? false);
	const { data: serverTimeData, isLoading, error } = useAPI<number>({ endpoint: SERVER_TIME_ENDPOINT });
	const { datePattern } = useDatePattern(new Date(serverTimeData?.data as number * 1000), 'hh:mm');
	const { t } = useTranslation();
	const { scriptAttributes } = useScriptAttribute();
	const { clientlogo } = scriptAttributes;

	const handleExitGameModal = (): void => {
		setIsExitGame(true);
	};

	const closeExistGameModal = (): void => {
		setIsExitGame(false);
		hideExitModal(false);
	};

	useEffect(() =>{
		if (showExitModal)
			setIsExitGame(showExitModal);

	}, [showExitModal]);

	return (
		<div
			className='absolute top-0 flex flex-row bg-[#0D1335] items-center h-[40px] w-full p-[5px] z-[2001]'
			style={{ maxWidth }}
		>
			<button
				className='flex h-[16px]'
				onClick={() => toggleHamburgerModal(!isVisible)}>
				<span
					className="w-[16px] h-[12px] material-symbols-outlined mt-[2px]"
					style={{ color: isVisible ? '#00D609' : '#fff', fontSize: '16px' }}>
					{isVisible ? 'close' : 'menu'}
				</span>
			</button>
			<div>
				<img
					className='h-33 w-76'
					src={clientlogo}
					width='76'
					height='33'
					alt='Client Logo'
				/>
			</div>
			<div className='flex flow-row items-center w-full justify-end text-right text-[#808594] text-[8px]'>
				{
					!error && !isLoading && datePattern &&
					<span className='font-normal'>{t('Server Time')} {datePattern} | </span>
				}
				<div onClick={handleExitGameModal}
					className='flex flex-row text-[white]'>
					<span className='text-[10px] ml-[3px] mr-[3px] font-bold'>{t('Exit Game')} </span>
					<span
						className='w-[12px] h-[12px] mt-[1px] material-symbols-outlined'
						style={{ fontSize: '12px' }}>
						move_item
					</span>
				</div>
			</div>
			<ExitGameModal
				showExitGameModal={isExitGame}
				closeExitGamemodal={closeExistGameModal}
			/>
		</div>
	);
};

export default HamburgerHeader;
