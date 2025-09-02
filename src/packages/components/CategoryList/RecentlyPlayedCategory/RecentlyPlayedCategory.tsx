
import { IDynamicCategory, IGame } from 'casino/types';
import { CategoryContainer } from '../CategoryContainer/CategoryContainer';
import { DYNAMIC_CATEGORIES_ENDPOINT, DynamicCategoryTypes, EventActions, ROUTES } from 'casino/constants';
import { useAPI, useDispatchCustomEvent, useScriptAttribute, useToken } from 'casino/hooks';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameInformationModal } from 'casino/components/GameInformationModal/GameInformationModal';
import { CommonLoader } from 'casino/components/shared/CommonLoader';

interface IRecentlyPlayedCategoryProps {
	title?: string;
	showCategoryIcon?: boolean;
	showViewAllButton?: boolean;
	showLoading?: boolean;
}

export const RecentlyPlayedCategory = (props: IRecentlyPlayedCategoryProps): JSX.Element => {
	const { title, showCategoryIcon = true, showViewAllButton = true, showLoading = false } = props;
	const { userToken } = useToken();
	const { data: recentlyPlayedCategory, isLoading: isRecentlyPlayedLoading, error: recentlyPlayedCategoryFetchError } =
	useAPI<IDynamicCategory>({ endpoint: `${DYNAMIC_CATEGORIES_ENDPOINT}/${DynamicCategoryTypes.recentlyPlayed}` });
	const category : IDynamicCategory | null = recentlyPlayedCategory?.data ?? null;
	const games: IGame[] | null = category?.games ?? [];
	const showCategories: boolean = !isRecentlyPlayedLoading && !recentlyPlayedCategoryFetchError && games?.length > 0;

	const { dispatchCustomEvent } = useDispatchCustomEvent();
	const navigate = useNavigate();
	const [showInformationModal, setShowInformationModal] = useState<boolean>(false);
	const [queryGameId, setQueryGameId] = useState<number>(-1);
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [selectedGameLink, setSelectedGameLink] = useState<string>('');
	const { scriptAttributes } = useScriptAttribute();
	const maxWidth: string = scriptAttributes.maxwidth;


	const showgameinfomodal = (gameId: number, gameLink: string): void => {
		setQueryGameId(gameId);
		setSelectedGameLink(gameLink);
		setShowInformationModal(!showInformationModal);
	};

	const handlegameload = (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName: string = ''): void => {
		if (!userToken) {
			setIsLoginModal(!isLoginModal);
		} else {
			dispatchCustomEvent(EventActions.gameLaunch, {
				categoryName,
				gamelaunchpoint,
				gameName,
			});

			navigate(gameLink);

			setTimeout(() => {
				window.location.reload();
			}, 0);
		}
	};

	return (
		<>
			{showCategories && category &&
				<div className='flex flex-col max-w-[100vw] rounded-[10px] py-[17px] px-[14px] bg-[#0D1335]'
					data-testid='categoryList-container'>
					<CategoryContainer
						key={category.id}
						sliderNo={1}
						title={title ? title : category.name}
						iconName={showCategoryIcon ? category.icon : ''}
						games={category.games}
						viewAllLink={showViewAllButton ? `${ROUTES.PAGES.CATEGORY}/${category.slug}/${category.id}`: ''}
						showgameinfomodal={showgameinfomodal}
						handlegameload={handlegameload}
					/>
				</div>
			}
			{showInformationModal && <div>
				<GameInformationModal
					gameId={queryGameId}
					selectedGameLink={selectedGameLink}
					isShowModal={showInformationModal}
					showgameinfomodal={showgameinfomodal}
					maxWidth={maxWidth}
					handlePlayNow={handlegameload}
				/>
			</div>}
			{
				isRecentlyPlayedLoading && showLoading &&
				<CommonLoader maxWidth={maxWidth} />
			}
		</>
	);
};
