import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ICategoryTopContainerProps {
	title: string;
	viewAllLink: string;
	iconName: string;
}

export const CategoryTopContainer = ({ title, viewAllLink, iconName }: ICategoryTopContainerProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className='flex flex-row items-center'>
			{iconName && <span className="flex text-[18px] text-[#FFF] mr-[5px] material-symbols-outlined">
				{iconName}
			</span>}
			<span className='flex text-[16px] text-[#FFF] font-semibold truncate w-1/2'>
				{title}
			</span>
			{viewAllLink && <Link to={`${viewAllLink}`}
				className='absolute top-[-3px] right-[76px] flex items-center justify-center bg-[#070C26] w-[70px] h-[30px] rounded-[20px] ml-[auto] text-[11px] text-[#BBBFD7] font-semibold border-[1px] border-solid border-[#adb9ce40]'
			>
				{t('viewAll')}
			</Link>}
		</div>
	);
};
