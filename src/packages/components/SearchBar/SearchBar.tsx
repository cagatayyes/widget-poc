import { CategoryType, SEARCH_GAMES_ENDPOINT } from 'casino/constants';
import { IGameData } from 'casino/types';
import { useEffect, useState } from 'react';
import SearchResults from 'casino/components/SearchResults/SearchResults';
import NoDataMessage from 'casino/components/NoDataMessage/NoDataMessage';
import Search from 'casino/components/Search/Search';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { CommonLoader } from 'casino/components/shared/CommonLoader';

interface ISearchBarProps {
    maxWidth: string;
    isSearch: boolean;
    setIsSearch:(isSearch:boolean) => void;
	showgameinfomodal:(gameId: number, gameLink: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string ) => void;
}

export const SearchBar = ({ maxWidth, isSearch, setIsSearch, showgameinfomodal, handlegameload }: ISearchBarProps): JSX.Element => {
	const [searchText, setSearchText] = useState<string>('');
	const [searchData, setSearchData] = useState<IGameData[] | null>([] as IGameData[]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { categoryId: paramCategoryId, categorySlug } = useParams();
	const categoryId = paramCategoryId ? parseInt(paramCategoryId) : null;
	const categoryName = categorySlug ?? null;

	const getSearchResult = async (): Promise<void> => {
		try {
			const queryParam = categoryId != null && categoryName !== CategoryType.recentlyPlayed ?
				`searchText=${searchText}&categoryId=${categoryId}` : `searchText=${searchText}`;
			const apiURL = `${process.env.REACT_APP_API_URL}/${SEARCH_GAMES_ENDPOINT}?${queryParam}`;
			const response: AxiosResponse = await axios(apiURL);
			if (response.data.success) {
				setSearchData(response.data.data);
				setIsLoading(false);
				if (response?.data?.data?.length === 0) {
					setError('No search results found');
				}
			} else {
				setError('Oops! Something went wrong');
				setIsLoading(false);
			}

		} catch (error) {
			setError('Oops! Something went wrong');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isSearch) {
			const delayDebounce = setTimeout(() => {
				if (searchText.length >= 3) {
					getSearchResult();
				}
			}, 1000);

			return () => clearTimeout(delayDebounce);
		}
	}, [searchText]);

	const handleGameSearch = async (searchTerm: string): Promise<void> => {
		setIsLoading(true);
		if (searchTerm.length >= 3) {
			setSearchText(searchTerm);
			setIsSearch(true);
		} else {
			setSearchText(searchTerm);
			setIsSearch(false);
		}
	};

	const renderSearchResults = (): JSX.Element => {
		if (isSearch && searchData?.length) {
			return <SearchResults
				searchData={searchData}
				showgameinfomodal={showgameinfomodal}
				handlegameload={handlegameload}
			/>;
		} else {
			return <NoDataMessage
				message={error}
				maxWidth={maxWidth}
			/>;
		}
	};

	return (
		<>
			<div className='flex w-full justify-center'>
				<Search
					placeholder='Search games here etc...'
					className='flex w-full h-[32px] rounded-[4px] border-[1px] border-[#CBD4E01A] my-[14px] mx-[14px]'
					inputClassName='text-[#6C7086] text-[11px] font-normal pl-[5px] leading-[12.5px]'
					searchIconColor='#BBBFD7'
					clearIconColor='#9D9D9D'
					onChange={handleGameSearch}
				/>
			</div>
			{isSearch && !isLoading && renderSearchResults()}
			{isSearch && isLoading && <CommonLoader maxWidth={maxWidth} /> }
		</>

	);
};
