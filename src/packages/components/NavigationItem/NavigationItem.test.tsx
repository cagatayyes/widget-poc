import { render } from '@testing-library/react';
import { NavigationItem } from './NavigationItem';
import React from 'react';

describe('Navigation Item', () => {
	it('should render Navigation Items', () => {
		const component = render(
			<NavigationItem
				imgIcon='../images/svg/overview.svg'
				key='overview'
				label='OVERVIEW'
				pathname=''
				classNames='Flex'
				width={16}
				height={16}
				labelClassName='text-[13px]'
				handleTabClick={jest.fn()}
				isActive={true}
			/>,
		);
		expect(component).toMatchSnapshot();
	});
});
