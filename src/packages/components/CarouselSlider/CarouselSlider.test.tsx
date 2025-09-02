/* eslint-disable react/prop-types */
jest.mock('swiper/react', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('swiper/modules', () => ({
	Swiper: ({ children }): JSX.Element => <div>{children}</div>,
	SwiperSlide: ({ children }): JSX.Element => <div>{children}</div>
}));

jest.mock('casino/hooks/useScreenDetector', () => ({
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	useScreenDetector: () => ({ isMobile: false })
}));

jest.mock('casino/hooks/useDispatchEvents', () => ({
	useDispatchCustomEvent: (): { dispatchCustomEvent: jest.Mock } => ({ dispatchCustomEvent: jest.fn() })
}));

/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CarouselSlider from './CarouselSlider';

describe('CarouselSlider', () => {
	it('should render successfully', () => {
		const component = render(
			<CarouselSlider>
				<div>Slide 1</div>
				<div>Slide 2</div>
				<div>Slide 3</div>
				<div>Slide 4</div>
				<div>Slide 5</div>
				<div>Slide 6</div>
			</CarouselSlider>,
		);
		expect(screen.getByTestId('homePageBannerCarousel')).toBeInTheDocument();
		expect(component).toMatchSnapshot();
	});

	it('should render child elements', () => {
		const component = render(
			<CarouselSlider>
				<div>Slide 1</div>
				<div>Slide 2</div>
				<div>Slide 3</div>
				<div>Slide 4</div>
				<div>Slide 5</div>
				<div>Slide 6</div>
			</CarouselSlider>,
		);
		expect(screen.getByText('Slide 1')).toBeInTheDocument();
		expect(screen.getByText('Slide 2')).toBeInTheDocument();
		expect(component).toMatchSnapshot();
	});
});
