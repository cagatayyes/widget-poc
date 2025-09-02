import { INavigationProps, INavigationList } from 'casino/components/Navigation/Navigation.type';
import { JSX } from 'react';
import { NavigationItem } from 'casino/components/NavigationItem/NavigationItem';


const Navigation = ({ options, classNames, handleTabClick, activeTab }: INavigationProps): JSX.Element => {

	return (
		<>
			{options?.navigationMenuList?.map((menuItem: INavigationList): JSX.Element =>
				<NavigationItem
					imgIcon={menuItem.imgIcon}
					key={menuItem.label}
					label={menuItem.label!}
					pathname={menuItem.pathname!}
					classNames={classNames}
					arrowIcon={options.arrowIcon}
					width={options.width}
					height={options.height}
					labelClassName={options.labelClassName}
					handleTabClick={handleTabClick}
					isActive={activeTab === menuItem.label}
				/>,
			)}
		</>
	);
};

export default Navigation;
