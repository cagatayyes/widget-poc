import { JSX, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs, GameLayoutController } from 'casino/components';
import { useParams, useLocation } from 'react-router-dom';
import { ROUTES } from 'casino/constants';

export const CategoryDetail = (): JSX.Element | null => {
	const { t } = useTranslation();
	const maxWidth: string = document.getElementById('b2b-casino')?.getAttribute('max-width') ?? '640px';
	const [categoryName, setCategoryName] = useState<string>('');
	const { categorySlug } = useParams();
	const { pathname } = useLocation();

	const items = [
		{ label: 'Lobby', href: ROUTES.PAGES.HOME },
		{ label: (categoryName ?? categorySlug) || '', href: pathname }
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Suspense fallback={<div>{t('loading')}</div>}>
			<div className='bg-[var(--main-bg-color)] py-[10px] mx-auto h-full'
				data-testid='categoryDetailPage'
				style={{ maxWidth: maxWidth }}>
				<div className='flex justify-center items-center py-[10px] flex-col'>
					<div className='mr-[auto] ml-[15px]'>
						<Breadcrumbs
							items={items}
							separator='/'
						/>
					</div>
				</div>
				<GameLayoutController
					setCategoryName={setCategoryName} />
			</div>
		</Suspense>
	);
};
