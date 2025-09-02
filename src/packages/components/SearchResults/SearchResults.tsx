import { GameCard } from 'casino/components/GameCard/GameCard';
import { IGameData } from 'casino/types';
interface ISearchResultsProps {
	searchData: IGameData[];
    showgameinfomodal: (gameId: number, gameLink: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

const SearchResults = ({ searchData, showgameinfomodal, handlegameload }: ISearchResultsProps): JSX.Element => {
	return(
		<div className='flex flex-col max-w-[100vw] rounded-[10px] py-[17px] px-[14px] bg-[#0D1335]'>
			<div className='flex flex-row w-full'>
				<span className='flex text-[16px] text-[#FFF] font-semibold w-[50%]'>
                    Search Results
				</span>
				<span className='w-[50%] flex text-[12px] text-[#4DAAC8] font-normal tracking-[-0.36px] justify-end leading-[14px]'>
					{`About ${searchData?.length} result${searchData?.length > 1 ?'s' : ''}`}
				</span>
			</div>
			<div className='flex flex-row mt-[16px]'>
				{searchData.map(({ id, name, image_url: ImageURl, sash }: IGameData ) => {
					return(
						<div
							className='mr-[2px] last-of-type:mr-[0]'
							key={id}
						>
							<GameCard
								gamelaunchpoint='Search'
								showamount={false}
								gamename={name}
								gameimage={ImageURl}
								sash={sash}
								gameid={id}
								showgameinfomodal={showgameinfomodal}
								handlegameload={handlegameload}
							/>
						</div>
					);

				})}
			</div>
		</div>
	);
};

export default SearchResults;
