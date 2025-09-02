/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { GameLayoutController } from './GameLayoutController';
import React from 'react';
import { ScriptAttributeProvider } from '../../context/ScriptAttributeContext';
import { BrowserRouter } from 'react-router-dom';
import { CategoryProvider } from '../../context/CategoryContext';

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));


describe('Layout Controller', () => {
	it('should render layout based on the route', () => {
		const component = render(
			<ScriptAttributeProvider>
				<CategoryProvider>
					<BrowserRouter>
						<GameLayoutController setCategoryName={jest.fn()} />
					</BrowserRouter>
				</CategoryProvider>

			</ScriptAttributeProvider>
		);
		expect(component).toMatchSnapshot();
	});
});
