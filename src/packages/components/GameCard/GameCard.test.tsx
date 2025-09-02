/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import React from 'react';
import { GameCard } from './GameCard';


const sashData = {
	'sash': {
		'name': 'NEW',
		'icon': 'stars',
		'color': '#8b129b'
	}
};

jest.mock('casino/hooks/useScreenDetector', () => ({
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	useScreenDetector: () => ({ isMobile: false })
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

describe('Game Card', () => {
	it('should render Game Card Container', () => {
		const component = render(
			<GameCard
				showamount={false}
				gamename='icecream'
				gameimage='https://casino-test.leetent.co.uk/storage//games/nSabS8jq2lplR3Wl5U7YaFHbYxp42R4YM7t89rgb.png'
				sash={sashData}
				gameid={1}
				gameLaunchPoint=''
				categoryName='lobby'
				handleGameLoad={jest.fn()}
				showgameinfomodal={jest.fn()}
			/>
		);
		expect(component).toMatchSnapshot();
	});
});
