/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { LobbyCategoryDetails } from './LobbyCategoryDetail';
import React from 'react';
import { ScriptAttributeProvider } from '../../context/ScriptAttributeContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));


describe('Category detail', () => {
	it('should render Category lobby layout', () => {
		const component = render(
			<ScriptAttributeProvider>
				<BrowserRouter>
					<LobbyCategoryDetails
						maxWidth='640px'
						showGameInfoModal={jest.fn()}
						isSearch={true}
						setCategoryName={jest.fn()}
						handleGameLoad={jest.fn()}
					/>
				</BrowserRouter>
			</ScriptAttributeProvider>
		);
		expect(component).toMatchSnapshot();
	});
});
