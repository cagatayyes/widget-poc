import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from 'casino/hooks';

interface ILoaderProps {
    loaderText: string;
}

export const Loader = ({ loaderText }: ILoaderProps): JSX.Element | null => {
	const { isLoading, hideLoader } = useLoader();
	const { t } = useTranslation();

	useEffect(() => {
		const timer = setTimeout(() => {
			isLoading && hideLoader();
		}, 5000);

		const disablePullToRefresh = (event: TouchEvent): void => event.preventDefault();
		window.addEventListener('touchmove', disablePullToRefresh, { passive: false });

		return () => {
			clearTimeout(timer);
			window.removeEventListener('touchmove', disablePullToRefresh);
		};
	}, [isLoading]);

	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 bg-[#0D1335] bg-opacity-90 flex flex-col justify-center items-center z-[2000]">
			<img
				className="animate-spin h-24 w-24"
				src='https://casino-cdn.leetent.co.uk/images/loader-2.svg'
				width='24'
				height='24'
				alt='App Loader'
			/>
			<span className="text-[#fff] font-semibold text-base leading-tight text-center h-5">{t(loaderText)}</span>
		</div>
	);
};
