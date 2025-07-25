import { Form } from '../form/form';

export function Login() {
	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<header>
					<h1 className="mt-10 mb-10 text-5xl text-center font-semibold tracking-tight sm:text-7xl text-gray-900">
						Log In
					</h1>
				</header>
			</div>

			<div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				<Form />
			</div>
		</main>
	);
}
