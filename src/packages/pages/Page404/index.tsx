import { ROUTES } from 'casino/constants/routes';
import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useScriptAttribute } from 'casino/hooks';

export const Page404 = (): JSX.Element => {

	const { scriptAttributes } = useScriptAttribute();
	const { pagenotfoundlogo } = scriptAttributes;

	return (
		<div className='flex flex-col'>
			<Link to={ROUTES.PAGES.HOME}
				className='mx-auto'
			>
				<img src={pagenotfoundlogo}  />
			</Link>
		</div>
	);
};
