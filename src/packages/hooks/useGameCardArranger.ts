import { useEffect, useState } from 'react';

interface IGameCardArranger {
	maxGameCardContainerWidth: number;
}

export const useGameCardArranger = (): IGameCardArranger => {
	/* Too handle column count on wider screens for games */
	const [width, setWidth] = useState(window.innerWidth);

	const handleWindowSizeChange = (): void => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);

		return (): void => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const threeInARow = width <= 491;
	const fourInARow = width > 491 && width <= 608;
	const fiveInARow = width > 608;

	let maxGameCardContainerWidth: number = 375;

	if (threeInARow) maxGameCardContainerWidth = 375;
	if (fourInARow) maxGameCardContainerWidth = 492;
	if (fiveInARow) maxGameCardContainerWidth = 609;

	return { maxGameCardContainerWidth };
};
