import React from 'react';
import type { Route } from './+types/home';
import { Link } from 'react-router';
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Landing Page' },
		{
			name: 'description',
			content: 'You are either logged in or not logged in.',
		},
	];
}

export default function Landing() {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			const loginString = localStorage.getItem('loginForm');
			const loginObj = loginString ? JSON.parse(loginString) : null;
			setIsLoggedIn(!!loginObj?.email);
		}
	}, []);

	const handleLogOut = () => {
		localStorage.clear();
	};

	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				<header>
					<h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
						{isLoggedIn
							? 'Congrats! You logged in.'
							: 'YOU ARE NOT LOGGED IN'}
					</h1>
				</header>
				<p>
					<Link to="/">
						<button
							onClick={handleLogOut}
							className="flex w-full justify-center rounded-md bg-fuchsia-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
						>
							{isLoggedIn ? 'Log out' : 'Log in'}
						</button>
					</Link>
				</p>
			</div>
		</main>
	);
}
