import { render } from '@testing-library/react';
import HamburgerHeader from './HamburgerHeader';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScriptAttributeProvider } from '../../../context/ScriptAttributeContext';

jest.mock('casino/hooks/useDatePattern', () => ({
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	useDatePattern: () => ({
		datePattern: '1708591412' // Mocked date pattern
	})
}));

/* eslint-disable react/prop-types */
jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

describe('Hamburger Header', () => {
	it('should render Hamburger Header navigation', () => {
		const component = render(
			<BrowserRouter>
				<ScriptAttributeProvider>
					<HamburgerHeader
						maxWidth='640px'
						isVisible={false}
						toggleHamburgerModal={jest.fn()}
						showExitModal={false}
						hideExitModal={jest.fn()}
					/>
				</ScriptAttributeProvider>
			</BrowserRouter>
		);
		expect(component).toMatchSnapshot();
	});
});
