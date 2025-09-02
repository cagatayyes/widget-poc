import { MainLayout } from 'casino/components';
import { ROUTES } from 'casino/constants';
import { CategoryProvider } from 'casino/context';
import { Lobby, Page404, CategoryDetail, GameLobby } from 'casino/pages';
import React from 'react';
import { useRoutes } from 'react-router-dom';

export const RouteList: React.FC = () => {
	const pageList = [
		{
			path: ROUTES.PAGES.HOME,
			element: 	<CategoryProvider><Lobby /></CategoryProvider>,
		},
		{
			path: `${ROUTES.PAGES.CATEGORY}/:categorySlug/:categoryId`,
			element: <CategoryDetail />,
		},
		{
			path: `${ROUTES.PAGES.GAME}/:gameslug/:gameid`,
			element: <GameLobby />,
		}
	];

	return useRoutes([
		{
			path: '/*',
			element: <Page404 />
		},
		{
			element: <MainLayout />,
			children: [...pageList]
		}
	]);
};
