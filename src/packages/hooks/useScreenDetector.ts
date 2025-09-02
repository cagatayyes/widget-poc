import { useEffect, useState } from 'react';

export const useScreenDetector = (): { isMobile: boolean, isTablet: boolean, isDesktop: boolean, isSmallScreen :boolean} => {
	const [width, setWidth] = useState(window.innerWidth);

	const handleWindowSizeChange = (): void => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);

		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 768;
	const isTablet = width <= 1024;
	const isDesktop = width > 1024;
	const isSmallScreen = width <= 370;

	return { isMobile, isTablet, isDesktop, isSmallScreen };
};
