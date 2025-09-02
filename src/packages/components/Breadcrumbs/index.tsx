import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { CustomChevronRightIcon } from 'casino/components/Icons';

interface IBreadcrumbItemProps {
	label: string;
	href: string;
}

interface IBreadcrumbsProps {
	items: IBreadcrumbItemProps[];
	separator: string;
}

const IconWrapper = tw.span`
  flex
  flex-row
  items-center
  justify-center
  h-5.5 
  w-5.5 
  rounded-sm
  bg-white
  mr-3.75
  cursor-pointer
`;

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props: IBreadcrumbsProps): JSX.Element => {
	const { items = [], separator = '/' } = props;
	const [values, setValues] = React.useState<IBreadcrumbItemProps[]>([]);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const updateBreadcrumbValues = (targetIndex: number): void => {
		if (targetIndex >= 0 && targetIndex < items.length) {
			const newItems = items.slice(0, targetIndex + 1);
			newItems[targetIndex] = { ...items[targetIndex], href: '#' };
			setValues(newItems);

			if (targetIndex !== items.length - 1) {
				const path = items[targetIndex].href;
				navigate(path);
			}
		}
	};

	React.useEffect(() => {
		const currentPath = pathname;
		const currentPathIndex = items.findIndex((item) => item.href === currentPath);
		updateBreadcrumbValues(currentPathIndex);
	}, [items]);

	const handleOnClick = (event: React.SyntheticEvent, item: IBreadcrumbItemProps): void => {
		event.preventDefault();
		const clickedItemIndex = values.findIndex((newItem) => newItem.href === item.href);
		updateBreadcrumbValues(clickedItemIndex);
	};

	const handleOnClickBack = (event: React.SyntheticEvent): void => {
		event.preventDefault();
		const currentPath = pathname;
		const currentItemIndex = items.findIndex((item) => item.href === currentPath);
		const previousItemIndex = currentItemIndex - 1;
		updateBreadcrumbValues(previousItemIndex);
	};

	const isLastItem = (index: number): boolean => index < values.length - 1;
	const textColor = (index: number): string => isLastItem(index) ? '#6C7086' : '#FFFFFF';

	return (
		<>
			{
				values?.length > 1 ? (
					<div className="flex flex-row items-center">
						<IconWrapper onClick={handleOnClickBack}><CustomChevronRightIcon /></IconWrapper>
						{values.map((item, index) => (
							<React.Fragment key={index}>
								<a
									onClick={(event: React.SyntheticEvent) => handleOnClick(event, item)}
									style={{ color: textColor(index) }}
									className={`text-base font-semibold leading-[19px] text-left text-[${textColor(index)}]`}
									href='#'
								>
									{item.label}
								</a>
								{isLastItem(index) && <span className='mr-1 text-[#6C7086]'>{separator}</span>}
							</React.Fragment>
						))}
					</div>
				) : null
			}
		</>
	);
};

export default Breadcrumbs;
