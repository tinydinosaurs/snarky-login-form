import * as React from 'react';
import { useState } from 'react';
// in your Form.tsx or Login.tsx
import useAppNavigate from '../hooks/useAppNavigate';

// const navigate = u();seAppNavigate

export interface FormState {
	email: string;
	password: string;
}

function validateEmail(email: string) {
	// Simple email regex
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const Form = ({ useNavigateHook = useAppNavigate }) => {
	const [formState, setFormState] = useState<FormState>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	);
	const navigate = useNavigateHook();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear error on change
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: { email?: string; password?: string } = {};
		if (!formState.email) {
			newErrors.email = 'Email is required.';
		} else if (!validateEmail(formState.email)) {
			newErrors.email = 'Please enter a valid email address.';
		}
		if (!formState.password) {
			newErrors.password = 'Password is required.';
		} else if (formState.password.length < 16) {
			newErrors.password = 'Password must be at least 16 characters.';
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		localStorage.setItem('loginForm', JSON.stringify(formState));
		navigate('/landing');
	};

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form
				action="#"
				method="POST"
				className="space-y-6"
				onSubmit={onSubmit}
				autoComplete="off"
				data-1p-ignore
				noValidate
			>
				<div>
					<label
						htmlFor="email"
						className="block text-sm/6 font-medium text-gray-900"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="off"
							data-1p-ignore
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-fuchsia-600 sm:text-sm/6"
							value={formState.email}
							onChange={onChange}
							aria-invalid={!!errors.email}
							aria-describedby={
								errors.email ? 'email-error' : undefined
							}
						/>
						{errors.email && (
							<p
								id="email-error"
								className="mt-2 text-sm text-red-600"
							>
								{errors.email}
							</p>
						)}
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Password
						</label>
						<div className="text-sm">
							<button
								className="font-semibold text-fuchsia-600 hover:text-fuchsia-500 cursor-pointer"
								onClick={() => navigate('/sadface')}
							>
								Forgot password?
							</button>
						</div>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="off"
							data-1p-ignore
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-fuchsia-600 sm:text-sm/6"
							value={formState.password}
							onChange={onChange}
							aria-invalid={!!errors.password}
							aria-describedby={
								errors.password ? 'password-error' : undefined
							}
						/>
						{errors.password && (
							<p
								id="password-error"
								className="mt-2 text-sm text-red-600"
							>
								{errors.password}
							</p>
						)}
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-fuchsia-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-fuchsia-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
					>
						Sign in
					</button>
				</div>
			</form>

			<p className="mt-4 text-center text-sm/6 text-gray-500">
				<button
					className="font-semibold text-fuchsia-600 hover:text-fuchsia-500 cursor-pointer"
					onClick={() => navigate('/sadface')}
				>
					Need help logging in?
				</button>
			</p>
		</div>
	);
};
