
import { JSX } from 'react';
import Navigation from 'casino/components/Navigation/Navigation';
import { OverviewMenuItems } from 'casino/components/Navigation/Navigation.constants';
import { INavigationTriggerProps } from 'casino/components/Navigation/Navigation.type';
import { RecentlyPlayedCategory } from 'casino/components/CategoryList/RecentlyPlayedCategory/RecentlyPlayedCategory';
import { useTranslation } from 'react-i18next';
import { useToken } from 'casino/hooks';

const OverviewMenu = (props: INavigationTriggerProps): JSX.Element => {
	const { t } = useTranslation();
	const { userToken } = useToken();

	return (
		<div className='ml-[10px]'>
			<Navigation
				options={OverviewMenuItems}
				classNames='flex flex-row w-full items-left items-start cursor-pointer p-[6px] '
				handleTabClick={props.handleTabClick}
				activeTab={props.activeTab}
			/>
			{userToken && <RecentlyPlayedCategory
				title={t('continuePlaying')}
				showViewAllButton={false}
				showCategoryIcon={false}
				showLoading={true}
			/>}

		</div>
	);
};

export default OverviewMenu;

