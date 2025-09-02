/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import GameInformation from './GameInformation';
import React from 'react';
import { ScriptAttributeProvider } from '../../context/ScriptAttributeContext';

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>,
}));

describe('Game Information', () => {
	it('should render Game Information details', () => {
		const component = render(
			<ScriptAttributeProvider>
				<GameInformation
					gameId={14}
					overideImageStyles='flex'
					overideImageContainerStyles='mt-10p'
					maxWidth='640px'
				/>
			</ScriptAttributeProvider>
		);
		expect(component).toMatchSnapshot();
	});
});
