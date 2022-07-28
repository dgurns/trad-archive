import { useEffect, useState, useRef } from "react";
import { type Person } from "@prisma/client";

import EntityService from "~/services/Entity";
import { useFetcher } from "@remix-run/react";

interface Props {
	onSuccess?: (instrument: Person) => void;
}
export default function CreateInstrumentForm({ onSuccess }: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const fetcher = useFetcher<{ error?: string; instrument?: Person }>();

	useEffect(() => {
		if (onSuccess && fetcher.type === "done" && fetcher.data.instrument) {
			onSuccess(fetcher.data.instrument);
		}
	}, [fetcher, onSuccess]);

	// Keep track of name and use it to suggest a slug
	const [nameDraft, setNameDraft] = useState("");
	const [slug, setSlug] = useState("");
	useEffect(() => {
		setSlug(EntityService.cleanSlug(nameDraft));
	}, [nameDraft]);

	return (
		<>
			<div className="flex flex-col align-start">
				<fetcher.Form
					ref={formRef}
					method="post"
					action="/entities/instruments?index"
				>
					<input
						placeholder="Name"
						name="name"
						onChange={(e) => setNameDraft(e.target.value)}
						className="mb-2"
						required
					/>
					<input
						placeholder="URL slug (ie. button-accordion)"
						name="slug"
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						className="mb-2"
						required
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this Instrument, for example{" "}
						{`https://trad-archive.com/entities/instruments/${
							slug || "button-accordion"
						}`}
					</div>
					<input placeholder="Aliases" name="aliases" className="mb-2" />
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Instrument. For example:{" "}
						<em>Bosca Ceoil, Squeezebox, Stomach Steinway</em>
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
