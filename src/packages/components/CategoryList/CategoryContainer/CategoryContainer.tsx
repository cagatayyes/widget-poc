import { GameCard, GameCardSlider, CategoryTopContainer } from 'casino/components/';
import { CategorySection, GameCardSection } from './CategoryContainer.style';
import { IGame } from 'casino/types';

interface ICategoryContainerProps {
	games: IGame[];
	sliderNo: number;
	title: string;
	viewAllLink: string;
	iconName: string;
	showgameinfomodal: (gameId: number, gameLink: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

export const CategoryContainer = (props: ICategoryContainerProps): JSX.Element => {
	const {
		games,
		sliderNo,
		title,
		viewAllLink,
		iconName,
		showgameinfomodal,
		handlegameload
	} = props;

	return (
		<CategorySection data-testid='category-section'>
			<CategoryTopContainer title={title}
				viewAllLink={viewAllLink}
				iconName={iconName} />

			<GameCardSection>
				<GameCardSlider sliderNo={sliderNo}>
					{
						games && games.length > 0 &&
						games.map(game => (
							<GameCard key={game.id}
								gamelaunchpoint='Lobby'
								showamount={false}
								gamename={game.name}
								gameimage={game.image_url}
								sash={game.sash}
								gameid={game.id}
								showgameinfomodal={showgameinfomodal}
								handlegameload={handlegameload}
							/>
						))
					}
				</GameCardSlider>
			</GameCardSection>
		</CategorySection>
	);
};

