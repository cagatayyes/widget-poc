import { JSX } from 'react';

interface ITagProps {
    tags: string[];
}

export const GameInformationTags = ({ tags }: ITagProps): JSX.Element => {

	return (
		<div className='py-[10px]'>
			{tags && tags.map((item) =>
				<span
					key={item}
					className='bg-[#252B49] w-[46px] h-[18px] m-[5px] text-[10px] px-[4px] py-[3px] rounded-sm text-[#D9D9D9]'
				>
					{item}
				</span>,
			)}
		</div>

	);
};
