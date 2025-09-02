
interface ICommonLoader {
    maxWidth: string;
}

export const CommonLoader = ({ maxWidth }: ICommonLoader):JSX.Element => {
	return (
		<div
			className='flex items-center h-screen justify-center'
			style={{ maxWidth }}
		>
			<div className='flex relative h-[250px] w-full justify-center mt-[-100px]'>
				<img
					className="animate-pulse h-24 w-24"
					src='https://casino-cdn.leetent.co.uk/images/loader-1.svg'
					width='24'
					height='24'
					alt='App Loader'
				/>
			</div>
		</div>
	);
};
