import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScriptAttributeProvider } from '../../../context/ScriptAttributeContext';
import { CategoryProvider } from '../../../context/CategoryContext';
import { RecentlyPlayedCategory } from './RecentlyPlayedCategory';

/* eslint-disable react/prop-types */
jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

describe('CategoryList Component', () => {
	it('renders without crashing', () => {
		const component = render(
			<ScriptAttributeProvider>
				<CategoryProvider>
					<BrowserRouter>
						<RecentlyPlayedCategory />
					</BrowserRouter>
				</CategoryProvider>
			</ScriptAttributeProvider>
			,
		);
		expect(component).toMatchSnapshot();
	});
});
