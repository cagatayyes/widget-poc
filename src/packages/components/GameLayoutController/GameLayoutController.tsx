/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useState } from 'react';
import CategoryList from 'casino/components/CategoryList/CategoryList';
import { LoginModal } from 'casino/components/LoginModal/LoginModal';
import { SearchBar } from 'casino/components/SearchBar/SearchBar';
import { LobbyCategoryDetails } from '../LobbyCategoryDetail/LobbyCategoryDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameInformationModal } from 'casino/components/GameInformationModal/GameInformationModal';
import { useScriptAttribute } from 'casino/hooks';
import { useDispatchCustomEvent } from 'casino/hooks/useDispatchEvents';
import { ROUTES, EventActions } from 'casino/constants';
import { useToken } from 'casino/hooks/useToken';

interface IGameLayoutControllerProps {
	setCategoryName: (categoryName: string) => void;
}

export const GameLayoutController = (props: IGameLayoutControllerProps): JSX.Element => {
	const { setCategoryName } = props;
	const [isSearch, setIsSearch] = useState<boolean>(false);
	const [showInformationModal, setShowInformationModal] = useState<boolean>(false);
	const { scriptAttributes } = useScriptAttribute();
	const maxWidth: string = scriptAttributes.maxwidth;
	const { pathname } = useLocation();
	const [queryGameId, setQueryGameId] = useState<number>(-1);
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const navigate = useNavigate();
	const { userToken } = useToken();
	const [selectedGameLink, setSelectedGameLink] = useState<string>('');
	const { dispatchCustomEvent } = useDispatchCustomEvent();

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
		}
	};

	const closeLoginModal = (): void => {
		setIsLoginModal(false);
	};

	return (
		<>
			<div className='w-full justify-center'
				style={{ maxWidth }}
			>
				<SearchBar
					maxWidth={maxWidth}
					isSearch={isSearch}
					setIsSearch={setIsSearch}
					handlegameload={handlegameload}
					showgameinfomodal={showgameinfomodal}
				/>
				{!isSearch && pathname === ROUTES.PAGES.HOME && <CategoryList
					handlegameload={handlegameload}
					showgameinfomodal={showgameinfomodal}
				/>}
				{pathname !== ROUTES.PAGES.HOME && <LobbyCategoryDetails
					maxWidth={maxWidth}
					handlegameload={handlegameload}
					showgameinfomodal={showgameinfomodal}
					isSearch={isSearch}
					setCategoryName={setCategoryName}
				/>}
			</div>
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
			{!userToken && <LoginModal
				showLoginModal={isLoginModal}
				closeLoginModal={closeLoginModal}
			/>}
		</>
	);
};
