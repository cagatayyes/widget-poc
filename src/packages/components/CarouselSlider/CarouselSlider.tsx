import React, { ReactElement } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useScreenDetector } from 'casino/hooks/useScreenDetector';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CarouselSlider.css';
import { useDispatchCustomEvent } from 'casino/hooks/useDispatchEvents';
import { EventActions } from 'casino/constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICarouselSlider {
	children: ReactElement[];
	maxheight?: number | string;
	maxwidth?: number | string;
	sliderheight?: number | string;
	sliderwidth?: number | string;
	slides?: unknown[];
}

export interface ICarouselSliderItemProps extends React.ComponentProps<'div'> {
	className?: string;
}

// eslint-disable-next-line no-unused-vars
export const CarouselSlider: React.MemoExoticComponent<(props: ICarouselSlider) => React.JSX.Element> = React.memo((props: ICarouselSlider) => {
	const { children, maxwidth = 'auto', slides } = props;
	const { isMobile } = useScreenDetector();
	const { dispatchCustomEvent } = useDispatchCustomEvent();

	return (
		<div className='relative mt-[10px]'
			style={{
				maxWidth: maxwidth,
			}}
			data-testid='homePageBannerCarousel'>
			<Swiper
				modules={[Pagination, Navigation]}
				data-testid='lobby-carousel-slider'
				navigation={{
					nextEl: '.navigation-next',
					prevEl: '.navigation-prev',
					disabledClass: 'swiper-button-disabled'
				}}
				breakpoints={{
					768: {
						slidesPerView: 'auto',
						slidesPerGroup: 1,
						centeredSlides: true,
						centerInsufficientSlides: true,
						centeredSlidesBounds: true,
						spaceBetween: 7,
					},
				}}
				slidesPerView={isMobile ? 'auto' : 2}
				slidesPerGroup={1}
				centeredSlides={true}
				centerInsufficientSlides={true}
				centeredSlidesBounds={true}
				autoplay={{
					delay: 3000,
					pauseOnMouseEnter: true
				}}
				pagination={
					{ clickable: true }
				}
				spaceBetween={7}
				className="carouselSlider bg-[var(--main-bg-color)]"
				{...props}
				style={{
					maxHeight: 'auto',
					maxWidth: maxwidth
				}}
				onClick={(swiper: SwiperClass) => {
					const clickedIndex = swiper.clickedIndex || 0;
					const clickedSlide = slides?.find((slide: unknown, index: number) => index === clickedIndex) as { name: string };

					if (clickedSlide) {
						const data = {
							order: clickedIndex + 1,
							name: clickedSlide.name,
						};

						dispatchCustomEvent(EventActions.sliderClick, data);
					}
				}}
			>
				{React.Children.map(children, (child: React.JSX.Element, index: number) => (
					<SwiperSlide
						data-testid='lobby-carousel-slider-item'
						key={index}
						{...child.props}
					>
						{child}
					</SwiperSlide>
				))}
			</Swiper>

			<button className="carouselSlider navigation-prev arrow">
				<span className='text-[18px] material-symbols-outlined'>
					keyboard_arrow_left
				</span>
			</button>

			<button className="carouselSlider navigation-next arrow">
				<span className='text-[18px] ml-[auto] material-symbols-outlined'>
					keyboard_arrow_right
				</span>
			</button>
		</div >
	);
});


// eslint-disable-next-line no-unused-vars
export const CarouselSliderItem: React.MemoExoticComponent<(props: ICarouselSliderItemProps) => React.JSX.Element> =
	React.memo(({ children }: ICarouselSliderItemProps) => (<>{children}</>));

CarouselSlider.displayName = 'CarouselSlider';
CarouselSliderItem.displayName = 'CarouselSliderItem';

export default CarouselSlider;
