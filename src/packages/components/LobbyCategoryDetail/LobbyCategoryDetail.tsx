import { InfiniteScroll } from 'casino/components/InfiniteScroll/InfiniteScroll';
import { CATEGORIES_ENDPOINT, ROUTES } from 'casino/constants';
import { useAPI, useGameCardArranger } from 'casino/hooks';
import { ICategoryDetail, IGame, IPagination, ISingleCategory } from 'casino/types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from 'casino/components/GameCard/GameCard';
import NoDataMessage from 'casino/components/NoDataMessage/NoDataMessage';
import { CommonLoader } from 'casino/components/shared/CommonLoader';

interface ILobbyCategoryDetails {
	maxWidth: string;
	showgameinfomodal: (gameId: number, gameLink: string) => void;
	isSearch: boolean;
	setCategoryName: (categoryName: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

export const LobbyCategoryDetails = ({ maxWidth, isSearch, setCategoryName, showgameinfomodal, handlegameload }: ILobbyCategoryDetails): JSX.Element => {
	const [localError, setLocalError] = useState(null);
	const [games, setGames] = useState<IGame[] | null>([]);
	const [category, setCategory] = useState<ISingleCategory | null>();
	const [pagination, setPagination] = useState<IPagination | null>();
	const { maxGameCardContainerWidth } = useGameCardArranger();
	const { categoryId: paramCategoryId } = useParams();
	const categoryId = paramCategoryId ? parseInt(paramCategoryId) : null;
	const limit = 20;
	const [page, setPage] = useState<number>(1);
	const navigate = useNavigate();
	const { data: categoryData, fetchData, setEndpointExternal, isLoading, error } =
		useAPI<ICategoryDetail>({ endpoint: `${CATEGORIES_ENDPOINT}/${categoryId}/games?limit=${limit}&page=1`, autoFetch: false });

	if (error) {
		navigate(ROUTES.PAGES.HOME);
	}
	useEffect(() => {
		fetchFirstData();
	}, []);

	useEffect(() => {
		setCategoryName(category?.name ?? '');
	}, [category]);

	const fetchFirstData = (): void => {
		fetchData().then((response) => {
			setPage(2);
			setPagination(response?.data?.pagination || null);
			setEndpointExternal?.(`${CATEGORIES_ENDPOINT}/${categoryId}/games?limit=${limit}&page=2`);
			setCategory(response?.data?.category || null);
			setGames(response?.data?.games || null);
		}).catch((error) => {
			setLocalError(error);
		});
	};

	useEffect(() => {
		if (page > 1) {
			shouldFetchMoreOnLoad();
		}
	}, [games?.length]);

	const fetchMoreData = async (): Promise<void> => {
		fetchData().then((response) => {
			setPage((prevPage) => {
				setEndpointExternal?.(`${CATEGORIES_ENDPOINT}/${categoryId}/games?limit=${limit}&page=${prevPage + 1}`);

				return prevPage + 1;
			});
			const newGames = [...games as IGame[], ...response?.data?.games || []];
			setGames(newGames);
		});
	};

	const shouldFetchMoreOnLoad = async (): Promise<void> => {
		const isScrollable = document.documentElement.scrollHeight > window.innerHeight; // Means that there is a space for new data to be rendered but user is not scrolled to the bottom

		if (!isScrollable && !isLoading && pagination && page <= pagination.totalPage) {
			fetchMoreData();
		}
	};

	if (isLoading && page === 1) {
		return <CommonLoader maxWidth={maxWidth} />;
	}

	if ((!categoryData || !category || error || localError) && !isLoading) {
		return <NoDataMessage
			title='An Error Occurred'
			message={''}
			maxWidth={'640px'}
		/>;
	}

	return (
		<>
			{!isSearch && <div className='bg-[#0D1335] w-full rounded-[10px] overflow-y-scroll'>
				<InfiniteScroll fetchData={fetchMoreData}
					isLoading={isLoading}
					hasMore={!!pagination && (page <= pagination.totalPage)}
					maxWidth={`${maxGameCardContainerWidth} px`}>
					<div
						id='scrollElement'
						className='flex flex-wrap gap-[4px] px-[14px] mx-auto justify-start rounded-[10px] py-[15px]'
						style={{ maxWidth: maxGameCardContainerWidth }}
					>
						{games && games.length > 0 && games.map((game, index) => (
							<GameCard key={`${game.id}-${index}`}
								gamelaunchpoint='Category Detail'
								categoryName={category?.name}
								showamount={false}
								gamename={game.name}
								gameid={game.id}
								gameimage={`${process.env.REACT_APP_CDN_URL}/${game.image_url}`}
								sash={game.sash}
								showgameinfomodal={showgameinfomodal}
								handlegameload={handlegameload}
							/>
						))}
					</div>
				</InfiniteScroll>
			</div>}
		</>

	);
};
