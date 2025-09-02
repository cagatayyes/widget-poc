/* eslint-disable react/prop-types */
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfiniteScroll } from './InfiniteScroll';
import React from 'react';

const mockFetchData = jest.fn();

const TestComponent = ({ hasMore = true }): JSX.Element => (
	<InfiniteScroll fetchData={mockFetchData}
		hasMore={hasMore}>
		<div>Item</div>
	</InfiniteScroll>
);

describe('InfiniteScroll Component', () => {
	it('renders children correctly', () => {
		render(<TestComponent />);
		const items = screen.getAllByText('Item');
		expect(items.length).toBe(2);
	});

	it('does not call fetchData if hasMore is false', () => {
		render(<TestComponent hasMore={false} />);

		fireEvent.scroll(window, { target: { scrollY: 100 } });

		expect(mockFetchData).not.toHaveBeenCalled();
	});

	const component = render(<TestComponent hasMore={false} />);

	it('matches the snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});

