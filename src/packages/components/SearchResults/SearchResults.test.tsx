/* eslint-disable react/prop-types */
import React from 'react';
import  SearchResults  from './SearchResults';
import { render } from '@testing-library/react';
import { IGame } from '../../types/game';
import { BrowserRouter } from 'react-router-dom';

const searchData: IGame[] = [
	{
		'id': 10,
		'name': 'Icecream Blast',
		'status': true,
		'image_url': 'https://casino-test.leetent.co.uk/storage/games/bKdbjLnwjR3qeNwkuQsQDhWyT7n1y7dM2XwPKCEv.png',
		'sash': {
			'name': 'NEW',
			'icon': 'stars',
			'color': '#8b129b'
		}
	}
];

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Search results', () => {
	it('should display Search results', () => {
		const setInputValue = jest.fn();

		const name = 'Icecream';
		React.useState = jest.fn().mockReturnValue([name, setInputValue]);

		const { container } = render(
			<BrowserRouter>
				<SearchResults
					searchData={searchData}
					showGameInfoModal={()=> {}}
					handleGameLoad={jest.fn()}
				/>
			</BrowserRouter>
		);

		expect(container).toMatchSnapshot();

	});
});
