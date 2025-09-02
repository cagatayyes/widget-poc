import { render } from '@testing-library/react';
import { MoreInformation } from './MoreInformation';
import React from 'react';

describe('More Information', () => {
	it('should render More Information details', () => {
		const component = render(
			<MoreInformation
				handleTabClick={jest.fn()}
				maxWidth='640px'
				activeTab='Customer Support'
			/>,
		);
		expect(component).toMatchSnapshot();
	});
});
