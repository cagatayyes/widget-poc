/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import HamburgerModal from './HamburgerModal';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

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

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: key => key }),
	Trans: ({ children }) => children
}));


describe('Hamburger Modal', () => {
	it('should render Hamburger Modal Details', () => {
		const component = render(
			<BrowserRouter basename={ROUTES.BASENAME}>
				<HamburgerModal
					maxWidth='640px'
					toggleHamburgerModal={jest.fn()}
					gameId={14}
				/>
			</BrowserRouter>
		);
		expect(component).toMatchSnapshot();
	});
});
