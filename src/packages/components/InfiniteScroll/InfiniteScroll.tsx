import { useEffect, ReactNode } from 'react';

interface IInfiniteScrollProps {
	children: ReactNode | ReactNode[];
	fetchData: () => object;
	hasMore: boolean;
	isLoading: boolean;
	maxWidth: string;
}

export const InfiniteScroll = ({ children, fetchData, hasMore, isLoading, maxWidth }: IInfiniteScrollProps): JSX.Element => {
	const handleScroll = (): void => {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

		if (!(scrollTop + clientHeight >= scrollHeight - 20) || isLoading || !hasMore) return;

		if (hasMore) {
			fetchData();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<div onScroll={handleScroll} >
			{children}
			{isLoading && <h1 style={{ color: 'white', margin: '0 auto', maxWidth: maxWidth, textAlign: 'center', paddingTop: '10px' }}>Loading games...</h1>}
		</div>
	);
};
