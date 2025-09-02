/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render } from '@testing-library/react';
import OverviewMenu from './OverviewMenu';
import React from 'react';

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

jest.mock('casino/hooks/useDatePattern', () => ({
	useDatePattern: () => ({
		datePattern: '1708591412' // Mocked date pattern
	})
}));

jest.mock('casino/hooks/useToken', () => ({
	useToken: () => ({
		token: '',
		userToken: false,
	})
}));

describe('Overview Information', () => {
	it('should render Overview Information details', () => {
		const component = render(
			<OverviewMenu
				handleTabClick={jest.fn()}
				maxWidth='640px'
				activeTab='Customer Support'
			/>,
		);
		expect(component).toMatchSnapshot();
	});
});
