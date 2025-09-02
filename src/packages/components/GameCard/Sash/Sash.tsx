import { SashContainer, SashIconContainer, SashTitleContainer } from './Sash.style';

interface ISashProps {
	bgColor: string;
	title: string;
	iconName: string;
	sashStyles?:string;
}

export const Sash = ({ bgColor, title, iconName, sashStyles }: ISashProps): JSX.Element => {

	return (
		<SashContainer className={sashStyles}
			style={{ backgroundColor: bgColor }}>
			<SashIconContainer className='material-symbols-outlined'>
				{iconName}
			</SashIconContainer>
			<SashTitleContainer>
				{title}
			</SashTitleContainer>
		</SashContainer>
	);
};
