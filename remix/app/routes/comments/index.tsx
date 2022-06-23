import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	console.log(formData);
};
