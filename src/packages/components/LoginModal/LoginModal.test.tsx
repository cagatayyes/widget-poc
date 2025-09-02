
import { render } from '@testing-library/react';
import { LoginModal } from './LoginModal';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import React from 'react';

describe('User Authentication Modal', () => {
	it('should render authentication Modal', () => {
		const component = render(
			<BrowserRouter basename={ROUTES.BASENAME}>
				<LoginModal
					showLoginModal={true}
					closeLoginModal={jest.fn()}
				/>
			</BrowserRouter>
			,
		);
		expect(component).toMatchSnapshot();
	});
});
