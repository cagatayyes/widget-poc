import { CategoryContainer } from './CategoryContainer/CategoryContainer';
import { ICategory } from 'casino/types';
import NoDataMessage from '../NoDataMessage/NoDataMessage';
import { CommonLoader } from 'casino/components/shared/CommonLoader';
import { useCategory, useScriptAttribute } from 'casino/hooks';
import { ROUTES } from 'casino/constants';

interface ICategoryListProps {
	showgameinfomodal: (gameId: number, gameLink: string) => void;
	handlegameload: (gameLink: string, gameName: string, gamelaunchpoint: string, categoryName?: string) => void;
}

const CategoryList = (props: ICategoryListProps): JSX.Element => {
	const { showgameinfomodal, handlegameload } =props;
	const { categoryList, isCategoryLoading, categoryFetchError } = useCategory();
	const categories: ICategory[] | null = categoryList?.data ?? [];
	const showCategories = categoryList && !isCategoryLoading && categories?.length > 1 && !categoryFetchError;
	const { scriptAttributes } = useScriptAttribute();
	const maxWidth: string = scriptAttributes.maxwidth;

	return (
		<>
			{showCategories &&
				<div className='flex flex-col max-w-[100vw] rounded-[10px] py-[17px] px-[14px] bg-[#0D1335]'
					data-testid='categoryList-container'>
					{
						categories?.map((category, index) => (
							<CategoryContainer
								key={category.id}
								sliderNo={index}
								title={category.name}
								iconName={category.icon}
								games={category.games}
								viewAllLink={`${ROUTES.PAGES.CATEGORY}/${category.slug}/${category.id}`}
								showgameinfomodal={showgameinfomodal}
								handlegameload={handlegameload}
							/>
						))
					}
				</div>
			}
			{
				!showCategories && !isCategoryLoading &&
				<NoDataMessage
					title='No categories found'
					message={'Try again later'}
				/>
			}
			{
				isCategoryLoading &&
				<CommonLoader maxWidth={maxWidth} />
			}
		</>
	);
};

export default CategoryList;
