/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { LoadGame } from './LoadGame';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScriptAttributeProvider } from '../../context/ScriptAttributeContext';
import { LoaderProvider } from '../../context/LoaderContext';

jest.mock('casino/hooks/useDatePattern', () => ({
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	useDatePattern: () => ({
		datePattern: '10:00' // Mocked date pattern
	})
}));

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: key => key }),
	Trans: ({ children }) => children
}));

describe('Load Game', () => {
	it('should render Game to play', () => {
		const component = render(
			<ScriptAttributeProvider>
				<LoaderProvider>
					<BrowserRouter>
						<LoadGame
							maxWidth='640px'
						/>
					</BrowserRouter>
				</LoaderProvider>
			</ScriptAttributeProvider>
		);
		expect(component).toMatchSnapshot();
	});
});
