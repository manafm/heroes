import React      from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserCard   from './components/card/UserCard'

const user = {
	name: { first: 'John', last: 'Doe' },
	email: 'john.doe@example.com',
	phone: '123-456-7890',
	location: { city: 'New York', country: 'USA' },
	picture: { large: 'https://randomuser.me/api/portraits/men/1.jpg' }
};

test('renders user card with correct information', () => {
	const { getByText, getByAltText } = render(<UserCard user={user} />);

	//screen.debug(getByAltText('John Doe'))

	expect(getByAltText('John Doe')).toHaveAttribute('src', user.picture.large);
	expect(getByText('John Doe')).toBeInTheDocument();
	expect(getByText('Email: john.doe@example.com')).toBeInTheDocument();
	expect(getByText('Phone: 123-456-7890')).toBeInTheDocument();
	expect(getByText('Location: New York, USA')).toBeInTheDocument();
});
