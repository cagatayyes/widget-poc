import { Container, Content, ContentRow, HorizontalLine, MainContent } from 'casino/components/GameInformation/GameInformation.style';
import { JSX } from 'react';
import { useAPI } from 'casino/hooks/useAPI';
import { GAME_INFORMATION_ENDPOINT } from 'casino/constants';
import { IGameData } from 'casino/types';
import NoDataMessage from 'casino/components/NoDataMessage/NoDataMessage';
import { Sash } from 'casino/components/GameCard/Sash/Sash';
import { useParams } from 'react-router-dom';
import { CommonLoader } from 'casino/components/shared/CommonLoader';

export interface IGameInformationProps {
	gameId?: number;
	showBottomContent?: boolean;
	overideImageStyles?: string;
	overideImageContainerStyles?: string;
	maxWidth: string;
}

const GameInformation = (
	{
		gameId,
		overideImageStyles,
		overideImageContainerStyles,
		maxWidth,
	}: IGameInformationProps): JSX.Element => {
	const { gameid: paramGameId } = useParams();
	const queryGameId = paramGameId ? parseInt(paramGameId) : gameId;
	const { data: gameData, isLoading, error } = useAPI<IGameData>({ endpoint: `${GAME_INFORMATION_ENDPOINT}/${queryGameId}` });

	const renderError = (): JSX.Element => (
		<NoDataMessage
			title='Game Information'
			message={'Oops! Something went wrong'}
		/>
	);

	return (
		<>
			{isLoading &&
				<Container >
					<CommonLoader maxWidth={maxWidth} />
				</Container>
			}
			{error && !gameData && renderError()}
			{!isLoading && gameData && <Container>
				<MainContent>
					<div className={`flex justify-center h-[184px] m-[10px] ${overideImageContainerStyles}`}>
						<img
							src={gameData?.data?.image_url}
							width={144}
							height={184}
							alt='Game Name'
							className={overideImageStyles}
							loading="eager"
						/>
					</div>

					{/* TODO
					 {gameDescription && <Content>
						<ContentRow>
							<p className='text-sm font-normal leading-4 tracking-normal text-left text-[#BBBFD7]'>{gameDescription}</p>
						</ContentRow>
						<HorizontalLine />
					</Content>} */}

					<Content className='mt-[15px]'>
						<ContentRow>
							<span className='relative text-[16px] font-[600] ml-[10px] mr-[10px] w-fit'>{gameData?.data?.name}</span>
							<span className='relative justify-start mt-[6px]'>
								{gameData?.data?.sash && <Sash title={gameData?.data?.sash?.name}
									iconName={gameData?.data?.sash?.icon}
									bgColor={gameData?.data?.sash?.color}
								/>}
							</span>
						</ContentRow>
						<HorizontalLine />
					</Content>


					{/* TODO with backend integration
					 {rtp && <Content>
						<ContentRow>
							<p className='w-[70%] ml-[10px]'>RTP</p> <p className='ml-[10px] text-lg font-medium leading-5 align-text-right text-green-400'>{rtp}</p>
						</ContentRow>
						<HorizontalLine />
					</Content>}

					{recentBiggestWin && <Content>
						<ContentRow>
							<p className='w-[70%] ml-[10px]'>Recent biggest win</p> <p className='ml-[10px] text-xs font-semibold leading-tight text-right text-green-500'>{recentBiggestWin}</p>
						</ContentRow>
						<HorizontalLine />
					</Content>}

					{tags && tags.length > 0 && (<Content>
						<ContentRow>
							<GameInformationTags tags={tags} />
						</ContentRow>
						<HorizontalLine />
					</Content>)}

					{banners && banners.length > 0 && <GameInformationBanners banners={banners} />}

					{showBottomContent && (
						<div className='w-[90%] pt-[10px] justify-around ml-[10px] mb-[20px]'>
							<div className='max-h-[119px] justify-around'>
								<p className='text-[16px] font-semibold mt-[10px]'>{description}</p>
								<span className='text-[13px] font-[400] leading-4 pt-[4px]'>
									<p className='mb-[10px]'>Click the + or - buttons to change the bet value and open the bet menu.</p>

									<p>Select the bet you want to use in game.
                            Symbols pay anywhere on the screen. The total number of the same
                            symbol on the screen at the end of a spin determines the value of the win.</p>
								</span>
							</div>
							<div className='mt-[10px] justify-around'>
								<p className='pt-[20px] text-[16px] font-semibold'>{rules}</p>
								<span className='text-[13px] font-[400] leading-4 pt-[4px]'>
									<p className='mb-[10px] '>The Free Spins feature is awarded when 4 or more scatter symbols hit anywhere on the screen.</p>
									<p>The round starts with 15 free spins.
                            During the Free Spins round, whenever a multiplier symbol hits and the spin results in a win,
                            the multiplier value gets added to the total multiplier. For the whole duration of the round,
                            whenever any new multipler symbol hits and results in a win the total multiplier value is also used to multiply the win.
                            Whenever 3 or more scatter symbols hit during the free spins round, 5 additional free spins are awarded.
                            Special reels are in play during the free spins round.</p>
								</span>
							</div>
						</div>)} */}
				</MainContent>
			</Container>}
		</>
	);
};

export default GameInformation;
