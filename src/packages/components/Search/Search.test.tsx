import React from 'react';
import Search from './Search';
import { render } from '@testing-library/react';


describe('Search', () => {
	it('should display Search component', () => {
		const setInputValue = jest.fn();

		const searchText = 'Search';
		React.useState = jest.fn().mockReturnValue([searchText, setInputValue]);

		const { container } = render(<Search
			placeholder='Search Here'
			className='flex w-full'
			inputClassName='bg-[linear-gradient(0deg, #E9F0FD, #E9F0FD)]'
			searchIconColor='#000'
			clearIconColor='#000'
			onChange={jest.fn()}
		/>);

		expect(container).toMatchSnapshot();

	});
});
