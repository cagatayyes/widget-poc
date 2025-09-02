/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

describe('Search Bar', () => {
	it('should render Search Input and controllers', () => {
		const component = render(
			<BrowserRouter>
				<SearchBar
					maxWidth='640px'
					isSearch={true}
					setIsSearch={jest.fn()}
					showGameInfoModal={jest.fn()}
					handleGameLoad={jest.fn()}
				/>
			</BrowserRouter>
		);
		expect(component).toMatchSnapshot();
	});
});
