
import { Container } from './HamburgerFooter.style';
import { JSX } from 'react';
import Navigation from 'casino/components/Navigation/Navigation';
import { FooterNavigationItems } from 'casino/components/Navigation/Navigation.constants';
import { INavigationTriggerProps } from 'casino/components/Navigation/Navigation.type';

const HamburgerFooter = (
	{
		maxWidth,
		handleTabClick,
		activeTab,
	}: INavigationTriggerProps): JSX.Element => {

	return (
		<Container style={{ maxWidth }}>
			<Navigation
				options={FooterNavigationItems}
				classNames={'flex flex-col items-center justify-center w-[25%] max-w-[25%] items-start cursor-pointer p-[3px]'}
				handleTabClick={handleTabClick}
				activeTab={activeTab}
			/>
		</Container>
	);
};

export default HamburgerFooter;
