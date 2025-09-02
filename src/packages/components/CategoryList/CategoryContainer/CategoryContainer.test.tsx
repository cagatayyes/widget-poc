import React from 'react';
import { render, screen } from '@testing-library/react';
import { CategoryContainer } from './CategoryContainer';
import { BrowserRouter } from 'react-router-dom';

/* eslint-disable react/prop-types */
jest.mock('swiper/react', () => ({
	Swiper: ({ children }):JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }):JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }):JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }):JSX.Element => <div>{children}</div>
}));

describe('CategoryContainer Component Tests', () => {
	const mockGames = [
		{ id: 1, name: 'Game 1', image_url: 'url1', sash: 'New' },
		{ id: 2, name: 'Game 2', image_url: 'url2', sash: 'Popular' }
	];

	it('CategoryContainer renders', () => {
		const component = render(
			<BrowserRouter>
				<CategoryContainer games={mockGames}
					sliderNo={0}
					title=""
					viewAllLink=""
					iconName=""
					showGameInfoModal={() => { }}
					handleGameLoad={jest.fn()}
				/>
			</BrowserRouter>,
		);

		expect(screen.getByTestId('category-section')).toBeInTheDocument();
		expect(component).toMatchSnapshot();
	});
});
