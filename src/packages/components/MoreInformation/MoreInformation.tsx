import Navigation from '../Navigation/Navigation';
import { MoreInformationItems } from '../Navigation/Navigation.constants';
import { INavigationTriggerProps } from '../Navigation/Navigation.type';


export const MoreInformation = (props: INavigationTriggerProps): JSX.Element => {

	return (
		<div className='ml-[10px]'>
			<Navigation
				options={MoreInformationItems}
				classNames='flex flex-row w-full items-left items-start cursor-pointer p-[6px]'
				handleTabClick={props.handleTabClick}
				activeTab={props.activeTab}
			/>
		</div>
	);
};
