/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { GameInformationModal } from './GameInformationModal';
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

describe('Game Information Modal', () => {
	it('should render Game information modal', () => {
		const component = render(
			<ScriptAttributeProvider>
				<GameInformationModal
					gameId={14}
					selectedGameLink=''
					isShowModal={true}
					showGameInfoModal={jest.fn()}
					maxWidth='640px'
					handlePlayNow={jest.fn()}
				/>
			</ScriptAttributeProvider>
		);
		expect(component).toMatchSnapshot();
	});
});
