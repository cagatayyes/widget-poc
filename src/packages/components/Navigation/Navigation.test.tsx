import { render } from '@testing-library/react';
import Navigation from './Navigation';
import FooterNavigationItems from '../layouts/HamburgerFooter/HamburgerFooter';
import React from 'react';

describe('Navigation', () => {
	it('should render Footer Navigation items', () => {
		const component = render(
			<Navigation
				options={FooterNavigationItems}
				classNames='flex'
				handleTabClick={jest.fn()}
				activeTab='OVERVIEW'
			/>,
		);
		expect(component).toMatchSnapshot();
	});
});
