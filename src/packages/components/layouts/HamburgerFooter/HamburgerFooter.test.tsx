import { render } from '@testing-library/react';
import HamburgerFooter from './HamburgerFooter';
import React from 'react';

describe('Hamburger Footer', () => {
	it('should render Hamburger Footer', () => {
		const component = render(
			<HamburgerFooter
				maxWidth='640px'
				handleTabClick={jest.fn()}
				activeTab='OVERVIEW'
			/>,
		);
		expect(component).toMatchSnapshot();
	});
});
