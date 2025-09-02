import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { LeftArrowIcon, RightArrowIcon } from './GameCardSlider.constants';
import tw from 'tailwind-styled-components';
import './GameCardSlider.css';

const GameCardSliderContainer = tw.div`
  flex
  overflow-hidden
`;

interface IGameCardSliderProps {
	sliderNo: number;
	children: ReactNode | ReactNode[];
	sliderwidth?: number | string
	sliderheight?: number | string
}

export const GameCardSlider = ({ sliderNo, children, sliderwidth = 'auto', sliderheight = 'auto' }: IGameCardSliderProps): JSX.Element => {

	return (
		<>
			<GameCardSliderContainer>
				<Swiper
					navigation={{
						nextEl: `.navigationButtonNext-${sliderNo}`,
						prevEl: `.navigationButtonPrev-${sliderNo}`,
						disabledClass: 'navigationButton-disabled'
					}}
					modules={[Navigation]}
					slidesPerView={'auto'}
					slidesPerGroup={1}
					centeredSlides={false}
					centerInsufficientSlides={false}
					centeredSlidesBounds={false}
					spaceBetween={4}
					className=""
					style={{
						maxHeight: 'auto',
						maxWidth: 'auto'
					}}
				>
					{React.Children.map(children as React.JSX.Element, (child: React.JSX.Element, index: number) => (
						<SwiperSlide
							key={index}
							width={sliderwidth}
							style={{
								width: sliderwidth,
								height: sliderheight
							}}
							{...child.props}
						>
							{child}
						</SwiperSlide>
					))}
				</Swiper>

				<span
					className={`navigationButton navigationButtonPrev navigationButtonPrev-${sliderNo} material-symbols-outlined`}>
					{LeftArrowIcon}
				</span>

				<span
					className={`navigationButton navigationButtonNext navigationButtonNext-${sliderNo} material-symbols-outlined`}>
					{RightArrowIcon}
				</span>
			</GameCardSliderContainer>
		</>
	);
};
