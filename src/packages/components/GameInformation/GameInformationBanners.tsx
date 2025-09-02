import { JSX } from 'react';

interface IGameInformationBannerProps {
    width?: string;
    height?: string;
    banners?: string[];
}

export const GameInformationBanners = ({
	width = '130px',
	height = '107px',
	banners = [
		'https://cdn.oya.win/dev/banner/20231101141145-a272.png',
		'https://cdn.oya.win/dev/banner/20231101141145-a272.png',
		'https://cdn.oya.win/dev/banner/20231101141145-a272.png'
	]
}: IGameInformationBannerProps): JSX.Element => {

	return (
		<div className='flex flex-row w-full '>
			<div className='flex flex-row overflow-x-auto w-auto'>
				{banners.map((item: string, key: number) =>
					<span
						className='mr[10px] p-[10px]'
						key={item+'-'+key}>
						<img
							style={{ maxHeight: width, height: height, width: width }}
							src={item}
						/>
					</span>,
				)}
			</div>
		</div>
	);
};
