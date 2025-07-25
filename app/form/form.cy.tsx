import React from 'react';
import { Form } from './form';
import { MemoryRouter } from 'react-router';

import * as AppNavigate from '../hooks/useAppNavigate';

let navigateSpy: sinon.SinonStub;

beforeEach(() => {
	cy.then(() => {
		navigateSpy = cy.stub().as('navigateSpy');
	});
});

describe('<Form />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<MemoryRouter>
				<Form />
			</MemoryRouter>
		);
	});

	it('responds to onchange events', () => {
		cy.mount(
			<MemoryRouter>
				<Form />
			</MemoryRouter>
		);

		// Type in the email field
		cy.get('input[name="email"]')
			.type('user@example.com')
			.should('have.value', 'user@example.com');

		// Type in the password field
		cy.get('input[name="password"]')
			.type('supersecretpassword')
			.should('have.value', 'supersecretpassword');
	});

	it('displays error message on submit if email or password not provided', () => {
		cy.mount(
			<MemoryRouter>
				<Form />
			</MemoryRouter>
		);

		// Submit the form
		cy.get('form').submit();

		// Assert the error message is shown
		cy.contains('Email is required.').should('be.visible');
		cy.contains('Password is required.').should('be.visible');
	});

	it('displays error message on submit if email is invalid', () => {
		cy.mount(
			<MemoryRouter>
				<Form />
			</MemoryRouter>
		);

		// Type an invalid email and a valid password
		cy.get('input[name="email"]').type('invalid-email');
		cy.get('input[name="password"]').type('thisisavalidpassword');

		// Submit the form
		cy.get('form').submit();

		// Assert the error message is shown
		cy.contains('Please enter a valid email address.').should('be.visible');
	});

	it('displays error message on submit if password is invalid', () => {
		cy.mount(
			<MemoryRouter>
				<Form />
			</MemoryRouter>
		);

		// Type an invalid email and a valid password
		cy.get('input[name="email"]').type('valid@email.com');
		cy.get('input[name="password"]').type('invalid-pass');

		// Submit the form
		cy.get('form').submit();

		// Assert the error message is shown
		cy.contains('Password must be at least 16 characters.').should(
			'be.visible'
		);
	});

	it('uses local storage and routes users to landing page when submit is successful', () => {
		cy.mount(
			<MemoryRouter initialEntries={['/']}>
				<Form useNavigateHook={() => navigateSpy} />
			</MemoryRouter>
		);

		// Fill out the form with valid data
		cy.get('input[name="email"]').type('user@example.com');
		cy.get('input[name="password"]').type('averylongvalidpassword');

		// Submit the form
		cy.get('form').submit();

		// Check local storage
		cy.window().then((win) => {
			const stored = win.localStorage.getItem('loginForm');
			expect(stored).to.exist;
			const parsed = JSON.parse(stored);
			expect(parsed.email).to.equal('user@example.com');
			expect(parsed.password).to.equal('averylongvalidpassword');
		});

		// Check navigation
		cy.get('@navigateSpy').should('have.been.calledWith', '/landing');
	});

	it('routes user to sadface page when they click forgot password', () => {
		cy.then(() => {
			navigateSpy = cy.stub().as('navigateSpy');
		});

		cy.mount(
			<MemoryRouter initialEntries={['/']}>
				<Form useNavigateHook={() => navigateSpy} />
			</MemoryRouter>
		);

		cy.contains('Forgot password?').click();

		cy.get('@navigateSpy').should('have.been.calledWith', '/sadface');
	});

	it('routes user to sadface page when they click need help logging in', () => {
		cy.then(() => {
			navigateSpy = cy.stub().as('navigateSpy');
		});

		cy.mount(
			<MemoryRouter initialEntries={['/']}>
				<Form useNavigateHook={() => navigateSpy} />
			</MemoryRouter>
		);

		cy.contains('Need help logging in?').click();

		cy.get('@navigateSpy').should('have.been.calledWith', '/sadface');
	});
});
