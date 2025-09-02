
import { render } from '@testing-library/react';
import { ExitGameModal } from './ExitGameModal';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/* eslint-disable react/prop-types */
jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

describe('ExitGameModal', () => {
	it('should render Exit Modal', () => {
		const component = render(
			<BrowserRouter>
				<ExitGameModal
					showExitGameModal={true}
					closeExitGamemodal={jest.fn()}
				/>
			</BrowserRouter>
		);
		expect(component).toMatchSnapshot();
	});
});
