import { useEffect, useState, useRef } from "react";
import { type Person } from "@prisma/client";

import EntityService from "~/services/Entity";
import { useFetcher } from "@remix-run/react";

interface Props {
	onSuccess?: (person: Person) => void;
}
export default function CreatePersonForm({ onSuccess }: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const fetcher = useFetcher<{ error?: string; person?: Person }>();

	useEffect(() => {
		if (onSuccess && fetcher.type === "done" && fetcher.data.person) {
			onSuccess(fetcher.data.person);
		}
	}, [fetcher, onSuccess]);

	// Keep track of first/middle/last name and use them to suggest a slug
	const [firstNameDraft, setFirstNameDraft] = useState("");
	const [middleNameDraft, setMiddleNameDraft] = useState("");
	const [lastNameDraft, setLastNameDraft] = useState("");
	const [slug, setSlug] = useState("");
	useEffect(() => {
		let proposedSlug = "";
		if (firstNameDraft) {
			proposedSlug = firstNameDraft;
		}
		if (middleNameDraft) {
			proposedSlug = `${proposedSlug}-${middleNameDraft}`;
		}
		if (lastNameDraft) {
			proposedSlug = `${proposedSlug}-${lastNameDraft}`;
		}
		setSlug(EntityService.cleanSlug(proposedSlug));
	}, [firstNameDraft, middleNameDraft, lastNameDraft]);

	return (
		<>
			<div className="flex flex-col align-start">
				<fetcher.Form
					ref={formRef}
					method="post"
					action="/entities/people?index"
				>
					<input
						placeholder="First name"
						name="first_name"
						onChange={(e) => setFirstNameDraft(e.target.value)}
						className="mb-2"
						required
					/>
					<input
						placeholder="Middle name (optional)"
						name="middle_name"
						onChange={(e) => setMiddleNameDraft(e.target.value)}
						className="mb-2"
					/>
					<input
						placeholder="Last name"
						name="last_name"
						onChange={(e) => setLastNameDraft(e.target.value)}
						className="mb-2"
						required
					/>
					<input
						placeholder="URL slug (ie. kitty-hayes)"
						name="slug"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						className="mb-2"
						required
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this Person, for example{" "}
						{`https://trad-archive.com/entities/people/${
							slug || "kitty-hayes"
						}`}
					</div>
					<input placeholder="Aliases" name="aliases" className="mb-2" />
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Person. For example:{" "}
						<em>Tony D, The Tradfather, Tony from the County Calamari</em>
					</div>
					<textarea
						placeholder="Description"
						name="description"
						className="mb-2"
						rows={5}
					/>
					<button
						type="submit"
						className="btn mb-4 w-auto"
						disabled={fetcher.state !== "idle"}
					>
						Create
					</button>
				</fetcher.Form>
			</div>

			{fetcher.data?.error && (
				<div className="text-red-600">{fetcher.data.error}</div>
			)}
		</>
	);
}
