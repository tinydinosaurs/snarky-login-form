import React from 'react';
import { Login } from './login';
import { MemoryRouter } from 'react-router';

describe('<Login />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
	});

	it('displays the correct header', () => {
		cy.mount(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
		cy.contains('h1', 'Log In').should('be.visible');
	});
});
