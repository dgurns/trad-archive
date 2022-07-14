import { Link, useLoaderData, useTransition } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function ResetPassword() {
	const transition = useTransition();
	// const { error } = useLoaderData();

	return (
		<Layout>
			<h1 className="mb-4">Reset your password</h1>
			<p className="text-gray-500 mb-4">
				We'll send you an email with a link to reset your password.
			</p>
			<div className="flex flex-col align-start max-w-xs">
				<form method="post" className="space-y-4 mb-6">
					<input
						type="text"
						placeholder="Email"
						autoFocus
						required
						name="email"
					/>

					<input
						type="submit"
						className="btn w-auto"
						disabled={transition.state === "submitting"}
						value="Send Email"
					/>
				</form>

				{/* {error && <div className="text-red-600 mb-4">{error}</div>} */}

				<p>
					<Link to="/login">Go Back</Link>
				</p>
			</div>
		</Layout>
	);
}
