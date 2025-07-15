import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'So sad' },
		{ name: 'description', content: 'You can never log in' },
	];
}

export default function SadFace() {
	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				<header>
					<h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
						😢
					</h1>
				</header>
			</div>
		</main>
	);
}
