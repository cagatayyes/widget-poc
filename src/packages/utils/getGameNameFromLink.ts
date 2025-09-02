export const getGameNameFromLink = (gameLink: string): string => {
	if (gameLink?.length > 0) {
		const parts = gameLink.split('/');
		const gameSlug = parts[2];
		const gameNameParts = gameSlug
			.split('-')
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1));

		const gameName = gameNameParts.join(' ');

		return gameName;
	} else {
		return '';
	}
};
