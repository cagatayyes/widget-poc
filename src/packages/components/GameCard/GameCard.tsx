import { GameCardContainer, GameCardImage, GameCardImageContainer, GameCardInfoContainer, GameInfoAmount, GameInfoTitle } from './GameCard.style';
import { Sash } from 'casino/components/GameCard/Sash/Sash';
import { ISash } from 'casino/types';
import slugify from 'slugify';
import { ROUTES } from 'casino/constants';
import { useScreenDetector } from 'casino/hooks';

interface IGameCardProps {
	showamount: boolean;
	gamename: string;
	gameimage: string;
	gameid: number;
	sash: ISash | null;
	gamelaunchpoint: string;
	categoryName?: string;
	showgameinfomodal: (gameId: number, gameLink: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

export const GameCard = ({ showamount, gamename, gameimage, sash, gameid, gamelaunchpoint, categoryName = '', /* showgameinfomodal, */ handlegameload }:
	IGameCardProps): JSX.Element => {
	const formattedGameName = slugify(`${gamename}`).toLowerCase();
	const gameLink: string = `${ROUTES.PAGES.GAME}/${formattedGameName}/${gameid}`;
	const { isSmallScreen } = useScreenDetector();

	/*
	TODO this method will be used when we enable info icon on gameCard. do not delete it
	const handleOnClickInfo = (): void => {
		showgameinfomodal?.(gameid, gameLink);
	}; */

	return (
		<GameCardContainer style={{ width: isSmallScreen ? 105 : 113 }}>
			<GameCardImageContainer onClick={() => handlegameload(gameLink, gamename, gamelaunchpoint, categoryName)}>
				{
					sash &&
					<Sash title={sash.name}
						iconName={sash.icon}
						bgColor={sash.color}
						sashStyles='right-[3px] absolute' />
				}

				<GameCardImage src={gameimage} />
			</GameCardImageContainer>
			<GameCardInfoContainer>
				{
					showamount ?
						<GameInfoAmount>
							₦57,567.50 {/* TODO Amount will be different story, It will be developed in the future */}
						</GameInfoAmount>
						:
						<GameInfoTitle>
							{gamename}
						</GameInfoTitle>
				}
				{/*
				TODO this part will be used in the future do not delete it.
				<GameInfoIconContainer className='material-symbols-outlined cursor-pointer'
					onClick={handleOnClickInfo}>
					{GameCardInfoIcon}
				</GameInfoIconContainer> */}

			</GameCardInfoContainer>
		</GameCardContainer>
	);
};
