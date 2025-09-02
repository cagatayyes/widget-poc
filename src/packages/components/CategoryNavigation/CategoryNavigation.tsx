import { ROUTES } from 'casino/constants';
import { useCategory, useDispatchCustomEvent, useScreenDetector, useScriptAttribute } from 'casino/hooks';
import { ICategory } from 'casino/types';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const MenuContainer = tw.div`
  flex
  flex-row
  pt-[14px]
  pl-[4px]
  pr-[11px]
  overflow-x-auto
  hideScrollBar
`;

const NavigationMenu = (): JSX.Element => {
	const { categoryList, isCategoryLoading, categoryFetchError } = useCategory();
	const { isMobile, isSmallScreen } = useScreenDetector();
	const { scriptAttributes } = useScriptAttribute();
	const maxWidth: string = scriptAttributes.maxwidth;
	const { dispatchCustomEvent } = useDispatchCustomEvent();

	const defaultCategories: ICategory[] = [
		{ id: 0, slug: `${ROUTES.PAGES.HOME}`, name: 'Lobby', icon: 'electric_bolt', games: [] },
	];
	const categories: ICategory[] | null = defaultCategories.concat(categoryList?.data || []);
	const showCategories = categoryList && !isCategoryLoading && categories?.length > 1 && !categoryFetchError;

	const handleCategoryClick = (categoryName: string): void => {
		dispatchCustomEvent('CASINO_CATEGORY_CLICK', { categoryName: categoryName });
	};

	if(!showCategories) return <></>;

	return (
		<MenuContainer style={{ maxWidth: isMobile ? 375 : maxWidth, marginLeft: isSmallScreen? '15px':'' }}>
			{categories.map((category: ICategory, index) => (
				<Link
					to={category.name === 'Lobby' ? `${category.slug}` : `${ROUTES.PAGES.CATEGORY}/${category.slug}/${category.id}`}
					id={`category-button-${category.id}`}
					key={`category-button-${index}`}
					className="h-[30px] first-of-type:text-[#FFB800]  first-of-type:border-[#FFB800] text-[11px] font-semibold min-w-fit items-center border-[1px] border-solid border-[#adb9ce40] rounded-[23px] text-[white] flex flex-row mr-[4px] pl-[7px] pr-[13px] py-[6px]"
					onClick={() => handleCategoryClick(category.name)}
				>
					<span
						id={`category-icon-${category.id}`}
						key={`category-icon-${index}`}
						className={`flex text-[18px] ${category.name === 'Lobby' ? 'text-[#FFB800]' : 'text-[#FFF]'} mr-[4px] material-symbols-outlined`}>
						{category.icon}
					</span>
					<span className='#BBBFD7;'>{category.name}</span>
				</Link>
			))}
		</MenuContainer>
	);
};

export default NavigationMenu;
