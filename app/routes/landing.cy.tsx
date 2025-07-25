import React from 'react';
import Landing from './landing';
import { MemoryRouter } from 'react-router';
import { meta } from './landing';

let navigateSpy: sinon.SinonStub;

beforeEach(() => {
	cy.then(() => {
		navigateSpy = cy.stub().as('navigateSpy');
	});
});

describe('<Landing />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);
	});

	it('returns the correct meta tags', () => {
		expect(meta({} as any)).to.deep.equal([
			{ title: 'Landing Page' },
			{
				name: 'description',
				content: 'You are either logged in or not logged in.',
			},
		]);
	});

	it('yells and displays a log in button when user is not logged in', () => {
		cy.mount(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		);
		cy.contains('h1', 'YOU ARE NOT LOGGED IN').should('be.visible');
		cy.contains('button', 'ake me to the login page').should('be.visible');
	});

	it('greets the user and displays a log out button when user is logged in', () => {
		cy.then(() => {
			window.localStorage.setItem(
				'loginForm',
				JSON.stringify({
					email: 'test@example.com',
					password: 'averysecurepassword',
				})
			);
		});

		cy.mount(
			<MemoryRouter initialEntries={['/']}>
				<Landing />
			</MemoryRouter>
		);

		cy.contains('Congrats! You logged in.').should('exist');
	});

	it('clears local storage and routes home when a logged in user clicks logout', () => {
		cy.then(() => {
			window.localStorage.setItem(
				'loginForm',
				JSON.stringify({
					email: 'test@example.com',
					password: 'averysecurepassword',
				})
			);
		});

		cy.mount(
			<MemoryRouter initialEntries={['/landing']}>
				<Landing useNavigateHook={() => navigateSpy} />
			</MemoryRouter>
		);

		cy.contains('button', 'Log out').click();

		cy.window().then((win) => {
			expect(win.localStorage.getItem('loginForm')).to.be.null;
			cy.get('@navigateSpy').should('have.been.calledWith', '/');
		});
	});
});
