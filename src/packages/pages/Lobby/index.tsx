import { JSX, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CarouselSlider, CarouselSliderItem } from 'casino/components/CarouselSlider/CarouselSlider';
import NavigationMenu from 'casino/components/CategoryNavigation/CategoryNavigation';
import { useAPI } from 'casino/hooks/useAPI';
import { BANNERS_ENDPOINT } from 'casino/constants';
import { ILobbyBannersResponse } from 'casino/types';
import { useScreenDetector } from 'casino/hooks/useScreenDetector';
import { GameLayoutController } from 'casino/components';
import { useCategory, useScriptAttribute } from 'casino/hooks';

export const Lobby = (): JSX.Element => {
	const { t } = useTranslation();
	const { data: bannerResponse, fetchData, isLoading: isBannerLoading, error: isBannerError } =
		useAPI<ILobbyBannersResponse[]>({ endpoint: BANNERS_ENDPOINT });
	const { isMobile } = useScreenDetector();
	const { scriptAttributes, scriptAttributesDispatch } = useScriptAttribute();
	const { maxwidth: maxWidth, isTokenChanged } = scriptAttributes;
	const carouselHeight = isMobile ? '160px' : '280px';
	const carouselWidth = isMobile ? '350px' : '596px';

	const [bannerData, setBannerData] = useState(bannerResponse?.data);
	const { fetchCategoryData } = useCategory();

	useEffect(() => {
		if (isTokenChanged) {
			fetchCategoryData();

			fetchData().then((response) => {
				setBannerData(response?.data);
			});

			scriptAttributesDispatch({
				type: 'SET_TOKEN_CHANGED',
				payload: false
			});
		}
	}, [isTokenChanged]);

	useEffect(() => {
		setBannerData(bannerResponse?.data);
	}, [bannerResponse?.data]);

	return (
		<Suspense fallback={<div>{t('loading')}</div>}>
			<div className={'bg-[var(--main-bg-color)] py-[10px] mx-auto'}
				style={{ maxWidth }}>
				<div className='flex justify-center items-center py-[10px] flex-col'>
					{
						!isBannerLoading && !isBannerError && bannerData && bannerData.length > 0 &&
						<CarouselSlider
							maxwidth={isMobile ? 375 : maxWidth}
							slides={bannerData}
						>
							{
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								bannerData.map((banner: any) => (
									<CarouselSliderItem key={`homeCarouselBanner-${banner.id}`}>
										<img style={{ height: carouselHeight, width: carouselWidth, borderRadius: '10px' }}
											src={banner.image}
											alt={banner.title}
										/>
									</CarouselSliderItem>
								))
							}
						</CarouselSlider>
					}
					<NavigationMenu />
					<GameLayoutController
						setCategoryName={() => { }} />
				</div>
			</div>
		</Suspense>
	);
};
