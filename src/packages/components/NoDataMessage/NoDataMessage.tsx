
import { JSX } from 'react';

interface INoDataMessageProps {
    title?: string;
    message: string;
	maxWidth?: string;
}

const NoDataMessage = ({ message, maxWidth, title }: INoDataMessageProps):JSX.Element => {
	return (
		<div
			className='flex flex-col items-center rounded-[10px] py-[17px] px-[14px] bg-[#0D1335] text-[12px]'
			style={{ maxWidth }}>
			{title && <h1 className='text-[20px] font-bold mb-1 text-[#ffffff]'>{title}</h1>}
			<span className='flex w-full text-[#ffffff] justify-center'>
				{message}
			</span>
		</div>
	);
};

export default NoDataMessage;
