import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

const mock = new MockAdapter(axios);

const user = {
	results: [
		{
			name: { first: 'John', last: 'Doe' },
			email: 'john.doe@example.com',
			phone: '123-456-7890',
			location: { city: 'New York', country: 'USA' },
			picture: { large: 'https://randomuser.me/api/portraits/men/1.jpg' }
		}
	]
};

xtest('fetches and displays user data', async () => {
	mock.onGet('https://randomuser.me/api/').reply(200, user);

	const { getByText, getByAltText } = render(<App />);

	await waitFor(() => expect(getByAltText('John Doe')).toBeInTheDocument());
	expect(getByText('John Doe')).toBeInTheDocument();
	expect(getByText('Email: john.doe@example.com')).toBeInTheDocument();
	expect(getByText('Phone: 123-456-7890')).toBeInTheDocument();
	expect(getByText('Location: New York, USA')).toBeInTheDocument();
});

xtest('fetches and displays user not found', async () => {
	mock.onGet('https://randomuser.me/api/').reply(401, null);

	const { getByText, getByAltText } = render(<App />);

	await waitFor(() => expect(getByText('Loading user error')).toBeInTheDocument());
	expect(getByText('Loading user error')).toBeInTheDocument();

});

test('fetches and displays loader', async () => {
	mock.onGet('https://randomuser.me/api/').reply(200, user);

	const { getByText, getByAltText } = render(<App />);

	await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());
	expect(getByText('Loading...')).toBeInTheDocument();

});
