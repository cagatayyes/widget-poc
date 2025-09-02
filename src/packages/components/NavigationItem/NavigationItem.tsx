import { INavigationItemProps } from 'casino/components/Navigation/Navigation.type';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export const NavigationItem = (props: INavigationItemProps): JSX.Element => {
	const { t } = useTranslation();
	const { handleTabClick, label, isActive, imgIcon, arrowIcon, width, pathname } = props;

	return (
		<>
			<div
				onClick={(): void => handleTabClick && handleTabClick(pathname ?? label)}
				className={`${props.classNames} ${isActive ? 'text-[#FFB800] bg-[#070C26] border-t-2 border-t-[#FFB800]' : ''}`}
			>
				<span
					className={`w-[${props.width}] h-[${props.height}] material-symbols-outlined`}
					style={{ fontSize: width }}>
					{imgIcon}
				</span>
				<span className={`${props.labelClassName}`}>{t(`${label}`)}</span>
				{arrowIcon  &&
					(<span className='absolute right-[16px] mt-[5px] justify-right material-symbols-outlined'
						style={{ fontSize: '11px' }}
					>
						{arrowIcon}
					</span>)}
			</div>
			{props.arrowIcon && <hr className='w-full border-b-[1px] broder-b-[#ffffff] opacity-[0.1] m-[5px]'></hr>}
		</>
	);
};
